import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { parseWiredIdList } from './Data/WiredVisualizationStateParser';

export type WiredUserHighlightMessageType = {
    /** False when the message did not parse (a negative count): Flash then never hands it on. */
    valid: boolean;
    /** The room indices of the users, pets and bots. */
    roomIndices: number[];
    highlightType: number;
    strength: number;
    color: number;
    animationMode: number;
    easingMode: number;
};

/**
 * Flash `WiredUserHighlightMessageParser` (WIN63-202610201032): a WIRED Set Highlight on users, pets and bots;
 * `RoomMessageHandler.onWiredUserHighlight` hands it to `RoomEngine.updateWiredUserHighlight`.
 */
export class WiredUserHighlightMessage implements IIncomingPacket<WiredUserHighlightMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredUserHighlightMessageType {
        const roomIndices = parseWiredIdList(wrapper);

        if (!roomIndices) return { valid: false, roomIndices: [], highlightType: 0, strength: 0, color: 0, animationMode: 0, easingMode: 0 };

        return {
            valid: true,
            roomIndices,
            highlightType: wrapper.readInt(),
            strength: wrapper.readInt(),
            color: wrapper.readInt(),
            animationMode: wrapper.readInt(),
            easingMode: wrapper.readInt(),
        };
    }
}
