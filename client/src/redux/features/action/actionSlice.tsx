import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { INotification } from '../../../interfaces/interfaces';
// Define a type for the slice state

// Define the initial state using that type
interface actionInitial {
    openFeatureAuth: boolean;
    isLoading: boolean; //switch to login or register model
    featureAuth: number; //0 register 1 login 2 forgot
    socketRef: React.MutableRefObject<Socket<any, any> | null> | any;
    notifications: INotification[];
    unreadNotification: INotification[];
}
const initialState: actionInitial = {
    openFeatureAuth: false,
    isLoading: false,
    featureAuth: 0,
    socketRef: null,
    notifications: [],
    unreadNotification: [],
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
        setSocketRef: (state, action) => {
            state.socketRef = action.payload;
        },
        setNotifications: (state, action) => {
            state.notifications.unshift(action.payload);
        },
        setUnreadNotifications: (state) => {
            state.unreadNotification = state.notifications.filter((n) => n.is_watched === true);
        },
        setUnreadNotificationsEmpty: (state) => {
            state.notifications = state.notifications.map((n) => ({ ...n, is_watched: false }));
            state.unreadNotification = [];
        },
        setNotificationsApi: (state, action) => {
            state.notifications = action.payload;
        },
    },
});

export const {
    setOpenFeatureAuth,
    setFeatureAuth,
    setSocketRef,
    setIsLoading,
    setNotifications,
    setUnreadNotifications,
    setNotificationsApi,
    setUnreadNotificationsEmpty,
} = actionSlice.actions;

export default actionSlice.reducer;
