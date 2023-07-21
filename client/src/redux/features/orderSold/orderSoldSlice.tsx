import { createSlice } from '@reduxjs/toolkit';
import { IOrderItem } from '../../../interfaces/interfaces';

interface OrderSoldSliceInterface {
    allOrdersSold: Array<IOrderItem>;
    allOrdersSold_delivery: Array<IOrderItem>;
    allOrdersSold_isCanceled: Array<IOrderItem>;
    allOrdersSold_isConfirm: Array<IOrderItem>;
    allOrdersSold_isDelivering: Array<IOrderItem>;
    allOrdersSold_isSuccess: Array<IOrderItem>;
}

const initialState: OrderSoldSliceInterface = {
    // -------------
    allOrdersSold: [],
    allOrdersSold_delivery: [],
    allOrdersSold_isCanceled: [],
    allOrdersSold_isConfirm: [],
    allOrdersSold_isDelivering: [],
    allOrdersSold_isSuccess: [],
};

export const OrderSoldSlice = createSlice({
    name: 'orderSold',
    initialState,
    reducers: {
        setAllOrdersSold: (state: OrderSoldSliceInterface, action: { payload: IOrderItem[] }): void => {
            state.allOrdersSold = action.payload;
        },
        setLoadDataOrderSold: (state) => {
            state.allOrdersSold_isConfirm = state.allOrdersSold.filter(
                (order) => !order.isConfirm && order.isCanceled === false,
            );
            state.allOrdersSold_delivery = state.allOrdersSold.filter(
                (order) => order.isConfirm === true && order.isConfirmDelivery === false,
            );
            state.allOrdersSold_isDelivering = state.allOrdersSold.filter(
                (order) => order.isConfirmDelivery === true && order.isDelivering === false,
            );
            state.allOrdersSold_isSuccess = state.allOrdersSold.filter((order) => order.isDelivering === true);
            state.allOrdersSold_isCanceled = state.allOrdersSold.filter((order) => order.isCanceled === true);
        },
        setCancelOrderSoldRedux: (state, action) => {
            const { _id } = action.payload;
            const order = state.allOrdersSold.find((or) => or._id === _id);
            if (order) {
                order.isCanceled = true;
                order.isConfirmDelivery = false;
                order.isDelivering = false;
                order.isConfirm = false;
            }
        },
        setBuyOrderRedux: (state, action) => {
            const { _id } = action.payload;
            const order = state.allOrdersSold.find((or) => or._id === _id);
            if (order) {
                order.isCanceled = false;
            }
        },
    },
});

// eslint-disable-next-line react-refresh/only-export-components
export const { setAllOrdersSold, setCancelOrderSoldRedux, setLoadDataOrderSold } = OrderSoldSlice.actions;

export default OrderSoldSlice.reducer;
