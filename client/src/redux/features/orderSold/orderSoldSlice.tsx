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
                (order) => !order.is_confirm && order.is_canceled === false,
            );
            state.allOrdersSold_delivery = state.allOrdersSold.filter(
                (order) => order.is_confirm === true && order.is_confirm_delivery === false,
            );
            state.allOrdersSold_isDelivering = state.allOrdersSold.filter(
                (order) => order.is_confirm_delivery === true && order.is_delivering === false,
            );
            state.allOrdersSold_isSuccess = state.allOrdersSold.filter(
                (order) => order.is_delivering === true && order.is_success === true,
            );
            state.allOrdersSold_isCanceled = state.allOrdersSold.filter((order) => order.is_canceled === true);
        },
        setCancelOrderSoldRedux: (state, action) => {
            const { _id } = action.payload;
            const order = state.allOrdersSold.find((or) => or._id === _id);
            if (order) {
                order.is_canceled = true;
                order.is_confirm_delivery = false;
                order.is_delivering = false;
                order.is_confirm = false;
            }
        },
        setBuyOrderRedux: (state, action) => {
            const { _id } = action.payload;
            const order = state.allOrdersSold.find((or) => or._id === _id);
            if (order) {
                order.is_canceled = false;
            }
        }, // ----------
        setIsConfirm: (state, action) => {
            const { _id } = action.payload;
            const order = state.allOrdersSold.find((or) => or._id === _id);
            if (order) {
                order.is_confirm = true;
            }
        },
        setIsDelivering: (state, action) => {
            const { _id } = action.payload;
            const order = state.allOrdersSold.find((or) => or._id === _id);
            if (order) {
                order.is_confirm_delivery = true;
            }
        },
        setIsSuccess: (state, action) => {
            const { _id } = action.payload;
            const order = state.allOrdersSold.find((or) => or._id === _id);
            if (order) {
                order.is_success = true;
                order.is_delivering = true;
            }
        },
    },
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
    setAllOrdersSold,
    setCancelOrderSoldRedux,
    setLoadDataOrderSold,
    setIsConfirm,
    setIsDelivering,
    setIsSuccess,
} = OrderSoldSlice.actions;

export default OrderSoldSlice.reducer;
