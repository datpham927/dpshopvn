import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { IconExcept } from '../../../assets';
import { formatMoney } from '../../../utils/formatMoney';
import { formatStar } from '../../../utils/formatStar';
import { ProductDetail } from '../../../interfaces/interfaces';
import { ButtonOutline, showNotification } from '../../../component';
import { apiAddToCart } from '../../../services/apiCart';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setAddProductInCart } from '../../../redux/features/cart/cartSlice';
import InfoShop from './InfoShop';
import { setOpenFeatureAuth } from '../../../redux/features/action/actionSlice';

const Right: React.FC<{ productDetail: ProductDetail }> = ({ productDetail }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const handleAddToCart = async () => {
        const response = await apiAddToCart({
            quantity,
            shopId: productDetail.user._id,
            productId: productDetail._id,
            unitPrice: productDetail.newPrice,
            totalPrice: quantity * productDetail.newPrice,
        });
        if (response?.success) {
            dispatch(setAddProductInCart(response.data));
            showNotification('Sản phẩm đã được thêm vào giỏ hàng', true);
        } else {
            showNotification('Sản phẩm chưa được thêm vào giỏ hàng', true);
        }
    };

    return (
        <div className="flex  h-full flex-1">
            <div className="flex flex-col flex-1 h-full p-4 gap-4">
                <div className="flex flex-col w-full h-auto gap-1">
                    <p className="flex gap-1 text-[13px]">
                        Thương hiệu:
                        <a href="/ss" className="text-primary">
                            {productDetail?.brand}
                        </a>
                    </p>
                    <h1 className="text-2xl font-normal"> {productDetail?.title}</h1>
                    <div className="flex gap-2 items-center">
                        <div className="flex"> {formatStar(productDetail?.star || 0, '20px')}</div>
                        <h3 className="text-text_secondary text-[15px]">Đã bán {productDetail?.sold}</h3>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-1 h-full pr-3">
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full gap-2 items-end bg-[#FAFAFA] p-4 rounded-md  text-red_custom">
                                {productDetail?.newPrice && (
                                    <div className="text-4xl font-medium">{formatMoney(productDetail?.newPrice)}</div>
                                )}
                                {productDetail?.oldPrice && (
                                    <div className="text-sm text-text_secondary line-through">
                                        {formatMoney(productDetail?.oldPrice)}
                                    </div>
                                )}
                                {productDetail?.discount && (
                                    <div className="text-sm font-semibold">-{productDetail?.discount}%</div>
                                )}
                            </div>
                            <div className="flex gap-1 text-sm">
                                Giao đến
                                <span className="text-[15px] font-medium underline">
                                    H. Kiến Thuỵ, X. Du Lễ, Hải Phòng
                                </span>
                            </div>
                            <div className="flex gap-4 mt-6 items-center font-medium">
                                <h2 className="text-sm text-text_secondary">Số lượng</h2>
                                <div className="flex items-center border-[1px] border-solid border-slate-300 w-[100px]  rounded-sm">
                                    <button
                                        onClick={() => {
                                            if (quantity > 1) {
                                                setQuantity(quantity - 1);
                                            }
                                        }}
                                        className="flex w-full justify-center items-center"
                                    >
                                        {IconExcept}
                                    </button>
                                    <span className="px-4 py-1 border-solid border-l-[1px] border-r-[1px] border-slate-300 ">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="flex w-full justify-center items-center"
                                    >
                                        <AddIcon />
                                    </button>
                                </div>
                                <div className="text-sm  text-text_secondary">
                                    {productDetail?.inStock} sản phẩm có sẵn
                                </div>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <ButtonOutline
                                    onClick={() => {
                                        isLoginSuccess ? handleAddToCart() : dispatch(setOpenFeatureAuth(true));
                                    }}
                                >
                                    <ShoppingCartOutlinedIcon />
                                    Thêm vào giỏ hàng
                                </ButtonOutline>
                                <button className="flex gap-2 text-lg px-4 py-2 rounded-sm text-white bg-red_custom hover:bg-opacity-70">
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* ---------------- */}
                    <InfoShop props={productDetail?.user} />
                </div>
            </div>
        </div>
    );
};

export default Right;
