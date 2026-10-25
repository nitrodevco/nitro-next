// Body filled by hand from the 2026 client's own composer - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket, RoomChatFloodSensitivityType, RoomDoorModeEnum, RoomModerationType, RoomThicknessType, RoomTradeModeEnum } from '@nitrodevco/nitro-api';

export type SaveRoomSettingsComposerType = {
    roomId: number;
    roomName: string;
    roomDescription: string;
    doorMode: RoomDoorModeEnum;
    /** Only read for a password door; sent empty otherwise. */
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
    chatFloodSensitivity: RoomChatFloodSensitivityType;
    /** Walking onto the door tile leaves the room. */
    leaveOnDoorTileEnabled: boolean;
    idleSleepEnabled: boolean;
    idleSleepTimeoutSeconds: number;
    idleAutokickEnabled: boolean;
    idleAutokickTimeoutSeconds: number;
    muteAllPets: boolean;
};

export class SaveRoomSettingsComposer implements IOutgoingPacket<SaveRoomSettingsComposerType> {
    public constructor(private params: SaveRoomSettingsComposerType) { }

    public compose(): (number | string | boolean)[] {
        // `SaveRoomSettingsMessageComposer` drops blank tags rather than sending them.
        const tags = this.params.tags.filter(tag => !!tag && (tag !== ''));

        return [
            this.params.roomId,
            this.params.roomName,
            this.params.roomDescription,
            this.params.doorMode,
            this.params.password,
            this.params.maxVisitors,
            this.params.categoryId,
            tags.length,
            ...tags,
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
            this.params.chatFloodSensitivity,
            this.params.leaveOnDoorTileEnabled,
            this.params.idleSleepEnabled,
            this.params.idleSleepTimeoutSeconds,
            this.params.idleAutokickEnabled,
            this.params.idleAutokickTimeoutSeconds,
            this.params.muteAllPets,
        ];
    }
}
