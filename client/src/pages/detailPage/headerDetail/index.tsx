import React from 'react';
import { ProductDetail } from '../../../interfaces/interfaces';
import Right from './Right';
import Left from './Left';


const HeaderDetail: React.FC<{ productDetail: ProductDetail }> = ({ productDetail }) => {
    return (
        <div className="flex bg-white">
            <Left productImage={productDetail?.images} imageUrl={productDetail.image_url} />
            <Right productDetail={productDetail} />
        </div>
    );
};

export default HeaderDetail;
