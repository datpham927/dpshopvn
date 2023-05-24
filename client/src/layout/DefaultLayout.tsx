import React, { useEffect } from 'react';
import { Auth, Header, Overlay } from '../component';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { apiGetDetailUser } from '../services/apiUser';
import { useAppDispatch } from '../redux/hooks';
import { setDetailUser } from '../redux/features/user/userSlice';
import { setIsLoginSuccess } from '../redux/features/auth/authSlice';

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
                dispatch(setIsLoginSuccess(true))
                dispatch(setDetailUser(res.data));
            }
        };
        fetchApiDetailUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="flex flex-col w-screen h-screen mx-auto  bg-[#F5F5FA]">
                <Header />
                <main className="flex flex-col h-full max-w-7xl  px-5 py-3 mx-auto">{children}</main>
                <Overlay />
                <Auth />
            </div>
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
        </>
    );
};

export default DefaultLayout;
