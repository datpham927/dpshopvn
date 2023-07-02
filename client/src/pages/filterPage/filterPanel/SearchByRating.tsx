/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { formatStar } from '../../../utils/formatStar';

const SearchByRating: React.FC = () => {
    const location = useLocation();
    const [rating, setRating] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (rating === 0) return;
        const { search } = location;
        //convert query to object
        // example start=5  => {start: 5}
        const queryParams = queryString.parse(search);
        const updatedQueryParams = {
            ...queryParams,
            star : rating,
        };
        //convert object to query
        // example  {start: 5} => start=5
        const newQuery = queryString.stringify(updatedQueryParams);
        navigate(`?${newQuery}`);
    }, [rating]);
    return (
        <div className="flex flex-col gap-3 border-b-[1px] border-solid border-b-slate-100 py-6">
            <h3 className="text-sm font-medium">Đánh giá</h3>
            <div className="flex flex-col gap-2">
                {[5, 4, 3].map((s) => (
                    <div onClick={() => setRating(s)} className="flex items-center gap-2 cursor-pointer">
                        <div className="flex items-center"> {formatStar(s, '18px', '#FFBA1E')}</div>{' '}
                        <span className="text-sm">từ {s} sao</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchByRating;
