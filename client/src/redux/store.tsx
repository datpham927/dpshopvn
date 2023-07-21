import actionReduce from './features/action/actionSlice';
import userReduce from './features/user/userSlice';
import authReduce from './features/auth/authSlice';
import categorySlice from './features/category/categorySlice';
import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './features/order/orderSlice';
import orderBoughtSlice from './features/orderBought/orderBoughtSlice';
import orderSoldSlice from './features/orderSold/orderSoldSlice';

export const store = configureStore({
    reducer: {
        action: actionReduce,
        user: userReduce,
        auth: authReduce,
        category: categorySlice,
        order: orderSlice,
        orderBought: orderBoughtSlice,
        orderSold: orderSoldSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
