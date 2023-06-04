import React from 'react';
import { CardProduct } from '../../interfaces/interfaces';
import { formatStar } from '../../utils/formatStar';
import { formatMoney } from '../../utils/formatMoney';

const ProductItem: React.FC<{ props: CardProduct }> = ({ props }) => {
    const { star, discount, image_url, newPrice, title ,sold,slug,_id} = props;
    return (
        <a href={`/${slug}/${_id}`} className="flex flex-col w-full h-full  px-3 hover:shadow-cart cursor-pointer">
            <div className="flex w-2/3 h-[170px] mx-auto my-2">
                <img className="w-full h-full object-contain " src={image_url} />
            </div>
            <span className="truncate-trailing line-clamp-2 text-[13px]">{title}</span>
            <div className="flex items-center gap-2 my-2">
                <div className="flex items-center">{formatStar(star)}</div>
                <span className="border-l-[1px] border-solid border-black text-xs line leading-none px-2 ">
                    Đã bán {sold}+
                </span>
            </div>
            <div className="flex w-full gap-2 text-red_custom  items-center text-sm mb-7 ">
                <p className="text-base font-normal ">{formatMoney(newPrice)}</p>
                <span className=" border-[1px] border-solid border-red_custom rounded-sm  px-1 text-xs">{`-${discount}%`}</span>
            </div>
        </a>
    );
};

export default ProductItem;
