// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetMannequinFigureComposerType = {
    /** The mannequin itself: it is dressed in whatever the sender is wearing, so no figure travels. */
    objectId: number;
};

export class SetMannequinFigureComposer implements IOutgoingPacket<SetMannequinFigureComposerType> {
    public constructor(private params: SetMannequinFigureComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
