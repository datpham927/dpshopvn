import React, { useEffect, useState } from 'react';
import MessageIcon from '@mui/icons-material/Message';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import ChatLeft from './ChatLeft';
import ChatRight from './ChatRight';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsOpenChat } from '../../redux/features/action/actionSlice';
import { Conversation } from '../../interfaces/interfaces';

const Chat: React.FC = () => {
    const [conversation, setConversation] = useState<Conversation>({} as Conversation);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenBoxChat, setIsOpenBoxChat] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { isOpenChat } = useAppSelector((state) => state.action);

    useEffect(() => {
        if (isOpenChat) {
            setIsOpen(isOpenChat);
            return;
        }
        setTimeout(() => {
            setIsOpen(isOpenChat);
        }, 299);
    }, [isOpenChat]);

    return (
        <div className="fixed bottom-1 right-5 z-[1000]">
            <div
                className="relative p-3 bg-primary rounded-full text-white"
                onClick={() => dispatch(setIsOpenChat(true))}
            >
                <MessageIcon fontSize="large" />
                <div className="absolute text-[13px] px-[5px]  rounded-[50%] top-0 right-0 h-fit bg-[#A769FD]">1</div>
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
                            <div className="text-secondary" onClick={() => setIsOpenBoxChat(!isOpenBoxChat)}>
                                {isOpenBoxChat ? <WestIcon fontSize="small" /> : <EastIcon fontSize="small" />}
                            </div>
                            <div
                                className="text-secondary"
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
                         <ChatLeft setConversation={setConversation} setIsOpenBoxChat={setIsOpenBoxChat} />
                         <ChatRight conversation={conversation} isOpen={isOpenBoxChat} /> 
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
