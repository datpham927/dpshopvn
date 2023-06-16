import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiProductDetail } from '../../services/apiProduct';
import { ProductDetail } from '../../interfaces/interfaces';
import { SimilarProducts } from './similarProducts';
import HeaderDetail from './headerDetail';
import ReviewsProduct from './reviewsProduct';
import ProductDescription from './productDescription';
import Breadcrumbs from './breadcrumbs';

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
                    <Breadcrumbs
                        category_name={productDetail?.category_name}
                        category_code={productDetail?.category_code}
                        title={productDetail.title}
                    />
                    <HeaderDetail productDetail={productDetail} />
                    <SimilarProducts category_code={productDetail.category_code} />
                    <ProductDescription productDetail={productDetail} />
                    <ReviewsProduct productDetail={productDetail} userBought={productDetail.userBought} />
                </>
            )}
        </>
    );
};

export default DetailPage;
