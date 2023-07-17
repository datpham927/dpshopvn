import React, { useEffect, useState } from 'react';

import { getAllOrdersBought } from '../../../../services/apiOrder';

import { IOrderItem } from '../../../../interfaces/interfaces';
import { OrderItem } from '../../../../component';


const AllOrders: React.FC = () => {
    const [allOrdersBought, setAllOrdersBought] = useState<Array<IOrderItem>>();
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllOrdersBought();
            res.success && setAllOrdersBought(res?.data);
        };
        fetchApi();
    }, []);

    return (
        <div className="flex flex-col py-5 gap-6">
            {allOrdersBought?.map((order) => (
              <OrderItem order={order}/>
            ))}
        </div>
    );
};

export default AllOrders;
