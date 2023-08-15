import React, { memo, useEffect, useRef } from 'react';
import { IProductItem } from '../../interfaces/interfaces';
import { formatStar } from '../../utils/formatStar';
import { formatMoney } from '../../utils/formatMoney';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
const ProductItem: React.FC<{ props: IProductItem; scrollIntoView?: boolean }> = ({ props, scrollIntoView }) => {
    const { star, discount, image_url, new_price, title, sold, slug, _id, category_name } = props;
    const productRef = useRef<HTMLAnchorElement>(null);

    // useEffect(() => {
    //     if (!scrollIntoView) return;
    //     productRef.current?.scrollIntoView({
    //         behavior: 'smooth',

    //     });
    // }, []);
    return (
        <Link
            to={`/${slug}/${_id}`}
            className="flex flex-col w-full h-full  px-3 hover:shadow-cart cursor-pointer"
            ref={productRef}
        >
            <div className="flex w-2/3 h-[170px] mx-auto my-2">
                <img className="w-full h-full object-contain " src={image_url} />
            </div>
            <span className="truncate-trailing line-clamp-2 text-[13px]">{title}</span>
            <div className="flex items-center gap-2 my-2">
                <div className="flex items-center">{formatStar(star)}</div>
                <span className="border-l-[1px] border-solid border-black text-xs line leading-none px-2 ">
                    Đã bán {sold >= 5000 ? `${sold}+` : sold}
                </span>
            </div>
            <div className="flex w-full gap-2 text-red_custom  items-center text-sm mb-7 ">
                <p className="text-base font-normal ">{formatMoney(new_price)}</p>
                <span className=" border-[1px] border-solid border-red_custom rounded-sm  px-1 text-xs">{`-${discount}%`}</span>
            </div>
        </Link>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(ProductItem);
