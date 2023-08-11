import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SEARCH_UTILITY } from '../../../../utils/const';
import { Skeleton } from '@mui/material';

interface PropsInterface {
    setOptionTab: React.Dispatch<React.SetStateAction<number>>;
    optionTab: number;
    isLoading: boolean;
}

const Header: React.FC<PropsInterface> = ({ setOptionTab, optionTab, isLoading = false }) => {
    return (
        <div className="flex flex-col  sticky top-0 right-0 gap-1 w-full h-full mt-[-15px] z-10 bg-background_primary pt-4 pb-1  z-100">
            {!isLoading ? (
                <div className="px-4 py-2 rounded-sm text-xl font-normal bg-white">Gợi ý hôm nay</div>
                ) : (
                <Skeleton variant="text" width={'200px'} height={'60px'} />
            )}
            <div className="w-full">
                <Swiper
                    allowTouchMove={false}
                    mousewheel={true}
                    loop={true}
                    spaceBetween={10}
                    breakpoints={{
                        1: {
                            slidesPerView: 2,
                            slidesPerGroup: 1,
                            allowTouchMove: true,
                        },
                        740: {
                            slidesPerView: 6,
                            slidesPerGroup: 2,
                        },
                        1024: {
                            slidesPerView: 10,
                            slidesPerGroup: 3,
                        },
                    }}
                >
                    {SEARCH_UTILITY.map((e) => (
                        <SwiperSlide>
                            <div
                                key={uuidv4()}
                                onClick={() => setOptionTab(e.id)}
                                className={`flex flex-col gap-1 p-1 ${
                                    optionTab == e.id ? 'bg-bgSecondary border-primary' : 'bg-white'
                                }  rounded-[4px] justify-center items-center cursor-pointer border-[1px] border-transparent border-solid  hover:border-primary`}
                            >
                                <img className="w-[50px]" src={e.image} />
                                <span className="text-sm text-primary truncate-trailing line-clamp-1">{e.title}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Header;
