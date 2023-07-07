import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getCategories } from '../../../../services/apiCategory';
import { Category } from '../../../../interfaces/interfaces';
import { CategoryItem } from '../../../../component';
const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        const fetchCategory = async () => {
            const res = await getCategories();
            res.success && setCategories(res.categories);
        };
        fetchCategory();
    }, []);
    return (
        <div className="grid grid-cols-10 h-full bg-white py-3 rounded-md overflow-hidden ">
            {categories?.map((c) => {
                return <CategoryItem key={uuidv4()} props={c} />;
            })}
        </div>
    );
};

export default Categories;
