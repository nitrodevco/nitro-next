import { RoomChatBubbleWidthType, RoomChatFloodSensitivityType, RoomChatModeType, RoomChatScrollSpeedType } from './enum';

export interface IRoomChatSettings {
    mode: RoomChatModeType;
    bubbleSize: RoomChatBubbleWidthType;
    scrollUpFrequency: RoomChatScrollSpeedType;
    fullHearRange: number;
    floodSensitivity: RoomChatFloodSensitivityType;
}
