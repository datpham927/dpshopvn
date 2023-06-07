import React, { useEffect, useState } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import { apiDeleteComment, apiPostComment, getAllReviewsById } from '../../../services/apiReviews';
import { Review } from '../../../interfaces/interfaces';
import ReviewItem from '../../../component/reviewItem/ReviewItem';
import { formatStar } from '../../../utils/formatStar';
import ButtonOutline from '../../../component/buttonOutline/ButtonOutline';
import { apiUploadImage } from '../../../services/apiUploadPicture';
import { showNotification } from '../../../component';
const ReviewsProduct: React.FC<{ pid: string; userBought: Array<string> }> = ({ pid, userBought }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState<string>('');
    useEffect(() => {
        const fetchApiReview = async () => {
            const res = await getAllReviewsById(pid);
            res.success && setReviews(res.data);
        };
        pid && fetchApiReview();
    }, [pid]);

    const [imageUrl, setImageUrl] = useState<Array<string>>([]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setIsLoad(false);
        if (!files) return;
        const formData = new FormData();
        console.log(import.meta.env.VITE_REACT_UPLOAD_PRESET);
        for (const i of files) {
            formData.append('file', i);
            formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET);
            const response = await apiUploadImage(formData);
            setImageUrl((i) => [...i, response.url]);
        }
        setIsLoad(true);
    };

    const handleSummit = async () => {
        const res = await apiPostComment({ comment: valueInput, images: imageUrl, rating: 0 }, pid);
        if (!res.success) {
            showNotification('Đánh giá không thành công', true);
            return;
        }
        setReviews((e) => [...e, res.comment]);
    };
    const handleDeleteComment = async (cId: string) => {
        const res = await apiDeleteComment(cId);
        res.success && showNotification('Xóa thành công', true);
        setReviews(() => reviews?.filter((rv) => rv._id !== cId));
    };

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

            {isLoad && (
                <ul className="grid grid-cols-10 ">
                    {imageUrl.map((image) => (
                        <li className="relative w-[100px] h-[100px] border-solid border-[1px] my-4 border-bgSecondary ">
                            <img className="w-full h-full object-fill" src={image} />
                            <span
                                className="absolute top-0 right-1 cursor-pointer"
                                onClick={() => setImageUrl((images) => images.filter((i) => i !== image))}
                            >
                                <CloseIcon style={{ fontSize: '25px', color: 'blue' }} />
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex gap-2 group  border-solid border-[1px] border-bgSecondary rounded-sm px-3 py-1">
                <textarea
                    placeholder="Nhận xét sản phẩm ... "
                    rows={3}
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                    className="outline-none flex-1   resize-none "
                />

                <div className="flex gap-2 items-center">
                    <input id="comment_input" type="file" multiple hidden onChange={handleImageUpload} />
                    <label htmlFor="comment_input">
                        <InsertPhotoIcon style={{ color: 'green' }} />
                    </label>
                    <ButtonOutline
                        //  ${!isLoad ? 'opacity-60 cursor-wait' : ''
                        // isLoad &&
                        className={`text-base h-fit} `}
                        onClick={() => handleSummit()}
                    >
                        Gửi bình luận
                    </ButtonOutline>
                </div>
            </div>
        </div>
    );
};

export default ReviewsProduct;
