import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Sidebar } from '../user/userPage/Sidebar';
import { ButtonOutline, showNotification } from '../../component';
import Cart from '../../component/cart';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { apiLogout } from '../../services/apiAuth';
import { setDetailUser } from '../../redux/features/user/userSlice';
import { setIsLoginSuccess } from '../../redux/features/auth/authSlice';
import { setAddProductInCartFromApi, setSelectedProductsAll } from '../../redux/features/order/orderSlice';

const MenuUserOption: React.FC = () => {
    const dispatch=useAppDispatch()
    const handleLogOut = async () => {
        if (confirm('Bạn có muốn đăng xuất')) {
            const res = await apiLogout();
            if (!res.success) return;
            localStorage.removeItem('access_token');
            dispatch(setDetailUser({}));
            dispatch(setIsLoginSuccess(false));
            dispatch(setSelectedProductsAll([]));
            dispatch(setAddProductInCartFromApi([]));
            showNotification('Đăng xuất thành công', true);
        }
    };
    return (
        <div className="fixed-mobile bg-white">
            <div className="flex justify-between items-center text-white py-2 bg-primary px-2">
                <Link to={'/'}>
                    <ChevronLeftIcon fontSize="large" />
                </Link>
                <p className='text-base'>Quản lý tài khoản</p>
                <Cart />
            </div>
            <Sidebar />
            <ButtonOutline onClick={handleLogOut}className="bg-primary text-white mx-auto">Đăng xuất</ButtonOutline>
        </div>
    );
};

export default MenuUserOption;
