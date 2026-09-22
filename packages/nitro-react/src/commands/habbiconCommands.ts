/**
 * The habbicon controller - `catalog/habbicons/HabbiconController`'s public side (`§_-cq§`, the
 * interface `IIDHabbiconController` hands to `RoomUI`, `HabboMessenger` and `HabboCatalog`) and
 * the loading half of `habbicons/assets/HabbiconAssetManager`.
 *
 * Every entry point is gated on `habbicons.enabled`, as `habbiconsEnabled()` gates Flash's.
 *
 * Who calls what in Flash:
 * - the hub (`HabbiconView`, its popup, its reward panel, the purchase confirmation):
 *   `getHabbiconInfo`, `claimHabbicon`, `favoriteHabbicon`, `unfavoriteHabbicon`, the purchase
 *   confirmation's open / close and `buyHabbicon` / `buyHabbiconCollection`;
 * - the links: `openHabbiconHub` (`habbicons/open`, also what `HabboCatalog` turns a
 *   `catalog/habbicons` link into);
 * - `HabboCatalog`'s purchase flow: `isHabbiconOwned`, `isHabbiconOfferOwned` and
 *   `showHabbiconAlreadyOwnedAlert`, before it opens its own purchase confirmation;
 * - the chat input's habbicon selector (`HabbiconSelector`, `RoomChatInputView`) and the
 *   messenger's picker (`MessengerHabbiconPicker`, `MainView`): `openHabbiconHub`,
 *   `noteHabbiconUsed`, `isUnseenHabbicon`, `removeUnseenHabbicon`, `resetUnseenHabbicons`,
 *   `getUnseenHabbiconCount`, and the store's `ownedHabbicons` / `recentHabbiconIds` /
 *   `shopItems`. Neither the selector nor the picker is ported (the chat input draws its
 *   `chat_extra_button` art only), so those have no caller here yet.
 *
 * The server this client talks to (turbo-cloud) has every habbicon packet as an empty stub, so
 * nothing answers the requests below yet; this follows Flash.
 */
import { FurnitureTypeEnum, IPurchasableOffer, NitroLogger } from '@nitrodevco/nitro-api';
import { BuyHabbiconCollectionComposer, BuyHabbiconComposer, ClaimHabbiconComposer, FavoriteHabbiconComposer, GetHabbiconInfoComposer, GetHabbiconShopDataComposer, IHabbiconShopItem, ResetUnseenItemsComposer, UnfavoriteHabbiconComposer } from '@nitrodevco/nitro-packets';
import { AvatarLogic, GetAssetManager } from '@nitrodevco/nitro-renderer';
import type { Texture } from 'pixi.js';

import { WebSocketConnection } from '#base/context/communication';
import { HabbiconEntryModel, HabbiconSetModel, habbiconsStore } from '#base/context/habbicons';
import { systemStore } from '#base/context/system';
import { textureFromCanvas } from '#base/theme';
import { cutHabbiconFrame, dimHabbiconPreview, getOfferProduct, HABBICONS_COLLECTION_ICONS_SPRITESHEET_FILE, HABBICONS_METADATA_FILE, HABBICONS_SPRITESHEET_FILE, parseHabbiconMetadata, resolveHabbiconAssetRoot } from '#base/utils';

import { resetPlacedOfferData } from './catalogPlacementCommands';

type Send = WebSocketConnection['send'];

/** `IHabboInventory`'s unseen item category of the habbicons (`UnseenItemTracker`, `getCount(8)`). */
export const HABBICON_UNSEEN_CATEGORY = 8;

/** `HabbiconController.habbiconsEnabled`. */
export const habbiconsEnabled = (): boolean => systemStore.getState().config['habbicons.enabled'] === true;

/** The asset manager name a habbicon's preview is kept under, for a caller that wants it by name (a notification bubble). */
export const habbiconPreviewAssetName = (habbiconId: number): string => `habbicon_preview_${habbiconId}`;

/** `openHabbiconHub`: the unseen habbicons are seen, and the hub comes up. */
export const openHabbiconHub = (send: Send) => {
    if (!habbiconsEnabled()) return;

    resetUnseenHabbicons(send);
    systemStore.getState().showWindow('habbicons');
};

/** `getShopData`: a request already on its way is not repeated; loaded data is only asked for again when forced. */
export const getHabbiconShopData = (send: Send, force: boolean = false) => {
    if (!habbiconsEnabled()) return;

    const { hasLoadedShopData, shopDataRequested, notifyHabbiconChange, setShopDataRequested } = habbiconsStore.getState();

    if (hasLoadedShopData && !force) {
        notifyHabbiconChange('shop');

        return;
    }

    if (shopDataRequested) return;

    send(new GetHabbiconShopDataComposer({}));
    setShopDataRequested(true);
};

/** `getHabbiconInfo`: the answer (`HabbiconInfo`) updates the cached habbicon and its set. */
export const getHabbiconInfo = (send: Send, habbiconId: number) => {
    if (!habbiconsEnabled()) return;

    send(new GetHabbiconInfoComposer({ habbiconId }));
};

/** `noteHabbiconUsed`: the habbicon goes to the front of the recent ones (`hce_recent_habbicons_updated`). */
export const noteHabbiconUsed = (habbiconId: number) => {
    if (!habbiconsEnabled() || (habbiconId <= 0)) return;

    const { addRecentHabbiconId, notifyHabbiconChange } = habbiconsStore.getState();

    addRecentHabbiconId(habbiconId);
    notifyHabbiconChange('recent', habbiconId);
};

/** `isUnseenHabbicon`. */
export const isUnseenHabbicon = (habbiconId: number): boolean => habbiconsStore.getState().unseenHabbiconIds.includes(habbiconId);

/** `unseenHabbiconCount`. */
export const getUnseenHabbiconCount = (): number => habbiconsStore.getState().unseenHabbiconIds.length;

/** `removeUnseenHabbicon`: `removeUnseen(8, id)`, then `resetCategoryIfEmpty(8)` - which tells the server whenever nothing is left unseen. */
export const removeUnseenHabbicon = (send: Send, habbiconId: number) => {
    const { removeUnseenHabbicon: remove } = habbiconsStore.getState();

    remove(habbiconId);

    if (!getUnseenHabbiconCount()) send(new ResetUnseenItemsComposer({ category: HABBICON_UNSEEN_CATEGORY }));
};

/** `resetUnseenHabbicons`: `resetCategory(8)`, which does nothing when nothing is unseen. */
export const resetUnseenHabbicons = (send: Send) => {
    if (!getUnseenHabbiconCount()) return;

    habbiconsStore.getState().resetUnseenHabbicons();
    send(new ResetUnseenItemsComposer({ category: HABBICON_UNSEEN_CATEGORY }));
};

/** `buyHabbicon`: the purchase result that follows is the controller's (`_pendingPurchaseRefresh`). */
export const buyHabbicon = (send: Send, habbiconId: number) => {
    if (!habbiconsEnabled()) return;

    habbiconsStore.getState().setPendingPurchaseRefresh(true);
    send(new BuyHabbiconComposer({ habbiconId }));
};

/** `buyHabbiconCollection`. */
export const buyHabbiconCollection = (send: Send, collectionId: number) => {
    if (!habbiconsEnabled()) return;

    habbiconsStore.getState().setPendingPurchaseRefresh(true);
    send(new BuyHabbiconCollectionComposer({ collectionId }));
};

/** `claimHabbicon`: a claim is answered like a purchase. */
export const claimHabbicon = (send: Send, habbiconId: number) => {
    if (!habbiconsEnabled()) return;

    habbiconsStore.getState().setPendingPurchaseRefresh(true);
    send(new ClaimHabbiconComposer({ habbiconId }));
};

/** `favoriteHabbicon`. */
export const favoriteHabbicon = (send: Send, habbiconId: number) => {
    if (!habbiconsEnabled()) return;

    send(new FavoriteHabbiconComposer({ habbiconId }));
};

/** `unfavoriteHabbicon`. */
export const unfavoriteHabbicon = (send: Send, habbiconId: number) => {
    if (!habbiconsEnabled()) return;

    send(new UnfavoriteHabbiconComposer({ habbiconId }));
};

/** `openHabbiconPurchaseConfirmation`: only for a habbicon with a price; an open confirmation is replaced. */
export const openHabbiconPurchaseConfirmation = (item: HabbiconEntryModel) => {
    if (!habbiconsEnabled() || !item.purchasable) return;

    habbiconsStore.getState().openHabbiconPurchase({ mode: 'habbicon', item });
};

/** `openHabbiconSetPurchaseConfirmation`: only for a set that can be bought. */
export const openHabbiconSetPurchaseConfirmation = (set: HabbiconSetModel) => {
    if (!habbiconsEnabled() || !set.canBuy) return;

    habbiconsStore.getState().openHabbiconPurchase({ mode: 'set', set });
};

/** `closeHabbiconPurchaseConfirmation`. */
export const closeHabbiconPurchaseConfirmation = () => habbiconsStore.getState().closeHabbiconPurchase();

/** `tryGetOwnedHabbicon`: the habbicon's state when the user holds it. */
export const tryGetOwnedHabbicon = (habbiconId: number): { habbiconId: number; habbiconState: number } | undefined => {
    const habbiconState = habbiconsStore.getState().ownedHabbicons[habbiconId];

    return (habbiconState === undefined) ? undefined : { habbiconId, habbiconState };
};

/** `tryGetShopItem`. */
export const tryGetShopItem = (habbiconId: number): IHabbiconShopItem | undefined => habbiconsStore.getState().shopItems[habbiconId];

/** `HabboCatalog.isHabbiconOwned`. */
export const isHabbiconOwned = (habbiconId: number): boolean => habbiconsEnabled() && (tryGetOwnedHabbicon(habbiconId) !== undefined);

/** `HabboCatalog.isHabbiconOfferOwned`: an offer whose product (`Offer.product`) is a `habbicon`, with its id as the extra param. */
export const isHabbiconOfferOwned = (offer: IPurchasableOffer | undefined): boolean => {
    const product = offer ? getOfferProduct(offer) : undefined;

    if (!habbiconsEnabled() || !product || (product.productType !== FurnitureTypeEnum.Habbicon)) return false;

    return isHabbiconOwned(parseInt(product.extraParam, 10));
};

/** `HabboCatalog.showHabbiconAlreadyOwnedAlert`: closing it clears a dropped offer (`alertDialogEventProcessor`). */
export const showHabbiconAlreadyOwnedAlert = () => {
    const { interpolate, showAlert } = systemStore.getState();

    showAlert(interpolate('${catalog.alert.purchaseerror.title}'), interpolate('${habbicon.catalog.already_owned}'), { onClose: () => resetPlacedOfferData() });
};

/** Fetches an image into a bitmap; `undefined` when it cannot be had. */
const fetchBitmap = async (url: string): Promise<ImageBitmap | undefined> => {
    const response = await fetch(url);

    if (!response.ok) return undefined;

    return createImageBitmap(await response.blob());
};

/** Registers a texture in the shared asset manager, as every UI texture is. */
const keepTexture = (name: string, texture: Texture): Texture => {
    GetAssetManager().setTexture(name, texture);

    return texture;
};

/**
 * `HabbiconAssetManager.configure` + `preload` (`ensureLoaded`): `habbicons.json`,
 * `habbicons_spritesheet.png` and `collection_icons_spritesheet.png` from the asset root, all
 * three at once. The metadata or the habbicon sheet failing marks the load failed for good
 * (`markLoadFailed`); the collection icons failing only leaves the sets without icons. Once all
 * three are in (`checkLoadCompletion`), every preview is cut from its sheet, the room's avatar
 * logic learns the name keys (its spinning duck, `AvatarLogic.habbiconNameResolver`), and the
 * hub refreshes (`onHabbiconAssetsLoaded`).
 */
export const loadHabbiconAssets = async () => {
    if (!habbiconsEnabled()) return;

    const { assetRoot, assetsLoadState, startHabbiconAssetsLoad, setHabbiconAssets, failHabbiconAssetsLoad, notifyHabbiconChange } = habbiconsStore.getState();
    const root = resolveHabbiconAssetRoot(systemStore.getState().config);

    if ((root === assetRoot) && (assetsLoadState !== 'idle')) return;

    startHabbiconAssetsLoad(root);

    if (!root.length) {
        NitroLogger.log('[HabbiconAssetManager] Habbicon asset root is not configured.');
        failHabbiconAssetsLoad(root);

        return;
    }

    const [ metadataText, sheet, collectionSheet ] = await Promise.all([
        fetch(root + HABBICONS_METADATA_FILE).then(response => (response.ok ? response.text() : undefined)).catch(() => undefined),
        fetchBitmap(root + HABBICONS_SPRITESHEET_FILE).catch(() => undefined),
        fetchBitmap(root + HABBICONS_COLLECTION_ICONS_SPRITESHEET_FILE).catch(() => undefined),
    ]);

    if ((metadataText === undefined) || !sheet) {
        NitroLogger.log(`[HabbiconAssetManager] Failed to load habbicon asset: ${(metadataText === undefined) ? HABBICONS_METADATA_FILE : HABBICONS_SPRITESHEET_FILE}`);
        failHabbiconAssetsLoad(root);

        return;
    }

    let metadata: ReturnType<typeof parseHabbiconMetadata>;

    try {
        metadata = parseHabbiconMetadata(metadataText);
    } catch (error) {
        NitroLogger.log(`[HabbiconAssetManager] Failed to parse habbicon metadata: ${(error as Error).message}`);
        failHabbiconAssetsLoad(root);

        return;
    }

    if (!collectionSheet) NitroLogger.log('[HabbiconAssetManager] Failed to load habbicon collection icon asset.');

    const previews: Record<number, Texture> = {};
    const lockedPreviews: Record<number, Texture> = {};
    const collectionIcons: Record<number, Texture> = {};

    for (const [ id, rect ] of Object.entries(metadata.frames)) {
        const habbiconId = Number(id);
        const canvas = cutHabbiconFrame(sheet, rect);

        if (!canvas) continue;

        previews[habbiconId] = keepTexture(habbiconPreviewAssetName(habbiconId), textureFromCanvas(canvas, habbiconPreviewAssetName(habbiconId)));
        lockedPreviews[habbiconId] = keepTexture(`habbicon_preview_locked_${habbiconId}`, textureFromCanvas(dimHabbiconPreview(canvas), `habbicon_preview_locked_${habbiconId}`));
    }

    if (collectionSheet) {
        for (const [ id, rect ] of Object.entries(metadata.collectionIcons)) {
            const canvas = cutHabbiconFrame(collectionSheet, rect);

            if (canvas) collectionIcons[Number(id)] = keepTexture(`habbicon_collection_icon_${id}`, textureFromCanvas(canvas, `habbicon_collection_icon_${id}`));
        }
    }

    setHabbiconAssets(root, { nameKeys: metadata.nameKeys, previews, lockedPreviews, collectionIcons });

    AvatarLogic.habbiconNameResolver = habbiconId => habbiconsStore.getState().nameKeys[habbiconId];

    notifyHabbiconChange('owned');
    notifyHabbiconChange('shop');
};
