import React from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
const User: React.FC = () => {
    return (
        <div className="flex">
            <span className="flex items-center">
                <PersonOutlineOutlinedIcon fontSize="large" />
            </span>
            <div className="flex flex-col mx-1 cursor-pointer">
                <div className="text-xs font-normal text-white">
                    <span>Đăng nhập</span> / <span>Đăng ký</span>
                </div>
                <span className="text-sm font-normal">Tài khoản</span>
            </div>
        </div>
    );
};

export default User;
