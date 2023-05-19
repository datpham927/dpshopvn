import { httpRequest } from '../utils/httpRequest';

const getAllProduct = async (params:object) => {
    try {
        const res = await httpRequest.get('product/all',{
            params
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export { getAllProduct };
