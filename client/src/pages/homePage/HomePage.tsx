import React from 'react';
import Banners from './banners/Banners';
import Categories from './categories/Categories';
import ShockDiscount from './shockDiscount/ShockDiscount';
import Products from './products/Products';

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
