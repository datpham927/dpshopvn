import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Overlay, showNotification } from '../../../component';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../../services/apiAuth';

const ForgotPassword: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!params.token) navigate('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.token]);

    const handleSummit = async () => {
        if (!params.token) return;
        const res = await resetPassword(params.token, password);
        if (res.success) {
            navigate('/');
            showNotification('Đổi mật khẩu thành công', true);
        } else {
            navigate('/');
            showNotification('Đổi mật khẩu không thành công');
        }
    };

    return (
        <Overlay className="bg-green-100 z-[1000]">
            <div className="flex flex-col gap-2 w-2/6 p-10 bg-white rounded-md">
                <div className="flex flex-col gap-1">
                    <p className="text-base">Vui lòng nhập mật khẩu mới</p>
                </div>
                <div className="flex w-full justify-between items-center mt-5">
                    <input
                        id="name"
                        required
                        className=" text-sm w-full bg-transparent outline-none border-solid border-b-[1px] py-2"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        placeholder="Mật khẩu"
                    />
                    <div onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleSummit}
                        className="w-full bg-pink-500 py-2 rounded-sm text-white text-xl font-normal hover:opacity-80  transition duration-200 "
                    >
                        Tiếp tục
                    </button>
                </div>
            </div>
        </Overlay>
    );
};

export default ForgotPassword;
