import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiProductDetail } from '../../services/apiProduct';
import { ProductDetail } from '../../interfaces/interfaces';
import { SimilarProducts } from './similarProducts';
import HeaderDetail from './headerDetail';
import ReviewsProduct from './reviewsProduct';
import ProductDescription from './productDescription';

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
    useEffect(() => {
        document.querySelector('header')?.scrollIntoView({
            behavior: 'instant',
        });
    }, [pid]);

    return (
        <>
            {productDetail && (
                <>
                    <HeaderDetail productDetail={productDetail} />
                    <SimilarProducts categoryCode={productDetail.categoryCode} />
                    <ProductDescription productDetail={productDetail} />
                    <ReviewsProduct productDetail={productDetail} userBought={productDetail.userBought} />
                </>
            )}
        </>
    );
};

export default DetailPage;
