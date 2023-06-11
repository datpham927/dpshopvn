import React, { memo } from 'react';
import { logo_dpshopvn } from '../../assets';
 
const Footer: React.FC = () => {
    return (
        <div className=" w-full h-full mt-6 bg-white p-5">
            <div className="flex justify-center">
                <span className="text-xs mx-5"> CHÍNH SÁCH BẢO MẬT</span>
                <span className="text-xs mx-5"> QUY CHẾ HOẠT ĐỘNG</span>
                <span className="text-xs mx-5"> CHÍNH SÁCH VẬN CHUYỂN</span>
                <span className="text-xs mx-5"> CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</span>
            </div>
            <div className="flex flex-col items-center my-7">
                    <img src={logo_dpshopvn} className="w-60  h-full " />
                <span className='text-sm'>Công ty TNHH DPSHOPVN</span>
            </div>
            <div></div>
        </div>
    );
};

export default memo(Footer);
