import React from 'react';
import { OrderItem } from '../../../../component';
import NotExit from '../../../../component/common/NotExit';
import { IOrderItem } from '../../../../interfaces/interfaces';

const RenderUi: React.FC<{ orders: IOrderItem[]}> = ({ orders}) => {
    return (
        <div className="flex flex-col  tablet:bg-white w-full h-full pt-5 gap-6">
            {orders.length > 0 ? orders.map((order) => <OrderItem order={order} />) : <NotExit />}
        </div>
    );
};

export default RenderUi;
