import { Routes, Route } from 'react-router-dom';
import { path } from '../utils/const';
import { DetailPage, HomePage } from '../pages';

const RouterPage = () => {
    return (
        <Routes>
            <Route path={path.HOME} element={<HomePage />}></Route>
            <Route path={path.DETAILPRODUCT} element={<DetailPage />}></Route>
        </Routes>
    );
};

export default RouterPage;
