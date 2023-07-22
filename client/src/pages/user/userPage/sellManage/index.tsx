import React, { useEffect, useState } from 'react';
import { setIsLoading } from '../../../../redux/features/action/actionSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getAllOrderBeenBought } from '../../../../services/apiOrder';
import RenderUi from './RenderUI';
import { setAllOrdersSold, setLoadDataOrderSold } from '../../../../redux/features/orderSold/orderSoldSlice';
import { IOrderItem } from '../../../../interfaces/interfaces';

const SellManage: React.FC = () => {
    const {
        allOrdersSold,
        allOrdersSold_delivery,
        allOrdersSold_isCanceled,
        allOrdersSold_isConfirm,
        allOrdersSold_isDelivering,
        allOrdersSold_isSuccess,
    } = useAppSelector((state) => state.orderSold);
    const SELL_TAB = [
        {
            tab: 1,
            title: 'Tất cả',
            quantity:allOrdersSold.length
        },
        {
            tab: 2,
            title: 'Chờ xác nhận',
            quantity:allOrdersSold_isConfirm.length
        },
        {
            tab: 3,
            title: 'Vận Chuyển',
            quantity:allOrdersSold_delivery.length
        },
        {
            tab: 4,
            title: 'Đã giao hàng',
            quantity:allOrdersSold_isDelivering.length
        },
        {
            tab: 5,
            title: 'Thành công',
            quantity:allOrdersSold_isSuccess.length
        },
        {
            tab: 6,
            title: 'Đã hủy',
            quantity:allOrdersSold_isCanceled.length
        },
    ];
    const [orders, setOrders] = useState<IOrderItem[]>([]);
    const [displayTab, setDisplayTab] = useState<number>(1);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllOrderBeenBought();
            dispatch(setIsLoading(false));
            if (res.data && res.success) {
                dispatch(setAllOrdersSold(res.data));
                dispatch(setLoadDataOrderSold());
            }
        };
        fetchApi();
    }, []);
    useEffect(() => {
        switch (displayTab) {
            case 1:
                setOrders(allOrdersSold);
                break;
            case 2:
                setOrders(allOrdersSold_isConfirm);
                break;
            case 3:
                setOrders(allOrdersSold_delivery);
                break;
            case 4:
                setOrders(allOrdersSold_isDelivering);
                break;
            case 5:
                setOrders(allOrdersSold_isSuccess);
                break;
            case 6:
                setOrders(allOrdersSold_isCanceled);
                break;
        }

    }, [displayTab, allOrdersSold, allOrdersSold_isConfirm, allOrdersSold_delivery, allOrdersSold_isDelivering, allOrdersSold_isSuccess, allOrdersSold_isCanceled]);
    return (
        <div className="w-full h-full">
            <div className="w-full sticky top-0 grid grid-cols-6 bg-white rounded-sm overflow-hidden">
                {SELL_TAB.map((e) => (
                    <div
                        className={`flex sticky top-0 w-full justify-center text-sm  items-center py-2 border-b-[2px] border-solid cursor-pointer ${
                            displayTab === e.tab ? 'text-primary border-primary' : 'text-secondary border-transparent'
                        }`}
                        onClick={() => setDisplayTab(e.tab)}
                    >
                        {e.title}({e.quantity})
                    </div>
                ))}
            </div>
            <RenderUi orders={orders} tab={displayTab} />
        </div>
    );
};

export default SellManage;
