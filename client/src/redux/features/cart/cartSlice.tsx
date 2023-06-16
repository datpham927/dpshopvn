import { createSlice } from '@reduxjs/toolkit';
import { ProductInCart } from '../../../interfaces/interfaces';

interface CartInterface {
    productInCart: Array<ProductInCart>;
}

const initialState: CartInterface = {
    productInCart: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setAddProductInCart: (state, action) => {
            if (action.payload.length > 1) {
                state.productInCart = action.payload;
            } else {
                const payloadProductId = action.payload?._id;
                const existingProductIndex = state.productInCart.findIndex(
                    (product) => product._id === payloadProductId,
                );
                if (existingProductIndex !== -1) {
                    state.productInCart[existingProductIndex] = { ...action.payload };
                } else {
                    state.productInCart.push(action.payload);
                }
            }
        },
    },
});

export const { setAddProductInCart } = cartSlice.actions;

export default cartSlice.reducer;
