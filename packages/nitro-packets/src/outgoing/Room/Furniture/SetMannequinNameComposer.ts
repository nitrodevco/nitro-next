// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetMannequinNameComposerType = {
    objectId: number;
    name: string;
};

export class SetMannequinNameComposer implements IOutgoingPacket<SetMannequinNameComposerType> {
    public constructor(private params: SetMannequinNameComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.name,
        ];
    }
}
