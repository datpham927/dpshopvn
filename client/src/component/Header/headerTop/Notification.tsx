/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Link } from 'react-router-dom';
import {
    setNotifications,
    setUnreadNotifications,
    setUnreadNotificationsEmpty,
} from '../../../redux/features/action/actionSlice';
import { apiGetNotification, apiIsWatched } from '../../../services/apiNotification';
import NotExit from '../../common/NotExit';

const Notification: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { notifications, unreadNotification, socketRef } = useAppSelector((state) => state.action);
    const { isLoginSuccess } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!socketRef) return;
        socketRef?.on('getNotification', (data: any) => {
            if (data) {
                dispatch(setNotifications(data));
                dispatch(setUnreadNotifications());
            }
        });
    }, [socketRef]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await apiGetNotification();
            console.log("res",res)
            res.success && dispatch(setNotifications(res.data));
            dispatch(setUnreadNotifications());
        }; 
        isLoginSuccess && fetchApi();
    }, [isLoginSuccess]);

    return (
        <div
            className="flex relative gap-2 text-white cursor-pointer"
            onMouseEnter={() => {
                setOpen(true);
            }}
            onMouseLeave={async () => {
                setOpen(false);
                dispatch(setUnreadNotificationsEmpty());
                await apiIsWatched();
            }}
        >
            <NotificationsNoneIcon fontSize="small" />
            <span className="tablet:hidden text-sm">Thông báo</span>
            <div className="absolute text-[13px] px-[5px]  rounded-[50%] bottom-1 left-2 h-fit bg-[#A769FD]">
                {unreadNotification?.length}
            </div>

            {open && (
                <div
                    className="absolute top-[calc(100%+3px)]  right-0 shadow-search z-[1000] rounded-md bg-white after:border-[10px]  after:border-transparent after:border-b-white 
                    after:top-[-18px]  after:right-5 after:absolute after:z-[1000]"
                >
                    <div className=" w-full h-full overflow-hidden ">
                        <div className="flex justify-center text-secondary py-2  ">Thông báo mới nhận</div>
                        <div className="mobile:w-[300px] mobile:h-[300px] w-[400px] h-[400px] overflow-y-scroll">
                            {notifications?.length > 0 ? (
                                notifications?.map((n) => (
                                    <Link
                                        onClick={() => setOpen(false)}
                                        to={n.link}
                                        className={`flex w-full gap-3 px-4 py-2 items-center hover:bg-slate-100 cursor-pointer ${
                                            n.is_watched ? 'bg-green-50' : ''
                                        }`}
                                    >
                                        <div className="w-10 h-10 shrink-0">
                                            <img src={n?.image_url} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="w-ful text-base">
                                            <h3 className="font-normal text-black truncate-trailing line-clamp-1  ">
                                                {n?.title}
                                            </h3>
                                            <div className="flex gap-1 items-center">
                                                <span className="text-sm text-primary font-semibold shrink-0">
                                                    {n.user_name}
                                                </span>
                                                <span className="text-xs text-secondary shrink-0">{n?.subtitle}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <NotExit label="không có thông báo nào" />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;
