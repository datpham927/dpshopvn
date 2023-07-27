import React from 'react';
import { OrderItem } from '../../../../component';
import NotOrder from '../../../../component/common/NotOrder';
import { IOrderItem } from '../../../../interfaces/interfaces';

const RenderUi: React.FC<{ orders: IOrderItem[]}> = ({ orders}) => {
    return (
        <div className="flex flex-col w-full h-full pt-5 gap-6">
            {orders.length > 0 ? orders.map((order) => <OrderItem order={order} />) : <NotOrder />}
        </div>
    );
};

export default RenderUi;
