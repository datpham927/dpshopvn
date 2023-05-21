import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <>
            <div className="flex flex-col gap-2 w-4/6 p-10 ">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold">Đăng nhập bằng email</h1>
                    <p className="text-base">Nhập email và mật khẩu tài khoản của bạn</p>
                </div>
                <form className="flex flex-col gap-5">
                    <div className="border-b-[1px]  py-2">
                        <input
                            type="email"
                            required
                            className="w-full text-base outline-none border-none "
                            placeholder="dpshopvn@gmail.com"
                        />
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <input
                            id="name"
                            required
                            className=" text-sm w-full bg-transparent outline-none border-solid border-b-[1px] py-2"
                            type={showPassword ? 'text' : 'password'}
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
                    <div className="flex flex-col gap-2">
                        <button className="w-full bg-pink-500 py-2 rounded-sm text-white text-xl font-normal hover:opacity-80  transition duration-200 ">
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
