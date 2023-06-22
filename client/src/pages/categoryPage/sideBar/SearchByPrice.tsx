import React, { useState } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { ButtonOutline } from '../../../component';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchByPrice: React.FC = () => {
    const [optionPrice, setOptionPrice] = useState<{
        from: number | string;
        to: number | string;
    }>({
        from: 0,
        to: 0,
    });

    const navigate = useNavigate();
    const handleSummit = () => {
        // navigate({
        //     pathname: '',
        //     search: createSearchParams(
        //         {
        //             to: optionPrice,
        //             page: 1,
        //         } ,
        //     ).toString(),
        // });
    };
    return (
        <div className="flex flex-col w-full gap-3 border-b-[1px] border-solid border-b-slate-200 py-6">
            <h3 className="text-sm font-medium">Chọn khoảng giá</h3>
            <div className="flex w-full items-center justify-between">
                <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setOptionPrice({ ...optionPrice, from: e.target.value })
                    }
                    value={optionPrice.from}
                    type="number"
                    placeholder="Từ"
                    className="outline-none w-[76px] border-solid border-[1px] border-b-slate-300 rounded-sm text-sm p-1 "
                />
                <span className="text-slate-600">
                    <ArrowRightAltIcon fontSize="small" />
                </span>
                <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setOptionPrice({ ...optionPrice, to: e.target.value })
                    }
                    value={optionPrice.to}
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
