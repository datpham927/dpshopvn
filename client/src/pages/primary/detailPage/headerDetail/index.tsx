import React from 'react';
import Right from './Right';
import Left from './Left';
import { ProductDetail } from '../../../../interfaces/interfaces';

const HeaderDetail: React.FC<{ productDetail: ProductDetail }> = ({ productDetail }) => {
    return (
        <div className="flex tablet:flex-col bg-white">
            <Left productImage={productDetail?.images} imageUrl={productDetail?.image_url} />
            <Right productDetail={productDetail} />
        </div>
    );
};

export default HeaderDetail;
