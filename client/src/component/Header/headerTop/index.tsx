import React from 'react';
import Notification from './Notification';
import FacebookIcon from '@mui/icons-material/Facebook';
import User from './User';

const HeaderTop: React.FC = () => {
    return (
        <div className="flex w-full justify-between py-[6px] px-6  ">
            <div className="flex gap-6">
                <a
                    href="https://www.facebook.com/profile.php?id=100012882123870"
                    target="_blank"
                    className="flex gap-2 text-sm text-white"
                >
                    Liên hệ
                    <FacebookIcon fontSize="small" />
                </a>
            </div>
            <div className="flex items-center gap-6 ">
                <Notification />
                <User />
            </div>
        </div>
    );
};

export default HeaderTop;
