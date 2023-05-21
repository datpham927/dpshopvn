import { httpRequest } from '../utils/httpRequest';

const apiSendEmail = async (email:string) => {
    try {
        const res = await httpRequest.put('auth/verify/token',{email});
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const apiConfirmEmail = async (email:string,token:string) => {
    try {
        const res = await httpRequest.put('auth/confirm',{token,email});
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const apiRegister = async (email:string,password:string) => {
    try {
        const res = await httpRequest.put('auth/register',{email,password});
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export { apiSendEmail,apiConfirmEmail ,apiRegister};
