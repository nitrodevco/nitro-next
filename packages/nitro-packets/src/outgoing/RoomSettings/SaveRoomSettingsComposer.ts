import { IOutgoingPacket, RoomChatBubbleWidthType, RoomChatFloodSensitivityType, RoomChatModeType, RoomChatScrollSpeedType, RoomModerationType, RoomThicknessType, RoomTradeModeEnum } from '@nitrodevco/nitro-api';

export type SaveRoomSettingsComposerType = {
    roomId: number;
    roomName: string;
    roomDescription: string;
    doorMode: number;
    password: string;
    maxVisitors: number;
    categoryId: number;
    tags: string[];
    tradeMode: RoomTradeModeEnum;
    allowPets: boolean;
    allowFoodConsume: boolean;
    allowWalkThrough: boolean;
    hideWalls: boolean;
    wallThickness: RoomThicknessType;
    floorThickness: RoomThicknessType;
    whoCanMute: RoomModerationType;
    whoCanKick: RoomModerationType;
    whoCanBan: RoomModerationType;
    chatMode: RoomChatModeType;
    chatBubbleSize: RoomChatBubbleWidthType;
    chatScrollUpFrequency: RoomChatScrollSpeedType;
    chatFullHearRange: number;
    chatFloodSensitivity: RoomChatFloodSensitivityType;
    allowNavigatorDynCats: boolean;
};

export class SaveRoomSettingsComposer implements IOutgoingPacket<SaveRoomSettingsComposerType> {
    public constructor(private params: SaveRoomSettingsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
            this.params.roomName,
            this.params.roomDescription,
            this.params.doorMode,
            this.params.password,
            this.params.maxVisitors,
            this.params.categoryId,
            this.params.tags.length,
            ...this.params.tags,
            this.params.tradeMode,
            this.params.allowPets,
            this.params.allowFoodConsume,
            this.params.allowWalkThrough,
            this.params.hideWalls,
            this.params.wallThickness,
            this.params.floorThickness,
            this.params.whoCanMute,
            this.params.whoCanKick,
            this.params.whoCanBan,
            this.params.chatMode,
            this.params.chatBubbleSize,
            this.params.chatScrollUpFrequency,
            this.params.chatFullHearRange,
            this.params.chatFloodSensitivity,
            this.params.allowNavigatorDynCats,
        ];
    }
}
