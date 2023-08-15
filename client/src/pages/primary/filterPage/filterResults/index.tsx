import React from 'react';

import { useAppSelector } from '../../../../redux/hooks';
import { useParams } from 'react-router-dom';
import {  RenderListProducts, SortBar } from '../../../../component';

const FilterResults: React.FC = () => {
    const { categories } = useAppSelector((state) => state.category);
    const params = useParams();
    const title = categories.filter((c) => c.category_code === params.cid)[0]?.category || params.brand_slug;
    return (
        <div className="w-full h-full ">
            <div className="tablet:hidden flex flex-col gap-1 w-full h-full sticky top-0 right-0 bg-background_primary  pb-1  z-100">
                <div className="flex flex-col px-4 py-2  bg-white rounded-sm  mt-1 gap-3">
                    <div className="text-base font-normal  ">{title}</div>
                    <SortBar />
                </div>
            </div>
            <RenderListProducts />
        </div>
    );
};

export default FilterResults;
