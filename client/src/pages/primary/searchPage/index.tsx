import React from 'react';
import { useParams } from 'react-router-dom';
import { RenderListProducts, SortBar } from '../../../component';
import Seo from '../../../component/seo';

const SearchPage: React.FC = () => {
    return (
        <div>
          <Seo description={useParams()?.title||""} title={useParams()?.title||""}  key={2} />

            <div className="flex text-2xl p-4 items-center ">
                Kết quả tìm kiếm <h1 className="ml-2 text-3xl text-primary"> "{useParams().title}"</h1>
            </div>
            <div className="flex flex-col w-full h-full gap-2">
                <SortBar />
                <RenderListProducts />
            </div>
        </div>
    );
};

export default SearchPage;
