import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from './breadcrumbs';
import FilterPanel from './filterPanel';
import FilterResults from './filterResults';
import { useAppSelector } from  '../../../redux/hooks';

const FilterPage: React.FC = () => {
    const { categories } = useAppSelector((state) => state.category);
    const params = useParams();
    const title = categories.filter((c) => c.category_code === params.cid)[0]?.category || params?.brand_slug;
    return (
        <>
            <Breadcrumbs title={title} />
            <div className="flex  gap-2">
                <FilterPanel />
                <FilterResults />
            </div>
        </>
    );
};

export default FilterPage;
