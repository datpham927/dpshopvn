import React from 'react';
import { path } from '../../../utils/const';
import { Link } from 'react-router-dom';
import { logo } from '../../../assets';
import Search from './Search';
import Cart from './Cart';

const HeaderBottom = () => {
    return (
        <div className="flex w-full h-full items-start py-[10px] px-4 ">
            <Link to={path.HOME} className="flex justify-start w-2/12">
                <img className="w-[150px] " src={logo} />
            </Link>
            <Search />
            <Cart />
        </div>
    );
};

export default HeaderBottom;
