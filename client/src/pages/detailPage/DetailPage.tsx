import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiProductDetail } from '../../services/apiProduct';
import { ProductDetail } from '../../interfaces/interfaces';
import { SimilarProducts } from './similarProducts/SimilarProducts';
import ProductInfo from './productInfo/ProductInfo';
import HeaderDetail from './headerDetail';
import ReviewsProduct from './reviewsProduct';

const DetailPage: React.FC = () => {
    const [productDetail, setProductDetail] = useState<ProductDetail>();

    const pid = useParams().pid;
    useEffect(() => {
        if (!pid) return;
        const fetchDetail = async () => {
            const res = await apiProductDetail(pid);
            if (res.success) {
                setProductDetail(res.product);
            }
        };
        fetchDetail();
    }, [pid]);

    return (
        <>
            {productDetail && (
                <>
                    <HeaderDetail productDetail={productDetail} />
                    <SimilarProducts categoryCode={productDetail.categoryCode} />
                    <ProductInfo productDetail={productDetail} />
                    <ReviewsProduct productDetail={productDetail} userBought={productDetail.userBought} />
                </>
            )}
        </>
    );
};

export default DetailPage;
