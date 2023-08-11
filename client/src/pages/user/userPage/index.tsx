import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const UserPage: React.FC = () => {
    return (
        <div className="flex mt-5 w-full h-full gap-4">
            <div className="tablet:hidden flex w-[20%] shrink-0">
                <Sidebar />
            </div>
            <div className="flex flex-col motion-safe:w-full w-[80%]">
                <Outlet />
            </div>
        </div>
    );
};

export default UserPage;
