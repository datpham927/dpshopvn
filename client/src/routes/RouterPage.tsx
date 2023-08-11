import { Routes, Route, Navigate } from 'react-router-dom';
import { CartPage, DetailPage, FilterPage, HomePage, SearchPage, ShopPage } from '../pages/primary';
import { path } from '../utils/const';
import UserProfile from '../pages/user/userPage/userProfile';
import PurchaseManage from '../pages/user/userPage/PurchaseManage';
import { PaymentPage, UserPage } from '../pages/user';
import SellManage from '../pages/user/userPage/sellManage';
import ViewOrder from '../pages/user/userPage/viewOrder';
import ProductManage from '../pages/user/userPage/productManage';
import { useAppSelector } from '../redux/hooks';
import ForgotPassword from '../pages/user/forgotPassword';
import MenuUserOption from '../pages/mobile/MenuUserOption';
import CategoriesListPage from '../pages/mobile/CategoriesListPage';
import ProductsByFollowing from '../pages/mobile/ProductsByFollowing';

const RouterPage = () => {
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const { mobile_ui } = useAppSelector((state) => state.action);

    return (
        <Routes location={location}>
            {/* ----  primary  ----- */}
            <Route path={'*'} element={<Navigate to="/" />}></Route>
            <Route path={path.HOME} element={<HomePage />}></Route>
            <Route path={path.DETAILPRODUCT} element={<DetailPage />}></Route>
            <Route path={path.PAGE_CATEGORY} element={<FilterPage />}></Route>
            <Route path={path.PAGE_BRAND} element={<FilterPage />}></Route>
            <Route path={path.PAGE_SHOP} element={<ShopPage />}></Route>
            <Route path={path.PAGE_SEARCH} element={<SearchPage />}></Route>
            {/* ----  user  ----- */}
            {!mobile_ui ? (
                <Route path={path.PAGE_USER} element={isLoginSuccess ? <UserPage /> : <Navigate to="/" />}>
                    <Route path={''} element={<Navigate to="profile" />} />
                    <Route path={'profile'} element={<UserProfile />} />
                    <Route path={'purchase'} element={<PurchaseManage />} />
                    <Route path={'sell'} element={<SellManage />} />
                    <Route path={'product'} element={<ProductManage />} />
                    <Route path={'view/:oid'} element={<ViewOrder />} />
                </Route>
            ) : (
                <>
                //mobile
                    <Route path={path.PAGE_USER} element={<MenuUserOption />} />
                    <Route path={`${path.PAGE_USER}/profile`} element={<UserProfile />} />
                    <Route path={`${path.PAGE_USER}/purchase`} element={<PurchaseManage />} />
                    <Route path={`${path.PAGE_USER}/sell`} element={<SellManage />} />
                    <Route path={`${path.PAGE_USER}/product`} element={<ProductManage />} />
                    <Route path={`${path.PAGE_USER}/view/:oid`} element={<ViewOrder />} />
                    <Route path={`${path.PAGE_LIST_CATEGORY}`} element={<CategoriesListPage />} />
                    <Route path={`${path.FOLLOWING}`} element={<ProductsByFollowing />} />
                </>
            )}
            <Route path={path.PAGE_CART} element={isLoginSuccess ? <CartPage /> : <Navigate to="/" />}></Route>
            <Route path={path.PAGE_PAYMENT} element={<PaymentPage />}></Route>
            <Route path={path.FORGET_PASSWORD} element={<ForgotPassword />}></Route>
        </Routes>
    );
};

export default RouterPage;
