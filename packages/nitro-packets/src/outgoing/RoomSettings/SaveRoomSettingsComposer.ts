import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/*
 * SaveRoomSettingsMessageComposer (725) — WIN63-202607011411 wire: the pre-2014 chat
 * mode/bubble/scroll fields are gone; flood sensitivity, door-tile and idle-timer
 * fields plus muteAllPets replaced them.
 */
export type SaveRoomSettingsComposerType = {
    roomId: number;
    name: string;
    description: string;
    doorMode: number;
    password: string;
    maximumVisitors: number;
    categoryId: number;
    tags: string[];
    tradeMode: number;
    allowPets: boolean;
    allowFoodConsume: boolean;
    allowWalkThrough: boolean;
    hideWalls: boolean;
    wallThickness: number;
    floorThickness: number;
    whoCanMute: number;
    whoCanKick: number;
    whoCanBan: number;
    chatFloodSensitivity: number;
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
        const tags = this.params.tags.filter(x => x !== '');

        return [
            this.params.roomId,
            this.params.name,
            this.params.description,
            this.params.doorMode,
            this.params.password,
            this.params.maximumVisitors,
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
