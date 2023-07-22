import React, { memo, useEffect } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ProductInCart } from '../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { apiAddToCart, apiDeleteProductInCart } from '../../services/apiCart';
import { showNotification } from '..';
import {
    setDecreaseProduct,
    setIncreaseProduct,
    setProductsByShopId,
    setRemoveProductInCart,
    setSelectedProducts,
} from '../../redux/features/order/orderSlice';
import { formatMoney } from '../../utils/formatMoney';
import { IconExcept } from '../../assets';
import useDebounce from '../../Hook/useDebounce';
import { setIsLoading } from '../../redux/features/action/actionSlice';

// eslint-disable-next-line react-refresh/only-export-components
const ProductInCartItem: React.FC<{ product: ProductInCart; isSelector?: boolean }> = ({ product, isSelector }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { selectedProducts } = useAppSelector((state) => state?.order);
    const handleDeleteProductInCart = async (product: ProductInCart) => {
        if (confirm('Bạn có muốn xóa sản phẩm đang chọn?')) {
            const res = await apiDeleteProductInCart(product?._id);
            if (!res?.success) {
                showNotification('Xóa không thành công');
                return;
            }
            showNotification('Xóa thành công', true);
            dispatch(setRemoveProductInCart(product));
        }
    };

    const quantity=useDebounce(product.quantity,500)

    useEffect(() => {
        const fetchApiUpdateCart = async () => {
            // dispatch(setIsLoading(true))
            await apiAddToCart(product);
            dispatch(setProductsByShopId())
            dispatch(setIsLoading(false))
        };
        fetchApiUpdateCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    return (
        <div
            className={`flex bg-white px-3  justify-between rounded-lg items-center  ${
                isSelector ? 'border-solid border-b-[1px] border-separate py-6' : 'py-2'
            }`}
        >
            <div className="w-[35%] flex gap-3">
                {isSelector && (
                    <input
                        className="cursor-pointer"
                        type="checkbox"
                        checked={selectedProducts?.some((i) => i?._id === product?._id)}
                        onChange={() => {
                            dispatch(setSelectedProducts(product));
                        }}
                    />
                )}
                <div
                    className={`ml-1 mx-2 cursor-pointer ${isSelector ? ' h-16 w-16 ' : ' h-10 w-10'}`}
                    onClick={() => {
                        if (isSelector) {
                            navigate(`/${product?.productId?.slug}/${product?.productId?._id}`);
                        }
                    }}
                >
                    <img className="object-cover" src={product?.productId?.image_url} alt="" />
                </div>
                <span
                    className={`w-[70%] truncate text-sm ${isSelector ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                        if (isSelector) {
                            navigate(`/${product?.productId?.slug}/${product?.productId?._id}`);
                        }
                    }}
                >
                    {product?.productId?.title}
                </span>
            </div>
            <div className={`w-[60%] grid ${isSelector ? 'grid-cols-4 ' : 'grid-cols-3'} text-center justify-between`}>
                <div className="flex gap-1 items-center justify-center">
                    <span className="text-sm">{formatMoney(product?.productId?.newPrice)}</span>
                    {isSelector && (
                        <span className="text-xs text-secondary line-through">
                            {formatMoney(product?.productId?.oldPrice)}
                        </span>
                    )}
                </div>
                <div
                    className={`flex items-center mx-auto w-fit rounded-md ${
                        isSelector ? ' border-[1px] border-solid  border-separate ' : ''
                    }`}
                >
                    {isSelector && (
                        <span
                            className="text-sm"
                            onClick={() => {
                                dispatch(setDecreaseProduct(product));
                                dispatch(setProductsByShopId());
                            }}
                        >
                            {IconExcept}
                        </span>
                    )}
                    <span className="mx-2 text-sm">
                        {!isSelector && <CloseIcon style={{ fontSize: '12px', color: 'rgb(128 128 137)' }} />}
                        {product?.quantity}
                    </span>
                    {isSelector && (
                        <span
                            className="flex"
                            onClick={() => {
                                dispatch(setIncreaseProduct(product));
                                dispatch(setProductsByShopId());
                            }}
                        >
                            <AddIcon fontSize="small" />
                        </span>
                    )}
                </div>
                <span className="text-sm text-red_custom">{formatMoney(product?.totalPrice)}</span>
                {isSelector && (
                    <span
                        className="cursor-pointer"
                        onClick={(e) => {
                            e?.stopPropagation();
                            handleDeleteProductInCart(product);
                        }}
                    >
                        <DeleteOutlineOutlinedIcon fontSize="small" style={{ color: 'rgb(128,128,137 )' }} />
                    </span>
                )}
            </div>
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(ProductInCartItem);
