// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Flash `GetNftCollectionsMessageComposer`: the collection sets of a wallet (empty for none).
 */
export type GetNftCollectionsComposerType = {
    walletAddress: string;
};

export class GetNftCollectionsComposer implements IOutgoingPacket<GetNftCollectionsComposerType> {
    public constructor(private params: GetNftCollectionsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.walletAddress,
        ];
    }
}
