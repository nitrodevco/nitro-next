// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `GetRecyclerStatusMessageComposer` (`HabboCatalog.getRecyclerStatus`). */
export type GetRecyclerStatusComposerType = object;

export class GetRecyclerStatusComposer implements IOutgoingPacket<GetRecyclerStatusComposerType> {
    public constructor(private params: GetRecyclerStatusComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [];
    }
}
