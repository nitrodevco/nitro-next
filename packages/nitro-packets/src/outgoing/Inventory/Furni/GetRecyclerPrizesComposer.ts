// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `GetRecyclerPrizesMessageComposer` (`HabboCatalog.getRecyclerPrizes`). */
export type GetRecyclerPrizesComposerType = object;

export class GetRecyclerPrizesComposer implements IOutgoingPacket<GetRecyclerPrizesComposerType> {
    public constructor(private params: GetRecyclerPrizesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [];
    }
}
