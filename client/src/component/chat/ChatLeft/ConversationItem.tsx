import React, { memo, useEffect, useState } from 'react';
import { Conversation, UserProfile } from '../../../interfaces/interfaces';
import { formatUserName } from '../../../utils/formatUserName';
import { noUser } from '../../../assets';
import moment from 'moment';

interface ConversationItemProps {
    conversation: Conversation;
    isActive: boolean;
    userId: string;
    onClick?: () => void;
}
// eslint-disable-next-line react-refresh/only-export-components
const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isActive, userId, onClick }) => {
    const [user, setUser] = useState<{
        user: UserProfile | any;
        isWatched: boolean;
    }>({
        user: null,
        isWatched: false,
    });

    useEffect(() => {
        const user = conversation?.members?.find((e) => e.user._id !== userId);
        user && setUser(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const isWatched = conversation?.members?.find((e) => e.user._id === userId)?.isWatched;
    return (
        <div
            className={`flex w-full gap-3 items-center ${
                isActive ? 'bg-bgSecondary' : isWatched ? 'bg-white  hover:bg-zinc-100' : 'bg-zinc-300'
            }   py-2 px-3 cursor-pointer `}
            onClick={onClick}
        >
            <div className="w-[35px] h-[35px] shrink-0 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover" src={user?.user?.avatar_url || noUser} />
            </div>
            <div className="flex flex-col w-full">
                <span className="font-medium w-auto ">{formatUserName(user?.user)}</span>
                <p className="text-xs w-auto text-secondary  truncate-trailing line-clamp-1">
                    {moment(conversation?.updatedAt).fromNow()}
                </p>
            </div>
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(ConversationItem);
