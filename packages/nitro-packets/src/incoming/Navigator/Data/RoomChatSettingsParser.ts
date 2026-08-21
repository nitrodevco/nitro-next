import type { IMessageDataWrapper, IRoomChatSettings } from "@nitrodevco/nitro-api";

/**
 * Mirrors RoomChatSettings.fromFloodSensitivity() in the SWF: the wire only
 * carries the flood sensitivity, the remaining values are fixed defaults.
 */
export const RoomChatSettingsParser = (wrapper: IMessageDataWrapper) => {
    return {
        mode: 0,
        bubbleSize: 1,
        scrollUpFrequency: 1,
        fullHearRange: 0,
        floodSensitivity: wrapper.readInt()
    } as IRoomChatSettings;
}
