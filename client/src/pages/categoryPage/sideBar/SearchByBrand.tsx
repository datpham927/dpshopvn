/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { apiGetAllBrandByCategory } from '../../../services/apiProduct';

const SearchByBrand: React.FC = () => {
    const [brands, setBrands] = useState<Array<string>>([]);
    const [optionBrands, setOptionBrands] = useState<Array<string>>([]);
    const [quantityDisplayBrand, setQuantityDisplayBrand] = useState<number>(5);
    const location = useLocation();
    const params = useParams();
    useEffect(() => {
        setOptionBrands([]);
        const fetchApi = async () => {
            const res = await apiGetAllBrandByCategory(params?.cid);
            res.success && setBrands(res.data);
        };
 
        fetchApi();
    }, [params?.cid]);
    const navigate = useNavigate();
    // cập nhật lại query
    useEffect(() => {
        const queryParams = queryString.parse(location.search);
        const updatedQueryParams = {
            ...queryParams,
            brand: optionBrands,
        };
        const newQuery = queryString.stringify(updatedQueryParams);
        navigate(`?${newQuery}`);
    }, [optionBrands]);


    return (
        <div className="flex flex-col gap-3 border-b-[1px] border-solid border-b-slate-200 py-6">
            <h3 className="text-sm font-medium">Nhãn hàng</h3>
            <div className="flex flex-col gap-2">
                {brands.map(
                    (b, index) =>
                        index <= quantityDisplayBrand && (
                            <label className="flex w-full h-full items-center gap-2">
                                <input
                                    onClick={() => {
                                        if (optionBrands?.includes(b)) {
                                            setOptionBrands((prevOptionBrands) =>
                                                prevOptionBrands.filter((i) => i !== b),
                                            );
                                        } else {
                                            setOptionBrands((prevOptionBrands) => [...prevOptionBrands, b]);
                                        }
                                    }}
                                    type="checkbox"
                                    checked={optionBrands?.includes(b)}
                                />
                                <span className="text-sm">{b}</span>
                            </label>
                        ),
                )}
            </div>
            <button
                className="text-sm text-primary"
                onClick={() => {
                    quantityDisplayBrand === 5 ? setQuantityDisplayBrand(brands?.length) : setQuantityDisplayBrand(5);
                }}
            >
                {quantityDisplayBrand === 5 ? 'Xem thêm' : 'Rút gọn'}
            </button>
        </div>
    );
};

export default SearchByBrand;
