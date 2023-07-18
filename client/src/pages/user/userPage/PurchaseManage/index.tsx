import React, { useEffect, useState } from 'react';
import { PURCHASE_TAB } from '../../../../utils/const';
import { setIsLoading } from '../../../../redux/features/action/actionSlice';
import { useAppDispatch } from '../../../../redux/hooks';
import { getAllOrdersBought } from '../../../../services/apiOrder';
import { setAllOrdersBought } from '../../../../redux/features/orderBought/orderBoughtSlice';
import RenderUi from './RenderUI';

const PurchaseManage: React.FC = () => {
    const [displayTab, setDisplayTab] = useState<number>(1);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchApi = async () => {
            dispatch(setIsLoading(true));
            const res = await getAllOrdersBought();
            if (res.data && res.success) {
                dispatch(setAllOrdersBought(res.data));
            }
            dispatch(setIsLoading(false));
        };
        fetchApi();
    }, []);

    return (
        <div className="w-full h-full">
            <h2 className="my-4 text-xl">Đơn hàng Của Tôi</h2>
            <div className="w-full grid grid-cols-6 bg-white rounded-sm overflow-hidden">
                {PURCHASE_TAB.map((e) => (
                    <div
                        className={`flex w-full justify-center items-center py-2 border-b-[2px] border-solid cursor-pointer ${
                            displayTab === e.tab ? 'text-primary border-primary' : 'text-secondary border-transparent'
                        }`}
                        onClick={() => setDisplayTab(e.tab)}
                    >
                        {e.title}
                    </div>
                ))}
            </div>
            <RenderUi tab={displayTab} />
        </div>
    );
};

export default PurchaseManage;
