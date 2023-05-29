import { axiosJWT } from '../utils/httpRequest';

const apiGetDetailUser = async () => {
    try {
        const res = await axiosJWT.get('user/user_detail');
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};
 

export { apiGetDetailUser };
