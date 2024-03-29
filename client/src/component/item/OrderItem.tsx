import React from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import StoreIcon from '@mui/icons-material/Store';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatUserName } from '../../utils/formatUserName';
import { formatMoney } from '../../utils/formatMoney';
import { IOrderItem } from '../../interfaces/interfaces';
import { statusOrder } from '../../utils/statusOrder';
import ButtonOutline from '../buttonOutline';
import { setBuyOrder, setCancelOrder } from '../../services/apiOrder';
import { showNotification } from '..';
import { useAppDispatch } from '../../redux/hooks';
import {
    setBuyOrderRedux,
    setCancelOrderRedux,
    setLoadDataOrder,
} from '../../redux/features/orderBought/orderBoughtSlice';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../utils/const';
const OrderItem: React.FC<{ order: IOrderItem; view?: boolean }> = ({ order, view }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleCancelOrder = async (oid: string) => {
        if (confirm('Bạn có muốn hủy đơn hàng không?')) {
            const res = await setCancelOrder(oid);
            if (res.success) {
                dispatch(setCancelOrderRedux({ _id: oid }));
                dispatch(setLoadDataOrder());
                showNotification('Hủy thành công!', true);
            } else {
                showNotification('Hủy không thành công!', false);
            }
        }
    };
    const handleBuy = async (oid: string) => {
        if (confirm('Bạn có muốn mua lại không?')) {
            const res = await setBuyOrder(oid);
            if (res.success) {
                dispatch(setBuyOrderRedux({ _id: oid }));
                dispatch(setLoadDataOrder());
                showNotification('Mua thành công!', true);
            } else {
                showNotification('Mua không thành công!', false);
            }
        }
    };

    return (
        <div className="flex flex-col shrink-0 py-3 px-4 bg-white rounded-md overflow-hidden">
            <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                    <AccessTimeIcon style={{ fontSize: '15px', color: 'rgb(0 136 72)' }} />
                    <p className="text-primary text-sm font-medium">
                        Giao vào {moment(Number(order?.dateShipping)).format('dddd, DD/MM/YYYY')}
                    </p>
                </div>
                <div className="flex gap-1 items-center">
                    {statusOrder(order)?.icon}
                    <p className="text-sm ">{statusOrder(order)?.title}</p>
                </div>
            </div>
            <div className="my-6">
                {order?.products.map((p) => (
                    <Link
                        to={`/${p.slug}/${p._id}`}
                        key={uuidv4()}
                        className="flex w-full h-auto border-solid  border-b-[1px] border-separate py-3 px-4"
                    >
                        <div className="w-[70px] h-[70px] mr-3 p-1 border-solid border-[1px] border-bgSecondary rounded-md overflow-hidden">
                            <img className="w-full h-full object-cover" src={p?.image_url} alt={p?.title} />
                        </div>
                        <div className="tablet:w-auto w-2/3 flex flex-col gap-1 truncate">
                            <h2 className="text-sm">{p?.title}</h2>
                            <div className="flex gap-1 items-center">
                                {!view ? (
                                    <>
                                        <StoreIcon fontSize="small" style={{ color: 'rgb(128 128 137)' }} />
                                        <Link
                                            to={`/cua-hang/${formatUserName(order.shop)}/${order.shop._id}`}
                                            className="text-sm text-secondary"
                                        >
                                            {formatUserName(order?.shop)}
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-secondary">
                                            Giao đến: {order.shippingAddress.detailAddress}
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="flex gap-1 items-center text-sm text-secondary">
                                <CloseIcon style={{ fontSize: '12px', color: 'rgb(128 128 137)' }} />
                                {p?.quantity}
                            </div>
                        </div>
                        <div className="tablet:hidden flex justify-end flex-1 text-primary">{formatMoney(p?.new_price)}</div>
                    </Link>
                ))}
            </div>
            <div className="flex flex-col gap-2 w-full h-full">
                {view && (
                    <div className="flex text-sm text-secondary w-full h-full justify-end">
                        Phí vận chuyển
                        <span className="text-end text-secondary min-w-[100px]">
                            {formatMoney(order?.shippingPrice)}
                        </span>
                    </div>
                )}
                <div className="flex text-xl text-secondary w-full h-full justify-end gap-1">
                    Tổng tiền:
                    <span className="text-end text-red_custom min-w-[100px] ">{formatMoney(order?.totalPrice)}</span>
                </div>
            </div>
            {!view && (
                <div className="flex justify-end mt-2 gap-2">
                    {!order.is_success && (
                        <>
                            {order?.is_canceled ? (
                                <ButtonOutline onClick={() => handleBuy(order?._id)}>Mua lại đơn hàng</ButtonOutline>
                            ) : (
                                <ButtonOutline onClick={() => handleCancelOrder(order?._id)}>
                                    Hủy đơn hàng
                                </ButtonOutline>
                            )}
                        </>
                    )}

                    <ButtonOutline onClick={() => navigate(`${path.PAGE_USER}/view/${order?._id}`)}>
                        Xem chi tiết
                    </ButtonOutline>
                </div>
            )}
        </div>
    );
};

export default OrderItem;
