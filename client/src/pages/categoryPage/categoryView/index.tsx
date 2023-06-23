import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getAllProduct } from '../../../services/apiProduct';
import { CardProductItem } from '../../../interfaces/interfaces';
import { Pagination, ProductItem } from '../../../component';
import { useLocation, useParams } from 'react-router-dom';
import { SORT_BAR } from '../../../utils/const';

const CategoryView: React.FC = () => {
    const [products, setProduct] = useState<CardProductItem[]>([]);
    const [page, setPage] = useState<number>(0);
    const [activeSortBar, setActiveSortBar] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [sorts, setSorts] = useState<object>({  sort: '-star'});
    const location = useLocation();
    const params = useParams();
    console.log(params);
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllProduct({ limit: 24, page, ...sorts, category_code: params.cid });
            if (!res.success) return;
            setTotalPage(res.totalPage);
            setProduct(res.products);
        };
        fetchProducts();
    }, [page, sorts, params.cid]);

    useEffect(() => {
        document.querySelector('header')?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [page]);

    return (
        <div className="w-full h-full ">
            <div className="flex flex-col gap-1 w-full h-full sticky top-0 right-0 bg-background_primary  pb-1  z-100">
                <div className="flex flex-col px-4 py-2  bg-white rounded-sm  mt-1 gap-4">
                    <div className="text-lg font-normal  ">{location.state?.category_name}</div>
                    <div className="flex items-center  gap-3 px-3 py-2 bg-[#EDEDED]">
                        <div className="text-sm font-normal">Sắp xếp theo</div>

                        {SORT_BAR.map((i) => (
                            <div
                                onClick={() => {
                                    setSorts(i.sortBy);
                                    setActiveSortBar(i.id);
                                }}
                                className={`text-sm font-normal py-2 px-4 rounded-sm cursor-pointer ${
                                    i.id === activeSortBar ? 'bg-primary text-white font-semibold' : '  bg-white'
                                }`}
                            >
                                {i.label}
                            </div>
                        ))}
                    </div>
                </div>
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
