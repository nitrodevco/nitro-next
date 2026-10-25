import { IRoomChatlogData } from './IRoomChatlogData';

export interface IUserChatlogData {
    userId: number;
    userName: string;
    rooms: IRoomChatlogData[];
}
