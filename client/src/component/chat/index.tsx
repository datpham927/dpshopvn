import React, { useEffect, useState } from 'react';
import MessageIcon from '@mui/icons-material/Message';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setConversations, setIsOpenChat, setLoadDataConversation } from '../../redux/features/action/actionSlice';
import { Conversation } from '../../interfaces/interfaces';
import { getAllConversation } from '../../services/apiConversation';
import ChatModal from './chatModal';

const Chat: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [unseenConversations, setUnseenConversations] = useState<number>(0);
    const dispatch = useAppDispatch();
    const { isOpenChat } = useAppSelector((state) => state.action);
    const { conversations, loadDataConversation } = useAppSelector((state) => state.action);
    const currentUser = useAppSelector((state) => state.user);
    const { socketRef } = useAppSelector((state) => state.action);

    useEffect(() => {
        socketRef?.on('getMessage', () => {
            dispatch(setLoadDataConversation());
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketRef]);
    useEffect(() => {
        const unseenConversations = conversations.filter(
            (c) => c.members.find((m) => m.user?._id === currentUser._id)?.isWatched === false,
        );
        setUnseenConversations(unseenConversations.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversations]);
    console.log(conversations);

    useEffect(() => {
        if (isOpenChat) {
            setIsOpen(isOpenChat);
            return;
        }
        setTimeout(() => {
            setIsOpen(isOpenChat);
        }, 200);
    }, [isOpenChat]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllConversation();
            res.success && dispatch(setConversations(res.data));
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadDataConversation]);
    
    return (
        <div className="tablet:hidden fixed bottom-1 right-5 z-[1000] ">
            <div
                className="relative p-3 bg-primary rounded-full text-white cursor-pointer"
                onClick={() => dispatch(setIsOpenChat(true))}
            >
                <MessageIcon fontSize="large" />
                {unseenConversations > 0 && (
                    <div className="absolute text-[13px] px-[5px]  rounded-[50%] top-0 right-0 h-fit bg-[#A769FD]">
                        {unseenConversations}
                    </div>
                )}
            </div>
            {isOpen && <ChatModal />}
        </div>
    );
};

export default Chat;
