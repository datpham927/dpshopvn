import actionReduce from './features/action/actionSlice';
import userReduce from './features/user/userSlice';
import authReduce from './features/auth/authSlice';
import cartSlice from './features/cart/cartSlice';
import categorySlice from './features/category/categorySlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        action: actionReduce,
        user: userReduce,
        auth: authReduce,
        cart: cartSlice,
        category: categorySlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
