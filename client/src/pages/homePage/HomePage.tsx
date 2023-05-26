import React from 'react';
import Banners from './banners/Banners';
import Categories from './categories/Categories';
import ShockDiscount from './shockDiscount/ShockDiscount';

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <Banners />
            <Categories/>
            <ShockDiscount/>
        </div>
    );
};

export default HomePage;
