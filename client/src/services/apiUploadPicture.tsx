import axios from 'axios';

export const apiUploadImage = async (data: any) => {
    try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_CLOUDINARY_CLOUD_NAME}/image/upload`,
            data,
        );
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
