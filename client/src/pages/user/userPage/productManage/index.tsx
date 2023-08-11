import React, { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import { Pagination } from '../../../../component';
import { getAllProductUser } from '../../../../services/apiProduct';
import { IProductItem, ProductDetail } from '../../../../interfaces/interfaces';

import { useAppDispatch } from '../../../../redux/hooks';
import { setIsLoading } from '../../../../redux/features/action/actionSlice';
import useDebounce from '../../../../Hook/useDebounce';
import TableProducts from './TableProducts';
import CreateProduct from './CreateProduct';
import FilterProduct from './FilterProduct';
import { path } from '../../../../utils/const';

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
        <div className="fixed-mobile w-full h-full bg-white px-4 pb-6">
              <Link to={`${path.PAGE_USER}`} className=" absolute top-2 left-4 text-secondary laptop:hidden ">
                <ChevronLeftIcon fontSize="large" />
            </Link>
            <h1 className=" tablet:my-3 tablet:text-center  text-1xl text-primary laptop:m-5 ">Quản lý sản phẩm</h1>
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
