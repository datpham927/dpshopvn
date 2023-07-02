import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../../redux/hooks';
import { Link , useParams } from 'react-router-dom';

const ListCategory: React.FC = () => {
    const { categories } = useAppSelector((state) => state.category);
 
    const params = useParams();
    return (
        <div className="flex flex-col gap-3 border-b-[1px] border-solid border-b-slate-200 py-6">
            <h3 className="text-sm font-medium">Danh mục</h3>
            <ul className="flex flex-col gap-2">
                {categories.map(
                    (c, index) =>
                        index>= categories.length-5 && (
                            <Link
                                to={`/danh-muc/${c?.category_slug}/${c?.category_code}`}
                                key={uuidv4()}
                                className={`text-sm cursor-pointer hover:opacity-70 ${
                                    c?.category_code === params.cid ? 'text-primary' : ''
                                }`}
                            >
                                {c.category}
                            </Link>
                        ),
                )}
            </ul>
        </div>
    );
};

export default ListCategory;
