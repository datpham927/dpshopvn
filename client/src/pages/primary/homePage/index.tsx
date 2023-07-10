import React from 'react';
import Categories from './categories';
import ShockDiscount from './shockDiscount';
import Products from './products';
import Banner from './Banner';
import ProductFollowings from './productsFollowings';

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col gap-5">
            <Banner />
            <Categories/>
            <ShockDiscount/>
            <ProductFollowings/>
            <Products/>
        </div>
    );
};

export default HomePage;
