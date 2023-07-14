import React from 'react';
import { useParams } from 'react-router-dom';
import { ListProducts, SortBar } from '../../../component';

const SearchPage: React.FC = () => {
    return (
        <div>
            <div className="flex text-2xl p-4 items-center ">
                Kết quả tìm kiếm <h1 className="ml-2 text-3xl text-primary"> "{useParams().title}"</h1>
            </div>
            <div className="flex flex-col w-full h-full gap-2">
                <SortBar />
                <ListProducts />
            </div>
        </div>
    );
};

export default SearchPage;
