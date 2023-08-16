import React, { useEffect, useMemo,   useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ButtonOutline, DeliveryAddress, showNotification } from '../../../component';
import { formatMoney } from '../../../utils/formatMoney';
import { formatUserName } from '../../../utils/formatUserName';
import {  useNavigate } from 'react-router-dom';
import { path } from '../../../utils/const';
import { imgFreeShip } from '../../../assets';
import { setCreateOrder } from '../../../services/apiOrder';
import { setRemoveProductInCart, setSelectedProductsEmpty } from '../../../redux/features/order/orderSlice';
import { setIsLoading, setNotifications, setSocketRef } from '../../../redux/features/action/actionSlice';
import { INotification } from '../../../interfaces/interfaces';
import { apiCreateNotification } from '../../../services/apiNotification';
import { Socket, io } from 'socket.io-client';

interface RightProps {
    methods: {
        deliveryMethod: string;
        paymentMethod: string;
    };
}
const Right: React.FC<RightProps> = ({ methods }) => {
    const { selectedProducts } = useAppSelector((state) => state.order);
    const [priceShip, setPriceShip] = useState<number>(0);
    const [priceFreeShip, setPriceFreeShip] = useState<number>(0);
    const currentUser = useAppSelector((state) => state.user);
    const {socketRef} = useAppSelector((state) => state.action);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const priceMemo = useMemo(() => {
        const result = selectedProducts.reduce((total, e) => {
            return total + e.totalPrice;
        }, 0);
        return result;
    }, [selectedProducts]);

    useEffect(() => {
        setPriceFreeShip(priceMemo < 599000 && priceMemo > 99000 ? 15000 : priceMemo < 99000 ? 0 : 30000);
        const discount = methods.deliveryMethod === 'FAST' ? 4 : 6;
        setPriceShip(priceMemo >= 1000000 ? 60000 : (priceMemo * discount) / 100);
    }, [priceMemo, methods.deliveryMethod]);

    const totalPriceMemo = useMemo(() => {
        return priceMemo + (priceShip - priceFreeShip);
    }, [priceFreeShip, priceMemo, priceShip]);

    const handleOrderProduct = async () => {
        if (methods.paymentMethod === 'CASH') {
            if (confirm('Bạn có muốn đặt hàng không?')) {
                dispatch(setIsLoading(true));
                const res = await setCreateOrder({
                    products: selectedProducts,
                    paymentMethod: methods.paymentMethod,
                    shippingAddress: {
                        fullName: formatUserName(currentUser),
                        detailAddress: currentUser.address,
                        village: currentUser.address.split(',')[0],
                        district: currentUser.address.split(',')[1],
                        city: currentUser.address.split(',')[2],
                        phone: currentUser?.mobile,
                    },
                    shippingPrice: priceShip > priceFreeShip ? priceShip - priceFreeShip : 0,
                });
                dispatch(setIsLoading(false));

                if (!res.success) {
                    showNotification('Đặt hàng không thành công!', false);
                    return;
                }
                showNotification('Đặt hàng thành công! vui lòng kiểm tra trong gmail', true);
                selectedProducts.forEach((e) => {
                    dispatch(setRemoveProductInCart(e));
                });

                // ---------------  socket  ---------------
                const notification: INotification = {
                    image_url: selectedProducts[0].productId.image_url,
                    shopId: selectedProducts[0].shopId ? selectedProducts[0].shopId : '',
                    title: 'Bạn có đơn đặt hàng mới',
                    userId: currentUser._id,
                    user_name: formatUserName(currentUser),
                    subtitle: `đã mua sản phẩm của bạn`,
                    link: `http://localhost:5173/user/account/sell`,
                };
                const response = await apiCreateNotification(notification);
                response.success && socketRef?.emit('sendNotification', response.data);
                // ---------------------------------------------
                navigate(`${path.PAGE_USER}/purchase`);
                dispatch(setSelectedProductsEmpty());
            }
        }
    };

    return (
        <>
            <div className="tablet:w-full  w-2/6 ">
                <div className="flex w-full flex-col gap-3 bg-background_primary py-3 px-5 sticky top-0 left-0">
                    <DeliveryAddress />
                    {/* ----------------------- */}

                    <div className="bg-white px-3 py-2 rounded-md overflow-hidden">
                        <div className="flex flex-col border-solid border-b-[1px] gap-1 border-neutral-200 py-3">
                            <div className="flex justify-between items-center  ">
                                <span className="text-secondary text-base">Đơn hàng ({selectedProducts.length})</span>
                                <span
                                    className="text-primary text-base cursor-pointer"
                                    onClick={() => navigate(path.PAGE_CART)}
                                >
                                    Thay đổi
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col border-solid border-b-[1px] gap-1 border-neutral-200 py-3">
                            <div className="flex justify-between items-center ">
                                <span className="text-secondary text-sm">Tạm Tính</span>
                                <span className="font-normal text-sm">{formatMoney(priceMemo)}</span>
                            </div>
                            <div className="flex justify-between items-center ">
                                <span className="text-secondary text-sm">Phí Vận chuyển</span>
                                <span className="font-normal text-sm">{formatMoney(priceShip)}</span>
                            </div>
                            <div className="flex justify-between items-center ">
                                <span className="text-secondary text-sm">Khuyến mãi vận chuyển</span>
                                <span className="text-sm text-primary font-normal">- {formatMoney(priceFreeShip)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-secondary text-sm">Tổng Tiền</span>
                            <span
                                className={`${
                                    totalPriceMemo > 0 ? 'text-2xl' : 'text-1xl'
                                } text-red_custom font-semibold`}
                            >
                                {totalPriceMemo > 0 ? formatMoney(totalPriceMemo) : 'Vui lòng chọn sản phẩm'}
                            </span>
                        </div>
                        {priceFreeShip >= priceShip && (
                            <img className="w-[81px] h-[13px] mb-2 mx-auto" src={imgFreeShip} />
                        )}
                    </div>
                    <ButtonOutline
                        className="py-3 bg-red_custom border-none  text-white mt-2 "
                        onClick={handleOrderProduct}
                    >
                        {methods.paymentMethod === 'VNPAY' ? (
                            <a href="https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"> Thanh toán</a>
                        ) : (
                            'Thanh toán'
                        )}
                    </ButtonOutline>
                </div>
            </div>
        </>
    );
};

export default Right;
