/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { InputForm } from '../..';
import { Conversation } from '../../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setIsWatchedConversations } from '../../../redux/features/action/actionSlice';
import { formatUserName } from '../../../utils/formatUserName';
import NotExit from '../../common/NotExit';
import ConversationItem from '../../item/ConversationItem';

interface ChatLeft {
    setConversation: React.Dispatch<React.SetStateAction<Conversation>>;
    setIsOpenBoxChat: React.Dispatch<React.SetStateAction<boolean>>;
    conversation: Conversation;
    isOpenBoxChat: boolean;
    isLoading: boolean;
}

const ChatLeft: React.FC<ChatLeft> = ({
    setConversation,
    conversation,
    setIsOpenBoxChat,
    isOpenBoxChat,
    isLoading,
}) => {
    const [value, setValue] = useState<string>('');
    const [conversationsNew, setConversationsNew] = useState<Conversation[]>([]);
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.user);
    const { conversations } = useAppSelector((state) => state.action);
    useEffect(() => {
        setConversationsNew(conversations);
    }, [conversations]);
    // tìm kiếm
    useEffect(() => {
        const filterConversations = conversations.filter((c) => {
            return formatUserName(c.members.find((m) => m.user._id !== currentUser._id)?.user).includes(value);
        });
        setConversationsNew(filterConversations);
    }, [value]);

    return (
        <div
            className={`${
                isOpenBoxChat ? 'tablet:hidden' : ''
            } tablet:w-full w-[300px] h-full border-solid border-r-[1px] border-r-gray-200`}
        >
            <div className="p-2">
                <InputForm
                    name_id="search"
                    value={value}
                    placeholder="Tìm kiếm"
                    handleOnchange={(e) => setValue(e.target.value)}
                />
            </div>
            {!isLoading ? (
                conversationsNew?.length > 0 ? (
                    <div className="w-full h-full">
                        {conversationsNew?.map((c) => (
                            <ConversationItem
                                isActive={c._id === conversation?._id}
                                conversation={c}
                                userId={currentUser._id}
                                onClick={() => {
                                    setConversation(c);
                                    dispatch(
                                        setIsWatchedConversations({
                                            conversationId: c._id,
                                            userId: currentUser._id,
                                            isWatched: true,
                                        }),
                                    );
                                    setIsOpenBoxChat(true);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <NotExit label="Không có tin nhắn nào" />
                )
            ) : (
                <div className="w-full flex justify-center h-full items-center">
                <ReactLoading type="cylon" color="rgb(0, 136, 72)" />
            </div>
            )}
        </div>
    );
};

export default ChatLeft;
