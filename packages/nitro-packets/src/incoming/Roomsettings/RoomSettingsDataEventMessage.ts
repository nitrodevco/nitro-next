// Body filled by hand from the 2026 client's own parser - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, IRoomModerationSettings, RoomChatFloodSensitivityType, RoomDoorModeEnum, RoomThicknessType, RoomTradeModeEnum } from '@nitrodevco/nitro-api';

import { RoomModerationParser } from '../Navigator/Data/RoomModerationParser';

export type RoomSettingsDataEventMessageType = {
    roomId: number;
    name: string;
    description: string;
    doorMode: RoomDoorModeEnum;
    categoryId: number;
    maximumVisitors: number;
    /** The highest the visitor cap may be set to for this room. */
    maximumVisitorsLimit: number;
    tags: string[];
    tradeMode: RoomTradeModeEnum;
    allowPets: boolean;
    allowFoodConsume: boolean;
    allowWalkThrough: boolean;
    hideWalls: boolean;
    wallThickness: RoomThicknessType;
    floorThickness: RoomThicknessType;
    /** The wire carries only the flood sensitivity; the rest of the chat settings are fixed. */
    chatFloodSensitivity: RoomChatFloodSensitivityType;
    leaveOnDoorTileEnabled: boolean;
    idleSleepEnabled: boolean;
    idleSleepTimeoutSeconds: number;
    idleAutokickEnabled: boolean;
    idleAutokickTimeoutSeconds: number;
    muteAllPets: boolean;
    moderation: IRoomModerationSettings;
    /** Hidden from the navigator by Builders Club. */
    hiddenByBc: boolean;
};

export class RoomSettingsDataEventMessage implements IIncomingPacket<RoomSettingsDataEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomSettingsDataEventMessageType {
        const packet: RoomSettingsDataEventMessageType = {
            roomId: wrapper.readInt(),
            name: wrapper.readString(),
            description: wrapper.readString(),
            doorMode: wrapper.readInt(),
            categoryId: wrapper.readInt(),
            maximumVisitors: wrapper.readInt(),
            maximumVisitorsLimit: wrapper.readInt(),
            tags: [],
            tradeMode: 0,
            allowPets: false,
            allowFoodConsume: false,
            allowWalkThrough: false,
            hideWalls: false,
            wallThickness: 0,
            floorThickness: 0,
            chatFloodSensitivity: 0,
            leaveOnDoorTileEnabled: false,
            idleSleepEnabled: false,
            idleSleepTimeoutSeconds: 0,
            idleAutokickEnabled: false,
            idleAutokickTimeoutSeconds: 0,
            muteAllPets: false,
            moderation: { whoCanMute: 0, whoCanKick: 0, whoCanBan: 0 },
            hiddenByBc: false,
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.tags.push(wrapper.readString());

            count--;
        }

        packet.tradeMode = wrapper.readInt();
        // The four switches come over as integers rather than booleans.
        packet.allowPets = wrapper.readInt() === 1;
        packet.allowFoodConsume = wrapper.readInt() === 1;
        packet.allowWalkThrough = wrapper.readInt() === 1;
        packet.hideWalls = wrapper.readInt() === 1;
        packet.wallThickness = wrapper.readInt();
        packet.floorThickness = wrapper.readInt();
        packet.chatFloodSensitivity = wrapper.readInt();
        packet.leaveOnDoorTileEnabled = wrapper.readBoolean();
        packet.idleSleepEnabled = wrapper.readBoolean();
        packet.idleSleepTimeoutSeconds = wrapper.readInt();
        packet.idleAutokickEnabled = wrapper.readBoolean();
        packet.idleAutokickTimeoutSeconds = wrapper.readInt();
        packet.muteAllPets = wrapper.readBoolean();
        packet.moderation = RoomModerationParser(wrapper);
        packet.hiddenByBc = wrapper.readBoolean();

        return packet;
    }
}
