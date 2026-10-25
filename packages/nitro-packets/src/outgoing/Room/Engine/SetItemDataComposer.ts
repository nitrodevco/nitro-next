// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetItemDataComposerType = {
    itemId: number;
    /** A stickie's colour as bare hex (`FFFF33`); the text follows it in the item data, space separated. */
    colorHex: string;
    text: string;
};

export class SetItemDataComposer implements IOutgoingPacket<SetItemDataComposerType> {
    public constructor(private params: SetItemDataComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.itemId,
            this.params.colorHex,
            this.params.text,
        ];
    }
}
