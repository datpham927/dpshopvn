import { axiosJWT, httpRequest } from '../utils/httpRequest';

const getAllReviewsById = async (pid: string) => {
    try {
        const res = await httpRequest.get(`/reviews/get/${pid}`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const apiUnlikeComment = async (commentId: string) => {
    try {
        const res = await axiosJWT.put(`/reviews/${commentId}/unlike_comment`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const apiLikeProduct = async (commentId: string) => {
    try {
        const res = await axiosJWT.put(`/reviews/${commentId}/like_comment`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const apiPostComment= async (data:object,pid:string) => {
    try {
        const res = await axiosJWT.post(`/reviews/${pid}`,data);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const apiDeleteComment= async (cId:string) => {
    try {
        const res = await axiosJWT.delete(`/reviews/${cId}/delete_comment`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
export { getAllReviewsById, apiUnlikeComment, apiLikeProduct ,apiPostComment,apiDeleteComment};
