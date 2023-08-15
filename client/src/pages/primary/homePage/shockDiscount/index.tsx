import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import { dealFlashIcon } from '../../../../assets';
import { getAllProduct } from '../../../../services/apiProduct';
import { IProductItem } from '../../../../interfaces/interfaces';
import { CartShockDiscount, SkeletonProducts } from '../../../../component';
import { Skeleton } from '@mui/material';
import { useAppSelector } from '../../../../redux/hooks';

const ShockDiscount: React.FC = () => {
    const [products, setProducts] = useState<IProductItem[]>([]);
    const { mobile_ui } = useAppSelector((state) => state.action);
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllProduct({ sort: '-discount', limit: 10 });
            res.success && setProducts(res.products);
        };
        fetchProducts();
    }, []);

    return (
        <div
            id="sock-discount"
            className="flex flex-col w-full h-auto py-3  px-4 bg-white rounded-md overflow-hidden gap-4"
        >
            <div className="w-full h-full flex justify-between ">
                {products.length > 0 ? (
                    <div className="flex  h-auto gap-3 items-center">
                        <p className="text-2xl h-full font-medium text-[rgb(255,125,29)] italic ">Giảm giá sốc</p>
                        <img className="w-[20px] h-[20] animate-active-flash mt-1 " src={dealFlashIcon} />
                    </div>
                ) : (
                    <Skeleton variant="text" width={'200px'} height={'60px'} />
                )}
            </div>
            <div className="relative">
                {products.length > 0 ? (
                    <Swiper
                        loop={false}
                        allowTouchMove={false}
                        slidesPerGroup={3}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            1: {
                                slidesPerView: 2,
                                slidesPerGroup: 1,
                                allowTouchMove: true,
                            },
                            740: {
                                slidesPerView: 4,
                                slidesPerGroup: 2,
                            },
                            1024: {
                                slidesPerView: 6,
                                slidesPerGroup: 3,
                            },
                        }}
                    >
                        {products.map((p) => {
                            return (
                                <SwiperSlide key={uuidv4()}>
                                    <CartShockDiscount key={p._id} product={p} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <SkeletonProducts index={mobile_ui ? 2 : 6} />
                )}
            </div>
        </div>
    );
};

export default ShockDiscount;
