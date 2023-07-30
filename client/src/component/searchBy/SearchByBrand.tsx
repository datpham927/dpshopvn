import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { apiGetAllBrandByCategory } from '../../services/apiProduct';

const SearchByBrand: React.FC = () => {
    const [brands, setBrands] = useState<Array<string>>([]);
    const [optionBrands, setOptionBrands] = useState<Array<string>>([]);
    const [quantityDisplayBrand, setQuantityDisplayBrand] = useState<number>(5);
    const location = useLocation();
    const params = useParams();
    useEffect(() => {
        setOptionBrands([]);
        const fetchApi = async () => {
            const res = await apiGetAllBrandByCategory({
                category_code: params?.cid,
                brand_slug: params.brand_slug,
                user: params.sid,
            });
            res.success && setBrands(res.data);
        };

        fetchApi();
    }, [params.cid, params.brand_slug, params.sid]);
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = queryString.parse(location.search);
        if (!queryParams.brand) {
            setOptionBrands([]);
        }
    }, [location.search]);
    // cập nhật lại query
    useEffect(() => {
        const queryParams = queryString.parse(location.search);
        const updatedQueryParams = {
            ...queryParams,
            brand: optionBrands,
        };
        const newQuery = queryString.stringify(updatedQueryParams);
        navigate(`?${newQuery}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionBrands]);

    return (
        <>
            {brands.length > 0 && (
                <div className="flex flex-col gap-3 border-b-[1px] border-solid border-b-slate-200 py-6">
                    <h3 className="text-sm font-medium">Nhãn hàng</h3>
                    <div
                        className={`flex flex-col gap-2 ${
                            brands.length > 50 && quantityDisplayBrand !== 5 ? 'overflow-scroll h-[800px]' : ''
                        }`}
                    >
                        {brands.map(
                            (b, index) =>
                                index <= quantityDisplayBrand && (
                                    <label className="flex w-full h-full items-center gap-2">
                                        <input
                                            onClick={() => {
                                                if (params.brand_slug) return;
                                                if (optionBrands?.includes(b)) {
                                                    setOptionBrands((prevOptionBrands) =>
                                                        prevOptionBrands.filter((i) => i !== b),
                                                    );
                                                } else {
                                                    setOptionBrands((prevOptionBrands) => [...prevOptionBrands, b]);
                                                }
                                            }}
                                            type="checkbox"
                                            checked={optionBrands?.includes(b) || !!params.brand_slug}
                                        />
                                        <span className="text-sm">{b}</span>
                                    </label>
                                ),
                        )}
                    </div>
                    {brands.length >= 5 && (
                        <button
                            className="text-sm text-primary"
                            onClick={() => {
                                quantityDisplayBrand === 5
                                    ? setQuantityDisplayBrand(brands?.length)
                                    : setQuantityDisplayBrand(5);
                            }}
                        >
                            {quantityDisplayBrand === 5 ? 'Xem thêm' : 'Rút gọn'}
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchByBrand;
