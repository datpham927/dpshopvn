import React, { memo } from 'react';
import { useEffect, useState } from 'react';
import {logo} from '../../assets';
import { getCategories } from '../../services/apiCategory';
import Search from './Search';
import User from './User';
import Cart from './Cart';
import { Category } from '../../interfaces/interfaces';
import { Link } from 'react-router-dom';
import { path } from '../../utils/const';

// eslint-disable-next-line react-refresh/only-export-components
const Header: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>();
    useEffect(() => {
        const fetchCategory = async () => {
            const res = await getCategories();
            if (res?.success) {
                setCategories(res.categories);
            }
        };
        fetchCategory();
    }, []);

    return (
        <header className="h-header w-full bg-primary z-[999]">
            <div className="w-full h-full flex flex-col max-w-7xl m-auto p-[10px] ">
                <div className="flex w-full h-full items-center ">
                    <div className="flex justify-between w-9/12">
                        <Link to={path.HOME}>
                            <img className="w-[150px] " src={logo} />
                        </Link>
                        <Search />
                    </div>
                    <div className="flex w-3/12 justify-end pr-2">
                        <div className="flex text-white items-center gap-4 ">
                            <User />
                            <Cart />
                        </div>
                        <div></div>
                    </div>
                </div>
                {/* content category */}
                <div className="flex item-center ml-[16%] gap-4">
                    {categories?.map(
                        (c, i) =>
                            i < 5 && (
                                <a key={c.category_code} className="text-[13px] text-white cursor-pointer">
                                    {c.category}
                                </a>
                            ),
                    )}
                </div>
            </div>
        </header>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Header);
