import React, { memo, useEffect, useRef, useState } from 'react';
import ReactLoading from 'react-loading';
import Message from './Message';
import { addMessage, getAllMessageByConversationId } from '../../../services/apiConversation';
import { useAppSelector } from '../../../redux/hooks';
import ButtonOutline from '../../buttonOutline';
import { Conversation } from '../../../interfaces/interfaces';
import NotExit from '../../common/NotExit';

interface Message {
    sender: string;
    text: string;
    _id: string;
    createdAt: string;
}

const ChatRight: React.FC<{ conversation: Conversation; isOpen: boolean }> = ({ conversation, isOpen }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isOpenBox, setIsOpenBox] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const currentUser = useAppSelector((state) => state.user);
    const { socketRef } = useAppSelector((state) => state.action);

    useEffect(() => {
        if (isOpen) {
            setIsOpenBox(isOpen);
            return;
        }
        setTimeout(() => {
            setIsOpenBox(isOpen);
        }, 299);
    }, [isOpen]);

    // get message from socket.io
    useEffect(() => {
        socketRef?.on('getMessage', (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, [socketRef]);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const res = await getAllMessageByConversationId(conversation._id);
            res.success && setMessages(res.data);
            setLoading(false);
        };
        conversation && fetchApi();
    }, [conversation]);
    const scroll = useRef<any>(null);
    useEffect(() => {
        scroll.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);

    const handleSend = async () => {
        if (value) {
            const receiver = conversation.members.find((user) => user?.user._id !== currentUser._id)?.user?._id;
            const message = await addMessage(conversation._id, value, receiver);
            if (message.success) {
                setMessages((prev) => [...prev, message.data]);
                socketRef?.emit('sendMessage', {
                    ...message.data,
                    receiver,
                });
                setValue('');
            }
        }
    };

    return (
        <>
            {isOpenBox && (
                <div
                    className={`w-[400px] h-[100%] flex-1 ${
                        isOpen ? 'animate-active-openBoxChat' : 'animate-active-openBoxChatOff'
                    }`}
                >
                    {!isLoading ? (
                        conversation ? (
                            <div className="h-full w-full ">
                                <div className="p-3  h-[calc(100%-150px)] justify-end w-full overflow-y-scroll ">
                                    <div className="flex flex-col gap-3 h-auto justify-end w-full ">
                                        {messages.length > 0 ? (
                                            messages?.map((message) => (
                                                <div ref={scroll}>
                                                    <Message
                                                        own={message.sender === currentUser._id}
                                                        message={message}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <NotExit label="Chưa có tin nhắn nào" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center px-3 py-1 border-solid border-t-[1px] border-t-gray-200">
                                    <textarea
                                        placeholder="Nhập nội dung tin nhắn"
                                        value={value}
                                        onChange={(e) => setValue(e.currentTarget.value)}
                                        className="w-full outline-none text-sm "
                                    ></textarea>
                                </div>
                                <ButtonOutline className="w-full bg-primary text-white" onClick={handleSend}>
                                    Gửi
                                </ButtonOutline>
                            </div>
                        ) : (
                            <NotExit label="Xin chào" />
                        )
                    ) : (
                        <div className="w-full flex justify-center h-full items-center">
                            <ReactLoading type="cylon" color="rgb(0, 136, 72)" />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default memo(ChatRight);
