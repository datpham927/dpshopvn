import React, { useEffect, useState } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { getAllReviewsById } from '../../../services/apiReviews';
import { Review } from '../../../interfaces/interfaces';
import ReviewItem from '../../../component/reviewItem/ReviewItem';
import { formatStar } from '../../../utils/formatStar';
import ButtonOutline from '../../../component/buttonOutline/ButtonOutline';

const ReviewsProduct: React.FC<{ pid: string; userBought: Array<string> }> = ({ pid, userBought }) => {
    const [reviews, setReviews] = useState<Review[]>();
    useEffect(() => {
        const fetchApiReview = async () => {
            const res = await getAllReviewsById(pid);
            res.success && setReviews(res.data);
        };
        pid && fetchApiReview();
    }, [pid]);
    const showStar =
        'px-7 text-lg  text-red_custom font-normal bg-white capitalize border-slate-300 hover:bg-opacity-100';
    return (
        <div className="flex flex-col gap-4 bg-white  py-4 px-6">
            <div className="flex flex-col w-full p-3 gap-4 ">
                <h1 className="text-xl font-normal">ĐÁNH GIÁ SẢN PHẨM</h1>
                <div className="flex items-center bg-blue-50 p-6 gap-10  border-solid border-[1px]  border-blue-200 rounded-sm ">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <h2 className="text-2xl text-red_custom">4.7 trên 5</h2>
                        <div> {formatStar(4.7, '25px')}</div>
                    </div>
                    <div className="flex gap-5">
                        <ButtonOutline className={showStar}>Tất cả</ButtonOutline>
                        <ButtonOutline className={showStar}>5 sao</ButtonOutline>
                        <ButtonOutline className={showStar}>4 sao</ButtonOutline>
                        <ButtonOutline className={showStar}>3 sao</ButtonOutline>
                        <ButtonOutline className={showStar}>2 sao</ButtonOutline>
                        <ButtonOutline className={showStar}>1 sao</ButtonOutline>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full gap-6 rounded-sm">
                {reviews?.map((e) => {
                    console.log(userBought.includes(e.userId._id));
                    return <ReviewItem key={e._id} review={e} isBought={userBought.includes(e.userId._id)} />;
                })}
            </div>
            <div className="flex gap-2 group  border-solid border-[1px] border-bgSecondary rounded-sm px-3 py-1">
                <textarea placeholder="Nhận xét sản phẩm ... " rows={3} className="outline-none flex-1   resize-none " />
                <div className="flex gap-2 items-center">
                    <button>
                        <InsertPhotoIcon style={{ color: 'green' }} />
                    </button>
                    <ButtonOutline className='text-base h-fit'>Gửi bình luận</ButtonOutline>
                </div>
            </div>
        </div>
    );
};

export default ReviewsProduct;
