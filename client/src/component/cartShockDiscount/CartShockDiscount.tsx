import React from 'react';
import {fire_icon} from '../../assets';
import { CartProduct } from '../../interfaces/interfaces';
import { formatMoney } from '../../utils/formatMoney';

const CartShockDiscount: React.FC<{ product: CartProduct }> = ({ product }) => {
    const { discount, images, newPrice} = product;
    return (
        <div className="flex flex-col w-full h-full gap-2 px-3  rounded-sm hover:shadow-cart cursor-pointer">
            <div className='px-4 rounded-md overflow-hidden'>
                <img className="w-full h-full object-contain " src={images[1]} />
            </div>
            <div className="flex w-full gap-2 text-red_custom justify-center items-center">
                <p className="text-base font-medium ">{formatMoney(newPrice)}</p>
                <span className=" border-[1px] border-solid border-red_custom rounded-sm  px-1 text-xs">{`-${discount}%`}</span>
            </div>
            <button className="relative flex text-sm mb-2 py-1 text-white bg-red_custom opacity-90 rounded-2xl justify-center items-center hover:opacity-80">
                    Mua ngay kẻo hết
                <img className="absolute bottom-3 left-0 w-[30px]" src={fire_icon} />
            </button>
        </div>
    );
};

export default CartShockDiscount;
