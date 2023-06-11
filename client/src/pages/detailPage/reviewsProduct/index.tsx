import React, { useEffect, useState } from 'react';
import { apiDeleteComment, getAllReviewsById } from '../../../services/apiReviews';
import { ProductDetail, Review } from '../../../interfaces/interfaces';
import { formatStar } from '../../../utils/formatStar';
import { ButtonOutline, FormReviews, ReviewItem, showNotification } from '../../../component';
const ReviewsProduct: React.FC<{ productDetail: ProductDetail | any; userBought: Array<string> | any }> = ({
    productDetail,
    userBought,
}) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [openFormReview, setOpenFormReview] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [productEdit, setProductEdit] = useState<Review | any>();

    useEffect(() => {
        const fetchApiReview = async () => {
            const res = await getAllReviewsById(productDetail._id);
            res.success && setReviews(res.data);
        };
        productDetail && fetchApiReview();
    }, [productDetail]);

    const handleDeleteComment = async (cId: string) => {
        const res = await apiDeleteComment(cId);
        if (!res.success) {
            showNotification('Xóa không thành công', true);
            return;
        }
        showNotification('Xóa thành công', true);
        setReviews(() => reviews?.filter((rv) => rv._id !== cId));
    };
    const handleEditComment = () => {
        setOpenFormReview(true);
        setIsEdit(true);
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
            <ButtonOutline
                className="w-4/12 mx-auto"
                onClick={() => {
                    setOpenFormReview(true);
                    setIsEdit(false)
                    setProductEdit([]);
                }}
            >
                Gửi đánh giá
            </ButtonOutline>
            {openFormReview && (
                <FormReviews
                    isEdit={isEdit}
                    title={`${isEdit ? 'Chỉnh sửa' : 'Nhận xét'}`}
                    titleButton={` ${isEdit ? 'Cập nhật' : 'Gửi bình luận'}`}
                    setReviews={setReviews}
                    reviews={reviews}
                    productEdit={productEdit}
                    productDetail={productDetail}
                    setOpenFormReview={setOpenFormReview}
                />
            )}
            {/* ------------------- */}
            <div className="flex flex-col w-full gap-6 rounded-sm">
                {reviews?.map((e) => {
                    return (
                        <ReviewItem
                            key={e?._id}
                            review={e}
                            isBought={userBought?.includes(e?.userId?._id)}
                            handleDelete={() => handleDeleteComment(e?._id)}
                            handleEdit={() => {
                                setProductEdit(e);
                                handleEditComment();
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewsProduct;
