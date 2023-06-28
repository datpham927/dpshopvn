import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

// Define the initial state using that type
interface actionInitial {
    openFeatureAuth:boolean
    isLogin:boolean   //switch to login or register model
}
const initialState: actionInitial = {
    openFeatureAuth:false,
    isLogin:false
};

export const actionSlice = createSlice({
    name: 'action',
    initialState,
    reducers: {
    
        setOpenFeatureAuth: (state, action: PayloadAction<boolean>) => {
            state.openFeatureAuth = action.payload;
        },
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
    },
});

export const { setOpenFeatureAuth,setIsLogin } = actionSlice.actions;

export default actionSlice.reducer;
