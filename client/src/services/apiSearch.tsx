import { httpRequest } from '../utils/httpRequest';

const addSearchHistory = async (text: string) => {
    try {
        const res = await httpRequest.post('search/add', { text });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const getSearchHistories = async () => {
    try {
        const res = await httpRequest.get('search/all_histories');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export { addSearchHistory, getSearchHistories };
