// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PickupObjectComposerType = {
    objectId: number;
    /** The room object's category: 10 a floor item, 20 a wall item. */
    objectCategory: number;
    /** Sent only to answer `ObjectRemoveConfirm`; a pickup asks without it. */
    confirm?: boolean;
};

/** `PickupObjectMessageComposer.getMessageArray`: a floor item travels as 2, a wall item as 1, anything else as nothing. */
const PROTOCOL_CATEGORY: Readonly<Record<number, number>> = { 10: 2, 20: 1 };

export class PickupObjectComposer implements IOutgoingPacket<PickupObjectComposerType> {
    public constructor(private params: PickupObjectComposerType) { }

    public compose(): (number | string | boolean)[] {
        const category = PROTOCOL_CATEGORY[this.params.objectCategory];

        if (category === undefined) return [];

        return [
            category,
            this.params.objectId,
            this.params.confirm ?? false,
        ];
    }
}
