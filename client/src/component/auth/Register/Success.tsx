import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { apiRegister } from '../../../services/apiAuth';
import { useAppSelector } from '../../../redux/hooks';


interface ModeRegister{
    setModeRegister:React.Dispatch<React.SetStateAction<number>>,
}

const Success: React.FC<ModeRegister> = (props) => {
    const { setModeRegister } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
const {email}=useAppSelector(state=>state.user)
 
   
    const handleSummit =async () => {
        if(!password) return
         const res=await  apiRegister(email,password)
         console.log(res)
    };

    return  <div className="flex flex-col gap-4 w-4/6 p-10  ">
                <div onClick={() => setModeRegister(1)} className="cursor-pointer">
                    <ArrowBackIosIcon />
                </div>
                <h1 className="text-2xl font-semibold">Tạo tài khoản</h1>
                <form className="flex flex-col gap-8">
           
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="name">Đặt mật khẩu</label>
                        <div className="flex w-full justify-between bg-bgSecondary items-center">
                            <input
                                id="name"
                                required
                                className=" text-sm w-full bg-transparent outline-none border-solid border-b-[1px] py-2"
                                type={showPassword ? 'text' : 'password'}
                                minLength={6}
                                value={ password}
                                onChange={(e)=>setPassword(e.target.value)}
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
                    </div>
                    <button
                        onClick={handleSummit}
                        className="w-full bg-pink-500 py-2 rounded-sm text-white text-xl font-normal hover:opacity-80  transition duration-200 "
                    >
                        Tạo tài khoản
                    </button>
                </form>
            </div>
       
};

export default Success;
