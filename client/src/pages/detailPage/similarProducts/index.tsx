import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import { getAllProduct } from '../../../services/apiProduct';
import { CardProductItem } from '../../../interfaces/interfaces';
import { ProductItem } from '../../../component';

export const SimilarProducts: React.FC<{ category_code: string }> = ({ category_code }) => {
    const [products, setProducts] = useState<CardProductItem[]>([]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllProduct({ category_code: category_code });
            res.success && setProducts(res.products);
        };
        category_code && fetchApi();
    }, [category_code]);
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
                    {products?.map((item) => {
                        return (
                            <SwiperSlide key={uuidv4()}>
                                <ProductItem key={item._id} props={item} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};
