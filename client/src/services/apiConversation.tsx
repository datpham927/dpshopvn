import { axiosJWT } from '../utils/httpRequest';

const CreateConversation = async (receiver: string) => {
    try {
        const res = await axiosJWT.post('conversation/create_conversation', receiver);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const getAllConversation = async () => {
    try {
        const res = await axiosJWT.get('conversation/all_conversation');
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

// ------------
const addMessage = async (conversationId: string, text: string) => {
    try {
        const res = await axiosJWT.post(`message/${conversationId}/add_message`, { text });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const getAllMessageByConversationId = async (conversationId: string) => {
    try {
        const res = await axiosJWT.get(`message/${conversationId}/all_message`);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
// eslint-disable-next-line react-refresh/only-export-components
export { CreateConversation, getAllConversation, addMessage, getAllMessageByConversationId };
