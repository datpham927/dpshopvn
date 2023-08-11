import React, { useEffect, useState } from 'react';
import Right from './Right';
import Left from './Left';
import Header from './Header';
import { setProductsByShopId } from '../../../redux/features/order/orderSlice';
import { useAppDispatch } from '../../../redux/hooks';

const PaymentPage: React.FC = () => {
    const [methods, setMethods] = useState<{
        deliveryMethod: string;
        paymentMethod: string;
    }>({
        deliveryMethod: 'FAST',
        paymentMethod: 'CASH',
    });

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setProductsByShopId());
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
