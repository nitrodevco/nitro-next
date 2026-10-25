import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { parseWiredIdList } from './Data/WiredVisualizationStateParser';

export type WiredFurniTransparencyMessageType = {
    /** False when the message did not parse (a negative count): Flash then never hands it on. */
    valid: boolean;
    /** Furni ids; a negative id is a wall item. */
    furniIds: number[];
    /** 0 (visible) to 100 (invisible). */
    transparency: number;
    allowClickThrough: boolean;
    /** `FurniTransparencyEasingMode`: 0 instant, 1 linear, 2 ease in, 3 ease out, 4 ease in-out. */
    easingMode: number;
};

/**
 * Flash `WiredFurniTransparencyMessageParser` (WIN63-202610201032): a WIRED Set Visibility on furni;
 * `RoomMessageHandler.onWiredFurniTransparency` hands it to `RoomEngine.updateWiredFurniTransparency`.
 */
export class WiredFurniTransparencyMessage implements IIncomingPacket<WiredFurniTransparencyMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredFurniTransparencyMessageType {
        const furniIds = parseWiredIdList(wrapper);

        if (!furniIds) return { valid: false, furniIds: [], transparency: 0, allowClickThrough: false, easingMode: 0 };

        return {
            valid: true,
            furniIds,
            transparency: wrapper.readInt(),
            allowClickThrough: wrapper.readBoolean(),
            easingMode: wrapper.readInt(),
        };
    }
}
