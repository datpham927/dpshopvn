import React, { useEffect, useRef } from 'react';
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
    return (
        <>
            <div className="flex flex-col w-screen h-full mx-auto  bg-background_primary">
                {!location.pathname.includes(path.PAGE_PAYMENT) && <Header />}
                <main className="flex flex-col h-full max-w-7xl min-w-[1280px]  px-5  mx-auto  ">{children}</main>
                <Footer />
                <Auth />
                <Loading />
            </div>
            {toastContainer}
        </>
    );
};

export default DefaultLayout;
