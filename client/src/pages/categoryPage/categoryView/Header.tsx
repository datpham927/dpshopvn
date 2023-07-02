/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { SORT_BAR } from '../../../utils/const';
import { useAppSelector } from '../../../redux/hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ButtonOutline } from '../../../component';
import queryString from 'query-string';
import { formatMoney } from '../../../utils/formatMoney';

const Header: React.FC = () => {
    const { categories } = useAppSelector((state) => state.category);
    const params = useParams();
    const title = categories.filter((c) => c.category_code === params.cid)[0]?.category;
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
        <div className="flex flex-col gap-1 w-full h-full sticky top-0 right-0 bg-background_primary  pb-1  z-100">
            <div className="flex flex-col px-4 py-2  bg-white rounded-sm  mt-1 gap-3">
                <div className="text-base font-normal  ">{title}</div>
                <div className="flex items-center  gap-3 px-3 py-2 bg-[#EDEDED]">
                    <div className="text-sm font-normal">Sắp xếp theo</div>
                    {SORT_BAR?.map((i) => (
                        <div
                            onClick={() => {
                                setSortBy(i?.sortBy.sort);
                            }}
                            className={`text-sm font-normal py-2 px-4 rounded-sm cursor-pointer ${
                                i?.sortBy.sort === sortBy ? 'bg-primary text-white font-semibold' : '  bg-white'
                            }`}
                        >
                            {i?.label}
                        </div>
                    ))}
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
                                window.location.reload();
                            }}
                        >
                            Xóa tất cả
                        </ButtonOutline>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
