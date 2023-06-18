import React, { useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { apiDeleteComment, apiRatingsProduct, getAllReviewsById } from '../../../services/apiReviews';
import { ProductDetail, Review } from '../../../interfaces/interfaces';
import { formatStar } from '../../../utils/formatStar';
import { ButtonOutline, FormReviews, ReviewItem, showNotification } from '../../../component';
import { apiUpdateRatingProduct } from '../../../services/apiProduct';
import Pagination from '../../../component/pagination';

const ReviewsProduct: React.FC<{ productDetail: ProductDetail; userBought: Array<string> | any }> = ({
    productDetail,
    userBought,
}) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [openFormReview, setOpenFormReview] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [optionRating, setOptionRating] = useState<number>(0);
    const [starsByType, setStarsByType] = useState<Array<{ type: number; quantity: number }>>();
    const [ratings, setRatings] = useState<
        Array<{
            rating: number;
            _id: string;
        }>
    >([]);
    const [reviewEdit, setReviewEdit] = useState<Review | any>();

    // get all review by product id
    useEffect(() => {
        const fetchApiReview = async () => {
            const queries =
                optionRating !== 0
                    ? { rating: optionRating, limit: 10, page: currentPage }
                    : { limit: 10, page: currentPage };
            const res = await getAllReviewsById(productDetail._id, queries);
            if (!res.success) return;
            setReviews(res.data);
            setTotalPage(res.totalPage);
        };
        productDetail && fetchApiReview();
    }, [productDetail, optionRating, currentPage]);

    useEffect(() => {
        const fetchApiRatings = async () => {
            const response = await apiRatingsProduct(productDetail._id);
            if (!response.success) return;
            setRatings(response.data);
        };
        fetchApiRatings();
    }, [productDetail._id]);

    const handleDeleteComment = async (cid: string) => {
        const res = await apiDeleteComment(cid);
        if (!res.success) {
            showNotification('Xóa không thành công', true);
            return;
        }
        showNotification('Xóa thành công', true);
        setReviews(() => reviews?.filter((rv) => rv._id !== cid));
    };
    const handleEditComment = () => {
        setOpenFormReview(true);
        setIsEdit(true);
    };

    const averageRating = useMemo(() => {
        // Calculate the total rating by reducing the array of ratings
        const totalRating = ratings.reduce((total, e) => {
            // Ignore ratings with a value of 0
            if (e.rating !== 0) {
                return total + e.rating;
            }
            return total;
        }, 0);

        // Return the average rating by dividing the total rating by the number of ratings
        return Number((totalRating / ratings?.length).toFixed(1)) || 5;
    }, [ratings]);

    // update star for product after  product reviews
    useEffect(() => {
        const updateRatingProduct = async () => {
            await apiUpdateRatingProduct(productDetail._id, averageRating);
        };
        updateRatingProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [averageRating]);
    // --------------
    useEffect(() => {
        const arr = [];
        for (let i = 5; i >= 1; i--) {
            arr.push({
                type: i,
                quantity: ratings.filter((e) => e.rating === i)?.length,
            });
        }
        setStarsByType(arr);
    }, [ratings]);

    const reviewRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (currentPage > 0) {
            reviewRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [currentPage]);

    return (
        <div ref={reviewRef} className="flex flex-col gap-4 bg-white  py-4 px-6">
            <div className="flex flex-col w-full  gap-4 ">
                <h1 className="text-xl font-normal">Đánh giá sản phẩm</h1>
                <div className="flex items-center bg-blue-50 p-6 gap-10  border-solid border-[1px]  border-blue-200 rounded-sm ">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <h2 className="text-2xl text-red_custom">{averageRating} trên 5</h2>
                        <div> {formatStar(averageRating, '25px')}</div>
                    </div>
                    <div className="flex gap-5">
                        <button
                            className={`option-rating-review   ${optionRating === 0 ? 'border-primary' : ''} `}
                            onClick={() => setOptionRating(0)}
                        >
                            Tất cả ({ratings?.length})
                        </button>
                        {starsByType?.map((i) => (
                            <button
                                className={`option-rating-review  ${i.type === optionRating ? 'border-primary' : ''}`}
                                onClick={() => {
                                    setOptionRating(i.type);
                                    setCurrentPage(0);
                                }}
                            >
                                {i.type} sao ({i.quantity})
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ---------- input */}
            <ButtonOutline
                className="w-4/12 mx-auto"
                onClick={() => {
                    setOpenFormReview(true);
                    setIsEdit(false);
                    setReviewEdit([]);
                }}
            >
                Gửi đánh giá
            </ButtonOutline>

            {/* ------------------- */}
            {reviews.length > 0 ? (
                <div className="flex flex-col w-full gap-6 rounded-sm">
                    {reviews?.map((e) => {
                        return (
                            <ReviewItem
                                key={uuidv4()}
                                review={e}
                                isBought={userBought?.includes(e?.userId?._id)}
                                handleDelete={() => handleDeleteComment(e?._id)}
                                handleEdit={() => {
                                    setReviewEdit(e);
                                    handleEditComment();
                                }}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-[200px] bg-bgSecondary text-2xl font-semibold text-text_secondary">
                    Chưa có bài đánh giá nào
                </div>
            )}

            {/* ------------------------- */}
            {openFormReview && (
                <FormReviews
                    isEdit={isEdit}
                    title={`${isEdit ? 'Chỉnh sửa' : 'Nhận xét'}`}
                    titleButton={` ${isEdit ? 'Cập nhật' : 'Gửi bình luận'}`}
                    setReviews={setReviews}
                    reviews={reviews}
                    reviewEdit={reviewEdit}
                    productDetail={productDetail}
                    setOpenFormReview={setOpenFormReview}
                    setRatings={setRatings}
                />
            )}

            {totalPage > 0 && (
                <Pagination currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage} />
            )}
        </div>
    );
};

export default ReviewsProduct;
