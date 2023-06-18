import { httpRequest } from '../utils/httpRequest';

const getAllProduct = async (params: object) => {
    try {
        const res = await httpRequest.get('product/all', {
            params,
        });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const apiProductDetail = async (pid: string) => {
    try {
        const res = await httpRequest.get(`product/${pid}/detail`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const apiUpdateRatingProduct = async (pid: string, rating: number) => {
    try {
        const res = await httpRequest.put(`product/${pid}/update_rating`, { rating });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};


const apiGetAllBrandByCategory = async (cid:any) => {
    try {
        const res = await httpRequest.get(`product/${cid}/brand`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

export { getAllProduct, apiProductDetail, apiUpdateRatingProduct ,apiGetAllBrandByCategory};
