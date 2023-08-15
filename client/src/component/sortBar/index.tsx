/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ButtonOutline } from '..';
import { formatMoney } from '../../utils/formatMoney';
import { SORT_BAR } from '../../utils/const';
import queryString from 'query-string';
import { useNavigate, useParams } from 'react-router-dom';

const SortBar: React.FC = () => {
    const params = useParams();
    const queries = queryString.parse(location.search);
    const { star, pricefrom, priceto, brand, sort } = queries;
    const [sortBy, setSortBy] = useState<any>(sort || '');

    const navigate = useNavigate();
    // cập nhật lại query
    useEffect(() => {
        const { sort, ...queryParams } = queryString.parse(location.search);
        const updatedQueryParams = sortBy ? { ...queryParams, sort: sortBy } : queryParams;
        const newQuery = queryString.stringify(updatedQueryParams);
        navigate(`?${newQuery}`);
    }, [sortBy]);

    useEffect(() => {
        setSortBy('');
    }, [params.cid]);

    return (
        <>
            <div className="flex items-center  gap-3 px-3 py-2 bg-[#EDEDED]">
                <div className="text-sm font-normal shrink-0">Sắp xếp theo</div>
                <div className='flex tablet:overflow-y-auto gap-3'>
                    {SORT_BAR?.map((i) => (
                        <div
                            onClick={() => {
                                setSortBy(i?.sortBy.sort);
                            }}
                            className={`text-sm shrink-0 font-normal py-2 px-4 rounded-sm cursor-pointer ${
                                i?.sortBy.sort === sortBy ? 'bg-primary text-white font-semibold' : '  bg-white'
                            }`}
                        >
                            {i?.label}
                        </div>
                    ))}
                </div>
            </div>
            {(star || pricefrom || priceto || brand) && (
                <div className="flex gap-3">
                    {star && (
                        <ButtonOutline className="rounded-full text-sm py-1 px-4 font-normal bg-blue-50">
                            Từ {star} sao
                        </ButtonOutline>
                    )}
                    {pricefrom && (
                        <ButtonOutline className="rounded-full text-sm py-1 px-4 font-normal bg-blue-50">
                            Từ {formatMoney(Number(pricefrom))} Đến {formatMoney(Number(priceto))}
                        </ButtonOutline>
                    )}
                    {Array.isArray(brand)
                        ? brand?.map((b) => (
                              <ButtonOutline className="rounded-full text-sm py-1 px-4 font-normal bg-blue-50">
                                  {b}
                              </ButtonOutline>
                          ))
                        : brand && (
                              <ButtonOutline className="rounded-full text-sm py-1 px-4 font-normal bg-blue-50">
                                  {brand}
                              </ButtonOutline>
                          )}
                    <ButtonOutline
                        className="rounded-full text-sm py-1 px-4 font-normal bg-transparent border-none"
                        onClick={() => {
                            navigate(location.pathname);
                        }}
                    >
                        Xóa tất cả
                    </ButtonOutline>
                </div>
            )}
        </>
    );
};

export default SortBar;
