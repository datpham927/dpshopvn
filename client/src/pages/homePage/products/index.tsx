import React, { useEffect, useState } from 'react';
import { getAllProduct } from '../../../services/apiProduct';
import { CardProductItem } from '../../../interfaces/interfaces';

import Header from './Header';
import Body from './body';

const Products: React.FC = () => {
    const [products, setProduct] = useState<CardProductItem[]>([]);
    const [hiddenButton, setHiddenButton] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [optionTab, setOptionTab] = useState<number>(1);

    useEffect(() => {
        setProduct([]);
    }, [optionTab]);
    useEffect(() => {
        const fetchProducts = async () => {
            const res =
                optionTab === 1
                    ? await getAllProduct({ limit: 30, page })
                    : optionTab === 2
                    ? await getAllProduct({ limit: 30, 'newPrice[lte]': 99000, page })
                    : optionTab === 3
                    ? await getAllProduct({ sort: '-createdAt', limit: 30, page })
                    : optionTab === 4
                    ? await getAllProduct({ sort: '-sold', limit: 30, page })
                    : await getAllProduct({ 'newPrice[lte]': 50000, limit: 30, page });
            res.totalPage === page && setHiddenButton(true);
            res.success && setProduct((p) => [...p, ...res.products]);
        };
        fetchProducts();
    }, [page, optionTab]);

    return (
        <div className="w-full h-full ">
            <Header optionTab={optionTab} setOptionTab={setOptionTab} />
            <Body hiddenButton={hiddenButton} products={products} setPage={setPage} />
        </div>
    );
};

export default Products;
