import React, { useState } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import { setEmail } from '../../../../redux/features/auth/authSlice';
import { apiSendEmail } from '../../../../services/apiAuth';
import { setFeatureAuth } from '../../../../redux/features/action/actionSlice';
import { logoFb, logoGoogle } from '../../../../assets';



interface ModeRegister{
    setModeRegister:React.Dispatch<React.SetStateAction<number>>,
}
const sendMail: React.FC<ModeRegister> = (props) => {
    const {  setModeRegister } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [emailValue, setEmailValue] = useState<string>('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState<string>('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useAppDispatch();

    const handleSummit = async (e:  { preventDefault: () => void }) => {
        e.preventDefault();
        const emailRegex = /\b[A-Z0-9._%+-]+@gmail\.com\b/i;
        if (!emailValue) {
            setError('Email không được để trống!');
            return;
        }
        if (!emailRegex.test(emailValue)) {
            setError('Email không hợp lệ!');
            return;
        }
        const res = await apiSendEmail(emailValue);
        if (!res?.success) {
            setError('Tài khoản đã được đăng ký!');
            return;
        }
        setError('');
        setModeRegister(1);
        dispatch(setEmail(emailValue));
    };


    return  <div className="flex flex-col gap-2 w-4/6 p-10 ">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold">Tạo tại khoản </h1>
                    <p className="text-base">Vui lòng nhập địa chỉ gmail</p>
                </div>
                <form className="flex flex-col ">
                    <div className="border-b-[1px]  py-2">
                        <input
                            type="email"
                            required
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                            className="w-full text-lg outline-none border-none "
                            placeholder="dpshopvn@gmail.com"
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <div className="flex flex-col gap-2 mt-6">
                        <button
                            onClick={handleSummit}
                            className="w-full bg-pink-500 py-2 rounded-sm text-white text-xl font-normal hover:opacity-80  transition duration-200 "
                        >
                            Tiếp tục
                        </button>
                        <p
                            onClick={() => dispatch(setFeatureAuth(1))}
                            className="text-base text-primary mx-auto cursor-pointer"
                        >
                            Đăng nhập
                        </p>
                    </div>
                </form>
                <div className="flex flex-col w-full h-full mt-[50px] gap-3">
                    <div className="flex relative w-full  before:translate-y-1/2  before:top-1/2 before:bg-bgSecondary  z-10 before:h-[1px] before:absolute before:w-full ">
                        <span className="z-20 mx-auto bg-white px-2">Hoặc tiếp tục bằng</span>
                    </div>
                    <div className="flex gap-3 justify-center items-center">
                        <img className="w-[50px]" src={logoFb} />
                        <img className="w-[50px]" src={logoGoogle} />
                    </div>
                </div>
            </div>
        
};

export default sendMail;
