import { httpRequest } from '../utils/httpRequest';

const getCategories = async () => {
    try {
        const res = await httpRequest.get('category/all_category');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export { getCategories };
