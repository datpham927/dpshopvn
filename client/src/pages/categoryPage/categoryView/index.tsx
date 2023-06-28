import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { getAllProduct } from '../../../services/apiProduct';
import { CardProductItem } from '../../../interfaces/interfaces';
import { useLocation, useParams } from 'react-router-dom';
import Header from './Header';
import Body from './body';

const CategoryView: React.FC = () => {
    const [products, setProduct] = useState<CardProductItem[]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [sorts, setSorts] = useState<object>({ sort: '-star' });
    const params = useParams();
    const location = useLocation();
    useEffect(() => {
        const queries = queryString.parse(location.search);
        const { pricefrom, priceto, ...rest } = queries;
        const fetchProducts = async () => {
            const res = await getAllProduct({
                limit: 24,
                page,
                ...sorts,
                ...rest,
                'newPrice[lte]': priceto,
                'newPrice[gte]': pricefrom,
                category_code: params.cid,
            });
            if (!res.success) return;
            setTotalPage(res.totalPage);
            setProduct(res.products);
        };
        fetchProducts();
    }, [page, sorts, params.cid, location.search]);

    useEffect(() => {
        document.querySelector('header')?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [page,sorts,location.search]);

    return (
        <div className="w-full h-full ">
            <Header setSorts={setSorts} />
            <Body currentPage={page} products={products} setPage={setPage} totalPage={totalPage} />
        </div>
    );
};

export default CategoryView;
