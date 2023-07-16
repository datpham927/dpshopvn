import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import PersonIcon from '@mui/icons-material/Person';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import moment from 'moment';
import 'moment/dist/locale/vi';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { UserDetail } from '../../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { apiFollowingUser, apiGetDetailShop, apiUnFollowingUser } from '../../../services/apiUser';
import { setOpenFeatureAuth } from '../../../redux/features/action/actionSlice';
import { ListProducts, SearchByBrand, SearchByPrice, SearchByRating, SortBar } from '../../../component';
import { bgHeaderShop, noUser } from '../../../assets';
import ButtonOutline from '../../../component/buttonOutline';
import { formatUserName } from '../../../utils/formatUserName';

const ShopPage: React.FC = () => {
    const [shop, setShop] = useState<UserDetail>();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.user);
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const [followers, setFollowers] = useState<Array<string>>([]);
    const { sid } = useParams<{ sid: string }>();
    useEffect(() => {
        const fetchDetailShop = async () => {
            const res = await apiGetDetailShop(sid);
            setShop(res.data);
            setFollowers(res.data.followers);
        };
        fetchDetailShop();
    }, [sid]);

    const handelFollowing = async () => {
        if (!isLoginSuccess) {
            dispatch(setOpenFeatureAuth(true));
            return;
        }
        if (followers.includes(currentUser._id)) {
            setFollowers((user) => user.filter((i) => i !== currentUser._id));
            await apiUnFollowingUser(shop?._id);
        } else {
            setFollowers((user) => [...user, currentUser._id]);
            await apiFollowingUser(shop?._id);
        }
    };
    return (
        <div className="flex flex-col w-full h-full p-3 gap-6">
            <div className="flex w-full h-full mt-6 gap-6 ">
                <div
                    className="flex flex-col h-full w-1/3 gap-3  py-2 px-6   justify-center rounded-lg"
                    style={{
                        backgroundImage: `url(${bgHeaderShop})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="flex gap-3 items-center">
                        <img src={shop?.avatar_url || noUser} className="w-[80px] h-[80px] rounded-full" />
                        <div className="flex flex-col gap-2">
                            <h3 className="text-base font-semibold text-white">{formatUserName(shop)}</h3>
                            <span className="text-xs text-slate-50 ">
                                Hoạt động {moment(shop?.createdAt).fromNow()}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3 ">
                        <ButtonOutline className="border-white text-sm  py-1 text-white ">
                            <span className="flex justify-center items-center gap-2">
                                <CardGiftcardIcon fontSize="small" />
                                chat
                            </span>
                        </ButtonOutline>
                        <ButtonOutline className="border-white text-sm py-1 text-white" onClick={handelFollowing}>
                            {followers?.includes(currentUser?._id) ? (
                                <>
                                    <DoneIcon fontSize="small" />
                                    Đã theo dõi
                                </>
                            ) : (
                                <>
                                    <AddIcon fontSize="small" />
                                    Theo dõi
                                </>
                            )}
                        </ButtonOutline>
                    </div>
                </div>
                <div className="w-2/3 px-6 text-zinc-700 grid grid-cols-2 items-center ">
                    <div className="flex items-center text-sm gap-2 py-2 h-fit">
                        <CardGiftcardIcon fontSize="small" />
                        Sản Phẩm: <span className="text-primary ">{shop?.totalProduct}</span>
                    </div>
                    <div className="flex items-center text-sm gap-2 py-2 h-fit">
                        <PersonIcon fontSize="small" />
                        Người Theo Dõi: <span className="text-primary ">{followers.length}</span>
                    </div>
                    <div className="flex items-center text-sm gap-2 py-2 h-fit">
                        <PersonIcon fontSize="small" />
                        Đang Theo: <span className="text-primary ">{shop?.followings.length}</span>
                    </div>
                    <div className="flex items-center text-sm gap-2 py-2 h-fit">
                        <QueryBuilderIcon fontSize="small" />
                        Đã tham gia {moment(shop?.createdAt).fromNow()}
                    </div>
                </div>
            </div>
            <div className="flex w-full h-full gap-2">
                <div className="w-1/6  p-4  bg-white ">
                    <div className="flex items-center gap-1 ">
                        <FilterAltOutlinedIcon fontSize="small" />
                        <h1 className="uppercase font-medium text-base"> Bộ lọc tìm kiếm</h1>
                    </div>
                    <SearchByRating />
                    <SearchByPrice />
                    <SearchByBrand />
                </div>
                <div className="flex flex-col gap-4 w-5/6 h-full  bg-white  p-4 ">
                    <h1 className="text-base font-medium text-slate-900 uppercase">Sản Phẩm</h1>
                    <SortBar />
                    <ListProducts />
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
