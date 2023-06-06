import React, { useEffect, useState } from 'react';
import HeaderDetail from './headerDetail/HeaderDetail';
import { useParams } from 'react-router-dom';
import { apiProductDetail } from '../../services/apiProduct';
import { ProductDetail } from '../../interfaces/interfaces';
import { SimilarProducts } from './similarProducts/SimilarProducts';
import ProductInfo from './productInfo/ProductInfo';
import ReviewsProduct from './reviewsProduct/ReviewsProduct';

const DetailPage: React.FC = () => {
    const [productDetail, setProductDetail] = useState<ProductDetail>({
        _id: '',
        brand: '',
        description: [],
        discount: 0,
        image_url: '',
        categoryCode: '',
        images: [],
        inStock: 0,
        newPrice: 0,
        oldPrice: 0,
        slug: '',
        sold: 0,
        star: 0,
        title: '',
        userBought: [],
        infoProduct: [{ name: '', value: '' }],
        userId: { _id: '', avatar_url: '', email: '', firstName: '', lastName: '', followers: [] },
    });

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
            <HeaderDetail productDetail={productDetail} />
            <SimilarProducts categoryCode={productDetail.categoryCode} />
            <ProductInfo productDetail={productDetail} />
            <ReviewsProduct pid={productDetail._id} userBought={productDetail.userBought} />
        </>
    );
};

export default DetailPage;
