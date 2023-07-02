import React from 'react';
import SearchByBrand from './SearchByBrand';
import SearchByPrice from './SearchByPrice';
import SearchByRating from './SearchByRating';
import ListCategory from './ListCategory';

const FilterPanel: React.FC = () => {
    return (
        <div className="w-2/12 pr-2 bg-white">
            <div className="w-full h-full  py-2 pl-4 ">
                <ListCategory/>
                <SearchByRating />
                <SearchByPrice />
                <SearchByBrand />
            </div>
        </div>
    );
};

export default FilterPanel;
