/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import DefaultLayout from './layout/DefaultLayout';
import RouterPage from './routes/RouterPage';
import { useEffect, useRef } from 'react';
import { setMobileUi, setSocketRef } from './redux/features/action/actionSlice';
import { useAppDispatch } from './redux/hooks';
import { Socket, io } from 'socket.io-client';

function App() {
    const dispatch = useAppDispatch();
    const socketRef = useRef<Socket | null>(null);
    useEffect(() => {
        dispatch(setMobileUi(window.innerWidth < 1024));
    }, []);
    useEffect(() => {
        const handleResize = () => {
            setMobileUi(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        //ws <=> http
        socketRef.current = io(import.meta.env.VITE_REACT_API_URL_BACKEND_SOCKET); //kết nối
        dispatch(setSocketRef(socketRef.current));
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);
    return (
        <BrowserRouter>
            <DefaultLayout>
                <RouterPage />
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
