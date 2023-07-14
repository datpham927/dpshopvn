import { createSlice } from '@reduxjs/toolkit';
import { ProductInCart } from '../../../interfaces/interfaces';

interface CartInterface {
    selectedProducts: Array<ProductInCart>;
    productInCart: Array<ProductInCart>;
}

const initialState: CartInterface = {
    selectedProducts: [],
    productInCart: [],
};

export const orderSlice = createSlice({
    name: 'order',
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
        setSelectedProducts: (state, action) => {
            const { _id } = action.payload;
            if (state.selectedProducts.some((i) => i._id === _id)) {
                state.selectedProducts = state.selectedProducts.filter((i) => i._id !== _id);
            } else {
                state.selectedProducts.push(action.payload);
            }
        },
        setSelectedProductsALl: (state, action) => {
            if (state.selectedProducts.length === action.payload.length) {
                state.selectedProducts = [];
            } else {
                state.selectedProducts = action.payload;
            }
        },
        setIncreaseProduct: (state, action) => {
            const { _id } = action.payload;
            const productInCart = state.productInCart.find((e) => e._id === _id);
            if (productInCart) {
                productInCart.quantity += 1;
                productInCart.totalPrice += productInCart.unitPrice;
            }
            const selectedProducts = state.selectedProducts.find((e) => e._id === _id);
            if (selectedProducts) {
                selectedProducts.quantity += 1;
                selectedProducts.totalPrice += selectedProducts.unitPrice;
            }
        },
        setDecreaseProduct: (state, action) => {
            const { _id } = action.payload;
            const selectedProducts = state.selectedProducts.find((e) => e._id === _id);
            const productInCart = state.productInCart.find((e) => e._id === _id);
            if (productInCart) {
                if (productInCart.quantity > 1) {
                    productInCart.quantity -= 1;
                    productInCart.totalPrice -= productInCart.unitPrice;
                } else {
                    productInCart.quantity = 1;
                    productInCart.totalPrice = productInCart.unitPrice;
                }
            }
            if (selectedProducts) {
                if (selectedProducts.quantity > 1) {
                    selectedProducts.quantity -= 1;
                    selectedProducts.totalPrice -= selectedProducts.unitPrice;
                } else {
                    selectedProducts.quantity = 1;
                    selectedProducts.totalPrice = selectedProducts.unitPrice;
                }
            }
        },
        setRemoveProductInCart: (state, action) => {
            const { _id } = action.payload;
            state.selectedProducts = state.selectedProducts?.filter((item) => item?._id !== _id);
            state.productInCart = state.productInCart?.filter((item) => item?._id !== _id);
        },
    },
});

export const {
    setSelectedProducts,
    setAddProductInCart,
    setSelectedProductsALl,
    setIncreaseProduct,
    setDecreaseProduct,
    setRemoveProductInCart
} = orderSlice.actions;

export default orderSlice.reducer;
