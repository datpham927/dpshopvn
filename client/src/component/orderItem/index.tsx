import React from 'react';
import moment from 'moment';
import StoreIcon from '@mui/icons-material/Store';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatUserName } from '../../utils/formatUserName';
import { formatMoney } from '../../utils/formatMoney';
import { IOrderItem } from '../../interfaces/interfaces';
import { statusOrder } from '../../utils/statusOrder';
import ButtonOutline from '../buttonOutline';
import { setCancelOrder } from '../../services/apiOrder';
const OrderItem: React.FC<{ order: IOrderItem }> = ({ order }) => {
    const handleCancelOrder = async (oid: string) => {
        const res = await setCancelOrder(oid);
        console.log(res);
    };

    return (
        <div className="flex flex-col  py-3 px-4 bg-white rounded-md overflow-hidden">
            <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                    <AccessTimeIcon style={{ fontSize: '15px', color: 'rgb(0 136 72)' }} />
                    <p className="text-primary text-sm font-medium">
                        Giao vào {moment(Number(order.dateShipping)).format('dddd, DD/MM/YYYY')}
                    </p>
                </div>
                <div className="flex gap-1 items-center">
                    {statusOrder(order)?.icon}
                    <p className="text-sm ">{statusOrder(order)?.title}</p>
                </div>
            </div>
            <div className="my-6">
                {order?.products.map((p) => (
                    <div className="flex w-full h-auto border-solid  border-b-[1px] border-separate py-3 px-4">
                        <div className="w-[80px] h-[80px] mr-3 p-1 border-solid border-[1px] border-bgSecondary rounded-md overflow-hidden">
                            <img className="w-full h-full object-cover" src={p.image_url} alt={p.title} />
                        </div>
                        <div className="w-2/3 flex flex-col gap-2 truncate">
                            <h2>{p.title}</h2>
                            <div className="flex gap-1 items-center">
                                <StoreIcon fontSize="small" style={{ color: 'rgb(128 128 137)' }} />
                                <p className="text-sm text-secondary">{formatUserName(order.user)}</p>
                            </div>
                            <div className="flex gap-1 items-center text-sm text-secondary">
                                <CloseIcon style={{ fontSize: '12px', color: 'rgb(128 128 137)' }} />
                                {p.quantity}
                            </div>
                        </div>
                        <div className="flex justify-end flex-1 text-primary">{formatMoney(p.newPrice)}</div>
                    </div>
                ))}
            </div>
            <div className="flex w-full h-full justify-end">
                <div className="text-xl text-secondary">
                    Tổng tiền: <span className="text-red_custom">{formatMoney(order.totalPrice)}</span>
                </div>
            </div>
            <div className="flex justify-end mt-2">
                <ButtonOutline onClick={() => handleCancelOrder(order._id)}>Hủy đơn hàng</ButtonOutline>
            </div>
        </div>
    );
};

export default OrderItem;
