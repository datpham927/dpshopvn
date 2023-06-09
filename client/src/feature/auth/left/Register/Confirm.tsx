import React, { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useAppSelector } from '../../../../redux/hooks';
import { apiConfirmEmail, apiSendEmail } from '../../../../services/apiAuth';

interface ModeRegister{
    setModeRegister:React.Dispatch<React.SetStateAction<number>>,
}
const Confirm: React.FC<ModeRegister> = (props) => {
    const {   setModeRegister } = props;
    const [waitingTime, setWaitingTime] = useState<number>(30);
    const [sentBack, setSentBack] = useState<boolean>(false);
    const [token, setToken] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { email } = useAppSelector((state) => state.auth);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useEffect(() => {
        let intervalId: any;
        if (waitingTime <= 30 && waitingTime >= 0) {
            intervalId = setInterval(() => {
                setWaitingTime((prevWaitingTime) => prevWaitingTime - 1);
            }, 1000);
        } else {
            setSentBack(true);
            return;
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [waitingTime]);

    const handleSendBack = async () => {
        
        const res = await apiSendEmail(email);
        if (res?.success) {
            setSentBack(false);
            setWaitingTime(30);
            setError('');
            setToken('');
        } 
    };
    const handleSummit = async () => {
        if (!token) {
            setError('Vui lòng nhập mã xác minh(OTP)');
            return;
        }
        const res = await apiConfirmEmail(email, token);
        if (!res?.success) {
            setError('Mã xác thực không hợp lệ.');
            return;
        }
        //chuyển sang mode  tiếp theo
        setModeRegister(2);
    };
    return    <div className="flex flex-col gap-4 w-4/6 p-10  ">
                <div onClick={() => setModeRegister(0)} className="cursor-pointer">
                    <ArrowBackIosIcon />
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold">Nhập mã xác minh</h1>
                    <p className="text-base">Nhập mã xác minh vừa được gửi đến gmail của bạn</p>
                </div>
                <div className="flex flex-col w-full justify-center mt-10 mb-5 gap-2">
                    <input
                        className=" text-4xl outline-none  w-full  text-center "
                        maxLength={6}
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="0 0 0 0 0 0"
                    />
                    {error && <p className="text-red-400 text-sm mx-auto">{error}</p>}
                </div>
                <button
                    onClick={handleSummit}
                    className="w-full bg-pink-500 py-2 rounded-sm text-white text-xl font-normal hover:opacity-80  transition duration-200 "
                >
                    Xác minh
                </button>
                {!sentBack ? (
                    <div className="flex flex-col gap-1 w-full h-full ">
                        <p className="flex gap-2 items-center text-secondary text-sm">
                            Gửi lại mã sao
                            <span className="text-base text-primary">{waitingTime}s</span>
                        </p>
                        <p className="text-sm  text-secondary ">Mã xác minh có hiệu lực trong 5 phút</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1 w-full h-full ">
                        <p className="flex gap-2 items-center text-secondary text-sm">
                            Không nhận được?
                            <span className="text-sm text-primary cursor-pointer" onClick={handleSendBack}>
                                Gửi lại mã
                            </span>
                        </p>
                    </div>
                )}
            </div>
      
};

export default Confirm;
