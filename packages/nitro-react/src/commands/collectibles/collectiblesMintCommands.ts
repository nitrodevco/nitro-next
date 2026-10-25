/**
 * The collectibles hub's minting tab - Flash `tabs/MintInventoryListTab`.
 * Part of Flash `catalog/collectibles/CollectiblesController` - see `collectiblesCommands`.
 */
import { GetCollectibleMintableItemTypesComposer, GetCollectibleMintingEnabledComposer, GetCollectibleMintTokensComposer, GetMintTokenOffersComposer, ICollectiblesProductItem, IMintTokenOffer, MintItemComposer } from '@nitrodevco/nitro-packets';

import { COLLECTIBLE_MINT_RESULT_SUCCESS, COLLECTIBLE_PREVIEW_NONE, CollectiblesMintItem, collectiblesStore, wrapMintableItem } from '#base/context/collectibles';
import { Send } from '#base/context/communication';
import { getNonRentedInventoryIds, inventoryStore } from '#base/context/inventory';
import { configString, systemStore, translate as t } from '#base/context/system';
import { userStore } from '#base/context/user';
import { openWebPage } from '#base/utils';

import { checkFurniInventoryInitialization } from '../inventory/inventoryCommands';
import { controllerPreviewImage, getCollectibleProductName, notifyCollectibles } from './collectiblesCommands';
import { showCollectiblesPurchaseConfirmation } from './collectiblesPurchaseCommands';

/** `getIdsInInventory`: the non-rented items of the first inventory group of the type (`getNonRentedInventoryIds`); none for clothing. */
const getIdsInInventory = (item: ICollectiblesProductItem): number[] => {
    let isWallItem = false;

    if (item.itemType === 'i') isWallItem = true;
    else if (item.itemType !== 's') return [];

    return getNonRentedInventoryIds(inventoryStore.getState().furniGroups, item.itemTypeId, isWallItem) ?? [];
};

/**
 * `initializeData`: the mintable types, whether minting is open, the furni inventory (unless it is
 * current), the wallet and the token packs.
 */
export const initializeMintData = (send: Send) => {
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
export const setMintActiveWallet = (send: Send, wallet: string | null) => {
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
    notifyCollectibles(t((mintResult === COLLECTIBLE_MINT_RESULT_SUCCESS) ? 'shop.minting.success' : 'shop.minting.failed'));

    collectiblesStore.getState().patchCollectiblesMint({ minting: false });
    initMintItemPreview(send);
};

/** `onClickCreateWallet`. */
export const openCreateWalletPage = () => openWebPage(configString('nft.wallet.create.url'));

/** `onClickMoreInfo`. */
export const openWalletSettingsPage = () => openWebPage(configString('web.settings.wallet.relativeUrl'));
