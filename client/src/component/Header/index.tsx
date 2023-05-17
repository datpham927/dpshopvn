import React from 'react';
import { useEffect, useState } from 'react';
import logo from '../../assets/logo1.png';
import Search from './Search';
import Cart from './Cart';
import User from './User';
import { getCategories } from '../../services/apiCategory';
import { category } from '../../interfaces/interfaces';
const Header: React.FC = () => {
    const [categories, setCategories] = useState<category[]>();
    useEffect(() => {
        const fetchCategory = async () => {
            const res = await getCategories();
            if (res.success) {
                setCategories(res.categories);
            }
        };
        fetchCategory();
    }, []);

    return (
        <div className="h-header w-full flex flex-col bg-primary p-[10px] z-[999]">
            <div className="flex w-full h-full items-center">
                <div className="flex-1">
                    <img className="w-[150px] " src={logo} />
                </div>
                <Search />
                <div className="flex mx-5">
                    <div className="flex text-white items-center gap-4">
                        <User />
                        <Cart />
                    </div>
                    <div></div>
                </div>
            </div>
            {/* content category */}
            <div className="flex item-center ml-[18%] gap-4">
                {categories?.map(
                    (c, i) => i < 5 && <a className="text-[13px] text-white cursor-pointer">{c.category}</a>,
                )}
            </div>
        </div>
    );
};

export default Header;
