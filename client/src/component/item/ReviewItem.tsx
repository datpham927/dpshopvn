import React, { memo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import moment from 'moment';
import 'moment/dist/locale/vi';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MoodIcon from '@mui/icons-material/Mood';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { v4 as uuidv4 } from 'uuid';
import { INotification, Review } from '../../interfaces/interfaces';
import { formatStar } from '../../utils/formatStar';
import { noUser } from '../../assets';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { apiLikeProduct, apiUnlikeComment } from '../../services/apiReviews';
import { setOpenFeatureAuth } from '../../redux/features/action/actionSlice';
import { ButtonOutline } from '..';
import { RATING_REVIEW } from '../../utils/const';
import { formatUserName } from '../../utils/formatUserName';
import { apiCreateNotification } from '../../services/apiNotification';
import { useLocation } from 'react-router-dom';

interface ReviewsProps {
    review: Review;
    isBought: boolean;
    handleDelete?: () => void;
    handleEdit?: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const ReviewItem: React.FC<ReviewsProps> = ({ review, isBought, handleDelete, handleEdit }) => {
    moment.locale('vi');
    const { comment, createdAt, images, likes, _id, rating, user } = review;
    const currentUser = useAppSelector((state) => state.user);
    const [likesReviews, setLikesReviews] = useState<string[]>(likes);
    const dispatch = useAppDispatch();
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const { isAdmin } = useAppSelector((state) => state.user);
    const { socketRef } = useAppSelector((state) => state.action);
    const location = useLocation();
    console.log( location.pathname + location.search)
    const handleLike = async () => {
        if (!isLoginSuccess) {
            dispatch(setOpenFeatureAuth(true));
            return;
        }
        if (likesReviews?.includes(currentUser._id)) {
            setLikesReviews(() => likesReviews.filter((e) => e != currentUser._id));
            await apiUnlikeComment(_id);
        } else {
            setLikesReviews((e) => [...e, currentUser._id]);
            const notification: INotification = {
                image_url: currentUser.avatar_url,
                shopId: user._id,
                title: 'Lượt like mới',
                userId: currentUser._id,
                user_name: formatUserName(currentUser),
                subtitle: `đã like bình luận của bạn`,
                link: location.pathname,
            };
            const response = await apiCreateNotification(notification);
            response.success && socketRef?.emit('sendNotification', response.data);
            await apiLikeProduct(_id);
        }
    };
    return (
        <div className="w-full h-full px-6 py-4 border-b-[1px] border-solid border-b-slate-200">
            <div className="flex tablet:flex-col w-full h-full gap-3">
                {/* --------- user --------- */}
                <div className="tablet:w-full laptop:w-3/12 flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden">
                        <img
                            className="w-full h-full block object-cover"
                            src={user?.avatar_url ? user?.avatar_url : noUser}
                        />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <div className="flex gap-3 items-center">
                            <h3 className="text-base font-medium">{formatUserName(user)}:</h3>
                            {isAdmin && currentUser._id === user?._id && (
                                <span className="text-[10px] items-center  py-[1px] px-1 rounded-sm  border-[1px] border-solid border-red_custom text-red_custom">
                                    admin
                                </span>
                            )}
                        </div>

                        <span className="text-xs text-text_secondary ">
                            Đã tham gia {moment(user?.createdAt).fromNow()}
                        </span>
                    </div>
                </div>
                {/* ---------- content ----- */}
                <div className="tablet:w-full laptop:w-9/12 flex flex-col pr-6 justify-center gap-3">
                    <div className="flex flex-col w-full h-full gap-2 ">
                        {isBought && (
                            <div className="flex w-full h-full  gap-2 items-center">
                                <div className="flex ">{formatStar(rating, '20px')}</div>
                                <span className="text-sm font-semibold">
                                    {RATING_REVIEW?.find((r) => r.start === rating)?.text}
                                </span>
                            </div>
                        )}

                        <div className="flex w-full h-full   ">
                            <span className="flex item-center font-semibold gap-1 text-[10px] items-center  py-[1px] px-1 rounded-sm  border-[1px] border-solid border-pink-500 text-pink-500">
                                {isBought ? (
                                    <>
                                        <MoodIcon style={{ fontSize: '12px' }} />
                                        Đã mua hàng
                                    </>
                                ) : (
                                    <>
                                        <MoodIcon style={{ fontSize: '12px' }} />
                                        Chưa mua hàng
                                    </>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full  gap-1">
                        <span className="text-sm text-capitalize">{comment} </span>
                        <ul className="w-full h-full">
                            <Swiper
                                loop={false}
                                allowTouchMove={false}
                                navigation={true}
                                spaceBetween={20}
                                modules={[Navigation]}
                                className="mySwiper"
                                breakpoints={{
                                    1: {
                                        slidesPerView: 1,
                                        slidesPerGroup: 1,
                                        allowTouchMove: true,
                                    },
                                    740: {
                                        slidesPerView: 2,
                                        slidesPerGroup: 2,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                        slidesPerGroup: 3,
                                    },
                                }}
                            >
                                {images?.map((i) => (
                                    <SwiperSlide key={uuidv4()}>
                                        <div className=" h-[200px]  mx-auto">
                                            <img className="w-full h-full object-contain block" src={i} />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </ul>
                        <span className="text-sm text-secondary">Đánh giá {moment(createdAt).fromNow()}</span>
                    </div>
                    <div className="flex w-full gap-6 mt-3">
                        <ButtonOutline
                            className={`${
                                likesReviews?.includes(currentUser._id) && 'bg-bgSecondary border-transparent'
                            }`}
                            onClick={handleLike}
                        >
                            {likesReviews?.includes(currentUser._id) ? (
                                <ThumbUpAltIcon fontSize="small" />
                            ) : (
                                <ThumbUpOffAltIcon fontSize="small" />
                            )}
                            Hữu ích <span>{likesReviews?.length}</span>
                        </ButtonOutline>
                        {(currentUser._id === user?._id || currentUser.isAdmin) && (
                            <div className="flex gap-6 text-primary ">
                                {currentUser._id === user?._id && (
                                    <button className="text-sm hover:opacity-80" onClick={handleEdit}>
                                        Chỉnh sửa
                                    </button>
                                )}
                                <button className="text-sm hover:opacity-80" onClick={handleDelete}>
                                    Xóa
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(ReviewItem);
