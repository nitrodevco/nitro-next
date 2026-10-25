import { ICfhChatlogDataDq } from './ICfhChatlogDataDq';

export interface IRoomChatlogData {
    recordType: number;
    context: Map<string, boolean | number | string>;
    chatlog: ICfhChatlogDataDq[];
}
