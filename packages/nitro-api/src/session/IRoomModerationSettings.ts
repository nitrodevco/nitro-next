import { RoomModerationType } from './enum';

export interface IRoomModerationSettings {
    whoCanMute: RoomModerationType;
    whoCanKick: RoomModerationType;
    whoCanBan: RoomModerationType;
}
