import React from 'react';
import SideBar from './sideBar';
import CategoryView from './categoryView';
import Breadcrumbs from './breadcrumbs';
import { useLocation  } from 'react-router-dom';

const CategoryPage: React.FC = () => {
    const location = useLocation().state;
    return (
        <>
            <Breadcrumbs title={location?.category_name || ''} />
            <div className="flex  gap-2">
                <SideBar />
                <CategoryView />
            </div>
        </>
    );
};

export default CategoryPage;
