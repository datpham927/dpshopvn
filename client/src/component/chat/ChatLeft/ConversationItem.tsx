import React, { memo, useEffect, useState } from 'react';
import { Conversation, UserProfile } from '../../../interfaces/interfaces';
import { formatUserName } from '../../../utils/formatUserName';
import { noUser } from '../../../assets';

interface ConversationItemProps {
    conversation: Conversation;
    userId: string;
    onClick?: () => void;
}
// eslint-disable-next-line react-refresh/only-export-components
const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, userId, onClick }) => {
    const [user, setUser] = useState<UserProfile>({} as UserProfile);
    useEffect(() => {
        const user = conversation.members?.find((e) => e._id !== userId);
        user && setUser(user);
    }, []);

    return (
        <div
            className={`flex w-full gap-2 items-center ${
                conversation ? 'bg-white' : ' bg-gray-100'
            } py-2 px-3 cursor-pointer`}
            onClick={onClick}
        >
            <img className="w-[30px] h-[30px] shrink-0 rounded-full" src={user.avatar_url || noUser} />
            <div className="flex flex-col w-full">
                <span className="font-medium w-auto ">{formatUserName(user)}</span>
                <p className="text-sm w-auto text-secondary  truncate-trailing line-clamp-1">
                    bạn có tin mớibạn có tin mới...bạn có tin mới...bạn có tin mới...bạn có tin mới...
                </p>
            </div>
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(ConversationItem);
