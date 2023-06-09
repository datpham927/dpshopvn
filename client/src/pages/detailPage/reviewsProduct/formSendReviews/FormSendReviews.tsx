import React, { SetStateAction, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { apiPostComment } from '../../../../services/apiReviews';
import { ButtonOutline, showNotification } from '../../../../component';
import { setOpenLogin } from '../../../../redux/features/action/actionSlice';
import { apiUploadImage } from '../../../../services/apiUploadPicture';
import { ProductDetail, Review } from '../../../../interfaces/interfaces';
import { ratingReview } from '../../../../utils/const';

interface SendReviewsProps {
    setReviews?: React.Dispatch<React.SetStateAction<Review[]>>;
    productDetail: ProductDetail;
    setOpenFormReview?: React.Dispatch<SetStateAction<boolean>>;
}

const FormSendReviews: React.FC<SendReviewsProps> = ({ setReviews, productDetail, setOpenFormReview }) => {
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<Array<string>>([]);
    const [rating, setRating] = useState<number>(0);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const { isLoginSuccess } = useAppSelector((state) => state.auth);

    // ----------- handel upload image -----------
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setIsLoad(true);
        if (!files) return;
        const formData = new FormData();
        for (const i of files) {
            formData.append('file', i);
            formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET);
            const response = await apiUploadImage(formData);
            setImageUrl((i) => [...i, response.url]);
        }
        setIsLoad(false);
    };
    // ------- summit -----------
    const handleSummit = async (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        if (!isLoginSuccess) {
            dispatch(setOpenLogin(true));
            return;
        }
        if (isLoad) {
            showNotification('Đang tải ảnh vui lòng chờ đợi it phút!', true);
            return;
        }
        if (!valueInput) {
            showNotification('Vui lòng nhập nhận xét!', true);
            return;
        }

        const res = await apiPostComment({ comment: valueInput, images: imageUrl, rating: 0 }, productDetail._id);
        if (!res.success) {
            showNotification('Đánh giá không thành công!', true);
            return;
        }
        setReviews && setReviews((e) => [{ ...res.comment, userId: user }, ...e]);
        setOpenFormReview && setOpenFormReview(false);
        showNotification('Đánh giá thành công!', true);
    };

    return (
        <div
            className="fixed flex justify-center items-center w-screen h-screen right-0 top-0 bg-overlay z-[900]"
            onClick={(e) => {
                e.stopPropagation();
                setOpenFormReview && setOpenFormReview(false);
            }}
        >
            <div
                className="flex flex-col w-1/2 h-auto bg-white p-4 rounded-md gap-6"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenFormReview && setOpenFormReview(true);
                }}
            >
                <div className="flex justify-between">
                    <h3 className="text-xl ">Nhận xét</h3>
                    <span
                        className="cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenFormReview && setOpenFormReview(false);
                        }}
                    >
                        <CloseIcon />
                    </span>
                </div>
                <div className="flex justify-center items-center w-10/12 mx-auto gap-3">
                    <img className="h-20 w-20" src={productDetail.image_url} />
                    <span className="text-sm">{productDetail.title}</span>
                </div>
                <ul className="flex gap-2 justify-center">
                    {ratingReview.map((s) => (
                        <div
                            className="flex flex-col justify-center items-center gap-1 text-[rgb(243,153,74)] cursor-pointer"
                            onClick={() => {
                                if (productDetail.userBought.includes(user._id)) {
                                    setRating(s.start);
                                } else {
                                    showNotification('Bạn không được phép đánh giá');
                                }
                            }}
                        >
                            {s.start <= rating ? (
                                <StarRateIcon style={{ fontSize: '40px', color: '#rgb(243,153,74)' }} />
                            ) : (
                                <StarOutlineIcon style={{ fontSize: '40px', color: '#rgb(243,153,74)' }} />
                            )}
                            <span className={`text-xs ${s.start === rating ? 'font-bold' : 'font-medium'} `}>
                                {s.text}
                            </span>
                        </div>
                    ))}
                    <li></li>
                </ul>
                {/* -------- input ----------*/}
                <div className="flex flex-col border-solid border-[1px] border-gray-300 rounded-md py-1 w-10/12 mx-auto">
                    <textarea
                        placeholder="Nhận xét sản phẩm ... "
                        rows={3}
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                        className="outline-none flex-1 resize-none px-3  "
                    />
                    <div className="flex  w-full justify-center  border-solid border-t-[1px] border-gray-300 ">
                        <input id="comment_input" type="file" multiple hidden onChange={handleImageUpload} />
                        <label htmlFor="comment_input">
                            <InsertPhotoIcon fontSize="large" style={{ color: 'green' }} />
                        </label>
                    </div>
                    {/* ------------ show image ------------- */}
                    {imageUrl.length > 0 && (
                        <div className="w-full h-[100px] overflow-scroll ">
                            <ul className="grid grid-cols-6 gap-3 px-4 ">
                                {imageUrl.map((image) => (
                                    <li className="relative w-full h-[60px] border-solid border-[1px] my-4 border-bgSecondary ">
                                        <img className="w-full h-full object-fill" src={image} />
                                        <span
                                            className="absolute top-0 right-1 cursor-pointer"
                                            onClick={() => setImageUrl((images) => images.filter((i) => i !== image))}
                                        >
                                            <CloseIcon style={{ fontSize: '25px', color: '#C8C8CB' }} />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* ------- button ------------ */}
                <div className="flex gap-2 items-center mt-6">
                    <ButtonOutline
                        //
                        // isLoad &&
                        className={`text-base h-fit mx-auto bg-primary text-white ${
                            isLoad || !valueInput ? 'opacity-60' : ''
                        }`}
                        onClick={handleSummit}
                    >
                        Gửi bình luận
                    </ButtonOutline>
                </div>
            </div>
        </div>
    );
};

export default FormSendReviews;
