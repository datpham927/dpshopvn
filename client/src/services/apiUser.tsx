import { axiosJWT } from '../utils/httpRequest';

const apiGetDetailUser = async () => {
    try {
        const res = await axiosJWT.get('user/user_detail');
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const apiGetDetailShop = async (sid:any) => {
    try {
        const res = await axiosJWT.get(`user/${sid}/shop_detail`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const apiFollowingUser = async (userId: any) => {
    try {
        const res = await axiosJWT.post(`user/${userId}/follow`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const apiUnFollowingUser = async (userId: any) => {
    try {
        const res = await axiosJWT.put(`user/${userId}/unfollow`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
export { apiGetDetailUser, apiFollowingUser ,apiUnFollowingUser,apiGetDetailShop};
