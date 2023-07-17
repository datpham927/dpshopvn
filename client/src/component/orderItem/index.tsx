import moment from 'moment';
import StoreIcon from '@mui/icons-material/Store';
import CloseIcon from '@mui/icons-material/Close';
import { formatUserName } from '../../utils/formatUserName';
import { formatMoney } from '../../utils/formatMoney';
import React from 'react';
import { IOrderItem } from '../../interfaces/interfaces';

const OrderItem: React.FC<{ order: IOrderItem }> = ({ order }) => {
    return (
        <div className="flex flex-col gap-6 w-full h-full py-3 px-4 bg-white rounded-md overflow-hidden">
            <div>
                <div>
                    <p className="text-primary text-sm font-medium">
                        Giao vào {moment(Number(order.dateShipping)).format('dddd, DD/MM/YYYY')}
                    </p>
                </div>
                <div>
                    <p className="text-sm ">Đang vận chuyển</p>
                </div>
            </div>
            {order?.products.map((p) => (
                <div className="flex w-full h-full border-solid border-t-[1px]  border-b-[1px] border-separate py-3 px-4">
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
            <div className="flex w-full h-full justify-end">
                <div className="text-xl text-secondary">
                    Tổng tiền: <span className="text-red_custom">{formatMoney(order.totalPrice)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
