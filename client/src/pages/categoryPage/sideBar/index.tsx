import React, { useEffect, useState } from 'react';
import { formatStar } from '../../../utils/formatStar';
import { apiGetAllBrandByCategory } from '../../../services/apiProduct';
import { useParams } from 'react-router-dom';

const SideBar: React.FC = () => {
    const [brands, setBrands] = useState<Array<string>>([]);

    const params = useParams();
    useEffect(() => {
        const fetchApi = async () => {
            const res = await apiGetAllBrandByCategory(params?.cid);
            res.success && setBrands(res.data);
        };
        fetchApi();
    }, [params]);
console.log(params?.cid)
    return (
        <div className="w-2/12 pr-2 bg-white">
            <div className="w-full h-full  py-2 pl-4 ">
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

                <div className="flex flex-col gap-3 border-b-[1px] border-solid border-b-slate-100 py-6">
                    <h3 className="text-sm font-medium">Nhãn hàng</h3>
                    <div className="flex flex-col gap-2">
                        {brands.map((b) => (
                            <label className="flex w-full h-full items-center gap-2">
                                <input type="checkbox" />
                                <span className="text-sm">{b}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
