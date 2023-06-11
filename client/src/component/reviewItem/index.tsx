import React, { memo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MoodIcon from '@mui/icons-material/Mood';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Review } from '../../interfaces/interfaces';
import { formatStar } from '../../utils/formatStar';
import { noUser } from '../../assets';
import moment from 'moment';
import 'moment/dist/locale/vi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { apiLikeProduct, apiUnlikeComment } from '../../services/apiReviews';
import { setOpenFeatureAuth } from '../../redux/features/action/actionSlice';
import { ButtonOutline } from '..';
import { ratingReview } from '../../utils/const';

interface ReviewsProps {
    review: Review;
    isBought: boolean;
    handleDelete?: () => void;
    handleEdit?: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const ReviewItem: React.FC<ReviewsProps> = ({ review, isBought, handleDelete, handleEdit }) => {
    moment.locale('vi');
    const { comment, createdAt, images, likes, _id, rating, userId } = review;
    const user = useAppSelector((state) => state.user);
    const [likesReviews, setLikesReviews] = useState<string[]>(likes);
    const dispatch = useAppDispatch();
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const { isAdmin } = useAppSelector((state) => state.user);

    const handleLike = async () => {
        if (!isLoginSuccess) {
            dispatch(setOpenFeatureAuth(true));
            return;
        }
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
                {/* --------- user --------- */}
                <div className="w-3/12 flex gap-3 items-start">
                    <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden">
                        <img
                            className="w-full h-full block object-contain"
                            src={userId?.avatar_url ? userId?.avatar_url : noUser}
                        />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <div className="flex gap-3 items-center">
                            <h3 className="text-base font-medium">
                                {userId?.firstName
                                    ? `${userId?.lastName} ${userId?.firstName}`
                                    : userId?.email?.split('@')[0]}
                            </h3>
                            {isAdmin && user._id === userId?._id && (
                                <span className="text-[10px] items-center  py-[1px] px-1 rounded-sm  border-[1px] border-solid border-red_custom text-red_custom">
                                    admin
                                </span>
                            )}
                        </div>

                        <span className="text-xs text-text_secondary ">
                            Đã tham gia {moment(userId?.createdAt).fromNow()}
                        </span>
                    </div>
                </div>
                {/* ---------- content ----- */}
                <div className="w-9/12 flex flex-col pr-6 justify-center gap-3">
                    <div className="flex flex-col w-full h-full gap-2 ">
                        {isBought && (
                            <div className="flex w-full h-full  gap-2 items-center">
                                <div className="flex ">{formatStar(rating, '20px')}</div>
                                <span className="text-sm">{ratingReview?.find((r) => r.start === rating)?.text}</span>
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
                   <span className="text-base text-capitalize">{comment} </span>
                        <ul className="w-full h-full">
                            <Swiper
                                slidesPerView={4}
                                loop={false}
                                allowTouchMove={false}
                                navigation={true}
                                spaceBetween={20}
                                modules={[Navigation]}
                                className="mySwiper"
                            >
                                {images?.map((i) => (
                                    <SwiperSlide>
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
                            className={`${likesReviews?.includes(user._id) && 'bg-bgSecondary border-transparent'}`}
                            onClick={handleLike}
                        >
                            {likesReviews?.includes(user._id) ? (
                                <ThumbUpAltIcon fontSize="small" />
                            ) : (
                                <ThumbUpOffAltIcon fontSize="small" />
                            )}
                            Hữu ích <span>{likesReviews?.length}</span>
                        </ButtonOutline>
                        {(user._id === userId?._id || user.isAdmin) && (
                            <div className="flex gap-6 text-primary ">
                                {user._id === userId?._id && (
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

export default memo(ReviewItem);
