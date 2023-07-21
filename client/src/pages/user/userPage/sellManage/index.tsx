import React, { useEffect, useState } from 'react';
import { PURCHASE_TAB, SELL_TAB } from '../../../../utils/const';
import { setIsLoading } from '../../../../redux/features/action/actionSlice';
import { useAppDispatch } from '../../../../redux/hooks';
import { getAllOrderBeenBought } from '../../../../services/apiOrder';
import RenderUi from './RenderUI';
import { setAllOrdersSold, setLoadDataOrderSold } from '../../../../redux/features/orderSold/orderSoldSlice';

const SellManage: React.FC = () => {
    const [displayTab, setDisplayTab] = useState<number>(1);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchApi = async () => {
            dispatch(setIsLoading(true));
            const res = await getAllOrderBeenBought();
            if (res.data && res.success) {
                dispatch(setAllOrdersSold(res.data));
                dispatch(setLoadDataOrderSold());
            }
            dispatch(setIsLoading(false));
        };
        fetchApi();
    }, []);

    return (
        <div className="w-full h-full">
            <h2 className="my-4 text-xl">Quản lý bán hàng</h2>
            <div className="w-full sticky top-0 grid grid-cols-5 bg-white rounded-sm overflow-hidden">
                {SELL_TAB.map((e) => (
                    <div
                        className={`flex sticky top-0 w-full justify-center  items-center py-2 border-b-[2px] border-solid cursor-pointer ${
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

export default SellManage;
