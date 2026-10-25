// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type EnterOneWayDoorComposerType = {
    objectId: number;
};

/** Asks to walk through a one-way door. */
export class EnterOneWayDoorComposer implements IOutgoingPacket<EnterOneWayDoorComposerType> {
    public constructor(private params: EnterOneWayDoorComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
