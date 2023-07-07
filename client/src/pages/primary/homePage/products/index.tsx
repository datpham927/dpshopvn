/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getAllProduct } from '../../../../services/apiProduct';
import { CardProductItem } from '../../../../interfaces/interfaces';

import Header from './Header';
import ListProducts from './ListProducts';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../../../redux/features/action/actionSlice';

const Products: React.FC = () => {
    const [products, setProduct] = useState<CardProductItem[]>([]);
    const [hiddenButton, setHiddenButton] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [optionTab, setOptionTab] = useState<number>(1);
    const dispatch = useDispatch();
    useEffect(() => {
        setProduct([]);
    }, [optionTab]);
    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(setIsLoading(true));
            const res =
                optionTab === 1
                    ? await getAllProduct({ limit: 30, page })
                    : optionTab === 2
                    ? await getAllProduct({ limit: 30, 'newPrice[lte]': 99000, page })
                    : optionTab === 3
                    ? await getAllProduct({ sort: '-createdAt', limit: 30, page })
                    : optionTab === 4
                    ? await getAllProduct({ sort: '-sold', limit: 30, page })
                    : await getAllProduct({ 'newPrice[lte]': 20000, limit: 30, page });
            res.totalPage === page && setHiddenButton(true);
            res.success && setProduct((p) => [...p, ...res.products]);
            dispatch(setIsLoading(false));
        };
        fetchProducts();
    }, [page, optionTab]);

    return (
        <div className="w-full h-full ">
            <Header optionTab={optionTab} setOptionTab={setOptionTab} />
            <ListProducts hiddenButton={hiddenButton} products={products} setPage={setPage} />
        </div>
    );
};

export default Products;
