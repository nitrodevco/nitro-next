// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CollectibleBaseItemParser, ICollectibleBaseItem } from './CollectibleBaseItemParser';

/** Flash `parser/collectibles/ClaimItem`: the `CollectibleBaseItem` an `NftClaim` gives, and the set it belongs to. */
export interface IClaimItem extends ICollectibleBaseItem {
    setId: string;
    defaultCollectionName: string;
}

export const ClaimItemParser = (wrapper: IMessageDataWrapper): IClaimItem => {
    const base = CollectibleBaseItemParser(wrapper);
    const setId = wrapper.readString();
    const defaultCollectionName = wrapper.readString();

    return { ...base, setId, defaultCollectionName };
};
