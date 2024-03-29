import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import { getAllProduct } from '../../../../services/apiProduct';
import { IProductItem } from '../../../../interfaces/interfaces';
 
import { useParams } from 'react-router-dom';
import { ProductItem } from '../../../../component';

export const SimilarProducts: React.FC<{ category_code: string }> = ({ category_code }) => {
    const [products, setProducts] = useState<IProductItem[]>([]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllProduct({ category_code: category_code });
            res.success && setProducts(res.products);
        };
        category_code && fetchApi();
    }, [category_code]);
    const params = useParams();
    return (
        <>
            {products?.length > 0 && (
                <div className="flex flex-col p-3 rounded-sm bg-white gap-7 mt-5">
                    <div className="text-2xl  px-6">Sản Phẩm Tương Tự</div>
                    <div className="flex w-full h-full">
                        <Swiper
                            loop={false}
                            allowTouchMove={false}
                            navigation={true}
                            slidesPerGroup={3}
                            modules={[Navigation]}
                            className="mySwiper"
                            breakpoints={{
                                1: {
                                    slidesPerView:2,
                                    allowTouchMove: true,
                                },   740: {
                                    slidesPerView: 4,
                                    slidesPerGroup: 2,
                                },
                                1024: {
                                    slidesPerView: 6,
                                },
                            }}
                        >
                            {products?.map((item) => {
                                return (
                                    params.pid !== item._id && (
                                        <SwiperSlide key={uuidv4()}>
                                            <ProductItem props={item} />
                                        </SwiperSlide>
                                    )
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            )}
        </>
    );
};
