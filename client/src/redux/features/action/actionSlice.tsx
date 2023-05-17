import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
// Define a type for the slice state

// Define the initial state using that type
interface actionInitial {
    openSearchResults: boolean;
}
const initialState: actionInitial = {
    openSearchResults: false,
};

export const actionSlice = createSlice({
    name: 'action',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setOpenSearchResults: (state, action: PayloadAction<boolean>) => {
            state.openSearchResults = action.payload;
        },
    },
});

export const { setOpenSearchResults } = actionSlice.actions;

export default actionSlice.reducer;
