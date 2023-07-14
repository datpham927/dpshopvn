import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const UserPage:React.FC = () => {
    return (
        <div className='flex mt-5 gap-4'>
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default UserPage;
