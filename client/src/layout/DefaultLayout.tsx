import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Auth } from '../feature';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { apiGetDetailUser } from '../services/apiUser';
import { setIsLoginSuccess } from '../redux/features/auth/authSlice';
import { setDetailUser } from '../redux/features/user/userSlice';
import { Footer, Header, Loading } from '../component';
import { useLocation } from 'react-router-dom';
import { path } from '../utils/const';
import { BottomNavigate } from '../component/mobile/BottomNavigate';
import Chat from '../component/chat';

interface DefaultLayoutProps {
    children: React.ReactNode;
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const dispatch = useAppDispatch();
    // chi tiết user

    useEffect(() => {
        const fetchApiDetailUser = async () => {
            const res = await apiGetDetailUser();
            if (res.success) {
                dispatch(setIsLoginSuccess(true));
                dispatch(setDetailUser(res.data));
            }
        };
        const access_token = localStorage.getItem('access_token');
        access_token && fetchApiDetailUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const toastContainer = (
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    );
    const location = useLocation();
    const { mobile_ui } = useAppSelector((state) => state.action);
    return (
        <>
            <div className="flex flex-col w-screen h-full mx-auto  bg-background_primary">
                {!location.pathname.includes(path.PAGE_PAYMENT) && <Header />}
                <main className="flex flex-col tablet:pb-20 bg-background_primary  h-full w-full max-w-[1280px] tablet:px-0 px-5  mx-auto  ">
                    {children}
                </main>
                {!mobile_ui && <Footer />}
                <Auth />
                <Loading />
                <Chat />
                <BottomNavigate />
            </div>
            {toastContainer}
        </>
    );
};

export default DefaultLayout;
