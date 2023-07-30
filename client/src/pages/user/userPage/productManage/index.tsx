import React, { useEffect, useState } from 'react';
import { Pagination } from '../../../../component';
import { getAllProductUser } from '../../../../services/apiProduct';
import { IProductItem, ProductDetail } from '../../../../interfaces/interfaces';

import { useAppDispatch } from '../../../../redux/hooks';
import { setIsLoading } from '../../../../redux/features/action/actionSlice';
import useDebounce from '../../../../Hook/useDebounce';
import TableProducts from './TableProducts';
import CreateProduct from './CreateProduct';
import FilterProduct from './FilterProduct';

interface IQueries {
    createdAt: string;
    title: string;
}

const ProductManage: React.FC = () => {
    const [products, setProducts] = useState<ProductDetail[]>([]);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [queries, setQueries] = useState<IQueries>({} as IQueries);
    const dispatch = useAppDispatch();
    const valueDebounce = useDebounce(queries.title, 500);

    useEffect(() => {
        const fetchApi = async () => {
            dispatch(setIsLoading(true));
            const query: { title?: string; createdAt?: string } = {}; // Use the appropriate types for the 'query' object
            if (valueDebounce) {
                query.title = valueDebounce.toString();
            }
            if (queries.createdAt) {
                query.createdAt = queries.createdAt;
            }
            const res = await getAllProductUser({ limit: 10, page: currentPage, ...query });
            dispatch(setIsLoading(false));
            if (!res.success) return;
            setProducts(res.products);
            setTotalPage(res.totalPage);
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, valueDebounce, queries.createdAt]);
    useEffect(() => {
        document.querySelector('header')?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [currentPage]);
    return (
        <div className="w-full h-full bg-white px-4 pb-6">
            <h1 className="text-1xl text-primary m-5 ">Quản lý sản phẩm</h1>
            <CreateProduct  setProducts={setProducts}/>
            <FilterProduct queries={queries} setQueries={setQueries} />
            <TableProducts products={products} setProducts={setProducts} />
            {totalPage > 0 && (
                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPage={totalPage} />
            )}
        </div>
    );
};

export default ProductManage;
