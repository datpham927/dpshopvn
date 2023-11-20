import React, { useEffect, useState } from 'react';
import { setIsLoading } from '../../../../redux/features/action/actionSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getAllOrderBeenBought } from '../../../../services/apiOrder';
import RenderUi from './RenderUI';
import { setAllOrdersSold, setLoadDataOrderSold } from '../../../../redux/features/orderSold/orderSoldSlice';
import { IOrderItem } from '../../../../interfaces/interfaces';
import * as XLSX from 'xlsx';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { statusOrder } from '../../../../utils/statusOrder';
import { formatMoney } from '../../../../utils/formatMoney';
import ButtonOutline from '../../../../component/buttonOutline';
import { showNotification } from '../../../../component';
import { Link } from 'react-router-dom';
import { path } from '../../../../utils/const';

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
            quantity: allOrdersSold?.length,
        },
        {
            tab: 2,
            title: 'Chờ xác nhận',
            quantity: allOrdersSold_isConfirm?.length,
        },
        {
            tab: 3,
            title: 'Vận Chuyển',
            quantity: allOrdersSold_delivery?.length,
        },
        {
            tab: 4,
            title: 'Đã giao hàng',
            quantity: allOrdersSold_isDelivering?.length,
        },
        {
            tab: 5,
            title: 'Thành công',
            quantity: allOrdersSold_isSuccess?.length,
        },
        {
            tab: 6,
            title: 'Đã hủy',
            quantity: allOrdersSold_isCanceled?.length,
        },
    ];
    const [orders, setOrders] = useState<IOrderItem[]>([]);
    const [displayTab, setDisplayTab] = useState<number>(1);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchApi = async () => {
            dispatch(setIsLoading(true));
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
    }, [
        displayTab,
        allOrdersSold,
        allOrdersSold_isConfirm,
        allOrdersSold_delivery,
        allOrdersSold_isDelivering,
        allOrdersSold_isSuccess,
        allOrdersSold_isCanceled,
    ]);

    const handleExportFile = () => {
        if (!confirm('Bạn có muốn xuất đơn hàng không?')) return;
        const wb = XLSX.utils.book_new();
        const products = orders.map((or) => {
            const titleProducts = or.products.map((p) => {
                return `${p.title} - số lượng ${p.quantity}`;
            });
            return {
                'Mã hàng': or._id.slice(-10).toUpperCase(),
                'Tên khách hàng': or.shippingAddress.fullName,
                'Địa chỉ nhận hàng': or.shippingAddress.detailAddress,
                'Số điện thoại': or.shippingAddress.phone,
                'Trạng thái': statusOrder(or)?.title,
                'Tên hàng/số lượng': titleProducts.join(', '),
                'Tổng tiền': formatMoney(or.totalPrice),
            };
        });
        const ws = XLSX.utils.json_to_sheet(products);
        XLSX.utils.book_append_sheet(wb, ws, 'ssss');
        XLSX.writeFile(wb, 'test.xlsx');
        showNotification('Không có đơn hàng nào!', true);
    };
    return (
        <div className="fixed-mobile w-full h-full bg-white overflow-y-scroll  tablet:overflow-y-scroll">
            <Link to={`${path.PAGE_USER}`} className=" absolute top-2 left-4 text-secondary laptop:hidden ">
                <ChevronLeftIcon fontSize="large" />
            </Link>
            <h1 className=" my-3 text-center  text-1xl text-primary laptop:hidden ">Quản lý bán hàng</h1>
            <div className="tablet:flex   tablet:bg-white  laptop:w-full sticky top-0 grid grid-cols-6 bg-white rounded-sm overflow-hidden">
                {SELL_TAB.map((e) => (
                    <div
                        className={`flex tablet:w-4/12 tablet:shrink-0  sticky top-0 laptop:w-full justify-center text-sm py-3 items-center py-2 border-b-[2px] border-solid cursor-pointer ${
                            displayTab === e.tab ? 'text-primary border-primary' : 'text-secondary border-transparent'
                        }`}
                        onClick={() => setDisplayTab(e.tab)}
                    >
                        {e.title}({e.quantity})
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-5 w-full">
                <RenderUi orders={orders} tab={displayTab} />
                {orders?.length > 0 && (
                    <ButtonOutline onClick={handleExportFile} className="mx-auto">
                        Xuất đơn hàng
                    </ButtonOutline>
                )}
            </div>
        </div>
    );
};

export default SellManage;
