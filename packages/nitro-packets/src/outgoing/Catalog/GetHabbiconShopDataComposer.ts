// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetHabbiconShopDataComposerType = object;

/** Flash `§_-V1Y§.§_-u1M§`: asks for `HabbiconShopData`. */
export class GetHabbiconShopDataComposer implements IOutgoingPacket<GetHabbiconShopDataComposerType> {
    public constructor(private params: GetHabbiconShopDataComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [];
    }
}
