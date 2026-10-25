import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { parseWiredIdList } from './Data/WiredVisualizationStateParser';

export type WiredFurniHighlightMessageType = {
    /** False when the message did not parse (a negative count): Flash then never hands it on. */
    valid: boolean;
    /** Furni ids; a negative id is a wall item. */
    furniIds: number[];
    highlightType: number;
    strength: number;
    color: number;
    animationMode: number;
    easingMode: number;
};

/**
 * Flash `WiredFurniHighlightMessageParser` (WIN63-202610201032): a WIRED Set Highlight on furni;
 * `RoomMessageHandler.onWiredFurniHighlight` hands it to `RoomEngine.updateWiredFurniHighlight`.
 */
export class WiredFurniHighlightMessage implements IIncomingPacket<WiredFurniHighlightMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredFurniHighlightMessageType {
        const furniIds = parseWiredIdList(wrapper);

        if (!furniIds) return { valid: false, furniIds: [], highlightType: 0, strength: 0, color: 0, animationMode: 0, easingMode: 0 };

        return {
            valid: true,
            furniIds,
            highlightType: wrapper.readInt(),
            strength: wrapper.readInt(),
            color: wrapper.readInt(),
            animationMode: wrapper.readInt(),
            easingMode: wrapper.readInt(),
        };
    }
}
