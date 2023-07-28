import { ProductDetail } from '../interfaces/interfaces';
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

const getAllProductUser = async (params?: object) => {
    try {
        const res = await axiosJWT.get('product/all_by_user', {
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

const apiGetAllBrandByCategory = async (params?: object) => {
    try {
        const res = await httpRequest.get(`product/brands`, {
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

const apiCreateProduct = async (data?: object) => {
    try {
        const res = await axiosJWT.post(`product/add_to_product`, data);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const apiDeleteProduct = async (pid: string) => {
    try {
        const res = await axiosJWT.delete(`product/${pid}/delete`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const apiUpdateProduct = async (data: ProductDetail) => {
    try {
        const res = await axiosJWT.put(`product/${data._id}/update`,data);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

export {
    getAllProduct,
    getAllProductUser,
    apiProductDetail,
    apiUpdateRatingProduct,
    apiGetAllBrandByCategory,
    getAllProductFollowings,
    apiCreateProduct,
    apiDeleteProduct,
    apiUpdateProduct,
};
