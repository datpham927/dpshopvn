import React from 'react';
import SideBar from './sideBar';
import CategoryView from './categoryView';
import Breadcrumbs from './breadcrumbs';
import { useParams } from 'react-router-dom';

const CategoryPage: React.FC = () => {
    const params = useParams();
    return (
        <>
            <Breadcrumbs title={params?.category_slug||""} />
            <div className="flex  gap-2">
                <SideBar />
                <CategoryView />
            </div>
        </>
    );
};

export default CategoryPage;
