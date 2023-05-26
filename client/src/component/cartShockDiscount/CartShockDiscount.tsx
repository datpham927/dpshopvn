import React from 'react';
import fire_icon from '../../assets/fire_icon.svg';
import { CartProduct } from '../../interfaces/interfaces';
import { formatMoney } from '../../utils/formatMoney';

const CartShockDiscount: React.FC<{ product: CartProduct }> = ({ product }) => {
    const { discount, image, newPrice, inStock, sold } = product;
    // console.log(inStock*100/sold)
    console.log(inStock, sold);
    const percent = Math.floor((inStock * 100) / sold);
    return (
        <div className="flex flex-col w-full h-full gap-2 px-3  rounded-sm hover:shadow-cart cursor-pointer">
            <div>
                <img className="rounded-md" src={image[1]} />
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
