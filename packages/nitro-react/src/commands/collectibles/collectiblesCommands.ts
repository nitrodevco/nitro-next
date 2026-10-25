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
 * This module holds the controller's names, types and previews; each window's logic is in its own
 * `collectibles*Commands` module beside it (hub, collections, mint, shop, reward claims, transfer,
 * reward box, purchase).
 *
 * The companion server (turbo-cloud) answers none of these requests - its collectibles handlers
 * are empty - so against it the hub stays on its loading views. The client side is the Flash one
 * all the same.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { ProgressTreasureHuntComposer } from '@nitrodevco/nitro-packets';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';

import { GetChatStyleLibrary } from '#base/chat';
import {
    COLLECTIBLE_PREVIEW_NONE, COLLECTIBLE_PRODUCT_TYPE_BADGE, COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE, COLLECTIBLE_PRODUCT_TYPE_CLOTHING, COLLECTIBLE_PRODUCT_TYPE_EFFECT, COLLECTIBLE_PRODUCT_TYPE_FLOOR, COLLECTIBLE_PRODUCT_TYPE_PET,
    COLLECTIBLE_PRODUCT_TYPE_UNKNOWN, COLLECTIBLE_PRODUCT_TYPE_WALL, CollectiblePreview, CollectiblePreviewEasterEgg, CollectibleProductInfo, collectiblesStore,
} from '#base/context/collectibles';
import { Send } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { systemStore, translate as t } from '#base/context/system';
import { userStore } from '#base/context/user';
import { getBadgeName, getFurnitureData, openWebPage } from '#base/utils';

/** The bubble every collectibles notification uses: `info`, with the curator stamp. */
const COLLECTIBLES_NOTIFICATION_ICON = 'icon_curator_stamp_large_png';
export const notifyCollectibles = (text: string) => notificationStore.getState().addNotification(text, 'info', COLLECTIBLES_NOTIFICATION_ICON);

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
        case COLLECTIBLE_PRODUCT_TYPE_BADGE: return getBadgeName(t, info.itemTypeId);
        case COLLECTIBLE_PRODUCT_TYPE_CHAT_STYLE: return t('product.type.chatstyle');
        case COLLECTIBLE_PRODUCT_TYPE_PET: return t(`pet.type.${info.itemTypeId}`);
        default:
            NitroLogger.log('[CollectiblesController] Can not yet handle this type of product: ');

            return '(missing)';
    }
};

/** The furni a wall or floor product names, as the room engine draws it; `none` when the furni data has no such type. */
const getFurniPreview = (info: CollectibleProductInfo, isWallItem: boolean, icon: boolean): CollectiblePreview => {
    const data = getFurnitureData(systemStore.getState(), parseInt(info.itemTypeId), isWallItem);

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
export const previewImage = (info: CollectibleProductInfo | null, easterEgg: CollectiblePreviewEasterEgg, send?: Send): PreviewImageResult => {
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
export const controllerPreviewImage = (send: Send, info: CollectibleProductInfo | null): CollectiblePreview => {
    const { previewEasterEgg, patchCollectiblesHub } = collectiblesStore.getState();
    const { preview, easterEgg } = previewImage(info, previewEasterEgg, send);

    patchCollectiblesHub({ previewEasterEgg: easterEgg });

    return preview;
};
