import { IIncomingPacket, IMessageDataWrapper, IRoomModerationSettings } from '@nitrodevco/nitro-api';

import { RoomModerationParser } from '../Navigator/Data/RoomModerationParser';

/*
 * RoomSettingsDataParser (§_-94§/§_-1i§) — the full editable settings snapshot the
 * server answers GetRoomSettings with.
 */
export type IRoomSettingsData = {
    roomId: number;
    name: string;
    description: string;
    doorMode: number;
    categoryId: number;
    maximumVisitors: number;
    maximumVisitorsLimit: number;
    tags: string[];
    tradeMode: number;
    allowPets: boolean;
    allowFoodConsume: boolean;
    allowWalkThrough: boolean;
    hideWalls: boolean;
    wallThickness: number;
    floorThickness: number;
    chatFloodSensitivity: number;
    leaveOnDoorTileEnabled: boolean;
    idleSleepEnabled: boolean;
    idleSleepTimeoutSeconds: number;
    idleAutokickEnabled: boolean;
    idleAutokickTimeoutSeconds: number;
    muteAllPets: boolean;
    moderation: IRoomModerationSettings;
    hiddenByBc: boolean;
};

export type RoomSettingsDataEventMessageType = {
    data: IRoomSettingsData;
};

export class RoomSettingsDataEventMessage implements IIncomingPacket<RoomSettingsDataEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomSettingsDataEventMessageType {
        const data: IRoomSettingsData = {
            roomId: wrapper.readInt(),
            name: wrapper.readString(),
            description: wrapper.readString(),
            doorMode: wrapper.readInt(),
            categoryId: wrapper.readInt(),
            maximumVisitors: wrapper.readInt(),
            maximumVisitorsLimit: wrapper.readInt(),
            tags: [],
            tradeMode: -1,
            allowPets: false,
            allowFoodConsume: false,
            allowWalkThrough: false,
            hideWalls: false,
            wallThickness: 0,
            floorThickness: 0,
            chatFloodSensitivity: 0,
            leaveOnDoorTileEnabled: true,
            idleSleepEnabled: false,
            idleSleepTimeoutSeconds: 0,
            idleAutokickEnabled: false,
            idleAutokickTimeoutSeconds: 0,
            muteAllPets: false,
            moderation: { whoCanMute: 0, whoCanKick: 0, whoCanBan: 0 } as IRoomModerationSettings,
            hiddenByBc: false,
        };

        let tagCount = wrapper.readInt();

        while (tagCount > 0) {
            data.tags.push(wrapper.readString());

            tagCount--;
        }

        data.tradeMode = wrapper.readInt();
        data.allowPets = wrapper.readInt() === 1;
        data.allowFoodConsume = wrapper.readInt() === 1;
        data.allowWalkThrough = wrapper.readInt() === 1;
        data.hideWalls = wrapper.readInt() === 1;
        data.wallThickness = wrapper.readInt();
        data.floorThickness = wrapper.readInt();
        data.chatFloodSensitivity = wrapper.readInt();
        data.leaveOnDoorTileEnabled = wrapper.readBoolean();
        data.idleSleepEnabled = wrapper.readBoolean();
        data.idleSleepTimeoutSeconds = wrapper.readInt();
        data.idleAutokickEnabled = wrapper.readBoolean();
        data.idleAutokickTimeoutSeconds = wrapper.readInt();
        data.muteAllPets = wrapper.readBoolean();
        data.moderation = RoomModerationParser(wrapper);
        data.hiddenByBc = wrapper.readBoolean();

        return { data };
    }
}
