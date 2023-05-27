import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Navigation} from 'swiper';
import {dealFlashIcon} from '../../../assets';
import { getAllProduct } from '../../../services/apiProduct';
import { CartProduct } from '../../../interfaces/interfaces';
import { CartShockDiscount } from '../../../component';

const ShockDiscount: React.FC = () => {
    const [products, setProducts] = useState<CartProduct[]>([]);

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
                    <p className="text-3xl h-full font-medium text-[rgb(255,125,29)] italic ">Giảm giá sốc</p>
                    <img className="w-[20px] h-[20] animate-active-flash mt-1 " src={dealFlashIcon} />
                </div>
                <div className="text-primary text-xl cursor-pointer hover:opacity-80">Xem thêm</div>
            </div>
            <div className='relative'>
                <Swiper
                    slidesPerView={6}
                    loop={false}
                    allowTouchMove={false}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {products.map((p) => {
                        return (
                            <SwiperSlide>
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
