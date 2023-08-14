import React, { useEffect, useState } from 'react';
import MessageIcon from '@mui/icons-material/Message';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import ChatLeft from './ChatLeft';
import ChatRight from './ChatRight';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setConversations, setIsOpenChat, setLoadDataConversation } from '../../redux/features/action/actionSlice';
import { Conversation } from '../../interfaces/interfaces';
import { getAllConversation } from '../../services/apiConversation';

const Chat: React.FC = () => {
    const [conversation, setConversation] = useState<Conversation | any>({} as Conversation);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenBoxChat, setIsOpenBoxChat] = useState<boolean>(false);
    const [unseenConversations, setUnseenConversations] = useState<number>(0);
    const dispatch = useAppDispatch();
    const { isOpenChat } = useAppSelector((state) => state.action);
    const { conversations, loadDataConversation } = useAppSelector((state) => state.action);
    const currentUser = useAppSelector((state) => state.user);
    const { socketRef } = useAppSelector((state) => state.action);

    useEffect(() => {
        socketRef?.on('getMessage', () => {
            dispatch(setLoadDataConversation())
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
    console.log(conversations)

    useEffect(() => {
        if (isOpenChat) {
            setIsOpen(isOpenChat);
            return;
        }
        setTimeout(() => {
            setIsOpen(isOpenChat);
        }, 200);
        setConversation(null);
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
        <div className="fixed bottom-1 right-5 z-[1000] ">
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
            {isOpen && (
                <div
                    className={`absolute bottom-0 right-0 w-auto h-[460px] bg-white shadow-search rounded-md  duration-1000 origin-bottom-right  ${
                        isOpenChat ? 'animate-active-openChat' : 'animate-active-openChatOff'
                    }`}
                >
                    <div className="flex justify-between px-4 py-1 border-solid border-b-[1px] border-b-gray-200">
                        <div className="text-lg font-medium text-primary">Chat</div>
                        <div className="flex gap-2 ">
                            <div
                                className="text-secondary cursor-pointer"
                                onClick={() => setIsOpenBoxChat(!isOpenBoxChat)}
                            >
                                {isOpenBoxChat ? <WestIcon fontSize="small" /> : <EastIcon fontSize="small" />}
                            </div>
                            <div
                                className="text-secondary cursor-pointer"
                                onClick={() => {
                                    dispatch(setIsOpenChat(false));
                                    setIsOpenBoxChat(false);
                                }}
                            >
                                <ExpandMoreIcon fontSize="large" />
                            </div>
                        </div>
                    </div>
                    <div className="flex ww-full h-full">
                        <ChatLeft
                            setConversation={setConversation}
                            conversation={conversation}
                            setIsOpenBoxChat={setIsOpenBoxChat}
                        />
                        <ChatRight conversation={conversation} isOpen={isOpenBoxChat} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
