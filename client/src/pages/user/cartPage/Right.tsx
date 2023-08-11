import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { ButtonOutline, DeliveryAddress, FormEditAddress, showNotification } from '../../../component';
import { formatMoney } from '../../../utils/formatMoney';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../utils/const';
import { setProductsByShopId } from '../../../redux/features/order/orderSlice';
const Right: React.FC = () => {
    const [isOpenEditAddress, setIsOpenEditAddress] = useState<boolean>(false);
    const { selectedProducts } = useAppSelector((state) => state.order);
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    const totalPriceMemo = useMemo(() => {
        const result = selectedProducts.reduce((total, e) => {
            return total + e?.totalPrice;
        }, 0);
        return result;
    }, [selectedProducts]);
    const priceFreeShipMemo = useMemo(() => {
        return totalPriceMemo < 599000 && totalPriceMemo > 99000 ? 15000 : totalPriceMemo < 99000 ? 0 : 30000;
    }, [totalPriceMemo]);

    const handleBuyProducts = () => {
        if (currentUser.address && currentUser.mobile) {
            if (selectedProducts.length === 0) {
                showNotification('Vui lòng chọn sản phẩm!');
                return;
            }
            navigate(path.PAGE_PAYMENT);
            dispatch(setProductsByShopId());
        } else {
            if (confirm('Vui lòng cập nhật thông tin!')) {
                navigate(`${path.PAGE_USER}/profile`);
            }
        }
    };

    return (
        <>
            <div className="tablet:w-full w-2/6 ">
                <div className="flex w-full flex-col gap-3 bg-background_primary py-3 px-5 sticky top-0 left-0">
                    <DeliveryAddress />
                    {/* ----------------------- */}

                    <div className="bg-white px-3 py-2 rounded-md overflow-hidden">
                        <div className="flex flex-col border-solid border-b-[1px] border-neutral-200 py-3">
                            <div className="flex justify-between items-center ">
                                <span className="text-secondary text-sm">Tạm Tính</span>
                                <span>{formatMoney(totalPriceMemo)}</span>
                            </div>
                            <div className="flex justify-between items-center ">
                                <span className="text-secondary text-sm">Phí ship</span>
                                <span className="text-sm text-red_custom font-normal">
                                    - {formatMoney(priceFreeShipMemo)}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-secondary text-sm">Tổng Tiền</span>
                            <span
                                className={`${
                                    totalPriceMemo > 0 ? 'text-2xl' : 'text-1xl'
                                } text-red_custom font-normal`}
                            >
                                {totalPriceMemo > 0 ? formatMoney(totalPriceMemo) : 'Vui lòng chọn sản phẩm'}
                            </span>
                        </div>
                    </div>

                    <ButtonOutline
                        className="py-3 bg-red_custom border-none text-white mt-2"
                        onClick={handleBuyProducts}
                    >
                        Mua hàng
                    </ButtonOutline>
                </div>
            </div>
            {isOpenEditAddress && <FormEditAddress payload={currentUser} setIsOpen={setIsOpenEditAddress} isEdit />}
        </>
    );
};

export default Right;
