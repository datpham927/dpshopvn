import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { Conversation, INotification } from '../../../interfaces/interfaces';
// Define a type for the slice state

// Define the initial state using that type
interface actionInitial {
    openFeatureAuth: boolean;
    mobile_ui: boolean;
    isLoading: boolean; //switch to login or register model
    featureAuth: number; //0 register 1 login 2 forgot
    socketRef: Socket | null;
    notifications: INotification[];
    unreadNotification: INotification[];
    conversations: Conversation[];
    loadDataConversation: boolean;
    isOpenChat: boolean;
}
const initialState: actionInitial = {
    openFeatureAuth: false,
    mobile_ui: false,
    isLoading: false,
    featureAuth: 0,
    socketRef: null,
    //
    notifications: [],
    unreadNotification: [],
    conversations: [],
    isOpenChat: false,
    loadDataConversation: false,
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
        setMobileUi: (state, action: PayloadAction<boolean>) => {
            state.mobile_ui = action.payload;
        },
        setIsOpenChat: (state, action: PayloadAction<boolean>) => {
            state.isOpenChat = action.payload;
        },
        setFeatureAuth: (state, action: PayloadAction<number>) => {
            state.featureAuth = action.payload;
        },
        setSocketRef: (state, action) => {
            state.socketRef = action.payload;
        },
        setNotifications: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.notifications = action.payload;
            } else {
                state.notifications.unshift(action.payload);
            }
        },
        setUnreadNotifications: (state) => {
            state.unreadNotification = state.notifications.filter((n) => n.is_watched === true);
        },
        setUnreadNotificationsEmpty: (state) => {
            state.notifications = state.notifications.map((n) => ({ ...n, is_watched: false }));
            state.unreadNotification = [];
        },
        setConversations: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.conversations = action.payload;
            } else {
                state.conversations.unshift(action.payload);
            }
        },
        setIsWatchedConversations: (state, action) => {
            const { conversationId, userId, isWatched } = action.payload;
            const conversation = state.conversations.find((c) => c._id === conversationId);
            const member = conversation?.members.find((m) => m.user._id === userId);
            if (member) {
                member.isWatched = isWatched;
            }
        },
        setLoadDataConversation: (state) => {
            state.loadDataConversation = !state.loadDataConversation;
        },
    },
});
export const {
    setOpenFeatureAuth,
    setFeatureAuth,
    setSocketRef,
    setIsLoading,
    setIsOpenChat,
    setMobileUi,
    setNotifications,
    setUnreadNotifications,
    setUnreadNotificationsEmpty,
    setConversations,
    setIsWatchedConversations,
    setLoadDataConversation
} = actionSlice.actions;

export default actionSlice.reducer;
