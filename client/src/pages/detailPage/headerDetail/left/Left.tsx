import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { iconFacebook, iconCopy, iconMessenger } from '../../../../assets';

const Left: React.FC<{ productImage: Array<string>; imageUrl: string }> = ({ productImage, imageUrl }) => {
    const [imagePrimary, setImagePrimary] = useState<string>(imageUrl);
    useEffect(() => {
        setImagePrimary(imageUrl);
    }, [imageUrl]);
    return (
        <div className="flex flex-col  rounded-l-md overflow-hidden p-4 gap-4 border-r-[1px] border-solid  border-gray-300 ">
            <img className="w-[444px] h-[444px]" src={imagePrimary} />
            <ul className="w-[444px]">
                <Swiper
                    slidesPerView={6}
                    loop={false}
                    allowTouchMove={false}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {productImage?.map((i) => (
                        <SwiperSlide>
                            <li
                                className={`w-16 h-16 cursor-pointer ${
                                    imagePrimary === i && 'border-[2px] border-solid border-primary'
                                }`}
                                onMouseEnter={() => setImagePrimary(i)}
                            >
                                <img className="block w-full h-full" src={i} />
                            </li>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </ul>
            <div className="flex gap-2 items-center">
                <span className="font-normal">Chia sẻ :</span>
                <span className="cursor-pointer">
                    <img src={iconFacebook} />
                </span>
                <span className="cursor-pointer">
                    <img src={iconMessenger} />
                </span>
                <span className="cursor-pointer">
                    <img src={iconCopy} />
                </span>
            </div>
        </div>
    );
};

export default Left;
