/**
 * The collectibles hub's controller - Flash `catalog/collectibles/CollectiblesController` and the
 * logic of the windows it owns: `CollectiblesView` (the hub and its wallets), the five tabs
 * (`tabs/CollectionsTab` with its `subviews/CollectionView`, `tabs/ShopTab`,
 * `tabs/MintInventoryListTab`, `tabs/TransferNftsTab`, `tabs/RewardClaimsTab`),
 * `CollectiblesRewardBoxView`, and the purchase confirmation `HabboCatalog.showPurchaseConfirmation`
 * opens for a `MintTokenPurchaseOffer` or `NftStorePurchaseOffer`. Each function is the Flash
 * method it names; the packets they answer are in `handlers/collectibles`.
 *
 * `previewImage` / `previewIcon` / `ProductImageWidget.previewImage` resolve a product to what a
 * previewer shows (`CollectiblePreview`); the views draw it.
 *
 * The companion server (turbo-cloud) answers none of these requests - its collectibles handlers
 * are empty - so against it the hub stays on its loading views. The client side is the Flash one
 * all the same.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import {
    ClaimNftClaimsComposer, GetCollectibleMintableItemTypesComposer, GetCollectibleMintingEnabledComposer, GetCollectibleMintTokensComposer, GetCollectibleWalletAddressesComposer, GetCollectorScoreComposer, GetMintTokenOffersComposer, GetNftClaimsComposer,
    GetNftCollectionsComposer, GetNftStoreOffersComposer, GetNftTransferFeeComposer, ICollectibleBaseItem, ICollectibleItem, ICollectiblesProductItem, IMintTokenOffer, INftClaim, INftCollection, INftStoreOffer, MintItemComposer, NftCollectiblesClaimBonusItemComposer,
    NftCollectiblesClaimRewardItemComposer, NftStorePurchaseComposer, NftTransferAssetsComposer, ProgressTreasureHuntComposer, PurchaseMintTokenComposer,
} from '@nitrodevco/nitro-packets';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';

import { GetChatStyleLibrary } from '#base/chat';
import {
    canClaimCollectionBonus, canClaimCollectionReward, COLLECTIBLE_MINT_RESULT_SUCCESS, COLLECTIBLE_PREVIEW_NONE, COLLECTIBLE_PREVIEW_PLACEHOLDER, COLLECTIBLE_PRODUCT_TYPE_BADGE, COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE, COLLECTIBLE_PRODUCT_TYPE_CLOTHING,
    COLLECTIBLE_PRODUCT_TYPE_EFFECT, COLLECTIBLE_PRODUCT_TYPE_FLOOR, COLLECTIBLE_PRODUCT_TYPE_PET, COLLECTIBLE_PRODUCT_TYPE_UNKNOWN, COLLECTIBLE_PRODUCT_TYPE_WALL, CollectiblePreview, CollectiblePreviewEasterEgg, CollectibleProductInfo,
    COLLECTIBLES_STARDUST_WALLET_DISPLAY_NAME, CollectiblesCollection, CollectiblesCollectionView, CollectiblesMintItem, CollectiblesPurchaseOffer, collectiblesStore, COLLECTION_PREVIEW_STATUS_BONUS, COLLECTION_PREVIEW_STATUS_COLLECTION, COLLECTION_PREVIEW_STATUS_ITEM,
    COLLECTION_PREVIEW_STATUS_REWARD, collectionHasBonusItem, collectionHasRewardItem, COLLECTIONS_SORT_PROGRESS, COLLECTIONS_SORT_SCORE, createCollectiblesCollection, getCollectibleRarityColor, getCollectionProgressPercentage, isCollectionBonusClaimed,
    isCollectionBonusSnapshotPassed, isCollectionRewardClaimed, NFT_COLLECTION_CLAIMING_AWAITING, NFT_COLLECTION_CLAIMING_NONE, wrapBaseItem, wrapCollectionItem, wrapMintableItem,
} from '#base/context/collectibles';
import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore, isInventoryFurniGroupWallItem } from '#base/context/inventory';
import { notificationStore } from '#base/context/notifications';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';

import { showNotEnoughActivityPointsAlert } from './catalogClubCommands';
import { checkFurniInventoryInitialization } from './inventoryCommands';

type Send = WebSocketConnection['send'];

/** `ILocalizationManager.getLocalization` / `getLocalizationWithParams`: a missing key is the default, `''` unless one is given. */
const t = (key: string, defaultValue: string = '', replacements?: Record<string, string>) => systemStore.getState().getLocalizationValue(key, defaultValue, replacements);
const getProperty = (key: string) => {
    const value = systemStore.getState().config[key];

    return ((typeof value === 'string') || (typeof value === 'number') || (typeof value === 'boolean')) ? String(value) : '';
};

/** The bubble every collectibles notification uses: `info`, with the curator stamp. */
const COLLECTIBLES_NOTIFICATION_ICON = 'icon_curator_stamp_large_png';
const notify = (text: string) => notificationStore.getState().addNotification(text, 'info', COLLECTIBLES_NOTIFICATION_ICON);

/** `HabboWebTools.openWebPageAndMinimizeClient`. */
const openWebPage = (url: string) => {
    if (url.length) window.open(url, '_blank', 'noopener');
};

/** `CollectiblesView.onClickHtmlLink`: a link of the info tab's texts opens its page. */
export const openCollectiblesHtmlLink = (link: string) => openWebPage(link);

// ------------------------------------------------------------------------------------------------
// CollectiblesController: names, types and previews
// ------------------------------------------------------------------------------------------------

/** `tempCategoryMapping`: wallpaper (3001), floor (3002) and landscape (4057) are not drawn as wall items. */
const tempCategoryMapping = (category: string, id: number): number => {
    if (category === 'S') return 1;

    if (category === 'I') {
        if (id === 3001) return 2;
        if (id === 3002) return 3;
        if (id === 4057) return 4;
    }

    return 1;
};

/** `CollectiblesController.getProductType`. */
export const getCollectibleProductType = (info: CollectibleProductInfo | null): string => {
    if (!info) return 'unknown';

    switch (info.productTypeId) {
        case COLLECTIBLE_PRODUCT_TYPE_WALL: return t('product.type.wall');
        case COLLECTIBLE_PRODUCT_TYPE_FLOOR: return t('product.type.room');
        case COLLECTIBLE_PRODUCT_TYPE_EFFECT: return t('product.type.effect');
        case COLLECTIBLE_PRODUCT_TYPE_BADGE: return t('product.type.badge');
        case COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE: return t('product.type.chatstyle');
        case COLLECTIBLE_PRODUCT_TYPE_PET: return t('product.type.pets');
        case COLLECTIBLE_PRODUCT_TYPE_CLOTHING: return t('product.type.clothing');
        default: return 'Unknown';
    }
};

/** `CollectiblesController.getProductName`: a clothing item is a floor furni in the furni data. */
export const getCollectibleProductName = (info: CollectibleProductInfo | null): string => {
    if (!info) return 'unknown';

    const { floorItems, wallItems } = systemStore.getState();

    switch (info.productTypeId) {
        case COLLECTIBLE_PRODUCT_TYPE_UNKNOWN: return 'unknown';
        case COLLECTIBLE_PRODUCT_TYPE_WALL: return wallItems[parseInt(info.itemTypeId)]?.localizedName ?? '(missing wall item)';
        case COLLECTIBLE_PRODUCT_TYPE_FLOOR:
        case COLLECTIBLE_PRODUCT_TYPE_CLOTHING: return floorItems[parseInt(info.itemTypeId)]?.localizedName ?? '(missing floor item)';
        case COLLECTIBLE_PRODUCT_TYPE_EFFECT: return t(`fx_${info.itemTypeId}`);
        case COLLECTIBLE_PRODUCT_TYPE_BADGE: return t(`badge_name_${info.itemTypeId}`, info.itemTypeId);
        case COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE: return t('product.type.chatstyle');
        case COLLECTIBLE_PRODUCT_TYPE_PET: return t(`pet.type.${info.itemTypeId}`);
        default:
            NitroLogger.log('[CollectiblesController] Can not yet handle this type of product: ');

            return '(missing)';
    }
};

/** The furni a wall or floor product names, as the room engine draws it; `none` when the furni data has no such type. */
const getFurniPreview = (info: CollectibleProductInfo, isWallItem: boolean, icon: boolean): CollectiblePreview => {
    const { floorItems, wallItems } = systemStore.getState();
    const data = (isWallItem ? wallItems : floorItems)[parseInt(info.itemTypeId)];

    if (!data) return COLLECTIBLE_PREVIEW_NONE;

    if (isWallItem && (tempCategoryMapping('I', data.id) !== 1)) return COLLECTIBLE_PREVIEW_NONE;

    return { kind: 'furni', classId: data.id, className: data.className, colorIndex: data.colorIndex ?? 0, isWallItem, icon };
};

/** `CollectiblesController.previewIcon`: what a grid item's previewer shows. */
export const getCollectiblePreviewIcon = (info: CollectibleProductInfo | null): CollectiblePreview => {
    if (!info) return { kind: 'unknown' };

    switch (info.productTypeId) {
        case COLLECTIBLE_PRODUCT_TYPE_UNKNOWN: return { kind: 'unknown' };
        case COLLECTIBLE_PRODUCT_TYPE_WALL: return getFurniPreview(info, true, true);
        case COLLECTIBLE_PRODUCT_TYPE_FLOOR:
        case COLLECTIBLE_PRODUCT_TYPE_CLOTHING: return getFurniPreview(info, false, true);
        case COLLECTIBLE_PRODUCT_TYPE_EFFECT: return { kind: 'effect_icon', effectId: parseInt(info.itemTypeId) };
        case COLLECTIBLE_PRODUCT_TYPE_BADGE: return { kind: 'badge', badgeCode: info.itemTypeId };
        case COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE: return { kind: 'chat_style_selector', styleId: parseInt(info.itemTypeId) };
        case COLLECTIBLE_PRODUCT_TYPE_PET: return { kind: 'pet', figure: info.petFigureString };
        default:
            NitroLogger.log('[CollectiblesController] Can not yet handle this type of product: ');

            return COLLECTIBLE_PREVIEW_NONE;
    }
};

/** `createChatItemPreview`: a bubble of the style, headed with a name - none when there is no style to draw. */
const getChatItemPreview = (styleId: number, userName: string | null = null): CollectiblePreview => {
    if (!GetChatStyleLibrary().getStyle(styleId)) return COLLECTIBLE_PREVIEW_NONE;

    return { kind: 'chat_style_bubble', styleId, userName: userName ?? userStore.getState().name };
};

/** The names `handlePreviewImageEasterEgg` gives a chat style previewed this many times in a row. */
const EASTER_EGG_NAMES: Record<number, string> = { 7: 'Evil Frank', 10: 'Bonne Blonde', 15: 'Furni fairy', 22: 'Wacky Wired', 35: 'Quacky duck', 70: 'Pixel poo', 100: 'Bobba filtered' };

export interface PreviewImageResult {
    preview: CollectiblePreview;
    easterEgg: CollectiblePreviewEasterEgg;
}

/**
 * `previewImage` - the controller's (given `send`) and `ProductImageWidget`'s (without), which
 * differ only there: the controller's easter egg also steps the `wf15` treasure hunt when "Wacky
 * Wired" names the Pixel style (1020). `easterEgg` is the counter of whichever previewer asks.
 */
const previewImage = (info: CollectibleProductInfo | null, easterEgg: CollectiblePreviewEasterEgg, send?: Send): PreviewImageResult => {
    if (!info) return { preview: { kind: 'unknown' }, easterEgg };

    // `handlePreviewImageEasterEgg`.
    const count = ((info.productTypeId === easterEgg.productTypeId) && (info.itemTypeId === easterEgg.itemTypeId)) ? (easterEgg.count + 1) : 1;
    const nextEasterEgg = { productTypeId: info.productTypeId, itemTypeId: info.itemTypeId, count };

    if (info.productTypeId === COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE) {
        const name = EASTER_EGG_NAMES[count] ?? '';

        if (name !== '') {
            const preview = getChatItemPreview(parseInt(info.itemTypeId), name);

            if (preview.kind !== 'none') {
                const prefix = name.substring(0, 3);

                if (send && (name.indexOf('red') === 8) && (info.itemTypeId === '1020')) send(new ProgressTreasureHuntComposer({ huntId: 'wf15', token: prefix + prefix + prefix + prefix + prefix }));

                return { preview, easterEgg: nextEasterEgg };
            }
        }
    }

    const { figure, sex } = userStore.getState();

    switch (info.productTypeId) {
        case COLLECTIBLE_PRODUCT_TYPE_UNKNOWN: return { preview: { kind: 'unknown' }, easterEgg: nextEasterEgg };
        case COLLECTIBLE_PRODUCT_TYPE_WALL: return { preview: getFurniPreview(info, true, false), easterEgg: nextEasterEgg };
        case COLLECTIBLE_PRODUCT_TYPE_FLOOR: return { preview: getFurniPreview(info, false, false), easterEgg: nextEasterEgg };
        case COLLECTIBLE_PRODUCT_TYPE_EFFECT: return { preview: (info.itemTypeId === '') ? COLLECTIBLE_PREVIEW_NONE : { kind: 'effect', figure, gender: sex, effectId: parseInt(info.itemTypeId) }, easterEgg: nextEasterEgg };
        case COLLECTIBLE_PRODUCT_TYPE_BADGE: return { preview: { kind: 'badge', badgeCode: info.itemTypeId }, easterEgg: nextEasterEgg };
        case COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE: return { preview: getChatItemPreview(parseInt(info.itemTypeId)), easterEgg: nextEasterEgg };
        case COLLECTIBLE_PRODUCT_TYPE_PET: return { preview: { kind: 'pet', figure: info.petFigureString }, easterEgg: nextEasterEgg };
        case COLLECTIBLE_PRODUCT_TYPE_CLOTHING: return { preview: { kind: 'avatar', figure: GetAvatarRenderManager().getFigureStringWithFigureIds(figure, sex, info.figureSetIds), gender: sex }, easterEgg: nextEasterEgg };
        default:
            NitroLogger.log('[CollectiblesController] Can not yet handle this type of product: ');

            return { preview: COLLECTIBLE_PREVIEW_NONE, easterEgg: nextEasterEgg };
    }
};

/**
 * `ProductImageWidget.previewImage` for a widget outside the collectibles - the catalogue product
 * view's `product_image_widget`, given a `ProductDisplayWrapper` - counting on that widget's own
 * easter egg memory, which the caller keeps and gets back.
 */
export const productImageWidgetPreview = (info: CollectibleProductInfo | null, easterEgg: CollectiblePreviewEasterEgg): PreviewImageResult => previewImage(info, easterEgg);

/** The controller's `previewImage`, counting on its own easter egg memory. */
const controllerPreviewImage = (send: Send, info: CollectibleProductInfo | null): CollectiblePreview => {
    const { previewEasterEgg, patchCollectiblesHub } = collectiblesStore.getState();
    const { preview, easterEgg } = previewImage(info, previewEasterEgg, send);

    patchCollectiblesHub({ previewEasterEgg: easterEgg });

    return preview;
};

// ------------------------------------------------------------------------------------------------
// CollectiblesView: the hub, its tabs and wallets
// ------------------------------------------------------------------------------------------------

/**
 * `showCollectibleHub` for a hub not built yet - `new CollectiblesView`: the wallets are asked for
 * (`requestWalletAddresses`) and every tab is built at once (`refresh` builds the rewards tab,
 * `initWidgets` the others), each asking for what it shows. Once built the hub is only shown and
 * hidden, so this does nothing the second time.
 */
export const createCollectiblesHub = (send: Send) => {
    const state = collectiblesStore.getState();

    if (state.hubCreated) return;

    state.patchCollectiblesHub({ hubCreated: true });

    // `refresh` -> `new RewardClaimsTab`: not ready, nothing listed, the claim button disabled.
    state.patchCollectiblesClaims({ claimsReady: false, claimsButtonEnabled: false });

    requestCollectibleWalletAddresses(send);

    // `initWidgets`: `CollectionsTab` (not ready until a wallet is chosen), `MintInventoryListTab`,
    // `TransferNftsTab`, `ShopTab`.
    state.patchCollectiblesCollections({ collectionsReady: false });
    initializeMintData(send);
    initializeTransferData(send);
    requestNftStoreOffers(send);
};

/** `requestWalletAddresses`. */
const requestCollectibleWalletAddresses = (send: Send) => {
    const { walletsRequesting, patchCollectiblesHub } = collectiblesStore.getState();

    if (walletsRequesting) return;

    patchCollectiblesHub({ walletsRequesting: true });
    send(new GetCollectibleWalletAddressesComposer({}));
};

/** `onTab`: `refresh` shows the tab's container. Every tab was built with the hub. */
export const selectCollectiblesTab = (tab: string) => collectiblesStore.getState().patchCollectiblesHub({ currentTab: tab });

/** `nonStardustWallets`. */
export const getNonStardustWallets = (): string[] | null => {
    const { walletAddresses, stardustWallet } = collectiblesStore.getState();

    if (!walletAddresses) return null;

    return walletAddresses.filter(wallet => wallet !== stardustWallet);
};

/** How the wallet menus list a wallet: the Collector wallet by its display name. */
export const getCollectiblesWalletLabel = (wallet: string): string => ((wallet === collectiblesStore.getState().stardustWallet) ? COLLECTIBLES_STARDUST_WALLET_DISPLAY_NAME : wallet);

/**
 * `onCollectableWalletAddressMessage`: the wallets go to the collections tab (all of them), the
 * transfer tab (all but the Collector wallet) and the rewards tab (all, each asked for its claims),
 * and the first becomes the active one.
 */
export const onCollectibleWalletAddresses = (send: Send, stardustWallet: string, walletAddresses: string[]) => {
    collectiblesStore.getState().patchCollectiblesHub({ walletsRequesting: false, walletAddresses, stardustWallet });

    initializeTransferWallets(getNonStardustWallets() ?? []);
    requestRewardClaims(send, walletAddresses);
    setCollectiblesActiveWalletIndex(send, 0);
};

/**
 * `setActiveWalletIndex`: an index out of range, or the wallet already active, changes nothing;
 * otherwise the collections and minting tabs follow the wallet and its collector score is asked for.
 */
export const setCollectiblesActiveWalletIndex = (send: Send, index: number) => {
    const { walletAddresses, activeWallet, patchCollectiblesHub } = collectiblesStore.getState();

    if (!walletAddresses) return;

    if ((walletAddresses.length > 0) && ((index < 0) || (index >= walletAddresses.length) || (walletAddresses[index] === activeWallet))) return;

    const wallet = (walletAddresses.length > 0) ? walletAddresses[index] : null;

    patchCollectiblesHub({ activeWallet: wallet });

    setCollectionsActiveWallet(send, wallet);
    setMintActiveWallet(send, wallet);

    if (wallet !== null) send(new GetCollectorScoreComposer({ walletAddress: wallet }));
};

/** `onCollectionsScoreMessage`: the level colour steps every five levels. */
export const onCollectorScore = (score: number, highestScore: number, level: number) => {
    let levelColor: number;

    switch (Math.max(0, Math.trunc((level - 1) / 5))) {
        case 0: levelColor = 8162450; break;
        case 1: levelColor = 2529547; break;
        case 2: levelColor = 32234; break;
        case 3: levelColor = 13828339; break;
        default: levelColor = 15571457;
    }

    collectiblesStore.getState().patchCollectiblesHub({ score, highestScore, level, levelColor });
};

// ------------------------------------------------------------------------------------------------
// CollectionsTab / CollectionView
// ------------------------------------------------------------------------------------------------

/** The `collectibles.sort.*` options `populateSortOptions` fills the sort menu with. */
export const getCollectionsSortOptions = (): string[] => [
    t('collectibles.sort.default', 'Default'),
    t('collectibles.sort.progress', 'Progress'),
    t('collectibles.sort.score', 'Score'),
];

/** The collections tab's `activeWallet` setter: a wallet not in the list is refused; the sets are asked for again. */
const setCollectionsActiveWallet = (send: Send, wallet: string | null) => {
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
        notify(t('collectibles.claiming.wait'));
    } else {
        if (collectionView.previewStatus !== COLLECTION_PREVIEW_STATUS_REWARD) return;

        updateCollectiblesCollection(collectionId, collection => ({ ...collection, claimingRewardStatus: NFT_COLLECTION_CLAIMING_AWAITING }));
        send(new NftCollectiblesClaimRewardItemComposer({ collectionId, walletAddress: activeWallet }));
        notify(t('collectibles.claiming.wait'));
    }

    patchCollectiblesCollectionView({ claimEnabled: false });
};

/**
 * `onBonusClaimResult` / `onRewardClaimResult`: the success or failure bubble (`sendClaimNotification`,
 * which `HabboNotifications` turns into one); for the active wallet, the set leaves its claiming
 * state, a success counts the claim, and an open view of it redraws its preview (`claimingFinished`).
 */
export const onCollectionClaimResult = (send: Send, isBonus: boolean, collectionId: string, walletAddress: string, success: boolean) => {
    notify(t(success ? 'collectibles.claiming.success' : 'collectibles.claiming.failed'));

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

// ------------------------------------------------------------------------------------------------
// MintInventoryListTab
// ------------------------------------------------------------------------------------------------

/** `getIdsInInventory`: the non-rented items of the first inventory group of the type (`getNonRentedInventoryIds`); none for clothing. */
const getIdsInInventory = (item: ICollectiblesProductItem): number[] => {
    let isWallItem = false;

    if (item.itemType === 'i') isWallItem = true;
    else if (item.itemType !== 's') return [];

    const group = inventoryStore.getState().furniGroups.find(furniGroup => (furniGroup.typeId === item.itemTypeId) && (isInventoryFurniGroupWallItem(furniGroup) === isWallItem));

    if (!group) return [];

    return group.items.filter(furni => !furni.isRented).map(furni => furni.id);
};

/**
 * `initializeData`: the mintable types, whether minting is open, the furni inventory (unless it is
 * current), the wallet and the token packs.
 */
const initializeMintData = (send: Send) => {
    const { patchCollectiblesMint, walletAddresses, activeWallet } = collectiblesStore.getState();

    patchCollectiblesMint({ mintItemTypesPending: true, mintEnabledPending: true });
    send(new GetCollectibleMintableItemTypesComposer({}), new GetCollectibleMintingEnabledComposer({}));

    if (!inventoryStore.getState().furniCategoryInitialized) {
        patchCollectiblesMint({ mintInventoryPending: true });
        checkFurniInventoryInitialization(send);
    }

    patchCollectiblesMint({ mintWalletPending: true });

    if (walletAddresses !== null) setMintActiveWallet(send, activeWallet);

    patchCollectiblesMint({ mintBuyEnabled: false });
    send(new GetMintTokenOffersComposer({}));

    updateMintReadyState(send, false);
};

/**
 * `updateReadyState`: ready once nothing is waited for. The first time, the grid is filled; after
 * that `reload` redraws the preview.
 */
const updateMintReadyState = (send: Send, reload: boolean) => {
    const state = collectiblesStore.getState();
    const ready = !state.mintWalletPending && !state.mintInventoryPending && !state.mintItemTypesPending && !state.mintEnabledPending && !state.mintTokensPending;

    if (ready) {
        if (!state.mintReady && !state.mintPopulated) populateMintItems(send, state.mintProductItems);
        else if (reload) initMintItemPreview(send);
    }

    collectiblesStore.getState().patchCollectiblesMint({ mintReady: ready });
};

/** `onCollectibleMintTokensMessage`. */
export const onCollectibleMintTokenCount = (send: Send, totalTokens: number) => {
    collectiblesStore.getState().patchCollectiblesMint({ mintTokensPending: false, mintTokenBalance: totalTokens });
    updateMintReadyState(send, true);
};

/** `onCollectibleMintingEnabledMessage`. */
export const onCollectibleMintingEnabled = (send: Send, enabled: boolean) => {
    collectiblesStore.getState().patchCollectiblesMint({ mintEnabledPending: false, mintingEnabled: enabled });
    updateMintReadyState(send, true);
};

/** The minting tab's `activeWallet` setter: the wallet's token balance is asked for, and the footer shows the pack shop or the "no wallet" box. */
const setMintActiveWallet = (send: Send, wallet: string | null) => {
    const { patchCollectiblesMint } = collectiblesStore.getState();

    patchCollectiblesMint({ mintWalletPending: false, mintWalletKnown: true });

    if (wallet !== null) {
        patchCollectiblesMint({ mintTokensPending: true });
        send(new GetCollectibleMintTokensComposer({ walletAddress: wallet }));
    }

    updateMintReadyState(send, true);
};

/** `onCollectableMintableItemTypesMessage`. */
export const onCollectableMintableItemTypes = (send: Send, items: ICollectiblesProductItem[]) => {
    collectiblesStore.getState().patchCollectiblesMint({ mintItemTypesPending: false, mintProductItems: items });
    updateMintReadyState(send, true);
};

/** `onMintTokenOffersMessage`: the pack menu lists the token amounts; the first is picked. */
export const onCollectibleMintTokenOffers = (offers: IMintTokenOffer[]) => {
    collectiblesStore.getState().patchCollectiblesMint({ mintTokenOffers: offers });

    if (offers.length > 0) selectMintTokenOffer(0);
};

/** `onSelectTokenOffer`: the pack's silver price, and the buy button while the purse can pay it. */
export const selectMintTokenOffer = (index: number) => {
    const { mintTokenOffers, patchCollectiblesMint } = collectiblesStore.getState();
    const offer = mintTokenOffers[index];

    patchCollectiblesMint({ mintSelectedOfferIndex: index });

    if (!offer) return;

    patchCollectiblesMint({ mintSilverCost: String(offer.silverPrice), mintBuyEnabled: offer.silverPrice <= userStore.getState().silver });
};

/** `onBuyStampsClicked`: the pack goes to the purchase confirmation, for the active wallet. */
export const buyMintTokens = () => {
    const { mintTokenOffers, mintSelectedOfferIndex, activeWallet } = collectiblesStore.getState();
    const offer = mintTokenOffers[mintSelectedOfferIndex];

    if (!offer || (activeWallet === null)) return;

    showCollectiblesPurchaseConfirmation({ kind: 'mint_token', offer }, activeWallet);
};

/** `onInventoryInitialize`: the furni inventory has arrived. */
export const onCollectiblesInventoryInitialized = (send: Send) => {
    const { hubCreated, mintInventoryPending, patchCollectiblesMint } = collectiblesStore.getState();

    if (!hubCreated || !mintInventoryPending) return;

    patchCollectiblesMint({ mintInventoryPending: false });
    updateMintReadyState(send, true);
};

/**
 * `amountChangedForItem`, for every item whose count the inventory changed: the grid's amount,
 * and the preview when it is the item selected. Flash only counts once the grid is up.
 */
export const onCollectiblesInventoryChanged = (send: Send) => {
    const { mintReady, mintItems, mintSelectedIndex, patchCollectiblesMint } = collectiblesStore.getState();

    if (!mintReady || !mintItems.length) return;

    let selectedChanged = false;
    let changed = false;

    const items = mintItems.map((mintItem, index) => {
        const amount = getIdsInInventory(mintItem.item).length;

        if (amount === mintItem.amount) return mintItem;

        changed = true;

        if (index === mintSelectedIndex) selectedChanged = true;

        return { ...mintItem, amount };
    });

    if (!changed) return;

    patchCollectiblesMint({ mintItems: items });

    if (selectedChanged) initMintItemPreview(send);
};

/** `populateItems`: one grid item per mintable type, the first selected. */
const populateMintItems = (send: Send, productItems: ICollectiblesProductItem[]) => {
    const items: CollectiblesMintItem[] = productItems.map(item => ({ item, amount: getIdsInInventory(item).length }));

    collectiblesStore.getState().patchCollectiblesMint({ mintItems: items, mintPopulated: true, mintSelectedIndex: items.length ? 0 : -1 });

    if (items.length > 0) initMintItemPreview(send);
};

/** `selectItem`. */
export const selectMintItem = (send: Send, index: number) => {
    collectiblesStore.getState().patchCollectiblesMint({ mintSelectedIndex: index });

    if (index >= 0) initMintItemPreview(send);
};

/** `isMintPeriodExpired`. */
export const isMintPeriodExpired = (item: ICollectiblesProductItem | undefined, now: number) => (!item || ((item.endTime * 1000) < now));

/**
 * `initMintItemPreview`: the item's preview, name and price, the "no furni" warning, the region
 * lock, and the collect button - disabled without a wallet, without the furni, without the tokens,
 * after the minting period, while minting is closed or while a mint is on its way.
 */
const initMintItemPreview = (send: Send) => {
    const { mintItems, mintSelectedIndex, activeWallet, mintTokenBalance, mintingEnabled, minting, patchCollectiblesMint } = collectiblesStore.getState();
    const mintItem = mintItems[mintSelectedIndex];

    if (!mintItem) return;

    const info = wrapMintableItem(mintItem.item, mintItem.amount);

    patchCollectiblesMint({ mintPreview: COLLECTIBLE_PREVIEW_NONE });

    const preview = controllerPreviewImage(send, info);
    const disabled = (activeWallet === null) || (info.amount === 0) || (mintTokenBalance < mintItem.item.price) || isMintPeriodExpired(mintItem.item, Date.now()) || !mintingEnabled || minting;

    patchCollectiblesMint({
        mintPreview: preview,
        mintPreviewInfo: { productName: getCollectibleProductName(info), price: mintItem.item.price, noFurni: info.amount === 0, regionLocked: mintItem.item.regionLocked },
        mintCollectEnabled: !disabled,
    });
};

/** `onCollectClicked`: the button is disabled and the mint confirmed first. */
export const collectMintItem = (send: Send) => {
    const { showConfirm, interpolate } = systemStore.getState();

    collectiblesStore.getState().patchCollectiblesMint({ mintCollectEnabled: false });

    showConfirm(interpolate('${shop.minting.confirm.title}'), interpolate('${shop.minting.confirm.description}'), () => {
        // `onCollectConfirmDialogConfirm` on `WE_OK`: the first non-rented item of the type is minted into the active wallet.
        const { activeWallet, mintItems, mintSelectedIndex, patchCollectiblesMint } = collectiblesStore.getState();
        const mintItem = mintItems[mintSelectedIndex];

        if (!mintItem || (activeWallet === null)) return;

        const ids = getIdsInInventory(mintItem.item);

        if (!ids.length) return;

        patchCollectiblesMint({ minting: true });
        send(new MintItemComposer({ itemId: ids[0], walletAddress: activeWallet }));
        initMintItemPreview(send);
    }, { onCancel: () => initMintItemPreview(send) });
};

/** `onMintItemResult`: the success or failure bubble (`COLLECTIBLES_MINT_*`, which `HabboNotifications` shows), and the preview is redrawn. */
export const onCollectibleMintableItemResult = (send: Send, mintResult: number) => {
    notify(t((mintResult === COLLECTIBLE_MINT_RESULT_SUCCESS) ? 'shop.minting.success' : 'shop.minting.failed'));

    collectiblesStore.getState().patchCollectiblesMint({ minting: false });
    initMintItemPreview(send);
};

/** `onClickCreateWallet`. */
export const openCreateWalletPage = () => openWebPage(getProperty('nft.wallet.create.url'));

/** `onClickMoreInfo`. */
export const openWalletSettingsPage = () => openWebPage(getProperty('web.settings.wallet.relativeUrl'));

// ------------------------------------------------------------------------------------------------
// ShopTab
// ------------------------------------------------------------------------------------------------

/** `getNavigationCategory`. */
const getShopNavigationCategory = (productTypeId: number): string => {
    switch (productTypeId) {
        case COLLECTIBLE_PRODUCT_TYPE_WALL:
        case COLLECTIBLE_PRODUCT_TYPE_FLOOR: return 'shop.furni.title';
        case COLLECTIBLE_PRODUCT_TYPE_PET: return 'shop.pets.title';
        case COLLECTIBLE_PRODUCT_TYPE_CLOTHING: return 'shop.clothes.title';
        default: return 'product.type.other';
    }
};

/** `requestNftStoreOffers`. */
const requestNftStoreOffers = (send: Send) => {
    collectiblesStore.getState().patchCollectiblesShop({ shopReady: false, shopActiveCategory: null, shopCategories: [], shopWaiting: true });
    send(new GetNftStoreOffersComposer({}));
};

/** `onNftStoreOffers`: taken once - the offers are filed under their localized category, and the first category opened. */
export const onNftStoreOffers = (send: Send, offers: INftStoreOffer[]) => {
    const { shopWaiting, shopCategories, shopOffersByCategory, patchCollectiblesShop } = collectiblesStore.getState();

    if (!shopWaiting || (shopCategories.length !== 0)) return;

    // `createNavigationNodes`.
    const categories = [ ...shopCategories ];
    const byCategory: Record<string, INftStoreOffer[]> = { ...shopOffersByCategory };

    for (const offer of offers) {
        if (!offer) continue;

        const category = t(getShopNavigationCategory(offer.productInfo.productTypeId));

        if (!Object.prototype.hasOwnProperty.call(byCategory, category)) {
            byCategory[category] = [];
            categories.push(category);
        }

        byCategory[category] = [ ...byCategory[category], offer ];
    }

    patchCollectiblesShop({ shopWaiting: false, shopCategories: categories, shopOffersByCategory: byCategory });

    if (categories.length > 0) activateShopCategory(send, categories[0]);

    patchCollectiblesShop({ shopReady: true });
};

/** `activateCategory` + `populateGridItems`: the category's offers, the first selected. */
export const activateShopCategory = (send: Send, category: string) => {
    const { shopActiveCategory, shopOffersByCategory, patchCollectiblesShop } = collectiblesStore.getState();

    if (shopActiveCategory === category) return;

    patchCollectiblesShop({ shopActiveCategory: category, shopSelectedIndex: -1 });

    if (!(shopOffersByCategory[category]?.length > 0)) return;

    selectShopItem(send, 0);
};

/** `selectItem` + `initItemPreview`: the offer's preview, name, price and mint count; buyable while there are mints left. */
export const selectShopItem = (send: Send, index: number) => {
    const { shopActiveCategory, shopOffersByCategory, patchCollectiblesShop } = collectiblesStore.getState();
    const offer = shopActiveCategory ? shopOffersByCategory[shopActiveCategory]?.[index] : undefined;

    patchCollectiblesShop({ shopSelectedIndex: index });

    if (!offer) return;

    const info = wrapBaseItem(offer.productInfo);

    patchCollectiblesShop({ shopPreview: COLLECTIBLE_PREVIEW_NONE });

    const preview = controllerPreviewImage(send, info);

    patchCollectiblesShop({
        shopPreview: preview,
        shopPreviewInfo: {
            productName: getCollectibleProductName(info),
            price: offer.emeraldPrice.toString(),
            mintLimitVisible: offer.mintLimit > 0,
            mintLimitText: `${offer.mintedCount}/${offer.mintLimit}`,
            buyEnabled: (offer.mintedCount < offer.mintLimit) || (offer.mintLimit === -1),
        },
    });
};

/** `onClickBuy`: short of emeralds, the "not enough" alert for currency 1001; else the confirmation, for the active wallet. */
export const buySelectedShopOffer = () => {
    const { shopActiveCategory, shopOffersByCategory, shopSelectedIndex, activeWallet } = collectiblesStore.getState();
    const offer = shopActiveCategory ? shopOffersByCategory[shopActiveCategory]?.[shopSelectedIndex] : undefined;

    if (!offer) return;

    if (userStore.getState().emeralds < offer.emeraldPrice) {
        showNotEnoughActivityPointsAlert(1001);

        return;
    }

    showCollectiblesPurchaseConfirmation({ kind: 'nft', offer }, activeWallet ?? '');
};

// ------------------------------------------------------------------------------------------------
// RewardClaimsTab
// ------------------------------------------------------------------------------------------------

/** `RewardClaimsTab`'s request timer: `Timer(600)`. */
const CLAIMS_REQUEST_INTERVAL = 600;

let claimsRequestTimer: ReturnType<typeof setInterval> | undefined;

/** `requestRewardClaims` / `requestClaimsForWallet`: every wallet is queued and the timer started. */
const requestRewardClaims = (send: Send, wallets: string[]) => {
    if (!wallets.length) return;

    const { claimsQueue, patchCollectiblesClaims } = collectiblesStore.getState();

    patchCollectiblesClaims({ claimsQueue: [ ...claimsQueue, ...wallets ] });

    if (!claimsRequestTimer) claimsRequestTimer = setInterval(() => processNextClaimsRequest(send), CLAIMS_REQUEST_INTERVAL);
};

/** `processNextRequest`: one wallet at a time, the next only once the last was answered. */
const processNextClaimsRequest = (send: Send) => {
    const { claimsRequestInProgress, claimsQueue, patchCollectiblesClaims } = collectiblesStore.getState();

    if (claimsRequestInProgress || !claimsQueue.length) return;

    const [ wallet, ...rest ] = claimsQueue;

    patchCollectiblesClaims({ claimsQueue: rest, claimsRequestInProgress: true });
    send(new GetNftClaimsComposer({ walletAddress: wallet }));
};

const stopClaimsRequestTimer = () => {
    if (!claimsRequestTimer) return;

    clearInterval(claimsRequestTimer);
    claimsRequestTimer = undefined;
};

/** `updateClaimButtonState`: something to claim, no claim on its way and no request out. */
const updateClaimsButtonState = () => {
    const { claims, claimsClaiming, claimsRequestInProgress, patchCollectiblesClaims } = collectiblesStore.getState();

    patchCollectiblesClaims({ claimsButtonEnabled: (claims.length > 0) && !claimsClaiming && !claimsRequestInProgress });
};

/** `onNftClaimsMessage`: the claims not yet claimed to their limit are listed; the last wallet answered makes the tab ready. */
export const onNftClaims = (nftClaims: INftClaim[]) => {
    const { claims, claimsQueue, patchCollectiblesClaims } = collectiblesStore.getState();

    patchCollectiblesClaims({ claims: [ ...claims, ...nftClaims.filter(claim => claim.claimedAmount < claim.claimLimit) ], claimsRequestInProgress: false });

    if (claimsQueue.length === 0) {
        stopClaimsRequestTimer();
        patchCollectiblesClaims({ claimsReady: true });
        updateClaimsButtonState();
    }
};

/** `onClaimClicked`. */
export const claimAllRewards = (send: Send) => {
    collectiblesStore.getState().patchCollectiblesClaims({ claimsButtonEnabled: false, claimsClaiming: true, claimsReady: false });
    send(new ClaimNftClaimsComposer({}));
};

/** `onNftClaimResultMessage`: the bubble; a success clears the list. */
export const onNftClaimResult = (resultCode: number) => {
    const success = resultCode === 0;

    notify(success ? t('collectibles.claiming.success') : t('collectibles.claiming.failed', '', { id: String(resultCode) }));

    const { patchCollectiblesClaims } = collectiblesStore.getState();

    if (success) patchCollectiblesClaims({ claims: [] });

    patchCollectiblesClaims({ claimsClaiming: false });
    updateClaimsButtonState();
    patchCollectiblesClaims({ claimsReady: true });
};

// ------------------------------------------------------------------------------------------------
// TransferNftsTab
// ------------------------------------------------------------------------------------------------

/** `initializeData`: the fee is asked for; the wallets the hub already has fill the menu (all of them, as Flash passes `walletAddresses` here). */
const initializeTransferData = (send: Send) => {
    const { walletAddresses, patchCollectiblesTransfer } = collectiblesStore.getState();

    patchCollectiblesTransfer({ transferFeePending: true });
    send(new GetNftTransferFeeComposer({}));

    if (walletAddresses) initializeTransferWallets(walletAddresses);

    patchCollectiblesTransfer({ transferWaitingForAddresses: walletAddresses === null });
    updateTransferButtonState();
};

/** `initializeTransferWallets`: the menu is filled and its first wallet picked. */
const initializeTransferWallets = (wallets: string[]) => {
    collectiblesStore.getState().patchCollectiblesTransfer({ transferWallets: wallets, transferSelectedIndex: (wallets.length > 0) ? 0 : -1, transferWaitingForAddresses: false });
    updateTransferButtonState();
};

/** `onSelectWallet`. */
export const selectTransferWallet = (index: number) => collectiblesStore.getState().patchCollectiblesTransfer({ transferSelectedIndex: index });

/** `selectedWallet`. */
const getSelectedTransferWallet = (): string | null => {
    const { transferWallets, transferSelectedIndex } = collectiblesStore.getState();

    if (!transferWallets || (transferSelectedIndex < 0) || (transferSelectedIndex >= transferWallets.length)) return null;

    return transferWallets[transferSelectedIndex];
};

/** `updateTransferButtonState`: the purse covers the fee, there is a Collector wallet, no transfer is running and a wallet is picked. */
export const updateTransferButtonState = () => {
    const { transferFee, stardustWallet, transferring, patchCollectiblesTransfer } = collectiblesStore.getState();
    const enabled = (transferFee <= userStore.getState().silver) && (stardustWallet !== null) && (stardustWallet !== '') && !transferring && (getSelectedTransferWallet() !== null);

    patchCollectiblesTransfer({ transferButtonEnabled: enabled });
};

/** `onNftTransferFeeMessage`. */
export const onNftTransferFee = (transferFee: number) => {
    collectiblesStore.getState().patchCollectiblesTransfer({ transferFeePending: false, transferFee });
    updateTransferButtonState();
};

/** `onTransferClicked` + `onTransferConfirm`. */
export const transferCollectibles = (send: Send) => {
    const { showConfirm, interpolate } = systemStore.getState();

    collectiblesStore.getState().patchCollectiblesTransfer({ transferButtonEnabled: false });

    showConfirm(interpolate('${collectibles.transfer}'), interpolate('${collectibles.transfer.confirm}'), () => {
        collectiblesStore.getState().patchCollectiblesTransfer({ transferring: true });
        send(new NftTransferAssetsComposer({ walletAddress: getSelectedTransferWallet() ?? '' }));
        updateTransferButtonState();
    }, { onCancel: updateTransferButtonState });
};

/** `onNftTransferResultMessage`. */
export const onNftTransferResult = (resultCode: number) => {
    notify((resultCode === 0) ? t('collectibles.transfer.success') : t('collectibles.transfer.error', '', { id: String(resultCode) }));

    collectiblesStore.getState().patchCollectiblesTransfer({ transferring: false });
    updateTransferButtonState();
};

// ------------------------------------------------------------------------------------------------
// CollectiblesRewardBoxView and the nft_opening bubble
// ------------------------------------------------------------------------------------------------

/** `populateRewardItem`: the reward's image, name and rarity; the window takes the rarity's colour. */
const populateRewardItem = (reward: ICollectibleBaseItem) => {
    const { rewardBoxPreviewEasterEgg, patchCollectiblesRewardBox } = collectiblesStore.getState();
    // `product_image`'s own `ProductImageWidget.previewImage`.
    const { preview, easterEgg } = previewImage(wrapBaseItem(reward), rewardBoxPreviewEasterEgg);

    patchCollectiblesRewardBox({ rewardBoxCurrent: reward, rewardBoxPreview: preview, rewardBoxPreviewEasterEgg: easterEgg });
};

/** `showNextRewardOrClose`. */
export const showNextCollectiblesReward = () => {
    const { rewardBoxQueue, patchCollectiblesRewardBox } = collectiblesStore.getState();

    if (!rewardBoxQueue.length) {
        patchCollectiblesRewardBox({ rewardBoxVisible: false });

        return;
    }

    const [ next, ...rest ] = rewardBoxQueue;

    patchCollectiblesRewardBox({ rewardBoxQueue: rest });
    populateRewardItem(next);
};

/**
 * `showLootBoxReward` / `showReward`: the reward is queued; a box not on the desktop comes up with
 * the next one, and a box built just now shows it at once too (`param2`).
 */
const showLootBoxReward = (reward: ICollectibleBaseItem) => {
    const { rewardBoxVisible, rewardBoxQueue, patchCollectiblesRewardBox } = collectiblesStore.getState();

    patchCollectiblesRewardBox({ rewardBoxQueue: [ ...rewardBoxQueue, reward ] });

    if (!rewardBoxVisible) {
        patchCollectiblesRewardBox({ rewardBoxVisible: true });
        showNextCollectiblesReward();
    }
};

/**
 * `onRedeemLootBoxStateEvent`: a finished opening. The user's own reward comes up in the reward
 * box; someone else's is an `nft_opening` bubble with the product, its rarity and the rarity's
 * colour in the extra data.
 */
export const onRedeemNftLootBoxState = (state: number, openerAvatarId: number, reward: ICollectibleBaseItem) => {
    const isOwn = userStore.getState().userId === openerAvatarId;

    if (state === 0) return;

    if (isOwn) {
        showLootBoxReward(reward);

        return;
    }

    const text = t('collectibles.reward_box.notif.desc', '', { name: t('generic.someone'), item: getCollectibleProductName(wrapBaseItem(reward)) });

    notificationStore.getState().addNotification(text, 'nft_opening', undefined, undefined, { product: wrapBaseItem(reward), rarity: reward.rarity, rarityColor: getCollectibleRarityColor(reward.rarity) });
};

/** `onRedeemLootBoxResultEvent`. */
export const onRedeemNftLootBoxResult = (resultCode: number) => {
    if (resultCode === 1) notify(t('generic.error'));
    if (resultCode === 2) notify(t('collectibles.reward_box.wrong_wallet'));
};

// ------------------------------------------------------------------------------------------------
// The purchase confirmation of a token pack or a shop offer
// ------------------------------------------------------------------------------------------------

/**
 * `HabboCatalog.showPurchaseConfirmation` -> `PurchaseConfirmationDialog.showOffer`: a shop offer's
 * `nft_image` widget previews its product; a token pack shows the `minting_token_large` icon.
 */
const showCollectiblesPurchaseConfirmation = (offer: CollectiblesPurchaseOffer, wallet: string) => {
    const { purchasePreviewEasterEgg, patchCollectiblesPurchase } = collectiblesStore.getState();

    patchCollectiblesPurchase({ purchaseOffer: offer, purchaseWallet: wallet, purchasing: false, purchasePreview: COLLECTIBLE_PREVIEW_NONE });

    if (offer.kind !== 'nft') return;

    // `nft_image`'s own `ProductImageWidget.previewImage`.
    const { preview, easterEgg } = previewImage(wrapBaseItem(offer.offer.productInfo), purchasePreviewEasterEgg);

    patchCollectiblesPurchase({ purchasePreview: preview, purchasePreviewEasterEgg: easterEgg });
};

/** `onBuyButtonClick`: `purchaseMintTokens` or `purchaseNftOffer`, into the wallet the dialog was opened for. */
export const confirmCollectiblesPurchase = (send: Send) => {
    const { purchaseOffer, purchaseWallet, patchCollectiblesPurchase } = collectiblesStore.getState();

    if (!purchaseOffer) return;

    patchCollectiblesPurchase({ purchasing: true });

    if (purchaseOffer.kind === 'mint_token') send(new PurchaseMintTokenComposer({ offerId: purchaseOffer.offer.offerId, walletAddress: purchaseWallet }));
    else send(new NftStorePurchaseComposer({ productCode: purchaseOffer.offer.productCode, walletAddress: purchaseWallet }));
};

/** `onClose` / `dispose`. */
export const closeCollectiblesPurchase = () => collectiblesStore.getState().patchCollectiblesPurchase({ purchaseOffer: null, purchasing: false, purchasePreview: COLLECTIBLE_PREVIEW_NONE });

/**
 * `HabboCatalog.onNftStorePurchase`: an error alert, or the "purchased" bubble naming the product
 * the dialog's `nft_image` shows; the dialog goes either way.
 */
export const onNftStorePurchase = (result: number) => {
    const { purchaseOffer } = collectiblesStore.getState();
    const { showAlert, interpolate } = systemStore.getState();

    if (result === 1) {
        showAlert(interpolate('${catalog.alert.purchaseerror.title}'), interpolate('${notification.nft.purchase.error}'));
    } else if (purchaseOffer?.kind === 'nft') {
        notify(t('notifications.text.purchase.ok', '', { productName: getCollectibleProductName(wrapBaseItem(purchaseOffer.offer.productInfo)) }));
    }

    closeCollectiblesPurchase();
};

/** `HabboCatalog.onPurchaseOK` / `onPurchaseError`: the confirmation dialog is disposed, whichever offer it carries. */
export const onCollectiblesPurchaseAnswered = () => {
    if (collectiblesStore.getState().purchaseOffer) closeCollectiblesPurchase();
};
