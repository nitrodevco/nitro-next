// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetObjectDataComposerType = {
    objectId: number;
    /** Written as a flat key, value, key, value list after its length. */
    data: Map<string, string>;
};

export class SetObjectDataComposer implements IOutgoingPacket<SetObjectDataComposerType> {
    public constructor(private params: SetObjectDataComposerType) { }

    public compose(): (number | string | boolean)[] {
        const data: (number | string | boolean)[] = [ this.params.objectId, this.params.data.size * 2 ];

        for (const [ key, value ] of this.params.data) data.push(key, value);

        return data;
    }
}
