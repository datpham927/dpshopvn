
import React  from 'react';
 
import Results from './Results';
import SortBar from './SortBar';

const FilterResults: React.FC = () => {


    return (
        <div className="w-full h-full ">
            <SortBar  />
            <Results />
        </div>
    );
};

export default FilterResults;
