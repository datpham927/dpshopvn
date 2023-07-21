import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PhonePausedIcon from '@mui/icons-material/PhonePaused';
import { IOrderItem } from '../interfaces/interfaces';

export const statusOrder = (order: IOrderItem) => {
    const { isConfirmDelivery, delivery, isCanceled, isConfirm, isDelivering, isSuccess } = order;
    if (isConfirmDelivery && isConfirm && isDelivering && isSuccess && !isCanceled) {
        return {
            title: 'Giao hàng thành công',
            icon: <CheckIcon style={{ fontSize: '15px', color: 'rgb(0 136 72)' }} />,
        };
    } else if (isConfirmDelivery && isConfirm && !isDelivering && !isCanceled) {
        return {
            title: 'Đang giao hàng',
            icon: <DeliveryDiningIcon style={{ fontSize: '15px', color: 'rgb(0 136 72)' }} />,
        };
    } else if (!isConfirmDelivery && isConfirm && !isCanceled) {
        return {
            title: 'Đợi vận chuyển',
            icon: <DeliveryDiningIcon style={{ fontSize: '15px', color: 'rgb(0 136 72)' }} />,
        };
    } else if (!isConfirm && !isConfirmDelivery && !isCanceled) {
        return {
            title: 'Đang chờ xác nhận',
            icon: <PhonePausedIcon style={{ fontSize: '15px', color: 'rgb(0 136 72)' }} />,
        };
    } else if (isCanceled) {
        return {
            title: 'Đã hủy',
            icon: <CancelIcon style={{ fontSize: '15px', color: 'rgb(0 136 72)' }} />,
        };
    }
};
