import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { apiLogin } from '../../../../services/apiAuth';
import { setOpenLogin } from '../../../../redux/features/action/actionSlice';
import { useAppDispatch } from '../../../../redux/hooks';
import { setIsLoginSuccess } from '../../../../redux/features/auth/authSlice';
import { showNotification } from '../../../../component';
const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const dispatch = useAppDispatch();
    const handleSummit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if(!email||!password ){
            setError('Tài khoản hoặc mật khẩu không chính xác!');
            return
        }
        const res = await apiLogin(email, password);
        if (res.success) {
            localStorage.setItem('access_token', JSON.stringify(res.access_token));
            showNotification('Đăng nhập thành công!',true);
            dispatch(setOpenLogin(false));
            dispatch(setIsLoginSuccess(true))
            window.location.reload();
        } else {
            setError('Tài khoản hoặc mật khẩu không chính xác!');
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2 w-4/6 p-10 ">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold">Đăng nhập bằng email</h1>
                    <p className="text-base">Nhập email và mật khẩu tài khoản của bạn</p>
                </div>
                <form className="flex flex-col gap-5">
                    <div>
                        <div className="border-b-[1px]  py-2">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full text-base outline-none border-none "
                                placeholder="dpshopvn@gmail.com"
                            />
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
                                {showPassword ? (
                                    <VisibilityIcon fontSize="small" />
                                ) : (
                                    <VisibilityOffIcon fontSize="small" />
                                )}
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleSummit}
                            className="w-full bg-pink-500 py-2 rounded-sm text-white text-xl font-normal hover:opacity-80  transition duration-200 "
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>
                <div className="flex flex-col gap-1 w-full h-full ">
                    <p className="text-sm text-primary cursor-pointer">Quên mật khẩu?</p>
                    <p className="flex gap-2 items-center text-secondary text-sm">
                        Chưa có tài khoản?
                        <span className="text-sm text-primary cursor-pointer">Tạo tài khoản</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
