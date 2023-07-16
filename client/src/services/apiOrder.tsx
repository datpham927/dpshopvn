import { axiosJWT } from "../utils/httpRequest";

const setCreateOrder = async (body:any) => {
    try {
        const res = await axiosJWT.post('order/add',body);
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};

export { setCreateOrder };
