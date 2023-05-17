import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
const Cart: React.FC = () => {
    return (
        <div className="flex items-end  cursor-pointer">
            <div className="flex relative">
                <span className="text-[32px]">
                    <ShoppingCartOutlinedIcon fontSize="medium" />
                </span>
                <div className="absolute  text-[13px] px-[5px] py-[1] rounded-[50%] top-[10px] right-[-3px] h-fit bg-[#A769FD]">
                    0
                </div>
            </div>
            <span className="text-xs">Giỏ hàng</span>
        </div>
    );
};

export default Cart;
