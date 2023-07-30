import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import { getAllProductFollowings } from '../../../../services/apiProduct';
import { IProductItem } from '../../../../interfaces/interfaces';
import { ProductItem } from '../../../../component';
import { useAppSelector } from '../../../../redux/hooks';

const ProductFollowings: React.FC = () => {
    const [products, setProducts] = useState<IProductItem[]>([]);
    const { isLoginSuccess } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllProductFollowings({ limit: 20 });
            res.success && setProducts(res.products);
        };
        isLoginSuccess && fetchProducts();
    }, [isLoginSuccess]);

    return (
        <>
            {products.length > 0 && (
                <div
                    id="sock-discount"
                    className="flex flex-col w-full h-auto py-3  px-4 bg-white rounded-md overflow-hidden gap-4"
                >
                    <div className="w-full h-full flex justify-between ">
                        <div className="flex  h-auto gap-3 items-center">
                            <p className="text-2xl h-full font-medium text-[rgb(255,125,29)] italic ">Theo dõi</p>
                        </div>
                    </div>
                    <div className="relative">
                        <Swiper
                            slidesPerView={6}
                            loop={false}
                            allowTouchMove={false}
                            slidesPerGroup={3}
                            navigation={true}
                            modules={[Navigation]}
                            className="mySwiper"
                        >
                            {products?.map((p) => {
                                return (
                                    <SwiperSlide key={uuidv4()}>
                                        <ProductItem key={p?._id} props={p} />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductFollowings;
