import React, { memo } from 'react';
import { Category } from '../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
const CategoryItem: React.FC<{ props: Category }> = ({ props }) => {
    const { category, category_code, category_image, category_slug } = props;
    const navigate = useNavigate();
    return (
        <div
            onClick={() =>
                navigate(`/danh-muc/${category_slug}/${category_code}`, {
                    state: {
                        category_name: category,
                    },
                })
            }
            className="flex flex-col gap-2 w-full h-full  px-3  items-center cursor-pointer hover:translate-y-[-4px] duration-500"
        >
            <div className="w-2/3">
                <img className="w-full h-full  px-3 rounded-lg object-fill" src={category_image} />
            </div>
            <p className="text-xs px-2 text-center">{category}</p>
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(CategoryItem);
