/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getAllProduct } from '../../../../services/apiProduct';
import { IProductItem } from '../../../../interfaces/interfaces';

import Header from './Header';
import ListProducts from './ListProducts';
import { SkeletonProducts } from '../../../../component';

const Products: React.FC = () => {
    const [products, setProduct] = useState<IProductItem[]>([]);
    const [hiddenButton, setHiddenButton] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);

    const [optionTab, setOptionTab] = useState<number>(1);
    useEffect(() => {
        setProduct([]);
    }, [optionTab]);
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            const queries =
                optionTab === 1
                    ? {}
                    : optionTab === 2
                    ? { 'new_price[lte]': 99000 }
                    : optionTab === 3
                    ? { sort: '-createdAt' }
                    : optionTab === 4
                    ? { sort: '-sold' }
                    : { 'new_price[lte]': 20000 };

            const res = await getAllProduct({ limit: 30, page, ...queries });
            setIsLoading(false);
            res.totalPage === page && setHiddenButton(true);
            res.success && setProduct((p) => [...p, ...res.products]);
        };
        fetchProducts();
    }, [page, optionTab]);

    return (
        <div className="w-full h-full ">
            <Header optionTab={optionTab} setOptionTab={setOptionTab} />
            {isLoading ? (
                <SkeletonProducts index={12} />
            ) : (
                <ListProducts hiddenButton={hiddenButton} products={products} setPage={setPage} />
            )}
        </div>
    );
};

export default Products;
