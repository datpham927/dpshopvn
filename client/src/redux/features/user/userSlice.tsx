import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

// Define the initial state using that type
interface actionInitial {
    email: string;
}
const initialState: actionInitial = {
    email: "",
    
};

export const actionSlice = createSlice({
    name: 'action',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
     
    },
});

export const { setEmail } = actionSlice.actions;

export default actionSlice.reducer;
