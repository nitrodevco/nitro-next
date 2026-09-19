import { IRoomChatlogData } from './IRoomChatlogData';

export interface ICfhChatlogData {
    callId: number;
    callerUserId: number;
    reportedUserId: number;
    chatRecordId: number;
    chatRecord: IRoomChatlogData;
}
