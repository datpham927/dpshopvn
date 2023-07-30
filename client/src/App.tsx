/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import DefaultLayout from './layout/DefaultLayout';
import RouterPage from './routes/RouterPage';
import { useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setUserOnline } from './redux/features/auth/authSlice';
function App() {
    const currenUser = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const socketRef = useRef<Socket | null>(null);
    useEffect(() => {
        //ws <=> http
        socketRef.current = io('ws://localhost:4000');
    }, []);
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.emit('addUser', currenUser._id);
            socketRef.current.on('getUser', (e) => {
                dispatch(setUserOnline(e));
            });
        }
    }, [socketRef, currenUser]);

    return (
        <BrowserRouter>
            <DefaultLayout>
                <RouterPage />
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
