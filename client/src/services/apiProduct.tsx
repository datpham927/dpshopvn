import { axiosJWT, httpRequest } from '../utils/httpRequest';

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
const getAllProductFollowings = async (params?: object) => {
    try {
        const res = await axiosJWT.get('product/following', {
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

const apiGetAllBrandByCategory = async (params: object) => {
    try {
        const res = await httpRequest.get(`product/brands`,  {
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

export { getAllProduct, apiProductDetail, apiUpdateRatingProduct, apiGetAllBrandByCategory ,getAllProductFollowings};
