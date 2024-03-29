import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { getAllProduct } from '../../../../services/apiProduct';
import { Link } from 'react-router-dom';
import { imgBanner1, imgBanner2 } from '../../../../assets';
import { Skeleton } from '@mui/material';
import { useAppSelector } from '../../../../redux/hooks';
const Banner: React.FC = () => {
    const IMAGE_BANNER = [
        { category_slug: 'Gia-Vi-va-Che-Bien', category_code: 'GAAIAG', img_url: imgBanner1 },
        { category_slug: 'Bo-qua-tang', category_code: 'OBOAUQ', img_url: imgBanner2 },
    ];
    const [products, setProducts] = useState<
        Array<{
            _id: string;
            slug: string;
            image_url: string;
        }>
    >([]);
   const {mobile_ui}=useAppSelector(state=>state.action)

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllProduct({ limit: 10, sort: '-sold' });
            res.success && setProducts(res.products);
        };
        fetchProducts();
    }, []);

    return (
        <div className="flex tablet:col  w-full h-full gap-1 mt-4">
            <div className="flex tablet:w-full w-[74%]  h-full  rounded-md overflow-hidden">
                {products?.length > 0 ? (
                    <Swiper
                        centeredSlides={true}
                    
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        loop={true}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            1: {
                                slidesPerGroup: 1,
                                allowTouchMove: true,
                            },
                            1024: {
                                allowTouchMove: false,
                            },
                        }}
                    >
                        {IMAGE_BANNER?.map((i) => {
                            return (
                                <SwiperSlide key={uuidv4()}>
                                    <Link
                                        to={`/danh-muc/${i.category_slug}/${i.category_code}`}
                                        className="w-full h-full shrink-0 "
                                    >
                                        <img className="w-full h-full object-fill" src={i.img_url} />
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <Skeleton variant={'rectangular'} width={'100%'} height={mobile_ui?"150px":'304px'} />
                )}
            </div>
            <div className=" tablet:hidden w-[26%] h-full  pl-4">
                {products?.length>0 ? (
                    <Swiper
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        allowTouchMove={false}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {products?.map((i) => {
                            return (
                                <SwiperSlide key={uuidv4()}>
                                    <Link
                                        to={`/${i.slug}/${i._id}`}
                                        className="w-full object-fill rounded-lg overflow-hidden "
                                    >
                                        <img className="w-full object-fill" src={i?.image_url} />
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <Skeleton variant={'rectangular'} width={'100%'} height={'304px'} />
                )}
            </div>
        </div>
    );
};

export default Banner;
