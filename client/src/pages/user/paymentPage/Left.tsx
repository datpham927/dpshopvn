import React from 'react';
import BackpackIcon from '@mui/icons-material/Backpack';
import { ProductInCartItem } from '../../../component';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import moment from 'moment';
import { DELIVERY_METHOD, PAYMENT_METHOD } from '../../../utils/const';

interface LeftProps {
    methods: {
        deliveryMethod: string;
        paymentMethod: string;
    };
    setMethods: React.Dispatch<
        React.SetStateAction<{
            deliveryMethod: string;
            paymentMethod: string;
        }>
    >;
}

const Left: React.FC<LeftProps> = ({ methods, setMethods }) => {
    const { productsByShopId } = useAppSelector((state) => state?.order);

    return (
        <div className="w-4/6 relative py-3">
            <div className="flex flex-col bg-white rounded-md gap-10 p-6 mb-2">
                <div>
                    <h1 className="text-lg mb-3 font-medium">{DELIVERY_METHOD.title}</h1>
                    <div className=" flex flex-col w-1/2 gap-1 p-4 bg-[#F0F8FF] rounded-md  border-solid border-[1px]  border-slate-300">
                        {DELIVERY_METHOD.method.map((e) => (
                            <label
                                className="flex gap-2 items-center"
                                onClick={() => setMethods((prev) => ({ ...prev, deliveryMethod: e?.code }))}
                            >
                                <input type="radio" checked={methods.deliveryMethod === e?.code} />
                                <span className="text-[rgb(255,183,0)] font-black text-sm">{e?.code}</span>
                                <span className="text-sm">{e?.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {productsByShopId?.map((e, index) => (
                    <div className="relative p-2 border-solid border-[1px] border-bgSecondary rounded-xl">
                        <div className="absolute flex gap-1 items-center top-[-15px] left-8 bg-white px-2 text-primary">
                            <BackpackIcon fontSize="small" style={{ color: 'rgb(0 136 72)' }} />
                            Gói {index + 1} : Giao vào{' '}
                            <span className="capitalize">{moment(e?.deliverDate).format('dddd, DD/MM/YYYY')}</span>
                        </div>
                        <div className="mt-4">
                            {e?.products.map((p) => (
                                <ProductInCartItem
                                    product={{
                                        _id: e?._id,
                                        quantity: p.quantity ? p.quantity : 1,
                                        shopId: e?.shopId,
                                        totalPrice: p.totalPrice,
                                        user: e?.user,
                                        productId: p,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                <div>
                    <h1 className="text-lg mb-3 font-medium">{PAYMENT_METHOD.title}</h1>
                    <div className=" flex flex-col w-1/2 gap-3 p-4 rounded-md  ">
                        {PAYMENT_METHOD.method.map((e) => (
                            <label
                                className="flex gap-2 items-center"
                                onClick={() => setMethods((prev) => ({ ...prev, paymentMethod: e?.code }))}
                            >
                                <input type="radio" checked={methods.paymentMethod === e?.code} />
                                <img className="w-8 h-8" src={e?.img} />
                                <span className="text-sm">{e?.code}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Left;
