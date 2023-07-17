import React, { useState } from 'react';
import Right from './Right';
import Left from './Left';
import Header from './Header';

const PaymentPage:React.FC = () => {
    const [methods, setMethods] = useState<{
        deliveryMethod: string;
        paymentMethod: string;
    }>({
        deliveryMethod: 'FAST',
        paymentMethod: 'CASH',
    });
    return (
        <div>
            <Header />
            <div className="flex py-4 gap-2">
                <Left   methods={methods}setMethods={setMethods}/>
                <Right methods={methods}/>
            </div>
        </div>
    );
};

export default PaymentPage;
