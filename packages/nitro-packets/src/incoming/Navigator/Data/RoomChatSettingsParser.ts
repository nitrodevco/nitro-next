import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * Mirrors RoomChatSettings.fromFloodSensitivity() in the SWF: the wire only
 * carries the flood sensitivity, the remaining values are fixed defaults.
 */
export const RoomChatSettingsParser = (wrapper: IMessageDataWrapper) => {
    return {
        floodSensitivity: wrapper.readInt(),
    };
};
