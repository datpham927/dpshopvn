import React, { useEffect, useState } from 'react';
import { OrderItem } from '../../../../component';
import { useAppSelector } from '../../../../redux/hooks';
import NotOrder from '../../../../component/notOrder';
import { IOrderItem } from '../../../../interfaces/interfaces';

const RenderUi: React.FC<{ tab: number }> = ({ tab }) => {
    const {
        allOrdersSold,
        allOrdersSold_delivery,
        allOrdersSold_isCanceled,
        allOrdersSold_isConfirm,
        allOrdersSold_isDelivering,
        allOrdersSold_isSuccess,
    } = useAppSelector((state) => state.orderSold);

    const [orders, setOrders] = useState<IOrderItem[]>([]);

    useEffect(() => {
        switch (tab) {
            case 1: {
                setOrders(allOrdersSold);
                break;
            }
            case 2: {
                setOrders(allOrdersSold_isConfirm);
                break;
            }
            case 3: {
                setOrders(allOrdersSold_delivery);
                break;
            }
            case 4: {
                setOrders(allOrdersSold_isDelivering);
                break;
            }
            case 5: {
                setOrders(allOrdersSold_isSuccess);
                break;
            }
            case 6: {
                setOrders(allOrdersSold_isCanceled);
                break;
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab, allOrdersSold]);

    return (
        <div className="flex flex-col w-full h-full py-5 gap-6">
            {orders.length > 0 ? orders.map((order) => <OrderItem order={order} />) : <NotOrder />}
        </div>
    );
};

export default RenderUi;
