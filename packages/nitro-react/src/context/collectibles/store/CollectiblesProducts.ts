/**
 * What the collectibles hub knows about a product, whatever carries it - the Flash
 * `IProductDisplayInfo` / `IRenderableCollectibleItem` pair and its three wrappers
 * (`renderer/model/BaseItemWrapper`, `CollectionItemWrapper`, `MintableItemWrapper`,
 * `RenderableShopNftItem`), the colour helpers (`util/§_-X2l§.getRarityColor`,
 * `renderer/collections/§_-If§.getColor`) and `NftCollection`'s client-side bookkeeping: its
 * collected item count, the claiming states `claimBonusAwaiting` / `claimRewardFinished` move, and
 * the claim predicates the collections tab reads.
 */
import type { ICollectibleBaseItem, ICollectibleItem, ICollectiblesProductItem, INftCollection } from '@nitrodevco/nitro-packets';

/** `IProductDisplayInfo.productTypeId` - the cases `CollectiblesController` switches on. */
export const COLLECTIBLE_PRODUCT_TYPE_UNKNOWN = -1;
export const COLLECTIBLE_PRODUCT_TYPE_WALL = 0;
export const COLLECTIBLE_PRODUCT_TYPE_FLOOR = 1;
export const COLLECTIBLE_PRODUCT_TYPE_EFFECT = 2;
export const COLLECTIBLE_PRODUCT_TYPE_BADGE = 4;
export const COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE = 9;
export const COLLECTIBLE_PRODUCT_TYPE_PET = 10;
export const COLLECTIBLE_PRODUCT_TYPE_CLOTHING = 11;

/** `IRenderableCollectibleItem`: `IProductDisplayInfo` plus how many are held. */
export interface CollectibleProductInfo {
    productTypeId: number;
    itemTypeId: string;
    petFigureString: string;
    figureSetIds: number[];
    /** Always `''` for the collectibles wrappers. */
    extraData: string;
    amount: number;
}

/** `BaseItemWrapper` / `RenderableShopNftItem`: a base item, none held. */
export const wrapBaseItem = (item: ICollectibleBaseItem): CollectibleProductInfo => ({
    productTypeId: item.productTypeId,
    itemTypeId: item.itemTypeId,
    petFigureString: item.petFigureString,
    figureSetIds: item.figureSetIds,
    extraData: '',
    amount: 0,
});

/** `CollectionItemWrapper`: a collection's item and how many the wallet holds. */
export const wrapCollectionItem = (item: ICollectibleItem): CollectibleProductInfo => ({ ...wrapBaseItem(item), amount: item.amount });

/** `MintableItemWrapper.productTypeId`: `i` a wall item, `s` a floor item, `cl` clothing, anything else unknown. */
export const getMintableItemProductTypeId = (itemType: string): number => {
    switch (itemType) {
        case 'i': return COLLECTIBLE_PRODUCT_TYPE_WALL;
        case 's': return COLLECTIBLE_PRODUCT_TYPE_FLOOR;
        case 'cl': return COLLECTIBLE_PRODUCT_TYPE_CLOTHING;
        default: return COLLECTIBLE_PRODUCT_TYPE_UNKNOWN;
    }
};

/** `MintableItemWrapper`: a mintable furni type and how many of it are in the inventory; no pet figure, no figure sets. */
export const wrapMintableItem = (item: ICollectiblesProductItem, amount: number): CollectibleProductInfo => ({
    productTypeId: getMintableItemProductTypeId(item.itemType),
    itemTypeId: String(item.itemTypeId),
    petFigureString: '',
    figureSetIds: [],
    extraData: '',
    amount,
});

/**
 * `§_-X2l§.rarityColors`. `getRarityColor` looks the rarity up upper-cased while the table's keys
 * are lower case, so no rarity is ever found and every one gets the grey fallback - which is what
 * the reward box and the `nft_opening` bubble draw in the client, and so here.
 */
const RARITY_COLORS: Record<string, number> = {
    common: 6187373,
    uncommon: 24916,
    rare: 1202293,
    epic: 7150694,
    legendary: 8526848,
    'legendary+': 11167744,
};

/** `§_-X2l§.getRarityColor`. */
export const getCollectibleRarityColor = (rarity: string): number => RARITY_COLORS[rarity.toUpperCase()] ?? 8947848;

/** `§_-If§`'s constants. */
const PROGRESS_START_PERCENTAGE = 1;
const PROGRESS_MID_PERCENTAGE = 50;
const PROGRESS_END_PERCENTAGE = 99;
const PROGRESS_START_COLOR = 12278528;
const PROGRESS_MID_COLOR = 12952320;
const PROGRESS_END_COLOR = 8958976;
const PROGRESS_NOT_STARTED_COLOR = 8912917;
const PROGRESS_COMPLETION_COLOR = 37130;

/** `§_-If§.interpolate`: per channel, then `RGBToHex`'s int shifts, which truncate the fractions. */
const interpolateColor = (from: number, to: number, fraction: number): number => {
    const channel = (shift: number) => {
        const a = (from >> shift) & 0xff;
        const b = (to >> shift) & 0xff;

        return a + (fraction * (b - a));
    };

    return ((channel(16) << 16) | (channel(8) << 8) | channel(0)) >>> 0;
};

/** `§_-If§.getColor`: green when complete, dark red when nothing is collected, else a ramp from orange over yellow to green. */
export const getCollectionProgressColor = (collected: number, total: number): number => {
    if (collected === total) return PROGRESS_COMPLETION_COLOR;
    if (collected === 0) return PROGRESS_NOT_STARTED_COLOR;

    const percentage = (collected * 100) / total;

    if (percentage <= PROGRESS_MID_PERCENTAGE) return interpolateColor(PROGRESS_START_COLOR, PROGRESS_MID_COLOR, (percentage - PROGRESS_START_PERCENTAGE) / (PROGRESS_MID_PERCENTAGE - PROGRESS_START_PERCENTAGE));

    return interpolateColor(PROGRESS_MID_COLOR, PROGRESS_END_COLOR, (percentage - PROGRESS_MID_PERCENTAGE) / (PROGRESS_END_PERCENTAGE - PROGRESS_MID_PERCENTAGE));
};

/** `NftCollection`'s claiming states (`§_-22J§`, `§_-V1Z§`). */
export const NFT_COLLECTION_CLAIMING_NONE = 0;
export const NFT_COLLECTION_CLAIMING_AWAITING = 1;

/** `CollectibleItemClaim.§_-E1F§`: a claim that may be made. */
export const COLLECTIBLE_ITEM_CLAIM_STATUS_OPEN = 0;

/**
 * `NftCollection`: the packet's collection with what the client keeps about it - the claimed
 * amounts `claimBonusFinished` / `claimRewardFinished` count up, and the claiming states.
 */
export interface CollectiblesCollection {
    data: INftCollection;
    /** `§_-629§`: items with an amount above 0, counted as they were read. */
    collectedItemCount: number;
    /** `bonusItemClaim.claimedAmount`, counted up by a successful claim. */
    bonusClaimedAmount: number;
    rewardClaimedAmount: number;
    /** `§_-x1N§` / `§_-A9§`. */
    claimingBonusStatus: number;
    claimingRewardStatus: number;
}

export const createCollectiblesCollection = (data: INftCollection): CollectiblesCollection => ({
    data,
    collectedItemCount: data.items.filter(item => item.amount > 0).length,
    bonusClaimedAmount: data.bonusItemClaim?.claimedAmount ?? 0,
    rewardClaimedAmount: data.rewardItemClaim?.claimedAmount ?? 0,
    claimingBonusStatus: NFT_COLLECTION_CLAIMING_NONE,
    claimingRewardStatus: NFT_COLLECTION_CLAIMING_NONE,
});

/** `totalItemCount`. */
export const getCollectionTotalItemCount = (collection: CollectiblesCollection) => collection.data.items.length;

/** `progressPercentage`: an int, so the division truncates. */
export const getCollectionProgressPercentage = (collection: CollectiblesCollection) => Math.trunc((collection.collectedItemCount * 100) / getCollectionTotalItemCount(collection));

/** `hasRewardItem` / `hasBonusItem`. */
export const collectionHasRewardItem = (collection: CollectiblesCollection) => !!collection.data.rewardItem;
export const collectionHasBonusItem = (collection: CollectiblesCollection) => !!collection.data.bonusItem;

/** `rewardClaimed`: all claimed, or a claim on its way. */
export const isCollectionRewardClaimed = (collection: CollectiblesCollection) => {
    const claim = collection.data.rewardItemClaim;

    return collectionHasRewardItem(collection) && !!claim && (((collection.rewardClaimedAmount > 0) && (collection.rewardClaimedAmount >= claim.claimLimit)) || (collection.claimingRewardStatus === NFT_COLLECTION_CLAIMING_AWAITING));
};

/** `bonusClaimed`: all claimed, or any claiming state but none. */
export const isCollectionBonusClaimed = (collection: CollectiblesCollection) => {
    const claim = collection.data.bonusItemClaim;

    return collectionHasBonusItem(collection) && !!claim && (((collection.bonusClaimedAmount > 0) && (collection.bonusClaimedAmount >= claim.claimLimit)) || (collection.claimingBonusStatus !== NFT_COLLECTION_CLAIMING_NONE));
};

/** `canClaimReward`. */
export const canClaimCollectionReward = (collection: CollectiblesCollection) => {
    const claim = collection.data.rewardItemClaim;

    return collectionHasRewardItem(collection) && !!claim && (claim.status === COLLECTIBLE_ITEM_CLAIM_STATUS_OPEN) && !isCollectionRewardClaimed(collection) && (collection.rewardClaimedAmount < claim.claimLimit) && (collection.claimingRewardStatus === NFT_COLLECTION_CLAIMING_NONE);
};

/** `canClaimBonus`. */
export const canClaimCollectionBonus = (collection: CollectiblesCollection) => {
    const claim = collection.data.bonusItemClaim;

    return collectionHasBonusItem(collection) && !!claim && (claim.status === COLLECTIBLE_ITEM_CLAIM_STATUS_OPEN) && !isCollectionBonusClaimed(collection) && (collection.bonusClaimedAmount < claim.claimLimit) && (collection.claimingBonusStatus === NFT_COLLECTION_CLAIMING_NONE);
};

/** `isBonusSnapshotPassed`. */
export const isCollectionBonusSnapshotPassed = (collection: CollectiblesCollection, now: number) => collection.data.snapshotTime < now;

/** The `DateTimeFormatter` the rewards tab and the collection view format a date with: `dd/MM/yyyy`, local time. */
export const formatCollectiblesDate = (time: number): string => {
    const date = new Date(time);

    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
};
