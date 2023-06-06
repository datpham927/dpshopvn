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
export { getAllReviewsById, apiUnlikeComment, apiLikeProduct };
