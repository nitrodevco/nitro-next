/**
 * The collectibles hub's collections tab - Flash `tabs/CollectionsTab` and its `subviews/CollectionView`.
 * Part of Flash `catalog/collectibles/CollectiblesController` - see `collectiblesCommands`.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetNftCollectionsComposer, ICollectibleItem, INftCollection, NftCollectiblesClaimBonusItemComposer, NftCollectiblesClaimRewardItemComposer } from '@nitrodevco/nitro-packets';

import {
    canClaimCollectionBonus, canClaimCollectionReward, COLLECTIBLE_PREVIEW_NONE, COLLECTIBLE_PREVIEW_PLACEHOLDER, CollectiblesCollection, CollectiblesCollectionView, collectiblesStore, COLLECTION_PREVIEW_STATUS_BONUS,
    COLLECTION_PREVIEW_STATUS_COLLECTION, COLLECTION_PREVIEW_STATUS_ITEM, COLLECTION_PREVIEW_STATUS_REWARD, collectionHasBonusItem, collectionHasRewardItem, COLLECTIONS_SORT_PROGRESS, COLLECTIONS_SORT_SCORE, createCollectiblesCollection,
    getCollectionProgressPercentage, isCollectionBonusClaimed, isCollectionBonusSnapshotPassed, isCollectionRewardClaimed, NFT_COLLECTION_CLAIMING_AWAITING, NFT_COLLECTION_CLAIMING_NONE, wrapCollectionItem,
} from '#base/context/collectibles';
import { Send } from '#base/context/communication';
import { translate as t } from '#base/context/system';

import { controllerPreviewImage, getCollectibleProductName, getCollectibleProductType, notifyCollectibles } from './collectiblesCommands';
import { setCollectiblesActiveWalletIndex } from './collectiblesHubCommands';

/** The `collectibles.sort.*` options `populateSortOptions` fills the sort menu with. */
export const getCollectionsSortOptions = (): string[] => [
    t('collectibles.sort.default', 'Default'),
    t('collectibles.sort.progress', 'Progress'),
    t('collectibles.sort.score', 'Score'),
];

/** The collections tab's `activeWallet` setter: a wallet not in the list is refused; the sets are asked for again. */
export const setCollectionsActiveWallet = (send: Send, wallet: string | null) => {
    const { walletAddresses } = collectiblesStore.getState();
    const index = walletAddresses ? walletAddresses.indexOf(wallet ?? '') : -1;

    if ((index === -1) && (wallet !== null)) {
        NitroLogger.log('selected an unavailable wallet');

        return;
    }

    collectiblesStore.getState().patchCollectiblesCollections({ collectionsReady: false });

    // `requestCollections`: `clearNavigationList`, then the request.
    collectiblesStore.getState().patchCollectiblesCollections({ activeCollectionId: null, collectionsOrder: [], collectionsWaiting: true });
    send(new GetNftCollectionsComposer({ walletAddress: wallet ?? '' }));
};

/** `onWalletSelectAction`. */
export const selectCollectionsWallet = (send: Send, index: number) => setCollectiblesActiveWalletIndex(send, index);

/** `sortCollectionsByBonus`: claimable bonus first, then a bonus still to come, then the rest. */
const sortCollectionsByBonus = (collections: CollectiblesCollection[], now: number): CollectiblesCollection[] => {
    const claimable: CollectiblesCollection[] = [];
    const pending: CollectiblesCollection[] = [];
    const rest: CollectiblesCollection[] = [];

    for (const collection of collections) {
        if (canClaimCollectionBonus(collection)) claimable.push(collection);
        else if (collectionHasBonusItem(collection) && !isCollectionBonusSnapshotPassed(collection, now)) pending.push(collection);
        else rest.push(collection);
    }

    return [ ...claimable, ...pending, ...rest ];
};

/**
 * `sortCollectionsByProgress` / `sortCollectionsByScore`: the started ones by `Array.sort` with a
 * comparator that answers -1 for ties as well, then the rest in their order. Flash's sort is not
 * stable under such a comparator; the port's is, so ties keep their order.
 */
const sortCollectionsBy = (collections: CollectiblesCollection[], value: (collection: CollectiblesCollection) => number): CollectiblesCollection[] => {
    const started = collections.filter(collection => value(collection) > 0);
    const rest = collections.filter(collection => value(collection) <= 0);

    started.sort((a, b) => ((value(a) >= value(b)) ? -1 : 1));

    return [ ...started, ...rest ];
};

/** `onSortSelectAction`: the navigation list is refilled in the new order. */
export const selectCollectionsSort = (index: number) => {
    const { collections, patchCollectiblesCollections } = collectiblesStore.getState();
    const now = Date.now();
    let sorted: CollectiblesCollection[];

    if (index === COLLECTIONS_SORT_PROGRESS) sorted = sortCollectionsBy(collections, getCollectionProgressPercentage);
    else if (index === COLLECTIONS_SORT_SCORE) sorted = sortCollectionsBy(collections, collection => collection.data.collectionScore);
    else sorted = sortCollectionsByBonus(collections, now);

    // `clearNavigationList`, then the new nodes.
    patchCollectiblesCollections({ collectionsSort: index, activeCollectionId: null, collectionsOrder: sorted.map(collection => collection.data.collectionId) });
};

/** `onFilterChangeAction`: the list hides what the text does not match (`filterSearchResults`). */
export const setCollectionsSearch = (text: string) => collectiblesStore.getState().patchCollectiblesCollections({ collectionsSearch: text });

/** `filterSearchResults`: the name, lower-cased, has to contain the text as typed. */
export const isCollectionShownBySearch = (collection: CollectiblesCollection, search: string) => ((search.length > 0) ? (collection.data.collectionName.toLowerCase().indexOf(search) !== -1) : true);

/**
 * `onNftCollectionsMessage`: only the answer that is waited for, and only into an empty list.
 * Setting the sort menu to its first option fills the list (`onSortSelectAction`), and the first
 * set is opened.
 */
export const onNftCollections = (send: Send, nftCollections: INftCollection[]) => {
    const { collectionsWaiting, collectionsOrder, patchCollectiblesCollections } = collectiblesStore.getState();

    if (!collectionsWaiting || (collectionsOrder.length !== 0)) return;

    patchCollectiblesCollections({ collectionsWaiting: false, collections: nftCollections.map(createCollectiblesCollection) });

    selectCollectionsSort(0);

    const order = collectiblesStore.getState().collectionsOrder;

    if (order.length > 0) activateCollection(send, order[0]);

    patchCollectiblesCollections({ collectionsReady: true });
};

/** `activateCollection`: a new `CollectionView` for the set. */
export const activateCollection = (send: Send, collectionId: string) => {
    const { activeCollectionId, patchCollectiblesCollections } = collectiblesStore.getState();

    if (activeCollectionId === collectionId) return;

    patchCollectiblesCollections({
        activeCollectionId: collectionId,
        collectionView: {
            collectionId,
            previewStatus: COLLECTION_PREVIEW_STATUS_COLLECTION,
            selectedItemIndex: -1,
            preview: COLLECTIBLE_PREVIEW_NONE,
            completionItem: null,
            completionItemName: '',
            claimEnabled: false,
            claimVisible: false,
            productName: '',
            productInfoVisible: false,
            productInfoEntries: [],
        },
    });

    initCollectionPreview(send);
};

const getActiveCollection = (): CollectiblesCollection | undefined => {
    const { collectionView, collections } = collectiblesStore.getState();

    if (!collectionView) return undefined;

    return collections.find(collection => collection.data.collectionId === collectionView.collectionId);
};

/**
 * `initRewardItem` for the set's completion box: the bonus or reward item it names, whether it may
 * be claimed now, and the button - enabled while the item is not being claimed.
 */
const initRewardItem = (collection: CollectiblesCollection, item: ICollectibleItem, claimable: boolean, isBonus: boolean): Partial<CollectiblesCollectionView> => ({
    previewStatus: isBonus ? COLLECTION_PREVIEW_STATUS_BONUS : COLLECTION_PREVIEW_STATUS_REWARD,
    completionItem: isBonus ? 'bonus' : 'reward',
    completionItemName: getCollectibleProductName(wrapCollectionItem(item)),
    claimEnabled: ((isBonus ? collection.claimingBonusStatus : collection.claimingRewardStatus) === NFT_COLLECTION_CLAIMING_NONE),
    claimVisible: claimable,
});

/**
 * `initRewardClaim`: the item the completion box shows - a claimable bonus, a claimable reward, a
 * bonus not yet claimed, a reward not yet claimed - or no box.
 */
const initRewardClaim = (collection: CollectiblesCollection): { patch: Partial<CollectiblesCollectionView>; item: ICollectibleItem | null } => {
    const { bonusItem, rewardItem } = collection.data;
    const canClaimBonus = canClaimCollectionBonus(collection);
    const canClaimReward = canClaimCollectionReward(collection);

    if (canClaimBonus && bonusItem) return { patch: initRewardItem(collection, bonusItem, true, true), item: bonusItem };
    if (canClaimReward && rewardItem) return { patch: initRewardItem(collection, rewardItem, true, false), item: rewardItem };
    if (collectionHasBonusItem(collection) && !isCollectionBonusClaimed(collection) && bonusItem) return { patch: initRewardItem(collection, bonusItem, canClaimBonus, true), item: bonusItem };
    if (collectionHasRewardItem(collection) && !isCollectionRewardClaimed(collection) && rewardItem) return { patch: initRewardItem(collection, rewardItem, canClaimReward, false), item: rewardItem };

    return { patch: { previewStatus: COLLECTION_PREVIEW_STATUS_COLLECTION, completionItem: null }, item: null };
};

/**
 * `initCollectionPreview`: the set's own preview - its XP and completion texts, the completion
 * box, and the bonus or reward item in the previewer (the placeholder when there is none).
 */
const initCollectionPreview = (send: Send) => {
    const collection = getActiveCollection();

    if (!collection) return;

    const { patch, item } = initRewardClaim(collection);
    const preview = item ? controllerPreviewImage(send, wrapCollectionItem(item)) : COLLECTIBLE_PREVIEW_PLACEHOLDER;

    collectiblesStore.getState().patchCollectiblesCollectionView({ ...patch, preview, productInfoVisible: false });
};

/** `CollectionView.selectItem`: the item's own preview, or - picking it again, or nothing - back to the set's. */
export const selectCollectionItem = (send: Send, index: number) => {
    const { collectionView, patchCollectiblesCollectionView } = collectiblesStore.getState();
    const collection = getActiveCollection();

    if (!collectionView || !collection) return;

    if ((collectionView.selectedItemIndex === index) || (index < 0) || !collection.data.items[index]) {
        patchCollectiblesCollectionView({ selectedItemIndex: -1, previewStatus: COLLECTION_PREVIEW_STATUS_COLLECTION });
        initCollectionPreview(send);

        return;
    }

    // `initMintedItemPreview`.
    const item = collection.data.items[index];
    const info = wrapCollectionItem(item);

    patchCollectiblesCollectionView({ selectedItemIndex: index, previewStatus: COLLECTION_PREVIEW_STATUS_ITEM, preview: COLLECTIBLE_PREVIEW_NONE, completionItem: null });

    const preview = controllerPreviewImage(send, info);

    patchCollectiblesCollectionView({
        preview,
        productName: getCollectibleProductName(info),
        // `initInfoEntries`.
        productInfoEntries: [
            { key: t('collectibles.item.type'), value: getCollectibleProductType(info) },
            { key: t('collectibles.item.rarity'), value: item.rarity },
            { key: t('collectibles.item.xp'), value: String(item.score) },
        ],
    });
};

/** `onProductNameHover` / `onProductNameUnhover`. */
export const setCollectionProductInfoVisible = (visible: boolean) => collectiblesStore.getState().patchCollectiblesCollectionView({ productInfoVisible: visible });

/** `onClickClaim`: no wallet, nothing; the bonus or reward is claimed for the active wallet and the "wait" bubble shown. */
export const claimCollectionItem = (send: Send) => {
    const { activeWallet, collectionView, updateCollectiblesCollection, patchCollectiblesCollectionView } = collectiblesStore.getState();

    if (activeWallet === null || !collectionView) return;

    const collectionId = collectionView.collectionId;

    if (collectionView.previewStatus === COLLECTION_PREVIEW_STATUS_BONUS) {
        updateCollectiblesCollection(collectionId, collection => ({ ...collection, claimingBonusStatus: NFT_COLLECTION_CLAIMING_AWAITING }));
        send(new NftCollectiblesClaimBonusItemComposer({ collectionId, walletAddress: activeWallet }));
        notifyCollectibles(t('collectibles.claiming.wait'));
    } else {
        if (collectionView.previewStatus !== COLLECTION_PREVIEW_STATUS_REWARD) return;

        updateCollectiblesCollection(collectionId, collection => ({ ...collection, claimingRewardStatus: NFT_COLLECTION_CLAIMING_AWAITING }));
        send(new NftCollectiblesClaimRewardItemComposer({ collectionId, walletAddress: activeWallet }));
        notifyCollectibles(t('collectibles.claiming.wait'));
    }

    patchCollectiblesCollectionView({ claimEnabled: false });
};

/**
 * `onBonusClaimResult` / `onRewardClaimResult`: the success or failure bubble (`sendClaimNotification`,
 * which `HabboNotifications` turns into one); for the active wallet, the set leaves its claiming
 * state, a success counts the claim, and an open view of it redraws its preview (`claimingFinished`).
 */
export const onCollectionClaimResult = (send: Send, isBonus: boolean, collectionId: string, walletAddress: string, success: boolean) => {
    notifyCollectibles(t(success ? 'collectibles.claiming.success' : 'collectibles.claiming.failed'));

    const { activeWallet, collections, collectionsOrder, collectionView, updateCollectiblesCollection } = collectiblesStore.getState();

    if (activeWallet !== walletAddress) return;

    // `getCollectionById` looks through the navigation list.
    if (!collectionsOrder.includes(collectionId) || !collections.some(collection => collection.data.collectionId === collectionId)) return;

    updateCollectiblesCollection(collectionId, collection => (isBonus
        ? { ...collection, claimingBonusStatus: NFT_COLLECTION_CLAIMING_NONE, bonusClaimedAmount: collection.bonusClaimedAmount + (success ? 1 : 0) }
        : { ...collection, claimingRewardStatus: NFT_COLLECTION_CLAIMING_NONE, rewardClaimedAmount: collection.rewardClaimedAmount + (success ? 1 : 0) }));

    if (collectionView && (collectionView.collectionId === collectionId) && ((collectionView.previewStatus === COLLECTION_PREVIEW_STATUS_REWARD) || (collectionView.previewStatus === COLLECTION_PREVIEW_STATUS_BONUS))) initCollectionPreview(send);
};

/** `hasBonusClaimWindow`. */
export const hasCollectionBonusClaimWindow = (released: number, snapshot: number) => !isNaN(released) && !isNaN(snapshot) && (released !== -1) && (snapshot !== -1);
