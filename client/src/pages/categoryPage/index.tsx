import React from 'react';
import SideBar from './sideBar';
import CategoryView from './categoryView';
import Breadcrumbs from './breadcrumbs';
import {   useParams  } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

const CategoryPage: React.FC = () => {
    const {categories}=useAppSelector(state=>state.category)
    const params=useParams()
    return (
        <>
            <Breadcrumbs title={categories.filter(c=>c.category_code===params.cid)[0]?.category} />
            <div className="flex  gap-2">
                <SideBar />
                <CategoryView />
            </div>
        </>
    );
};

export default CategoryPage;
