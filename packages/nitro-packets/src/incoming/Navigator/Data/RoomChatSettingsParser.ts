import type { IMessageDataWrapper, IRoomChatSettings, RoomChatBubbleWidthType, RoomChatFloodSensitivityType, RoomChatModeType, RoomChatScrollSpeedType, RoomModerationType } from "@nitrodevco/nitro-api";

export const RoomChatSettingsParser = (wrapper: IMessageDataWrapper) => {
    return {
        mode: wrapper.readInt(),
        bubbleSize: wrapper.readInt(),
        scrollUpFrequency: wrapper.readInt(),
        fullHearRange: wrapper.readInt(),
        floodSensitivity: wrapper.readInt()
    } as IRoomChatSettings;
}