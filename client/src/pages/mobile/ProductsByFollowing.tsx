import React, { useEffect, useState } from 'react';
import { getAllProductFollowings } from '../../services/apiProduct';
import { IProductItem } from '../../interfaces/interfaces';
import { useAppSelector } from '../../redux/hooks';
import { ProductItem, SkeletonProducts } from '../../component';
import NotExit from '../../component/common/NotExit';

const ProductsByFollowing = () => {
    const [products, setProducts] = useState<IProductItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isLoginSuccess } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            const res = await getAllProductFollowings({ limit: 20 });
            setIsLoading(false);
            res.success && setProducts(res.products);
        };
        isLoginSuccess && fetchProducts();
    }, [isLoginSuccess]);

    return products?.length > 0 ? (
        <div
            className={`${!isLoading ? 'grid mobile:grid-cols-2 tablet:grid-cols-4' : 'w-full h-full'} bg-white py-5 `}
        >
            {!isLoading? (
                products.map((p) => <ProductItem key={p?._id} props={p} />)
            ) : (
                <SkeletonProducts index={12} />
            )}
        </div>
    ) : (
        <NotExit />
    );
};

export default ProductsByFollowing;
