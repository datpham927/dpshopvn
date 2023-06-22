import React from 'react';
import { formatStar } from '../../../utils/formatStar';

const SearchByRating: React.FC = () => {
    return (
        <div className="flex flex-col gap-3 border-b-[1px] border-solid border-b-slate-100 py-6">
            <h3 className="text-sm font-medium">Đánh giá</h3>
            <div className="flex flex-col gap-2">
                {[5, 4, 3].map((s) => (
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="flex items-center"> {formatStar(s, '18px', '#FFBA1E')}</div>{' '}
                        <span className="text-sm">từ {s} sao</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchByRating;
