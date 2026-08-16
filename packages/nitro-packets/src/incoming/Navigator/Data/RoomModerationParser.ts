import type { IMessageDataWrapper, IRoomModerationSettings } from "@nitrodevco/nitro-api";

export const RoomModerationParser = (wrapper: IMessageDataWrapper) => {
    return {
        whoCanMute: wrapper.readInt(),
        whoCanKick: wrapper.readInt(),
        whoCanBan: wrapper.readInt()
    } as IRoomModerationSettings;
}