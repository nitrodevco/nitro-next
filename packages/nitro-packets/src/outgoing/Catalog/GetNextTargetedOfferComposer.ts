// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetNextTargetedOfferComposerType = object;

export class GetNextTargetedOfferComposer implements IOutgoingPacket<GetNextTargetedOfferComposerType> {
    public constructor(private params: GetNextTargetedOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
