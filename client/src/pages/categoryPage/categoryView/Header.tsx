import React, { useState } from 'react';
import { SORT_BAR } from '../../../utils/const';
import { useAppSelector } from '../../../redux/hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ButtonOutline } from '../../../component';
import queryString from 'query-string';
import { formatMoney } from '../../../utils/formatMoney';

const Header: React.FC<{ setSorts: any }> = ({ setSorts }) => {
    const [activeSortBar, setActiveSortBar] = useState<number>(0);
    const { categories } = useAppSelector((state) => state.category);
    const params = useParams();
    const title = categories.filter((c) => c.category_code === params.cid)[0]?.category;
    const queries = queryString.parse(location.search);
    const { star, pricefrom, priceto, brand } = queries;
    const navigate = useNavigate();

    console.log(location.pathname)
    return (
        <div className="flex flex-col gap-1 w-full h-full sticky top-0 right-0 bg-background_primary  pb-1  z-100">
            <div className="flex flex-col px-4 py-2  bg-white rounded-sm  mt-1 gap-3">
                <div className="text-base font-normal  ">{title}</div>
                <div className="flex items-center  gap-3 px-3 py-2 bg-[#EDEDED]">
                    <div className="text-sm font-normal">Sắp xếp theo</div>
                    {SORT_BAR?.map((i) => (
                        <div
                            onClick={() => {
                                setSorts(i?.sortBy);
                                setActiveSortBar(i?.id);
                            }}
                            className={`text-sm font-normal py-2 px-4 rounded-sm cursor-pointer ${
                                i?.id === activeSortBar ? 'bg-primary text-white font-semibold' : '  bg-white'
                            }`}
                        >
                            {i?.label}
                        </div>
                    ))}
                </div>
                {Object.keys(queries).length !== 0 && (
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
