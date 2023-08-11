import React, { useEffect, useState } from 'react';
import { InputForm } from '../..';
import ConversationItem from './ConversationItem';
import { getAllConversation } from '../../../services/apiConversation';
import { Conversation, UserProfile } from '../../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setConversations } from '../../../redux/features/action/actionSlice';

interface ChatLeft {
    setConversation: React.Dispatch<React.SetStateAction<Conversation>>;
    setIsOpenBoxChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatLeft: React.FC<ChatLeft> = ({ setConversation, setIsOpenBoxChat }) => {
    const [value, setValue] = useState<string>('');
    const dispatch = useAppDispatch();
    const { conversations } = useAppSelector((state) => state.action);

    const currentUser = useAppSelector((state) => state.user);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getAllConversation();
            res.success && dispatch(setConversations(res.data));
        };
        fetchApi();
    }, []);
    return (
        <div className="w-[300px] h-full border-solid border-r-[1px] border-r-gray-200">
            <div className="p-2">
                <InputForm
                    name_id="search"
                    value={value}
                    placeholder="Tìm kiếm"
                    handleOnchange={(e) => setValue(e.target.value)}
                />
            </div>
            <div className="w-full h-full">
                {conversations?.map((c) => (
                    <ConversationItem
                        conversation={c}
                        userId={currentUser._id}
                        onClick={() => {
                            setConversation(c);
                            setIsOpenBoxChat(true);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatLeft;
