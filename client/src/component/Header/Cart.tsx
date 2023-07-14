import React, { memo, useEffect } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';
import { path } from '../../utils/const';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { apiGetProductInCart } from '../../services/apiCart';
import { setAddProductInCart } from '../../redux/features/order/orderSlice';
// eslint-disable-next-line react-refresh/only-export-components
const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const { productInCart } = useAppSelector((state) => state.order);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await apiGetProductInCart();
            if (!res.success) return;
            dispatch(setAddProductInCart(res.products));
        };
        isLoginSuccess && fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoginSuccess]);


    return (
        <Link to={path.PAGE_CART} className="flex items-end  cursor-pointer">
            <div className="flex relative">
                <span className="text-[32px]">
                    <ShoppingCartOutlinedIcon fontSize="medium" />
                </span>
                <div className="absolute  text-[13px] px-[5px] py-[1] rounded-[50%] top-[10px] right-[-8px] h-fit bg-[#A769FD]">
                    {productInCart?.length > 10 ? '9+' : productInCart?.length || 0}
                </div>
            </div>
            <span className="text-xs">Giỏ hàng</span>
        </Link>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Cart);
