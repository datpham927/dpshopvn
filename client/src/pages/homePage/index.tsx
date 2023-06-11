import React from 'react';
import Categories from './categories';
import ShockDiscount from './shockDiscount';
import Products from './products';
import Banners from './banners';

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col gap-5">
            <Banners />
            <Categories/>
            <ShockDiscount/>
            <Products/>
        </div>
    );
};

export default HomePage;
