import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import { Autoplay, Pagination, Navigation } from 'swiper';
const Banners: React.FC = () => {
    const img = [
        'https://salt.tikicdn.com/cache/w1080/ts/tikimsp/5c/5d/59/46751c01995f0fd9db6dccf7a78ad1fa.png.webp',
        'https://salt.tikicdn.com/cache/w1080/ts/tikimsp/5c/5d/59/46751c01995f0fd9db6dccf7a78ad1fa.png.webp',
        'https://salt.tikicdn.com/cache/w1080/ts/tikimsp/5c/5d/59/46751c01995f0fd9db6dccf7a78ad1fa.png.webp',
        'https://salt.tikicdn.com/cache/w1080/ts/tikimsp/5c/5d/59/46751c01995f0fd9db6dccf7a78ad1fa.png.webp',
        'https://salt.tikicdn.com/cache/w1080/ts/tikimsp/5c/5d/59/46751c01995f0fd9db6dccf7a78ad1fa.png.webp',
    ];
    return (
        <div className="flex w-full h-full gap-1 mt-4">
            <div className="flex w-[74%]  h-full  rounded-md overflow-hidden">
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
                    allowTouchMove={false}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {img?.map((i) => {
                        return (
                            <SwiperSlide key={uuidv4()}>
                                <div className="w-full h-full shrink-0 ">
                                    <img className="w-full h-full object-fill" src={i} />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            <div className=" w-[26%] h-full  pl-4">
                <Swiper
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    allowTouchMove={false}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {img?.map((i) => {
                        return (
                            <SwiperSlide key={uuidv4()}>
                                <div className="w-full object-fill rounded-lg overflow-hidden ">
                                    <img
                                        className="w-full object-fill"
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/be/30/a7/fd2fdda081e6f59734ac4db0ed12d6ab.png.webp"
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
              
            </div>
        </div>
    );
};

export default Banners;
