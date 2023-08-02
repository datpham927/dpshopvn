import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { OrderItem, showNotification } from '../../../../component';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import NotOrder from '../../../../component/common/NotOrder';
import { IOrderItem } from '../../../../interfaces/interfaces';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { statusOrder } from '../../../../utils/statusOrder';
import { formatMoney } from '../../../../utils/formatMoney';
import { setApiIsConfirm, setApiIsDeliver, setApiIsSuccess } from '../../../../services/apiOrder';
import {
    setIsConfirm,
    setIsDelivering,
    setIsSuccess,
    setLoadDataOrderSold,
} from '../../../../redux/features/orderSold/orderSoldSlice';
import { Link } from 'react-router-dom';
import { path } from '../../../../utils/const';

const RenderUi: React.FC<{ orders: IOrderItem[]; tab: number }> = ({ orders, tab }) => {
    const dispatch = useAppDispatch();
    const handleConfirm = async (oid: string) => {
        const userConfirmed = confirm('Bạn muốn xác nhận đơn hàng?');
        if (userConfirmed) {
            try {
                let res;
                switch (tab) {
                    case 2:
                        res = await setApiIsConfirm(oid);
                        dispatch(setIsConfirm({ _id: oid }));
                        break;
                    case 3:
                        res = await setApiIsDeliver(oid);
                        dispatch(setIsDelivering({ _id: oid }));
                        break;
                    case 4:
                        res = await setApiIsSuccess(oid);
                        dispatch(setIsSuccess({ _id: oid }));
                        break;
                    default:
                        throw new Error('Invalid tab value');
                }
                dispatch(setLoadDataOrderSold());
                if (res.success) {
                    showNotification('Xác nhận thành công', true);
                } else {
                    showNotification('Xác nhận không thành công', false);
                }
            } catch (error) {
                // Handle errors, if any
                console.error(error);
                showNotification('Có lỗi xảy ra', false);
            }
        }
    };


    return (
        <div className="flex flex-col w-full h-full pt-5 gap-6">
            {orders.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Mã đơn hàng</TableCell>
                                <TableCell align="center">Trạng thái</TableCell>
                                <TableCell align="center">Tên hàng/Số lượng</TableCell>
                                <TableCell align="center">Khách hàng phải trả</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={order._id.slice(-10)}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center" sx={{ textTransform: 'uppercase' }}>
                                        <span className="text-primary text-sm">#{order._id.slice(-10)}</span>
                                    </TableCell>
                                    <TableCell align="center">{statusOrder(order)?.title}</TableCell>
                                    <TableCell align="left">
                                        {order.products.map((p) => (
                                            <p className="text-xs">
                                                {p.title}
                                                <span className="text-primary">
                                                    <CloseIcon
                                                        fontSize="small"
                                                        style={{ fontSize: '13px', color: 'rgb(0 136 72)' }}
                                                    />
                                                    {p.quantity}
                                                </span>
                                            </p>
                                        ))}
                                    </TableCell>
                                    <TableCell align="center">{formatMoney(order.totalPrice)}</TableCell>
                                    <TableCell align="center" sx={{ minWidth: '150px' }}>
                                        {![1, 5, 6]?.includes(tab) && (
                                            <p
                                                className="text-sm text-primary underline cursor-pointer"
                                                onClick={() => handleConfirm(order._id)}
                                            >
                                                Xác nhận
                                            </p>
                                        )}
                                        <Link
                                            to={`${path.PAGE_USER}/view/${order._id}`}
                                            className="text-sm text-primary underline cursor-pointer"
                                        >
                                            Xem chi tiết
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <NotOrder />
            )}
        </div>
    );
};

export default RenderUi;
