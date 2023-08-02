import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDetailOrder } from '../../../../services/apiOrder';
import { IOrderItem } from '../../../../interfaces/interfaces';
import moment from 'moment';
import { formatMoney } from '../../../../utils/formatMoney';
import { PAYMENT_METHOD, path } from '../../../../utils/const';
import { OrderItem, ProductInCartItem, SkeletonViewOrder } from '../../../../component';
import { statusOrder } from '../../../../utils/statusOrder';
import { Skeleton } from '@mui/material';

const ViewOrder: React.FC = () => {
    const param = useParams();
    const [detailOrder, setDetailOrder] = useState<IOrderItem>();

    useEffect(() => {
        const fetchApiDetailOrder = async () => {
            const res = await getDetailOrder(param.oid);
            res.success && setDetailOrder(res.data);
        };
        fetchApiDetailOrder();
    }, [param.oid]);
    return (
        <>
            {detailOrder ? (
                <div className="w-full ">
                    <div className="flex flex-col gap-1 w-full">
                        <p className="text-xl text-secondary">
                            Chi tiết đơn hàng #
                            <span className="uppercase text-primary">{detailOrder?._id.slice(-10)}</span>
                        </p>
                        <p className="text-sm">
                            Trạng thái: <span className="text-primary">{statusOrder(detailOrder)?.title}</span>
                        </p>
                        <p className="text-sm">
                            Ngày đặt hàng:{moment(detailOrder?.createdAt).format('dddd, DD/MM/YYYY')}
                        </p>
                    </div>
                    <div className="w-full  grid grid-cols-3 my-6 gap-4">
                        <div className="flex flex-col gap-2 w-full ">
                            <h2 className="text-sm uppercase text-secondary">Địa chỉ người nhận</h2>
                            <div className=" p-2 rounded-md bg-white min-h-[100px]">
                                <p className="text-base font-medium">{detailOrder?.shippingAddress.fullName}</p>
                                <p className="text-sm text-secondary">
                                    Địa chỉ:
                                    {detailOrder?.shippingAddress?.district +
                                        ', ' +
                                        detailOrder?.shippingAddress?.village +
                                        ', ' +
                                        detailOrder?.shippingAddress?.city}
                                </p>
                                <p className="text-sm text-secondary">
                                    Điện thoại: {detailOrder?.shippingAddress.phone}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 ">
                            <h2 className="text-sm uppercase text-secondary">Hình thức giao hàng</h2>
                            <div className=" p-2 rounded-md bg-white min-h-[100px]">
                                <p className="text-sm text-secondary">
                                    Giao vào {moment(Number(detailOrder?.dateShipping)).format('dddd, DD/MM')}
                                </p>
                                <p className="text-sm text-secondary">
                                    Phí vận chuyển {formatMoney(Number(detailOrder?.shippingPrice))}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="text-sm uppercase text-secondary">Hình thức thanh toán</h2>
                            <div className=" p-2 rounded-md bg-white min-h-[100px]">
                                <p className="text-sm text-secondary">
                                    {PAYMENT_METHOD?.method?.find((e) => e.code === detailOrder?.paymentMethod)?.label}
                                </p>
                            </div>
                        </div>
                    </div>

                    {detailOrder && <OrderItem order={detailOrder} view={true} />}

                    <div className="my-3">
                        <Link className="text-sm text-primary" to={`${path.PAGE_USER}/purchase`}>
                            {'<< Quay lại đơn hàng của tôi'}
                        </Link>
                    </div>
                </div>
            ) : (
                 <SkeletonViewOrder/>
            )}
        </>
    );
};

export default ViewOrder;
