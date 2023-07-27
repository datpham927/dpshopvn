import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProductItem from '../../../../component/item/ProductItem';
import { IProductItem } from '../../../../interfaces/interfaces';

interface props{
    products:IProductItem[],
    hiddenButton:boolean,
    setPage:React.Dispatch<React.SetStateAction<number>>
}

const ListProducts:React.FC<props> = ({products,hiddenButton,setPage}) => {
    return (
        <div className="flex flex-col bg-white pb-8 gap-10">
            <div className="grid grid-cols-6 ">
                {products.map((p, index) => (
                    <ProductItem key={uuidv4()} props={p} scrollIntoView={index === 0} />
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
    );
};

export default ListProducts;
