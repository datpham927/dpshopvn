import React, { useEffect, useState } from 'react';
import { apiDeleteComment, getAllReviewsById } from '../../../services/apiReviews';
import { ProductDetail, Review } from '../../../interfaces/interfaces';
import { formatStar } from '../../../utils/formatStar';
import { ButtonOutline, ReviewItem, showNotification } from '../../../component';
import FormSendReviews from './formSendReviews/FormSendReviews';

const ReviewsProduct: React.FC<{ productDetail: ProductDetail; userBought: Array<string> }> = ({
    productDetail,
    userBought,
}) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [openFormReview, setOpenFormReview] = useState<boolean>(false);

    useEffect(() => {
        const fetchApiReview = async () => {
            const res = await getAllReviewsById(productDetail._id);
            res.success && setReviews(res.data);
        };
        productDetail && fetchApiReview();
    }, [productDetail]);
    const handleDeleteComment = async (cId: string) => {
        const res = await apiDeleteComment(cId);
        res.success && showNotification('Xóa thành công', true);
        setReviews(() => reviews?.filter((rv) => rv._id !== cId));
    };
    const showStar =
        'px-7 text-lg  text-red_custom font-normal bg-white capitalize border-slate-300 hover:bg-opacity-100';
    return (
        <div className="flex flex-col gap-4 bg-white  py-4 px-6">
            <div className="flex flex-col w-full  gap-4 ">
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

            {/* ---------- input */}
            <ButtonOutline className="w-4/12 mx-auto" onClick={() => setOpenFormReview(true)}>
                Gửi đánh giá
            </ButtonOutline >
            {openFormReview && <FormSendReviews setReviews={setReviews} productDetail={productDetail} setOpenFormReview={setOpenFormReview} />}
            {/* ------------------- */}
            <div className="flex flex-col w-full gap-6 rounded-sm">
                {reviews?.map((e) => {
                    return (
                        <ReviewItem
                            key={e?._id}
                            review={e}
                            isBought={userBought.includes(e?.userId?._id)}
                            handleDelete={() => handleDeleteComment(e?._id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewsProduct;
