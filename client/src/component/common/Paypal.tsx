import React, { useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { setCreateOrder } from '../../services/apiOrder';
import { setIsLoading } from '../../redux/features/action/actionSlice';
import { useAppDispatch } from '../../redux/hooks';
import { showNotification } from '..';
import { setRemoveProductInCart } from '../../redux/features/order/orderSlice';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/const';

interface ButtonWrapperProps {
    showSpinner: boolean;
    currency: string;
    amount: any;
    orderInfo: any;
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({ currency, showSpinner, amount, orderInfo }) => {
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    const handlePayCard = async () => {
        const res = await setCreateOrder(orderInfo);
        appDispatch(setIsLoading(false));
        if (!res.success) {
            showNotification('Đặt hàng không thành công!', false);
            setTimeout(() => {
                navigate('/');
            }, 1000); 
            return;
        }
        showNotification('Đặt hàng thành công! vui lòng kiểm tra trong gmail', true);
        orderInfo?.products?.forEach((e: any) => {
            appDispatch(setRemoveProductInCart(e));
        });
        setTimeout(() => {
            navigate(`${path.PAGE_USER}/purchase`);
        }, 1000);
    };
    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                fundingSource={undefined}
                createOrder={(data, action) =>
                    action.order.create({
                        purchase_units: [{ amount: { currency_code: currency, value: amount } }],
                    })
                }
                onApprove={(data, action) =>
                    action.order.capture().then((res) => {
                        if (res.status === 'COMPLETED') {
                            handlePayCard();
                        } else {
                            showNotification('Đặt hàng không thành công!', false);
                        }
                    })
                }
            />
        </>
    );
};

const Paypal: React.FC<{ amount: string; data: any }> = ({ amount, data }) => {
    return (
        <div className="w-full ">
            <PayPalScriptProvider options={{ 'client-id': 'test', components: 'buttons', currency: 'USD' }}>
                <ButtonWrapper currency="USD" amount={amount} orderInfo={data} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
};

export default Paypal;
