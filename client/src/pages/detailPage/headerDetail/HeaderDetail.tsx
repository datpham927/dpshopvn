import React from 'react';

import { ProductDetail } from '../../../interfaces/interfaces';
import Left from './left/Left';
import Right from './right/Right';
const HeaderDetail: React.FC<{ productDetail: ProductDetail }> = ({ productDetail }) => {
    return (
        <div>
            <div className="flex  bg-white">
                {productDetail?.images && productDetail.image_url && (
                    <Left productImage={productDetail?.images} imageUrl={productDetail.image_url} />
                )}
                {productDetail && <Right productDetail={productDetail} />}
            </div>
            <div className="my-5 bg-white rounded-sm p-3">
                <h1 className="text-xl font-semibold">Thông tin chi tiết</h1>
                <table className="w-full my-3 rounded-sm">
                    {productDetail?.infoProduct.map((e) => (
                        <tbody className=" h-[40px] bg-primary-bg">
                            <td className="text-sm w-2/12 px-2 bg-[rgb(239,239,239)] ">{e.name}</td>
                            <td className="text-sm w-10/12 px-3 ">{e.value}</td>
                        </tbody>
                    ))}
                </table>
            </div>
            <div className="my-5 bg-white rounded-sm p-3">
                <h1 className="text-2xl   t font-normal">Mô tả sản phẩm</h1>
                <ul className="flex flex-col gap-1 px-6 mt-3">
                    {productDetail?.description?.map((item) => (
                        <li className={`${item === item.toUpperCase() ? 'font-semibold text-base ' : 'text-sm'}`}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HeaderDetail;
