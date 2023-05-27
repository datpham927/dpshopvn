import React, { useEffect, useState } from 'react';
import { searchUtility } from '../../../utils/const';
import { getAllProduct } from '../../../services/apiProduct';
import { CartProduct } from '../../../interfaces/interfaces';
import ProductItem from '../../../component/productItem/ProductItem';

const Products: React.FC = () => {
    const [products, setProduct] = useState<CartProduct[]>([]);
    const [hiddenButton, setHiddenButton] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllProduct({ limit:30, page });
            res.totalPage === page && setHiddenButton(true);
            res.success && setProduct((p) => [...p, ...res.products]);
        };
        fetchProducts();
    }, [page]);
    return (
        <div className="w-full h-full ">
            <div className="flex flex-col gap-1 w-full h-full mt-[-15px]  sticky top-0 right-0 bg-background_primary pt-4 pb-1  z-100">
                <div className="px-4 py-2 rounded-sm text-xl font-normal bg-white">Gợi ý hôm nay</div>
                <div className="grid grid-cols-8 gap-4 ">
                    {searchUtility.map((e) => (
                        <div className="flex flex-col gap-1 p-1 bg-white rounded-[4px] justify-center items-center cursor-pointer border-[1px] border-transparent border-solid hover:border-primary">
                            <img className="w-[50px]" src={e.image} />
                            <span className="text-sm text-primary">{e.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col bg-white pb-8 gap-10">
                <div className="grid grid-cols-6 ">
                    {products.map((p) => (
                        <ProductItem key={p._id} props={p} />
                    ))}
                </div>
                {!hiddenButton && (
                    <button
                        onClick={() => setPage((p) => (p += 1))}
                        className="w-1/6 outline-none mx-auto text-xl rounded-sm py-1 px-3 bg-primary text-white hover:opacity-80  "
                    >
                        Xem thêm
                    </button>
                )}
            </div>
        </div>
    );
};

export default Products;
