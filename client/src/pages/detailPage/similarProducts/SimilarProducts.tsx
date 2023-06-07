import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { getAllProduct } from '../../../services/apiProduct';
import { CardProduct } from '../../../interfaces/interfaces';
import ProductItem from '../../../component/productItem/ProductItem';

export const SimilarProducts: React.FC<{ categoryCode: string }> = ({ categoryCode }) => {
    const [products, setProducts] = useState<CardProduct[]>([]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllProduct({ categoryCode: categoryCode });
            res.success && setProducts(res.products);
        };
        categoryCode && fetchApi();
    }, [categoryCode]);
    return (
        <div className="flex flex-col p-3 rounded-sm bg-white gap-7 mt-5">
            <div className="text-2xl  px-6">Sản Phẩm Tương Tự</div>
            <div className="flex w-full h-full">
                <Swiper
                    slidesPerView={6}
                    loop={false}
                    allowTouchMove={false}
                    navigation={true}
                    slidesPerGroup={3}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {products.map((item) => {
                        return (
                            <SwiperSlide>
                                <ProductItem key={item._id} props={item} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};
