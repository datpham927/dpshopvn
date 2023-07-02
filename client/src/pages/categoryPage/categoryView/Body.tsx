/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { NotFound, ProductItem, Pagination } from '../../../component';
import { CardProductItem } from '../../../interfaces/interfaces';
import { getAllProduct } from '../../../services/apiProduct';

const Body: React.FC = () => {
    const location = useLocation();
    const queries = queryString.parse(location.search);
    const [products, setProduct] = useState<CardProductItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(Number(queries?.page) || 0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const { pricefrom, priceto, ...rest } = queries;
        const fetchProducts = async () => {
            const res = await getAllProduct({
                limit: 24,
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
    }, [currentPage, params.cid, location.search]);

    useEffect(() => {
        setCurrentPage(0);
    }, [params.cid]);

    // cập nhật lại query
    useEffect(() => {
        const { page, ...queryParams } = queries;
        const updatedQueryParams =
            currentPage !== 0
                ? {
                      ...queryParams,
                      page: currentPage,
                  }
                : queryParams;
        const newQuery = queryString.stringify(updatedQueryParams);
        navigate(`?${newQuery}`);
    }, [currentPage]);

    useEffect(() => {
        document.querySelector('header')?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [currentPage, location.search]);

    return (
        <div className="flex flex-col bg-white pb-8 gap-10">
            {products?.length !== 0 ? (
                <>
                    <div className="grid grid-cols-6 ">
                        {products.map((p, index) => (
                            <ProductItem key={uuidv4()} props={p} scrollIntoView={index === 0} />
                        ))}
                    </div>
                    {totalPage > 0 && (
                        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
                    )}
                </>
            ) : (
                <div className="px-4 pt-6">
                    <NotFound>Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn</NotFound>
                </div>
            )}
        </div>
    );
};

export default Body;
