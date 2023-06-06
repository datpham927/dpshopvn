import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DoneIcon from '@mui/icons-material/Done';
import MoodIcon from '@mui/icons-material/Mood';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Review } from '../../interfaces/interfaces';
import { formatStar } from '../../utils/formatStar';
import { noUser } from '../../assets';
import moment from 'moment';
import 'moment/dist/locale/vi';
import { useAppSelector } from '../../redux/hooks';
import { apiLikeProduct, apiUnlikeComment } from '../../services/apiReviews';
import ButtonOutline from '../buttonOutline/ButtonOutline';

const ReviewItem: React.FC<{ review: Review; isBought: boolean }> = ({ review, isBought }) => {
    const { comment, createdAt, images, likes, _id, rating, userId } = review;
    const user = useAppSelector((state) => state.user);
    const [likesReviews, setLikesReviews] = useState<string[]>(likes);
    moment.locale('vi');

    const handleLike = async () => {
        if (likesReviews.includes(user._id)) {
            setLikesReviews(() => likesReviews.filter((e) => e != user._id));
            await apiUnlikeComment(_id);
        } else {
            setLikesReviews((e) => [...e, user._id]);
            await apiLikeProduct(_id);
        }
    };
    return (
        <div className="w-full h-full px-6 py-4 border-b-[1px] border-solid border-b-slate-200">
            <div className="flex w-full h-full gap-3">
                <div className="w-9 h-9 rounded-full shrink-0 overflow-hidden">
                    <img
                        className="w-full h-full block object-contain"
                        src={userId.avatar_url ? userId.avatar_url : noUser}
                    />
                </div>
                <div className="flex flex-col justify-center gap-3">
                    <div className="flex flex-col justify-center gap-1">
                        <div className="flex gap-3 items-center">
                            <h3 className="text-sm font-medium">
                                {userId.firstName
                                    ? `${userId.lastName} ${userId.firstName}`
                                    : userId.email.split('@')[0]}
                            </h3>

                            <span className="flex  text-[10px] items-center  p-1 rounded-sm  border-[1px] border-solid border-primary text-primary">
                                <span className="flex items-center gap-1">
                                    {isBought ? (
                                        <>
                                            <DoneIcon style={{ fontSize: '15px' }} />
                                            Đã mua hàng
                                        </>
                                    ) : (
                                        <>
                                            <MoodIcon style={{ fontSize: '15px' }} />
                                            Chưa mua hàng
                                        </>
                                    )}
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center">{formatStar(rating, '15px')}</div>
                        <span className="text-xs text-text_secondary ">
                            {moment(createdAt).format('DD-MM-YYYY hh:mm')}
                        </span>
                    </div>
                    <div className="flex flex-col w-full h-full  gap-2">
                        <span className="text-base text-capitalize">{comment} </span>
                        <ul className="w-[444px] ">
                            <Swiper
                                slidesPerView={2}
                                loop={false}
                                allowTouchMove={false}
                                navigation={true}
                                spaceBetween={5}
                                modules={[Navigation]}
                                className="mySwiper"
                            >
                                {images?.map((i) => (
                                    <SwiperSlide>
                                        <div className="w-full h-full">
                                            <img className="w-full h-full object-contain" src={i} />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </ul>
                    </div>
                    <div className="flex gap-6">
                        <ButtonOutline onClick={handleLike}>
                            {likesReviews.includes(user._id) ? (
                                <ThumbUpAltIcon fontSize="small" />
                            ) : (
                                <ThumbUpOffAltIcon fontSize="small" />
                            )}
                            Hữu ích <span>{likesReviews.length}</span>
                        </ButtonOutline>

                        {user._id === userId._id && (
                            <div className="flex gap-4">
                                <button className="text-sm hover:text-primary">Chỉnh sửa</button>
                                <button className="text-sm hover:text-primary">Xóa</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;
