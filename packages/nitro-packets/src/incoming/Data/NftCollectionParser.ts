// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ReadLong } from '@nitrodevco/nitro-api';

import { CollectibleItemClaimParser, ICollectibleItemClaim } from './CollectibleItemClaimParser';
import { CollectibleItemParser, ICollectibleItem } from './CollectibleItemParser';

/**
 * Flash `parser/collectibles/NftCollection` as it is read off the wire: the set's items, its id
 * and name, the wallet's XP in it (`collectionScore`) out of `collectionTotalScore`, the XP
 * completing it adds (`collectionBoostScore`), the bonus and reward items, the bonus claim window
 * (`releasedTime` / `snapshotTime`, milliseconds, -1 for none) and the status, then a claim for
 * each of the two items that is there.
 *
 * The Flash class's `collectedItemCount`, claiming states and claim predicates are the client's
 * own bookkeeping, which the collectibles store keeps (`context/collectibles`).
 */
export interface INftCollection {
    items: ICollectibleItem[];
    collectionId: string;
    collectionName: string;
    collectionScore: number;
    collectionTotalScore: number;
    collectionBoostScore: number;
    bonusItem: ICollectibleItem | null;
    rewardItem: ICollectibleItem | null;
    releasedTime: number;
    snapshotTime: number;
    status: number;
    bonusItemClaim: ICollectibleItemClaim | null;
    rewardItemClaim: ICollectibleItemClaim | null;
}

export const NftCollectionParser = (wrapper: IMessageDataWrapper): INftCollection => {
    const items: ICollectibleItem[] = [];
    const count = wrapper.readInt();

    for (let i = 0; i < count; i++) items.push(CollectibleItemParser(wrapper));

    const collectionId = wrapper.readString();
    const collectionName = wrapper.readString();
    const collectionScore = wrapper.readInt();
    const collectionTotalScore = wrapper.readInt();
    const collectionBoostScore = wrapper.readInt();
    const hasBonusItem = wrapper.readBoolean();
    const bonusItem = hasBonusItem ? CollectibleItemParser(wrapper) : null;
    const hasRewardItem = wrapper.readBoolean();
    const rewardItem = hasRewardItem ? CollectibleItemParser(wrapper) : null;
    const releasedTime = ReadLong(wrapper);
    const snapshotTime = ReadLong(wrapper);
    const status = wrapper.readShort();
    const bonusItemClaim = hasBonusItem ? CollectibleItemClaimParser(wrapper) : null;
    const rewardItemClaim = hasRewardItem ? CollectibleItemClaimParser(wrapper) : null;

    return { items, collectionId, collectionName, collectionScore, collectionTotalScore, collectionBoostScore, bonusItem, rewardItem, releasedTime, snapshotTime, status, bonusItemClaim, rewardItemClaim };
};
