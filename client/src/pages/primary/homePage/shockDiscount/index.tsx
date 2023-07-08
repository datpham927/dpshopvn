import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Navigation} from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import {dealFlashIcon} from '../../../../assets';
import { getAllProduct } from '../../../../services/apiProduct';
import { CardProductItem } from '../../../../interfaces/interfaces';
import { CartShockDiscount } from '../../../../component';

const ShockDiscount: React.FC = () => {
    const [products, setProducts] = useState<CardProductItem[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllProduct({ sort: '-discount', limit: 10 });
            res.success && setProducts(res.products);
        };
        fetchProducts();
    }, []);

    return (
        <div id="sock-discount" className="flex flex-col w-full h-auto py-3  px-4 bg-white rounded-md overflow-hidden gap-4">
            <div className="w-full h-full flex justify-between ">
                <div className="flex  h-auto gap-3 items-center">
                    <p className="text-2xl h-full font-medium text-[rgb(255,125,29)] italic ">Giảm giá sốc</p>
                    <img className="w-[20px] h-[20] animate-active-flash mt-1 " src={dealFlashIcon} />
                </div>
            </div>
            <div className='relative'>
                <Swiper
                    slidesPerView={6}
                    loop={false}
                    allowTouchMove={false}
                    slidesPerGroup={3}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {products.map((p) => {
                        return (
                            <SwiperSlide key={uuidv4()}>
                                <CartShockDiscount key={p._id} product={p} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
              
            </div>
        </div>
    );
};

export default ShockDiscount;
