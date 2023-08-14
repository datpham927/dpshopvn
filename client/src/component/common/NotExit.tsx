import React from 'react';
import { dogcute, notExit } from '../../assets';

const NotExit: React.FC<{ label?: string }> = ({ label = 'Chưa có đơn hàng nào' }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white py-4">
            <img className="tablet:w-4/6 laptop:w-1/6" src={notExit} />
            <h1 className="text-secondary">{label}</h1>
        </div>
    );
};

export default NotExit;
