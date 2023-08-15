import { axiosJWT } from '../utils/httpRequest';

const apiCreateNotification = async (body: object) => {
    try {
        const res = await axiosJWT.post('notification/create', body);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const apiGetNotification = async () => {
    try {
        const res = await axiosJWT.get('notification/get_all_notification');
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const apiIsWatched = async () => {
    try {
        const res = await axiosJWT.put('notification/is_watched');
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

export { apiCreateNotification, apiGetNotification,apiIsWatched };
