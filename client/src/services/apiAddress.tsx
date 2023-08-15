import axios from 'axios';

const getApiPublicProvince = async () => {
    try {
        const response = await axios.get('https://provinces.open-api.vn/api/p');
        return response.data;
    } catch (error) {
        return error;
    }
};

const getApiPublicDistrict = async (province_code: any) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/p/${province_code}?depth=2`);
        return response.data;
    } catch (error) {
        return error;
    }
};
const getApiPublicWards= async (districtId: any) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export { getApiPublicProvince, getApiPublicDistrict ,getApiPublicWards};
