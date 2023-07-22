import React, { useEffect, useState } from 'react';
import { setIsLoading } from '../../../../redux/features/action/actionSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getAllOrdersBought } from '../../../../services/apiOrder';
import { setAllOrdersBought, setLoadDataOrder } from '../../../../redux/features/orderBought/orderBoughtSlice';
import RenderUi from './RenderUI';
import { IOrderItem } from '../../../../interfaces/interfaces';

const PurchaseManage: React.FC = () => {
    const {
        allOrdersBought,
        allOrdersBought_isConfirm,
        allOrdersBought_delivery,
        allOrdersBought_isDelivering,
        allOrdersBought_isSuccess,
        allOrdersBought_isCanceled,
    } = useAppSelector((state) => state.orderBought);
    const PURCHASE_TAB = [
        {
            tab: 1,
            title: 'Tất cả',
            quantity: allOrdersBought.length,
        },
        {
            tab: 2,
            title: 'Chờ xác nhận',
            quantity: allOrdersBought_isConfirm.length,
        },
        {
            tab: 3,
            title: 'Vận Chuyển',
            quantity: allOrdersBought_delivery.length,
        },
        {
            tab: 4,
            title: 'Đang giao',
            quantity: allOrdersBought_isDelivering.length,
        },
        {
            tab: 5,
            title: 'Hoàn thành',
            quantity: allOrdersBought_isSuccess.length,
        },
        {
            tab: 6,
            title: 'Đã hủy',
            quantity: allOrdersBought_isCanceled.length,
        },
    ];
    const [displayTab, setDisplayTab] = useState<number>(1);
    const dispatch = useAppDispatch();
    const [orders, setOrders] = useState<IOrderItem[]>([]);

    useEffect(() => {
        switch (displayTab) {
            case 1: {
                setOrders(allOrdersBought);
                break;
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
    }, [displayTab, allOrdersBought]);

    useEffect(() => {
        const fetchApi = async () => {
            //dispatch(setIsLoading(true));
            const res = await getAllOrdersBought();
            if (res.data && res.success) {
                dispatch(setAllOrdersBought(res.data));
                dispatch(setLoadDataOrder());
            }
            dispatch(setIsLoading(false));
        };
        fetchApi();
    }, []);

    return (
        <div className="w-full h-full">
            <div className="w-full sticky top-0 grid grid-cols-6 bg-white rounded-sm overflow-hidden">
                {PURCHASE_TAB.map((e) => (
                    <div
                        className={`flex w-full justify-center text-sm  items-center py-3 border-b-[2px] border-solid cursor-pointer ${
                            displayTab === e.tab ? 'text-primary border-primary' : 'text-secondary border-transparent'
                        }`}
                        onClick={() => setDisplayTab(e.tab)}
                    >
                        {e.title}({e.quantity})
                    </div>
                ))}
            </div>
            <RenderUi tab={displayTab} orders={orders} />
        </div>
    );
};

export default PurchaseManage;
