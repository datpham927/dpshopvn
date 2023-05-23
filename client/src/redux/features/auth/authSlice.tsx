import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state


interface  AuthInitialState  {
    email:string,
    isLoginSuccess:boolean
}

const initialState :AuthInitialState= {
        email: '',
        isLoginSuccess:false
};

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setIsLoginSuccess:(state, action: PayloadAction<boolean>) => {
            state.isLoginSuccess = action.payload;
        },
    },
});

export const { setEmail,setIsLoginSuccess} = authSlice.actions;

export default authSlice.reducer;
