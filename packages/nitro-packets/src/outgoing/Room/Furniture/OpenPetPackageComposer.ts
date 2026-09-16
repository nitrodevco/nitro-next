// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenPetPackageComposerType = {
    /** The unopened package in the room. */
    objectId: number;
    /** What the pet inside will be called; the server has the last word on it. */
    name: string;
};

export class OpenPetPackageComposer implements IOutgoingPacket<OpenPetPackageComposerType> {
    public constructor(private params: OpenPetPackageComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.name,
        ];
    }
}
