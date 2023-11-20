import React, { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import { setIsLoading } from '../../../../redux/features/action/actionSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getAllOrdersBought } from '../../../../services/apiOrder';
import { setAllOrdersBought, setLoadDataOrder } from '../../../../redux/features/orderBought/orderBoughtSlice';
import RenderUi from './RenderUI';
import { IOrderItem } from '../../../../interfaces/interfaces';
import { path } from '../../../../utils/const';

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
            quantity: allOrdersBought?.length,
        },
        {
            tab: 2,
            title: 'Chờ xác nhận',
            quantity: allOrdersBought_isConfirm?.length,
        },
        {
            tab: 3,
            title: 'Vận Chuyển',
            quantity: allOrdersBought_delivery?.length,
        },
        {
            tab: 4,
            title: 'Đang giao',
            quantity: allOrdersBought_isDelivering?.length,
        },
        {
            tab: 5,
            title: 'Hoàn thành',
            quantity: allOrdersBought_isSuccess?.length,
        },
        {
            tab: 6,
            title: 'Đã hủy',
            quantity: allOrdersBought_isCanceled?.length,
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
            dispatch(setIsLoading(true));
            const res = await getAllOrdersBought();
            dispatch(setIsLoading(false));
            if (res.data && res.success) {
                dispatch(setAllOrdersBought(res.data));
                dispatch(setLoadDataOrder());
            }
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="fixed-mobile w-full h-full bg-background_primary  tablet:overflow-y-scroll">
            <Link to={`${path.PAGE_USER}`} className=" absolute top-2 left-4 text-secondary laptop:hidden ">
                <ChevronLeftIcon fontSize="large" />
            </Link>
            <h1 className=" py-3 text-center  text-1xl text-primary laptop:hidden bg-white ">Danh sách đơn hàng</h1>
            <div className="tablet:flex tablet:overflow-x-auto w-full sticky top-0 laptop:grid laptop:grid-cols-6 bg-white rounded-sm overflow-hidden">
                {PURCHASE_TAB.map((e) => (
                    <div
                        className={`flex tablet:w-4/12 shrink-0 laptop:w-full justify-center text-sm  items-center py-3 border-b-[2px] border-solid cursor-pointer ${
                            displayTab === e.tab ? 'text-primary border-primary' : 'text-secondary border-transparent'
                        }`}
                        onClick={() => setDisplayTab(e.tab)}
                    >
                        {e.title}({e.quantity})
                    </div>
                ))}
            </div>
            <RenderUi orders={orders} />
        </div>
    );
};

export default PurchaseManage;
