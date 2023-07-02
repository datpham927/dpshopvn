import { Routes, Route } from 'react-router-dom';
import { path } from '../utils/const';
import { DetailPage, HomePage } from '../pages';
import FilterPage from '../pages/filterPage';

const RouterPage = () => {
    return (
        <Routes>
            <Route path={path.HOME} element={<HomePage />}></Route>
            <Route path={path.DETAILPRODUCT} element={<DetailPage />}></Route>
            <Route path={path.PAGE_CATEGORY} element={<FilterPage />}></Route>
            <Route path={path.PAGE_BRAND} element={<FilterPage />}></Route>
        </Routes>
    );
};

export default RouterPage;
