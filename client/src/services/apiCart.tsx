import { axiosJWT } from "../utils/httpRequest";

const apiAddToCart = async (data:object) => {
    try {
        const res = await axiosJWT.put('cart/add_to_cart',data);
        return res.data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error,
        };
    }
};

const apiDeleteProductInCart = async (pid:string) => {
    try {
        const res = await axiosJWT.delete(`cart/${pid}/update`);
        return res.data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error,
        };
    }
};
const apiGetProductInCart = async () => {
    try {
        const res = await axiosJWT.get(`cart/products`);
        return res.data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error,
        };
    }
};
export {apiAddToCart,apiDeleteProductInCart,apiGetProductInCart}