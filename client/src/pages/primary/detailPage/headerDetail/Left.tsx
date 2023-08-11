import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { v4 as uuidv4 } from 'uuid';
import { iconCopy, iconFacebook, iconMessenger } from '../../../../assets';

const Left: React.FC<{ productImage: Array<string>; imageUrl: string }> = ({ productImage, imageUrl }) => {
    const [imagePrimary, setImagePrimary] = useState<string>(imageUrl);
    useEffect(() => {
        setImagePrimary(imageUrl);
    }, [imageUrl]);
    return (
        <div className="flex flex-col tablet:w-full rounded-l-md overflow-hidden p-4 gap-4 border-r-[1px] border-solid  border-gray-300 ">
            <div className="tablet:w-full tablet:h-full w-[444px] h-[444px]">
                <img className="w-full h-full object-cover" src={imagePrimary} />
            </div>
            <ul className="w-[444px]">
                <Swiper
                    loop={false}
                    allowTouchMove={false}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        1: {
                            slidesPerView: 5,
                            allowTouchMove: true,
                        },
                        740: {
                            slidesPerView: 4,
                            slidesPerGroup: 2,
                        },
                        1024: {
                            slidesPerView: 6,
                        },
                    }}
                >
                    {productImage?.map((i) => (
                        <SwiperSlide key={uuidv4()}>
                            <li
                                className={` w-16 h-16 cursor-pointer ${
                                    imagePrimary === i && 'border-[2px] border-solid border-primary'
                                }`}
                                onMouseEnter={() => setImagePrimary(i)}
                            >
                                <img className="w-full h-full object-cover" src={i} />
                            </li>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </ul>
            <div className="flex gap-2 items-center mt-4">
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
