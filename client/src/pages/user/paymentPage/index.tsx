import React, { useEffect, useState } from 'react';
import Right from './Right';
import Left from './Left';
import Header from './Header';
import {  useAppSelector } from '../../../redux/hooks';
import { useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();

    const [methods, setMethods] = useState<{
        deliveryMethod: string;
        paymentMethod: string;
    }>({
        deliveryMethod: 'FAST',
        paymentMethod: 'CASH',
    });
    const { selectedProducts } = useAppSelector((state) => state.order);
    useEffect(() => {
        if (selectedProducts.length === 0) {
            navigate("/cart");
        }
    }, []);
    return (
        <div>
            <Header />
            <div className="flex tablet:flex-col py-4 gap-2">
                <Left methods={methods} setMethods={setMethods} />
                <Right methods={methods} />
            </div>
        </div>
    );
};

export default PaymentPage;
