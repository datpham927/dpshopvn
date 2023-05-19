import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import dogcute from '../../assets/dogcute.jpg';
import logoGoogle from '../../assets/logoGoogle.png';
import logoFb from '../../assets/logoFb.png';
const Login: React.FC = () => {
    return (
        <div>
            <div id="overlay" className="fixed w-screen h-screen right-0 top-0 bg-overlay z-[1000]"></div>
            <div className="fixed flex items-center justify-center w-screen h-screen right-0 top-0  z-[1000]">
                <div className="relative w-[800px] h-auto ">
                    <div className="flex w-full h-full bg-white m-auto rounded-lg items-center overflow-hidden">
                        <div className="flex flex-col gap-2 w-4/6 p-10 ">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-2xl font-semibold">Tạo tại khoản </h1>
                                <p className="text-base">Vui lòng nhập đại chỉ gmail</p>
                            </div>
                            <form className="flex flex-col gap-5">
                                <div className="border-b-[1px]  py-2">
                                    <input
                                        type="email"
                                        required
                                        className="w-full text-lg outline-none border-none "
                                        placeholder="dpshopvn@gmail.com"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button className="w-full bg-pink-500 py-2 rounded-sm text-white text-xl font-normal hover:opacity-80  transition duration-200 ">
                                        Tiếp tục
                                    </button>
                                    <p className="text-base text-primary mx-auto">Đăng nhập</p>
                                </div>
                            </form>

                            <div className="flex flex-col w-full h-full mt-[80px] gap-3">
                                <div className="flex relative w-full  before:translate-y-1/2  before:top-1/2 before:bg-bgSecondary  z-10 before:h-[1px] before:absolute before:w-full ">
                                    <span className="z-20 mx-auto bg-white px-2">Hoặc tiếp tục bằng</span>
                                </div>
                                <div className='flex gap-3 justify-center items-center'>
                                  <img  className="w-[50px]"  src={logoFb}/>
                                  <img  className="w-[50px]"  src={logoGoogle}/>
                                </div>
                            </div>
                        </div>
                        <div className=" w-2/6  h-full flex  flex-col items-center justify-center">
                            <img src={dogcute} />
                        </div>
                    </div>

                    {/* -------------- */}
                    <div className='absolute right-[-13px] top-[-13px] shadow-search w-10 h-10 flex justify-center items-center rounded-full bg-primary text-white'>
                        <CloseIcon fontSize='medium'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
