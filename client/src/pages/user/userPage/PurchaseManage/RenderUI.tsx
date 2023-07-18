import React, { useEffect, useState } from 'react';
import { OrderItem } from '../../../../component';
import { useAppSelector } from '../../../../redux/hooks';
import { dogcute } from '../../../../assets';
import NotOrder from '../../../../component/notOrder';
import { IOrderItem } from '../../../../interfaces/interfaces';

const RenderUi: React.FC<{ tab: number }> = ({ tab }) => {
    const {
        allOrdersBought,
        allOrdersBought_isCanceled,
        allOrdersBought_isConfirm,
        allOrdersBought_delivery,
        allOrdersBought_isDelivering,
        allOrdersBought_isSuccess,
    } = useAppSelector((state) => state.orderBought);

    const [orders, setOrders] = useState<IOrderItem[]>([]);

    useEffect(() => {
        switch (tab) {
            case 1: {
                setOrders(allOrdersBought);break;
            }
            case 2: {
                setOrders(allOrdersBought_isConfirm);
                break;
            }
            case 3: {
                setOrders(allOrdersBought_delivery);
                break;
            }
            case 4: {
                setOrders(allOrdersBought_isDelivering);
                break;
            }
            case 5: {
                setOrders(allOrdersBought_isSuccess);
                break;
            }
            case 6: {
                setOrders(allOrdersBought_isCanceled);
                break;
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab, allOrdersBought]);

    return (
        <div className="flex flex-col w-full h-full py-5 gap-6">
            {orders.length > 0 ? orders.map((order) => <OrderItem order={order} />) : <NotOrder />}
        </div>
    );
};

export default RenderUi;
