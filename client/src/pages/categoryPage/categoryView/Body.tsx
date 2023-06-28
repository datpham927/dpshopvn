import React, { SetStateAction } from 'react';
import { NotFound, ProductItem, Pagination } from '../../../component';
import { CardProductItem } from '../../../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';

interface PropsInterface {
    products: CardProductItem[];
    currentPage: number;
    setPage: React.Dispatch<SetStateAction<number>>;
    totalPage: number;
}

const Body: React.FC<PropsInterface> = ({ products, currentPage, setPage, totalPage }) => {
    return (
        <div className="flex flex-col bg-white pb-8 gap-10">
            {products?.length !== 0 ? (
                <>
                    <div className="grid grid-cols-6 ">
                        {products.map((p, index) => (
                            <ProductItem key={uuidv4()} props={p} scrollIntoView={index === 0} />
                        ))}
                    </div>
                    {totalPage > 0 && (
                        <Pagination currentPage={currentPage} setCurrentPage={setPage} totalPage={totalPage} />
                    )}
                </>
            ) : (
                <div className="px-4 pt-6">
                    <NotFound>Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn</NotFound>
                </div>
            )}
        </div>
    );
};

export default Body;
