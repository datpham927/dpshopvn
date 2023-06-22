import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAllProduct } from '../../../services/apiProduct';
import { CardProductItem } from '../../../interfaces/interfaces';
import { Pagination, ProductItem } from '../../../component';
import { useLocation } from 'react-router-dom';

const CategoryView: React.FC = () => {
    const [products, setProduct] = useState<CardProductItem[]>([]);
    const [page, setPage] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllProduct({ limit: 24, page });
            if (!res.success) return;
            setTotalPage(res.totalPage);
            setProduct(res.products);
        };
        fetchProducts();
    }, [page]);

    useEffect(() => {
        document.querySelector('header')?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [page]);

    return (
        <div className="w-full h-full ">
            <div className="flex flex-col gap-1 w-full h-full sticky top-0 right-0 bg-background_primary  pb-1  z-100">
                <div className="px-4 py-2 rounded-sm text-lg font-normal  mt-1  bg-white">{location.state?.category_name}</div>
            </div>
            <div className="flex flex-col bg-white pb-8 gap-10">
                <div className="grid grid-cols-6 ">
                    {products.map((p, index) => (
                        <ProductItem key={uuidv4()} props={p} scrollIntoView={index === 0} />
                    ))}
                </div>
                <Pagination currentPage={page} setCurrentPage={setPage} totalPage={totalPage} />
            </div>
        </div>
    );
};

export default CategoryView;
