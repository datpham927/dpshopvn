import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../../redux/hooks';
import { useLocation, useNavigate } from 'react-router-dom';

const ListCategory: React.FC = () => {
    const { categories } = useAppSelector((state) => state.category);
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-3 border-b-[1px] border-solid border-b-slate-200 py-6">
            <h3 className="text-sm font-medium">Danh mục</h3>
            <ul className="flex flex-col gap-2">
                {categories.map(
                    (c, index) =>
                        index < 5 && (
                            <li
                                key={uuidv4()}
                                onClick={() =>
                                    navigate(`/danh-muc/${c?.category_slug}/${c?.category_code}`, {
                                        state: {
                                            category_name: c?.category,
                                        },
                                    })
                                }
                                className="text-sm cursor-pointer hover:opacity-70"
                            >
                                {c.category}
                            </li>
                        ),
                )}
            </ul>
        </div>
    );
};

export default ListCategory;
