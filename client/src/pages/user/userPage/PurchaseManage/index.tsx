import React, { PureComponent, useState } from 'react';
import { PURCHASE_TAB } from '../../../../utils/const';
import { useNavigate } from 'react-router-dom';
import AllOrders from './AllOrders';
import DeliveryOrders from './DeliveryOrders';
import DeliveringOrders from './DeliveringOrders';
import SuccessOrders from './SuccessOrders';
import ConfirmOrders from './ConfirmOrders';

const PurchaseManage: React.FC = () => {
    const [displayTab, setDisplayTab] = useState<number>(1);

    const renderPage = (tab: number) => {
        switch (tab) {
            case 1: {
                return <AllOrders />;
            }
            case 2: {
                return <ConfirmOrders />;
            }
            case 3: {
                return <DeliveryOrders />;
            }
            case 4: {
                return <DeliveringOrders />;
            }
            case 5: {
                return <SuccessOrders />;
            }
            case 6: {
                return <DeliveringOrders />;
            }
        }
    };

    return (
        <div className="w-full h-full">
            <h2 className="my-4 text-xl">Đơn hàng Của Tôi</h2>
            <div className="w-full h-full grid grid-cols-6 bg-white rounded-sm overflow-hidden">
                {PURCHASE_TAB.map((e) => (
                    <div
                        className={`flex w-full justify-center items-center py-2 border-b-[2px] border-solid cursor-pointer ${
                            displayTab === e.tab ? 'text-primary border-primary' : 'text-secondary border-transparent'
                        }`}
                        onClick={() => setDisplayTab(e.tab)}
                    >
                        {e.title}
                    </div>
                ))}
            </div>

            {renderPage(displayTab)}
        </div>
    );
};

export default PurchaseManage;
