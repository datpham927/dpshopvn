/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { IProductItem } from '../../interfaces/interfaces';
import { NotFound, Pagination, ProductItem, SkeletonProducts } from '..';
import { getAllProduct } from '../../services/apiProduct';
import { useAppSelector } from '../../redux/hooks';

const RenderListProducts: React.FC = () => {
    const location = useLocation();
    const queries = queryString.parse(location.search);
    const [products, setProduct] = useState<IProductItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(Number(queries?.page) || 0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('hihi');
        const { pricefrom, priceto, ...rest } = queries;
        const fetchProducts = async () => {
            setIsLoading(true);
            const res = await getAllProduct({
                limit: 24,
                ...rest,
                'new_price[lte]': priceto,
                'new_price[gte]': pricefrom,
                category_code: params.cid,
                brand_slug: params.brand_slug,
                title: params.title,
                user: params.sid,
            });
            setIsLoading(false);
            if (!res.success) return;
            setTotalPage(res.totalPage);
            setProduct(res.products);
        };
        fetchProducts();
    }, [currentPage, params.cid, location.search, params.brand_slug, params.sid, params.title]);

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
            {!isLoading ? (
                products?.length !== 0 ? (
                    <>
                        <div className="grid mobile:grid-cols-2  tablet:grid-cols-4  laptop:grid-cols-6 ">
                            {products.map((p, index) => (
                                <ProductItem key={uuidv4()} props={p} scrollIntoView={index === 0} />
                            ))}
                        </div>
                        {totalPage > 0 && (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPage={totalPage}
                            />
                        )}
                    </>
                ) : (
                    <div className="px-4 pt-6">
                        <NotFound>Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn</NotFound>
                    </div>
                )
            ) : (
                <SkeletonProducts index={18} />
            )}
        </div>
    );
};

export default RenderListProducts;
