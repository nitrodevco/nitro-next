// Body filled by hand from the AS3 (GetHotLooksMessageComposer) - the generator has no preserve step, so re-apply after a regeneration.
import { Byte, IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetHotLooksComposerType = {
    /** How many looks to send: `HotLooksModel.MAXIMUM_HOT_LOOKS`, 20. The official client sends it as one byte. */
    amount: number;
};

export class GetHotLooksComposer implements IOutgoingPacket<GetHotLooksComposerType> {
    public constructor(private params: GetHotLooksComposerType) { }

    public compose(): (number | string | boolean | Byte)[] {
        return [
            new Byte(this.params.amount),
        ];
    }
}
