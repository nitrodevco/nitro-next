import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { parseWiredIdList } from './Data/WiredVisualizationStateParser';

export type WiredUserTransparencyMessageType = {
    /** False when the message did not parse (a negative count): Flash then never hands it on. */
    valid: boolean;
    /** The users' (avatars, pets, bots) room indices. */
    roomIndices: number[];
    /** 0 (visible) to 100 (invisible). */
    transparency: number;
    allowClickThrough: boolean;
    /** `FurniTransparencyEasingMode`: 0 instant, 1 linear, 2 ease in, 3 ease out, 4 ease in-out. */
    easingMode: number;
};

/**
 * Flash `WiredUserTransparencyMessageParser` (WIN63-202610201032): a WIRED Set Visibility on users;
 * `RoomMessageHandler.onWiredUserTransparency` hands it to `RoomEngine.updateWiredUserTransparency`.
 */
export class WiredUserTransparencyMessage implements IIncomingPacket<WiredUserTransparencyMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredUserTransparencyMessageType {
        const roomIndices = parseWiredIdList(wrapper);

        if (!roomIndices) return { valid: false, roomIndices: [], transparency: 0, allowClickThrough: false, easingMode: 0 };

        return {
            valid: true,
            roomIndices,
            transparency: wrapper.readInt(),
            allowClickThrough: wrapper.readBoolean(),
            easingMode: wrapper.readInt(),
        };
    }
}
