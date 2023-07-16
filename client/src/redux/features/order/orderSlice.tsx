import { createSlice } from '@reduxjs/toolkit';
import { ProductByShop, ProductInCart } from '../../../interfaces/interfaces';

interface CartInterface {
    selectedProducts: Array<ProductInCart>;
    productInCart: Array<ProductInCart>;
    productsByShopId: Array<ProductByShop>;
}

const initialState: CartInterface = {
    selectedProducts: JSON.parse(localStorage.getItem('selectedProducts') || '[]'),
    productInCart: [],
    productsByShopId: [],
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
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
            
        },
        setSelectedProductsALl: (state, action) => {
            if (state.selectedProducts.length === action.payload.length) {
                state.selectedProducts = [];
            } else {
                state.selectedProducts = action.payload;
            }
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
            
        },
        setSelectedProductsEmpty: (state) => {
            state.selectedProducts = [];
            state.productsByShopId = [];
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
        },
        setIncreaseProduct: (state, action) => {
            const { _id } = action.payload;
            const productInCart = state.productInCart.find((e) => e._id === _id);
            if (productInCart) {
                productInCart.quantity += 1;
                productInCart.totalPrice += productInCart.productId.newPrice;
            }
            const selectedProducts = state.selectedProducts.find((e) => e._id === _id);
            if (selectedProducts) {
                selectedProducts.quantity += 1;
                selectedProducts.totalPrice += selectedProducts.productId.newPrice;
            }
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
            
        },
        setDecreaseProduct: (state, action) => {
            const { _id } = action.payload;
            const selectedProducts = state.selectedProducts.find((e) => e._id === _id);
            const productInCart = state.productInCart.find((e) => e._id === _id);
            if (productInCart) {
                if (productInCart.quantity > 1) {
                    productInCart.quantity -= 1;
                    productInCart.totalPrice -= productInCart.productId.newPrice;
                } else {
                    productInCart.quantity = 1;
                    productInCart.totalPrice = productInCart.productId.newPrice;
                }
            }
            if (selectedProducts) {
                if (selectedProducts.quantity > 1) {
                    selectedProducts.quantity -= 1;
                    selectedProducts.totalPrice -= selectedProducts.productId.newPrice;
                } else {
                    selectedProducts.quantity = 1;
                    selectedProducts.totalPrice = selectedProducts.productId.newPrice;
                }
            }
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
            
        },
        setRemoveProductInCart: (state, action) => {
            const { _id } = action.payload;
            state.selectedProducts = state.selectedProducts?.filter((item) => item?._id !== _id);
            state.productInCart = state.productInCart?.filter((item) => item?._id !== _id);
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
            
        },
        //phân chia đơn hàng theo shop
        setProductsByShopId: (state) => {
            const productsByShop = state.productsByShopId;
            state.selectedProducts.forEach((e) => {
                if (productsByShop.some((s) => s?.shopId == e?.shopId)) {
                    const shop = state.productsByShopId.find((s) => s?.shopId == e?.shopId);
                    if (shop) {
                        if (!shop?.productId.some((p) => p._id === e.productId._id)) {
                            shop.productId.push(e.productId);
                        }
                    }
                } else {
                    state.productsByShopId.push({
                        _id: e._id,
                        productId: [e.productId],
                        deliverDate: Date.now() + 60 * 60 * 24 * 6 * 1000,
                        quantity: e.quantity,
                        shopId: e?.shopId,
                        totalPrice: e.totalPrice,
                        user: e.user,
                    });
                }
            });
        },
    },
});

export const {
    setSelectedProducts,
    setAddProductInCart,
    setSelectedProductsALl,
    setIncreaseProduct,
    setDecreaseProduct,
    setRemoveProductInCart,
    setProductsByShopId,
    setSelectedProductsEmpty,
} = orderSlice.actions;

export default orderSlice.reducer;
