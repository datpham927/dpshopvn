import { createSlice } from '@reduxjs/toolkit';
import { UserDetail } from '../../../interfaces/interfaces';
// Define a type for the slice state

// Define the initial state using that type

const initialState: UserDetail = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false,
    address: '',
    tablet: '',
    avatar_url: '',
    createdAt: '',
    confirm: false,
    totalProduct: 0,
    followings: [],
    followers: [],
    mobile:0
};

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setDetailUser: (state, action) => {
            const { firstName, _id, lastName, email, isAdmin,followings, address, createdAt,mobile, avatar_url, confirm, totalProduct } =
                action.payload;
                (state.firstName = firstName),
                (state.lastName = lastName),
                (state.createdAt = createdAt),
                (state._id = _id),
                (state.email = email),
                (state.isAdmin = isAdmin),
                (state.address = address),
                (state.mobile = mobile),
                (state.avatar_url = avatar_url),
                (state.confirm = confirm),
                (state.totalProduct = totalProduct);
                (state.followings = followings);
        },
    },
});

export const { setDetailUser } = userSlice.actions;

export default userSlice.reducer;
