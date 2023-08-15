import React, { memo } from 'react';
import { fire_icon } from '../../assets';
import { IProductItem } from '../../interfaces/interfaces';
import { formatMoney } from '../../utils/formatMoney';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
const CardShockDiscount: React.FC<{ product: IProductItem }> = ({ product }) => {
    const { discount, image_url, slug, _id, new_price } = product;
    return (
        <Link
            to={`${slug}/${_id}`}
            className="flex flex-col w-full h-full gap-2 px-3  rounded-sm hover:shadow-cart cursor-pointer"
        >
            <div className="w-2/3  h-[120px] rounded-md overflow-hidden mx-auto">
                <img className="w-full h-full object-contain " src={image_url} />
            </div>
            <div className="flex w-full gap-2 text-red_custom justify-center items-center">
                <p className="text-base font-medium ">{formatMoney(new_price)}</p>
                <span className=" border-[1px] border-solid border-red_custom rounded-sm  px-1 text-xs">{`-${discount}%`}</span>
            </div>
            <button className="relative flex text-sm mb-2 py-1 text-white bg-red_custom opacity-90 rounded-2xl justify-center items-center hover:opacity-80">
                Mua ngay kẻo hết
                <img className="absolute bottom-3 left-0 w-[30px]" src={fire_icon} />
            </button>
        </Link>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(CardShockDiscount);
