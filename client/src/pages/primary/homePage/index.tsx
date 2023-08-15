import React from 'react';
import Categories from './categories';
import ShockDiscount from './shockDiscount';
import Products from './products';
import ProductFollowings from './productsFollowings';
import { useAppSelector } from '../../../redux/hooks';
import Banner from './banner';

const HomePage: React.FC = () => {
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    return (
        <div className="flex flex-col gap-5">
            <Banner />
            <Categories />
            <ShockDiscount />
            {isLoginSuccess && <ProductFollowings />}
            <Products />
        </div>
    );
};

export default HomePage;
