import React, { useState } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import ButtonOutline from '../buttonOutline';

const SearchByPrice: React.FC = () => {
    const [optionPrice, setOptionPrice] = useState<{
        pricefrom: number | string;
        priceto: number | string;
    }>({
        pricefrom: 0,
        priceto: 0,
    });

    const navigate = useNavigate();
    const { search } = location;
    const handleSummit = () => {
        const queryParams = queryString.parse(search);
        const updatedQueryParams = {
            ...queryParams,
            ...optionPrice,
        };
        const newQuery = queryString.stringify(updatedQueryParams);
        navigate(`?${newQuery}`);
    };

    return (
        <div className="flex flex-col w-full gap-3 border-b-[1px] border-solid border-b-slate-200 py-6">
            <h3 className="text-sm font-medium">Chọn khoảng giá</h3>
            <div className="flex w-full items-center justify-between">
                <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setOptionPrice({ ...optionPrice, pricefrom: e.target.value })
                    }
                    value={optionPrice.pricefrom}
                    type="number"
                    placeholder="Từ"
                    className="outline-none w-[76px] border-solid border-[1px] border-b-slate-300 rounded-sm text-sm p-1 "
                />
                <span className="text-slate-600">
                    <ArrowRightAltIcon fontSize="small" />
                </span>
                <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setOptionPrice({ ...optionPrice, priceto: e.target.value })
                    }
                    value={optionPrice.priceto}
                    type="number"
                    placeholder="Đến"
                    className="outline-none w-[76px] border-solid border-[1px] border-b-slate-300 rounded-sm text-sm p-1 "
                />
            </div>
            <ButtonOutline onClick={handleSummit} className="py-1">
                Áp dụng
            </ButtonOutline>
        </div>
    );
};

export default SearchByPrice;
