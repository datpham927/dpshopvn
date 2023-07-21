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
        },
        setLoadDataOrder: (state) => {
            state.allOrdersBought_isConfirm = state.allOrdersBought.filter(
                (order) => !order.isConfirm && order.isCanceled === false,
            );
            state.allOrdersBought_delivery = state.allOrdersBought.filter(
                (order) => order.isConfirm === true && order.isConfirmDelivery === false,
            );
            state.allOrdersBought_isDelivering = state.allOrdersBought.filter(
                (order) => order.isConfirmDelivery === true && order.isDelivering === false,
            );
            state.allOrdersBought_isSuccess = state.allOrdersBought.filter((order) => order.isDelivering === true);
            state.allOrdersBought_isCanceled = state.allOrdersBought.filter((order) => order.isCanceled === true);
        },
        setCancelOrderRedux: (state, action) => {
            const { _id } = action.payload;
            const order = state.allOrdersBought.find((or) => or._id === _id);
            if (order) {
                order.isCanceled = true;
                order.isConfirmDelivery = false;
                order.isDelivering = false;
                order.isConfirm = false;
            }
        },
        setBuyOrderRedux: (state, action) => {
            const { _id } = action.payload;
            const order = state.allOrdersBought.find((or) => or._id === _id);
            if (order) {
                order.isCanceled = false;
            }
        },
    },
});

// eslint-disable-next-line react-refresh/only-export-components
export const { setAllOrdersBought, setCancelOrderRedux, setBuyOrderRedux, setLoadDataOrder } = OrderBoughtSlice.actions;

export default OrderBoughtSlice.reducer;
