import React from 'react';
import Categories from './categories';
import ShockDiscount from './shockDiscount';
import Products from './products';
import ProductFollowings from './productsFollowings';
import { useAppSelector } from '../../../redux/hooks';
import Banner from './banner';
import Seo from '../../../component/seo';

const HomePage: React.FC = () => {
    const { isLoginSuccess } = useAppSelector((state) => state.auth);
    return (
        <div className="flex flex-col gap-5">
            <Seo description='Shop bách hóa' title='D P S H O P V N' key={2} />
            <Banner />
            <Categories />
            <ShockDiscount />
            {isLoginSuccess && <ProductFollowings />}
            <Products />
        </div>
    );
};

export default HomePage;
