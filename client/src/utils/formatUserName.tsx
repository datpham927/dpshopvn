import { UserDetail } from '../interfaces/interfaces';

export const formatUserName = (currentUser: UserDetail | any) =>
    currentUser?.firstName ? `${currentUser?.lastName} ${currentUser?.firstName}` : currentUser?.email?.split('@')[0];
