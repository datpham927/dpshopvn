import React from 'react';

import { ProductDetail } from '../../../interfaces/interfaces';
import Left from './left/Left';
import Right from './right/Right';
const HeaderDetail: React.FC<{ productDetail: ProductDetail }> = ({ productDetail }) => {
    return (
        <div className="flex bg-white">
            <Left productImage={productDetail?.images} imageUrl={productDetail.image_url} />
            <Right productDetail={productDetail} />
        </div>
    );
};

export default HeaderDetail;
