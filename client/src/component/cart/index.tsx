import React, { memo, useEffect } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/const';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { apiGetProductInCart } from '../../services/apiCart';
import { setAddProductInCartFromApi } from '../../redux/features/order/orderSlice';
import { setOpenFeatureAuth } from '../../redux/features/action/actionSlice';
// eslint-disable-next-line react-refresh/only-export-components
const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const { productInCart } = useAppSelector((state) => state.order);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await apiGetProductInCart();
            if (!res.success) return;
            if (res.products.length > 0) {
                dispatch(setAddProductInCartFromApi(res.products));
            }
        };
        isLoginSuccess && fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoginSuccess]);

    return (
        <div className="flex laptop:w-2/12 laptop:h-search items-center justify-center pr-2">
            <div
                className="flex relative  text-white"
                onClick={() => {
                    isLoginSuccess ? navigate(path.PAGE_CART) : dispatch(setOpenFeatureAuth(true));
                }}
            >
                <ShoppingCartOutlinedIcon fontSize="medium" />
                <div className="absolute text-[13px] px-[5px] py-[1] rounded-[50%] bottom-2 right-[-8px] h-fit bg-[#A769FD]">
                    {productInCart?.length > 10 ? '9+' : productInCart?.length || 0}
                </div>
            </div>
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Cart);
