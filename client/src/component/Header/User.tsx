import React, { useState } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import { showNotification } from '..';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { apiLogout } from '../../services/apiAuth';
import { setDetailUser } from '../../redux/features/user/userSlice';
import { setIsLoginSuccess } from '../../redux/features/auth/authSlice';
import { path } from '../../utils/const';
import { setOpenFeatureAuth } from '../../redux/features/action/actionSlice';
import { noUser } from '../../assets';
import {
    setAddProductInCart,
    setAddProductInCartFromApi,
    setSelectedProductsAll,
} from '../../redux/features/order/orderSlice';
const User: React.FC = () => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { avatar_url, firstName, lastName, email } = useAppSelector((state) => state.user);
    const name = lastName ? `${lastName} ${firstName}` : email?.split('@')[0];

    const handleLogOut = async () => {
        if (confirm('Bạn có muốn đăng xuất')) {
            const res = await apiLogout();
            if (!res.success) return;
            localStorage.removeItem('access_token');
            setIsOpenMenu(false);
            dispatch(setDetailUser({}));
            dispatch(setIsLoginSuccess(false));
            dispatch(setSelectedProductsAll([]));
            dispatch(setAddProductInCartFromApi([]));
            showNotification('Đăng xuất thành công', true);
        }
    };
    return (
        <>
            {isLoginSuccess ? (
                <div
                    className="relative flex items-center py-2"
                    onMouseEnter={() => setIsOpenMenu(true)}
                    onMouseLeave={() => setIsOpenMenu(false)}
                >
                    <span className="flex items-center shrink-0 cursor-pointer">
                        <img className="w-8 h-8 object-cover rounded-full" src={avatar_url ? avatar_url : noUser} />
                    </span>
                    <div className="text-sm font-normal text-white cursor-pointer ml-2 mr-4">
                        <span>{name}</span>
                    </div>
                    {/* menu */}
                    {isOpenMenu && (
                        <div
                            className="absolute flex flex-col top-full right-1/2 w-menu_user bg-white py-3 text-black rounded-xl
                        shadow-search after:border-[10px]  after:border-transparent after:border-b-white 
                        after:top-[-20px]  after:right-5 after:absolute"
                        >
                            <Link to={`${path.PAGE_USER}/profile`} className="menu-user">
                                Thông tin tài khoản
                            </Link>
                            <Link to={`${path.PAGE_USER}/sell`} className="menu-user">
                                Quản lý đơn hàng
                            </Link>
                            <Link to={`${path.PAGE_USER}/purchase`} className="menu-user">
                                Đơn mua
                            </Link>
                            <span onClick={handleLogOut} className="menu-user">
                                Đăng xuất
                            </span>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center">
                    <span className="flex items-center cursor-pointer">
                        <PersonOutlineOutlinedIcon fontSize="large" />
                    </span>
                    <div
                        className="flex flex-col mx-1 cursor-pointer"
                        onClick={() => dispatch(setOpenFeatureAuth(true))}
                    >
                        <div className="text-xs font-normal text-white">
                            <span>Đăng nhập</span> / <span>Đăng ký</span>
                        </div>
                        <span className="text-sm font-normal">Tài khoản</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default User;
