import React, { useState } from 'react';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import MessageIcon from '@mui/icons-material/Message';
import AddIcon from '@mui/icons-material/Add';
import { noUser } from '../../../../assets';
import { useAppSelector } from '../../../../redux/hooks';
import { apiFollowingUser, apiUnFollowingUser } from '../../../../services/apiUser';
import { setOpenFeatureAuth } from '../../../../redux/features/action/actionSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ButtonOutline, showNotification } from '../../../../component';
import { formatUserName } from '../../../../utils/formatUserName';

interface InfoShop {
    _id: string;
    lastName: string;
    firstName: string;
    email: string;
    followers: Array<string>;
    avatar_url: string;
}
const InfoShop: React.FC<{ props: InfoShop }> = ({ props }) => {
    const { lastName, firstName, email, followers, _id, avatar_url } = props;
    const dispatch = useDispatch();
    const currentUser = useAppSelector((state) => state.user);
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const [currentFollowers, setCurrentFollowers] = useState<Array<string>>(followers);

    const handelFollowing = async () => {
        if (!isLoginSuccess) {
            dispatch(setOpenFeatureAuth(true));
            return;
        }
        if (_id === currentUser._id) {
            showNotification('Không thể theo dõi chính bạn!', false);
            return;
        }
        if (currentFollowers.includes(currentUser._id)) {
            setCurrentFollowers((user) => user.filter((i) => i !== currentUser._id));
            await apiUnFollowingUser(_id);
        } else {
            setCurrentFollowers((user) => [...user, currentUser._id]);
            await apiFollowingUser(_id);
        }
    };
    return (
        <div className="w-[240px] h-auto border-[1px] border-solid py-3 border-slate-200 rounded-sm px-3">
            <div className="flex items-center w-full h-auto gap-2">
                <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden">
                    <img className="w-full h-full block object-cover" src={avatar_url ? avatar_url : noUser} />
                </div>
                <div>{formatUserName({ lastName, firstName, email })}</div>
            </div>
            <div className="flex my-2 gap-2 text-sm items-center mt-4">
                Lượt theo dõi:
                <span className="text-base font-medium"> {currentFollowers?.length}</span>
            </div>
            <div className="flex gap-2">
                <ButtonOutline>
                    <Link
                        to={`/cua-hang/${formatUserName({ lastName, firstName, email })}/${_id}`}
                        className="flex justify-center items-center gap-2"
                    >
                        <CardGiftcardIcon fontSize="small" />
                        Xem shop
                    </Link>
                </ButtonOutline>
                <ButtonOutline
                    onClick={handelFollowing}
                    className={`${
                        currentFollowers?.includes(currentUser?._id)
                            ? 'bg-bgSecondary border-none hover:bg-bgSecondary'
                            : ''
                    }`}
                >
                    {currentFollowers?.includes(currentUser?._id) ? (
                        <>Đã theo dõi</>
                    ) : (
                        <>
                            <AddIcon fontSize="small" />
                            Theo dõi
                        </>
                    )}
                </ButtonOutline>
            </div>
            {/* <button className="flex gap-1 mt-4 text-sm w-full justify-center font-medium  items-center p-2 rounded-[4px]  border-[1px] border-solid border-red_custom text-red_custom  hover:bg-opacity-70">
        <MessageIcon fontSize="small" />
        Chat ngay
    </button> */}
            <ButtonOutline className="w-full border-red_custom mt-4  justify-center text-red_custom">
                <MessageIcon fontSize="small" />
                Chat ngay
            </ButtonOutline>
        </div>
    );
};

export default InfoShop;
