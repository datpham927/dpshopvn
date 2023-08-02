import React, { memo, useRef } from 'react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCategories } from '../../services/apiCategory';
import { setCategories } from '../../redux/features/category/categorySlice';
import HeaderTop from './headerTop';
import HeaderBottom from './headerBottom';
import { Socket, io } from 'socket.io-client';
import { setUserOnline } from '../../redux/features/auth/authSlice';
import { setSocketRef } from '../../redux/features/action/actionSlice';

// eslint-disable-next-line react-refresh/only-export-components
const Header: React.FC = () => {
    const dispatch = useAppDispatch();

    const currenUser = useAppSelector((state) => state.user);
    const socketRef = useRef<Socket | null>(null);
    useEffect(() => {
        //ws <=> http
        socketRef.current = io("http://localhost:4000");
        dispatch(setSocketRef(socketRef.current));
    }, []);
    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.emit('addUser', currenUser._id);
            socketRef.current.on('getUser', (e) => {
                dispatch(setUserOnline(e));
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketRef, currenUser]);

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await getCategories();
            if (res?.success) {
                dispatch(setCategories(res.categories));
            }
        };
        fetchCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header className="h-auto w-full bg-primary z-[999]">
            <div className="w-full h-full flex flex-col max-w-7xl min-w-[1280px] m-auto ">
                <HeaderTop />
                <HeaderBottom />
            </div>
        </header>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Header);
