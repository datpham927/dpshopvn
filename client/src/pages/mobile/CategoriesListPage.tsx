import React from 'react';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useAppSelector } from '../../redux/hooks';
import { CategoryItem } from '../../component';
import { path } from '../../utils/const';

const CategoriesListPage: React.FC = () => {
    const { categories } = useAppSelector((state) => state.category);
    return (
        <div className="fixed-mobile bg-white z-[1000] ">
            <Link to={`${path.HOME}`} className=" absolute top-2 left-4 text-secondary laptop:hidden ">
                <ChevronLeftIcon fontSize="large" />
            </Link>
            <h3 className="text-xl text-center my-3">Danh mục sản phẩm</h3>

            <div className="grid  mobile:grid-cols-2 tablet:grid-cols-4 gap-3">
                {categories.map((e) => (
                    <CategoryItem props={e} />
                ))}
            </div>
        </div>
    );
};

export default CategoriesListPage;
