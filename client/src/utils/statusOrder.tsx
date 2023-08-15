import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PhonePausedIcon from '@mui/icons-material/PhonePaused';
import { IOrderItem } from '../interfaces/interfaces';

export const statusOrder = (order: IOrderItem) => {
    const { is_confirm_delivery, is_canceled, is_delivering, is_success,is_confirm } = order;
    if (is_delivering && is_success) {
        return {
            title: 'Giao hàng thành công',
            icon: <CheckIcon style={{ fontSize: '15px', color: 'rgb(0 136 72)' }} />,
        };
    } else if (is_confirm_delivery && !is_delivering) {
        return {
            title: 'Đang giao hàng',
            icon: <DeliveryDiningIcon style={{ fontSize: '15px', color: 'rgb(0 136 72)' }} />,
        };
    } else if (is_confirm&&!is_confirm_delivery) {
        return {
            title: 'Đợi vận chuyển',
            icon: <DeliveryDiningIcon style={{ fontSize: '15px', color: 'rgb(0 136 72)' }} />,
        };
    } else if (!is_confirm) {
        return {
            title: 'Đang chờ xác nhận',
            icon: <PhonePausedIcon style={{ fontSize: '15px', color: 'rgb(0 136 72)' }} />,
        };
    } else if (is_canceled) {
        return {
            title: 'Đã hủy',
            icon: <CancelIcon style={{ fontSize: '15px', color: 'rgb(0 136 72)' }} />,
        };
    }
};
