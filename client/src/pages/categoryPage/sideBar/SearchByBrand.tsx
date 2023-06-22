import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import { apiGetAllBrandByCategory } from '../../../services/apiProduct';

const SearchByBrand: React.FC = () => {
    const [brands, setBrands] = useState<Array<string>>([]);
    const [quantityDisplayBrand, setQuantityDisplayBrand] = useState<number>(5);

    const params = useParams();
    useEffect(() => {
        const fetchApi = async () => {
            const res = await apiGetAllBrandByCategory(params?.cid);
            res.success && setBrands(res.data);
        };
        fetchApi();
    }, [params]);
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate({
            pathname: '',
            search: createSearchParams({
                h: 'jhsidhidhi',
            }).toString(),
        });
    };

    return (
        <div className="flex flex-col gap-3 border-b-[1px] border-solid border-b-slate-200 py-6">
            <h3 className="text-sm font-medium">Nhãn hàng</h3>
            <div className="flex flex-col gap-2">
                {brands.map(
                    (b, index) =>
                        index <= quantityDisplayBrand && (
                            <label onClick={handleOnClick} className="flex w-full h-full items-center gap-2">
                                <input type="checkbox" />
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
