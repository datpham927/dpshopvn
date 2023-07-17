import { axiosJWT } from '../utils/httpRequest';

const setCreateOrder = async (body: any) => {
    try {
        const res = await axiosJWT.post('order/add', body);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const getAllOrdersBought = async () => {
    try {
        const res = await axiosJWT.get('order/all_order_bought');
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

export { setCreateOrder, getAllOrdersBought };
