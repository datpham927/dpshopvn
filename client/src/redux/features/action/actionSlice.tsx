import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

// Define the initial state using that type
interface actionInitial {
    openSearchResults: boolean;
    openLogin:boolean
    isLogin:boolean
}
const initialState: actionInitial = {
    openSearchResults: false,
    openLogin:false,
    isLogin:false
};

export const actionSlice = createSlice({
    name: 'action',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setOpenSearchResults: (state, action: PayloadAction<boolean>) => {
            state.openSearchResults = action.payload;
        },
        setOpenLogin: (state, action: PayloadAction<boolean>) => {
            state.openLogin = action.payload;
        },
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
    },
});

export const { setOpenSearchResults,setOpenLogin,setIsLogin } = actionSlice.actions;

export default actionSlice.reducer;
