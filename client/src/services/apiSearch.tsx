import { httpRequest ,axiosJWT} from '../utils/httpRequest';

const addSearchHistory = async (text: string) => {
    try {
        const res = await axiosJWT.post('search/add', { text });
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};

const getSearchHistories = async () => {
    try {
        const res = await axiosJWT.get('search/all_histories');
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};
const deleteSearchHistory = async (id: string) => {
    try {
        const res = await axiosJWT.delete(`search/${id}/update`);
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};
// ----------------------

const getSuggestResult = async (title: string) => {
    try {
        const res = await httpRequest.get('search/suggest', {
            params: {
                title,
            },
        });
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};

export { addSearchHistory, getSearchHistories, getSuggestResult ,deleteSearchHistory};
