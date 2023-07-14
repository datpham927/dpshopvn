import React from 'react';
import {  NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { noUser } from '../../../assets';
import { SIDEBAR_USER } from '../../../utils/const';


export const Sidebar: React.FC = () => {
    const currentUser = useAppSelector((state) => state.user);
    return (
        <div className="flex flex-col w-1/5 gap-6">
            <div className="flex gap-2 items-center ml-2">
                <div className="w-11 h-11 overflow-hidden rounded-full border-[1px] border-solid border-separate">
                    <img src={currentUser.avatar_url || noUser} className="w-full h-full object-cover block" />
                </div>
                <div className="flex flex-col text-xs text-secondary">
                    Tài khoản của
                    <span className="text-base font-normal text-black ">
                        {currentUser?.firstName
                            ? `${currentUser?.lastName} ${currentUser?.firstName}`
                            : currentUser?.email?.split('@')[0]}
                    </span>
                </div>
            </div>

            <ul className="w-full h-full ">
                {SIDEBAR_USER.map((e) => (
                    <NavLink
                        to={e.path_name}
                        className="flex gap-2 p-2 text-sm text-gray-800 hover:bg-gray-200 cursor-pointer"
                    >
                        {e.icon}
                        {e.label}
                    </NavLink>
                ))}
            </ul>
        </div>
    );
};
