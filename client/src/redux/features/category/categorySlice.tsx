import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../../interfaces/interfaces';

interface CategoriesInterface {
    categories: Array<Category>;
}

const initialState: CategoriesInterface = {
    categories: [],
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
    },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
