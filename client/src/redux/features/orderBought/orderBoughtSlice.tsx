import { createSlice } from '@reduxjs/toolkit';
import { IOrderItem, ProductByShop, ProductInCart } from '../../../interfaces/interfaces';

interface OrderBoughtInterface {
    allOrdersBought: Array<IOrderItem>;
    allOrdersBought_delivery: Array<IOrderItem>;
    allOrdersBought_isCanceled: Array<IOrderItem>;
    allOrdersBought_isConfirm: Array<IOrderItem>;
    allOrdersBought_isDelivering: Array<IOrderItem>;
    allOrdersBought_isSuccess: Array<IOrderItem>;
}

const initialState: OrderBoughtInterface = {
    // -------------
    allOrdersBought: [],
    allOrdersBought_delivery: [],
    allOrdersBought_isCanceled: [],
    allOrdersBought_isConfirm: [],
    allOrdersBought_isDelivering: [],
    allOrdersBought_isSuccess: [],
};

export const OrderBoughtSlice = createSlice({
    name: 'orderBought',
    initialState,
    reducers: {
        setAllOrdersBought: (state: OrderBoughtInterface, action: { payload: IOrderItem[] }): void => {
            state.allOrdersBought = action.payload;
            state.allOrdersBought_isConfirm = action.payload.filter(
                (order) => !order.isConfirm && order.isCanceled === false,
            );
            state.allOrdersBought_delivery = action.payload.filter(
                (order) => order.isConfirm === true && order.isConfirmDelivery === false,
            );
            state.allOrdersBought_isDelivering = action.payload.filter(
                (order) => order.isConfirmDelivery === true && order.isDelivering === false,
            );
            state.allOrdersBought_isSuccess = action.payload.filter((order) => order.isDelivering === true);
            state.allOrdersBought_isCanceled = action.payload.filter((order) => order.isCanceled === true);
        },
    },
});

export const { setAllOrdersBought } = OrderBoughtSlice.actions;

export default OrderBoughtSlice.reducer;
