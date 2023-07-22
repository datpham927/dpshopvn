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
// ---------------------------

const setCancelOrder = async (oid: string) => {
    try {
        const res = await axiosJWT.put(`order/${oid}/is_abort`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const setBuyOrder = async (oid: string) => {
    try {
        const res = await axiosJWT.put(`order/${oid}/is_buy`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const getDetailOrder = async (oid: any) => {
    try {
        const res = await axiosJWT.get(`order/view/${oid}`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
// ---------- sell manager-------------

const getAllOrderBeenBought = async () => {
    try {
        const res = await axiosJWT.get(`order/all_order_sold`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const setApiIsConfirm = async (oid: any) => {
    try {
        const res = await axiosJWT.put(`order/${oid}/is_confirm`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const setApiIsDeliver = async (oid: any) => {
    try {
        const res = await axiosJWT.put(`order/${oid}/confirm_delivery`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const setApiIsSuccess = async (oid: any) => {
    try {
        const res = await axiosJWT.put(`order/${oid}/is_success`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

export {
    setCreateOrder,
    getAllOrdersBought,
    setCancelOrder,
    setBuyOrder,
    getAllOrderBeenBought,
    getDetailOrder,
    setApiIsConfirm,
    setApiIsDeliver,
    setApiIsSuccess,
};
