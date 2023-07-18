import React from 'react';
import { dogcute } from '../../assets';

const NotOrder: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-white py-4">
            <img className="w-1/6" src={dogcute} />
            <h1 className="text-secondary">Chưa có đơn hàng nào</h1>
        </div>
    );
};

export default NotOrder;
