import { Routes, Route } from 'react-router-dom';
import { path } from '../utils/const';
import { DetailPage, FilterPage, HomePage ,SearchPage,ShopPage} from '../pages/primary';

const RouterPage = () => {
    return (
        <Routes>
            <Route path={path.HOME} element={<HomePage />}></Route>
            <Route path={path.DETAILPRODUCT} element={<DetailPage />}></Route>
            <Route path={path.PAGE_CATEGORY} element={<FilterPage />}></Route>
            <Route path={path.PAGE_BRAND} element={<FilterPage />}></Route>
            <Route path={path.PAGE_SHOP} element={<ShopPage />}></Route>
            <Route path={path.PAGE_SEARCH} element={<SearchPage />}></Route>
        </Routes>
    );
};

export default RouterPage;
