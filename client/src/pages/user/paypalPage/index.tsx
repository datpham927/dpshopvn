import React, { useEffect } from 'react';
import { Paypal } from '../../../component';
import { useAppSelector } from '../../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { convertCurrencyUsd } from '../../../utils/convertCurrencyUsd';
import { path } from '../../../utils/const';

const PaypalPage: React.FC = () => {
    const { orderInfo } = useAppSelector((state) => state.order);
    const navigate = useNavigate();
    useEffect(() => {
        if (!orderInfo) {
            navigate(path.PAGE_PAYMENT);
        }
    }, []);
    return (
        <div className="flex mobile:flex-col w-full h-screen bg-white p-5">
            <div className="flex mobile:w-full w-6/12 justify-center items-center ">
                <div className="w-[400px]">
                    <video
                        className="object-cover"
                        src="https://cdnl.iconscout.com/lottie/premium/thumb/payment-received-8453779-6725893.mp4"
                        autoPlay
                        loop
                    />
                </div>
            </div>
            <div className="flex flex-col mobile:w-full w-6/12 justify-center items-center ">
                <Paypal amount={convertCurrencyUsd(orderInfo?.totalPriceMemo)} data={orderInfo} />
            </div>
        </div>
    );
};

export default PaypalPage;
