import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

// Define the initial state using that type
interface actionInitial {
    openFeatureAuth: boolean;
    isLoading: boolean; //switch to login or register model
    featureAuth: number; //0 register 1 login 2 forgot
}
const initialState: actionInitial = {
    openFeatureAuth: false,
    isLoading: false,
    featureAuth: 0,
};

export const actionSlice = createSlice({
    name: 'action',
    initialState,
    reducers: {
        setOpenFeatureAuth: (state, action: PayloadAction<boolean>) => {
            state.openFeatureAuth = action.payload;
        },
         setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setFeatureAuth: (state, action: PayloadAction<number>) => {
            state.featureAuth = action.payload;
        },
    },
});

export const { setOpenFeatureAuth, setFeatureAuth, setIsLoading } = actionSlice.actions;

export default actionSlice.reducer;
