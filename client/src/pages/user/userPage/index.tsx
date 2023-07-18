import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const UserPage: React.FC = () => {
    return (
        <div className="flex mt-5 w-full h-full gap-4">
            <div className="flex w-2/12 shrink-0">
                <Sidebar />
            </div>
            <div className="flex flex-col w-10/12">
                <Outlet />
            </div>
        </div>
    );
};

export default UserPage;
