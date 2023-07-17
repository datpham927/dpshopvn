import { Routes, Route, Navigate } from 'react-router-dom';
import { CartPage, DetailPage, FilterPage, HomePage, SearchPage, ShopPage } from '../pages/primary';
import { path } from '../utils/const';
import UserProfile from '../pages/user/userPage/userProfile';
import PurchaseManage from '../pages/user/userPage/PurchaseManage';
import SellManage from '../pages/user/userPage/SellManage';
import { PaymentPage , UserPage } from '../pages/user';

const RouterPage = () => {
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
            <Route path={path.PAGE_CART} element={<CartPage />}></Route>
            {/* ----  user  ----- */}
            <Route path={path.PAGE_USER} element={<UserPage />}>
                <Route path={''} element={<Navigate to="profile" />} />
                <Route path={'profile'} element={<UserProfile />} />
                <Route path={'purchase'} element={<PurchaseManage />} />
                <Route path={'sell'} element={<SellManage />} />
            </Route>
            <Route path={path.PAGE_PAYMENT} element={<PaymentPage />}></Route>
        </Routes>
    );
};

export default RouterPage;
