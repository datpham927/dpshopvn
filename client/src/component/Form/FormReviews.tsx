import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { apiEditComment, apiPostComment } from '../../services/apiReviews';
import { ButtonOutline, Overlay, showNotification } from '..';
import { setIsLoading, setOpenFeatureAuth } from '../../redux/features/action/actionSlice';
import { apiUploadImage } from '../../services/apiUploadPicture';
import { INotification, ProductDetail, Review } from '../../interfaces/interfaces';
import { RATING_REVIEW } from '../../utils/const';
import { formatUserName } from '../../utils/formatUserName';
import { useLocation } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { apiCreateNotification } from '../../services/apiNotification';

interface FormReviewsProps {
    setReviews?: React.Dispatch<React.SetStateAction<Review[]>>;
    reviews: Array<Review>;
    reviewEdit?: Review;
    productDetail: ProductDetail;
    setOpenFormReview?: React.Dispatch<SetStateAction<boolean>>;
    setRatings?: React.Dispatch<
        React.SetStateAction<
            {
                _id: string;
                rating: number;
            }[]
        >
    >;
    title: string | any;
    isEdit?: boolean;
    titleButton?: string;
    socketRef: React.MutableRefObject<Socket<any, any> | null>;
}
const FormReviews: React.FC<FormReviewsProps> = ({
    setReviews,
    reviews,
    isEdit,
    productDetail,
    reviewEdit,
    setOpenFormReview,
    titleButton,
    title,
    setRatings,
    socketRef,
}) => {
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState<string>('');
    const [imagesUrl, setImagesUrl] = useState<Array<string>>([]);
    const [rating, setRating] = useState<number>(5);
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.user);
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const location = useLocation();
    // ----------- handel upload image -----------

    useEffect(() => {
        if (isEdit && reviewEdit) {
            setImagesUrl(reviewEdit?.images);
            setValueInput(reviewEdit?.comment);
            setRating(reviewEdit?.rating);
        }
        if (!productDetail.userBought.includes(currentUser._id)) {
            setRating(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        //dispatch(setIsLoading(true));
        setIsLoad(true);
        if (!files) return;
        const formData = new FormData();
        for (const i of files) {
            formData.append('file', i);
            formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET);
            try {
                const response = await apiUploadImage(formData);
                setImagesUrl((image) => (image?.length > 0 ? [...image, response.url] : [response.url]));
            } catch (error) {
                showNotification('Lỗi xảy ra khi tải lên ảnh:', false);
            }
        }
        setIsLoad(false);
        dispatch(setIsLoading(false));
    };

    //  ------- post-------------
    const postComment = async () => {
        dispatch(setIsLoading(true));
        const res = await apiPostComment({ comment: valueInput, images: imagesUrl, rating: rating }, productDetail._id);
        if (!res.success) {
            showNotification('Đánh giá không thành công!', true);
            return;
        }
        //create notification
        const notification: INotification = {
            image_url: productDetail.image_url,
            shopId: productDetail.user ? productDetail.user._id : '',
            title: productDetail.title,
            user_name: formatUserName(currentUser),
            subtitle: `đã đánh giá sản phẩm của bạn`,
            link: location.pathname,
        };
        const response = await apiCreateNotification(notification);
        //--------------- socket
        console.log('response.data', response.data);
        response.success && socketRef.current?.emit('sendNotification', response.data);
        // -------------------
        setReviews && setReviews((e) => [{ ...res.data, user: currentUser }, ...e]);
        setRatings && setRatings((r) => [...r, { _id: res._id, rating: rating }]);
        setOpenFormReview && setOpenFormReview(false);
        showNotification('Đánh giá thành công!', true);
        dispatch(setIsLoading(false));
    };

    //  ------- edit comment-------------
    const editComment = async () => {
        //dispatch(setIsLoading(true));
        const res = await apiEditComment({ comment: valueInput, images: imagesUrl, rating: rating }, reviewEdit?._id);
        if (!res.success) {
            showNotification('Cập nhật không thành công!', true);
            return;
        }
        const filterViews = reviews?.filter((r) => r._id !== reviewEdit?._id);
        setReviews && setReviews(() => [{ ...res.data, rating, user: currentUser }, ...filterViews]);
        setRatings && setRatings((r) => [...r, { _id: res._id, rating: rating }]);
        setOpenFormReview && setOpenFormReview(false);
        showNotification('Cập nhật thành công!', true);
        dispatch(setIsLoading(false));
    };
    // ------- summit -----------
    const handleSummit = async (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        if (!isLoginSuccess) {
            dispatch(setOpenFeatureAuth(true));
            return;
        }
        if (isLoad) {
            showNotification('Đang tải ảnh vui lòng chờ đợi it phút!', true);
            return;
        }
        if (!valueInput) {
            showNotification('Vui lòng nhập nhận xét!', false);
            return;
        }
        if (isEdit) {
            editComment();
        } else {
            postComment();
        }
    };

    return (
        <Overlay
            className="z-[1000]"
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
                    <h3 className="text-xl ">{title}</h3>
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
                    <img className="h-20 w-20" src={productDetail?.image_url} />
                    <span className="text-sm">{productDetail.title}</span>
                </div>
                <ul className="flex gap-2 justify-center">
                    {RATING_REVIEW?.map((s) => (
                        <div
                            className="flex flex-col justify-center items-center gap-1 text-[rgb(243,153,74)] cursor-pointer"
                            onClick={() => {
                                if (productDetail.userBought.includes(currentUser?._id)) {
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
                    {imagesUrl?.length > 0 && (
                        <div className="w-full h-[100px] overflow-scroll ">
                            <ul className="grid grid-cols-6 gap-3 px-4 ">
                                {imagesUrl?.map((image) => (
                                    <li
                                        key={uuidv4()}
                                        className="relative w-full h-[60px] border-solid border-[1px] my-4 border-bgSecondary "
                                    >
                                        <img className="w-full h-full object-fill" src={image} />
                                        <span
                                            className="absolute top-0 right-1 cursor-pointer"
                                            onClick={() => setImagesUrl((images) => images.filter((i) => i !== image))}
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
                        className={`w-4/12 text-lg h-fit mx-auto  bg-primary text-white ${
                            isLoad || !valueInput ? 'opacity-60' : ''
                        }`}
                        onClick={handleSummit}
                    >
                        {titleButton}
                    </ButtonOutline>
                </div>
            </div>
        </Overlay>
    );
};

export default FormReviews;
