import React from 'react';
import Left from './Left';
import Right from './Right';

const CartPage: React.FC = () => {
    return (
        <div className="flex py-8 gap-2">
            <Left />
            <Right />
        </div>
    );
};

export default CartPage;
