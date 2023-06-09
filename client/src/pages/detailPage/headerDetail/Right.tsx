import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import MessageIcon from '@mui/icons-material/Message';
import { IconExcept, noUser } from '../../../assets';
import { formatMoney } from '../../../utils/formatMoney';
import { formatStar } from '../../../utils/formatStar';
import { ProductDetail } from '../../../interfaces/interfaces';
import {ButtonOutline} from '../../../component';

const Right: React.FC<{ productDetail: ProductDetail }> = ({ productDetail }) => {
    const [quantity, setQuantity] = useState<number>(0);

    const infoShop = (
        <div className="w-[240px] h-auto border-[1px] border-solid py-3 border-slate-200 rounded-sm px-3">
            <div className="flex items-center w-full h-auto gap-2">
                <img className="w-10 h-10 rounded-full" src={noUser} />
                <div>
                    {productDetail?.userId.lastName
                        ? productDetail?.userId.lastName + ' ' + productDetail?.userId.firstName
                        : productDetail?.userId.email?.split('@')[0]}
                </div>
            </div>
            <div className="flex my-2 gap-2 text-sm items-center mt-4">
                Lượt theo dõi:
                <span className="text-base font-medium"> {productDetail?.userId.followers.length}</span>
            </div>
            <div className="flex gap-2">
                <ButtonOutline>
                    <CardGiftcardIcon fontSize="small" />
                    Xem shop
                </ButtonOutline>
                <ButtonOutline>
                    <AddIcon fontSize="small" />
                    Theo dõi
                </ButtonOutline>
            </div>
            {/* <button className="flex gap-1 mt-4 text-sm w-full justify-center font-medium  items-center p-2 rounded-[4px]  border-[1px] border-solid border-red_custom text-red_custom  hover:bg-opacity-70">
                <MessageIcon fontSize="small" />
                Chat ngay
            </button> */}
            <ButtonOutline className="w-full border-red_custom mt-4  justify-center text-red_custom">
                <MessageIcon fontSize="small" />
                Chat ngay
            </ButtonOutline>
        </div>
    );

    return (
        <div className="flex  h-full flex-1">
            <div className="flex flex-col flex-1 h-full p-4 gap-4">
                <div className="flex flex-col w-full h-auto gap-1">
                    <p className="flex gap-1 text-[13px]">
                        Thương hiệu:
                        <a href="/ss" className="text-primary">
                            {productDetail?.brand}
                        </a>
                    </p>
                    <h1 className="text-2xl font-normal"> {productDetail?.title}</h1>
                    <div className="flex gap-2 items-center">
                        <div className="flex"> {formatStar(productDetail?.star || 0, '20px')}</div>
                        <h3 className="text-text_secondary text-[15px]">Đã bán {productDetail?.sold}</h3>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex-1 h-full pr-3">
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full gap-2 items-end bg-[#FAFAFA] p-4 rounded-md  text-red_custom">
                                {productDetail?.newPrice && (
                                    <div className="text-4xl font-medium">{formatMoney(productDetail?.newPrice)}</div>
                                )}
                                {productDetail?.oldPrice && (
                                    <div className="text-sm text-text_secondary line-through">
                                        {formatMoney(productDetail?.oldPrice)}
                                    </div>
                                )}
                                {productDetail?.discount && (
                                    <div className="text-sm font-semibold">-{productDetail?.discount}%</div>
                                )}
                            </div>
                            <div className="flex gap-1 text-sm">
                                Giao đến
                                <span className="text-[15px] font-medium underline">
                                    H. Kiến Thuỵ, X. Du Lễ, Hải Phòng
                                </span>
                            </div>
                            <div className="flex gap-4 mt-6 items-center font-medium">
                                <h2 className="text-sm text-text_secondary">Số lượng</h2>
                                <div className="flex items-center border-[1px] border-solid border-slate-300 w-[100px]  rounded-sm">
                                    <button
                                        onClick={() => {
                                            if (quantity > 0) {
                                                setQuantity(quantity - 1);
                                            }
                                        }}
                                        className="flex w-full justify-center items-center"
                                    >
                                        {IconExcept}
                                    </button>
                                    <span className="px-4 py-1 border-solid border-l-[1px] border-r-[1px] border-slate-300 ">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="flex w-full justify-center items-center"
                                    >
                                        <AddIcon />
                                    </button>
                                </div>
                                <div className="text-sm  text-text_secondary">
                                    {productDetail?.inStock} sản phẩm có sẵn
                                </div>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <ButtonOutline>
                                    <ShoppingCartOutlinedIcon />
                                    Thêm vào giỏ hàng
                                </ButtonOutline>
                                <button className="flex gap-2 text-lg px-4 py-2 rounded-sm text-white bg-red_custom hover:bg-opacity-70">
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* ---------------- */}
                    {infoShop}
                </div>
            </div>
        </div>
    );
};

export default Right;
