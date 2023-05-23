import { httpRequest } from '../utils/httpRequest';

const apiSendEmail = async (email:string) => {
    try {
        const res = await httpRequest.put('auth/verify/token',{email});
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};

const apiConfirmEmail = async (email:string,token:string) => {
    try {
        const res = await httpRequest.put('auth/confirm',{token,email});
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};

const apiRegister = async (email:string,password:string) => {
    try {
        const res = await httpRequest.put('auth/register',{email,password});
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};

const apiLogin = async (email:string,password:string) => {
    try {
        const res = await httpRequest.post('auth/login',{email,password});
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};
const sendMailForgot = async () => {
    try {
        const res = await httpRequest.put('auth/send_email');
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};
const resetPassword = async (token:string,password:string) => {
    try {
        const res = await httpRequest.put(`auth/${token}/reset_password`,{password});
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};

const apiLogout = async () => {
    try {
        const res = await httpRequest.post('auth/logout');
        return res.data;
    } catch (error) {
        return {
            success:false,
            message:error
        }
    }
};
export { apiSendEmail,apiConfirmEmail ,apiRegister,apiLogin,sendMailForgot,resetPassword,apiLogout};
