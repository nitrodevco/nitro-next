import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SaveRoomSettingsComposerType = {
    roomId: RoomId;
    roomName: string;
    roomDescription: string;
    doorMode: number;
    password: string;
    maxVisitors: number;
    categoryId: number;
    tags: string[];
    tradeMode: RoomTradeModeType;
    allowPets: boolean;
    allowFoodConsume: boolean;
    allowWalkThrough: boolean;
    hideWalls: boolean;
    wallThickness: RoomThicknessType;
    floorThickness: RoomThicknessType;
    whoCanMute: ModSettingType;
    whoCanKick: ModSettingType;
    whoCanBan: ModSettingType;
    chatMode: ChatModeType;
    chatBubbleSize: ChatBubbleWidthType;
    chatScrollUpFrequency: ChatScrollSpeedType;
    chatFullHearRange: number;
    chatFloodSensitivity: ChatFloodSensitivityType;
    allowNavigatorDynCats: boolean;
};

export class SaveRoomSettingsComposer implements IOutgoingPacket<SaveRoomSettingsComposerType> {
    public constructor(private params: SaveRoomSettingsComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.roomId,
            this.params.roomName,
            this.params.roomDescription,
            this.params.doorMode,
            this.params.password,
            this.params.maxVisitors,
            this.params.categoryId,
            this.params.tags,
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
