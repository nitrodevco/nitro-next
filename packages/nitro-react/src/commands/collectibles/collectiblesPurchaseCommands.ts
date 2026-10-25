/**
 * The purchase confirmation `HabboCatalog.showPurchaseConfirmation` opens for a collectibles
 * `MintTokenPurchaseOffer` or `NftStorePurchaseOffer`.
 * Part of Flash `catalog/collectibles/CollectiblesController` - see `collectiblesCommands`.
 */
import { NftStorePurchaseComposer, PurchaseMintTokenComposer } from '@nitrodevco/nitro-packets';

import { COLLECTIBLE_PREVIEW_NONE, CollectiblesPurchaseOffer, collectiblesStore, wrapBaseItem } from '#base/context/collectibles';
import { Send } from '#base/context/communication';
import { systemStore, translate as t } from '#base/context/system';

import { getCollectibleProductName, notifyCollectibles, previewImage } from './collectiblesCommands';

/**
 * `HabboCatalog.showPurchaseConfirmation` -> `PurchaseConfirmationDialog.showOffer`: a shop offer's
 * `nft_image` widget previews its product; a token pack shows the `minting_token_large` icon.
 */
export const showCollectiblesPurchaseConfirmation = (offer: CollectiblesPurchaseOffer, wallet: string) => {
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
        notifyCollectibles(t('notifications.text.purchase.ok', '', { productName: getCollectibleProductName(wrapBaseItem(purchaseOffer.offer.productInfo)) }));
    }

    closeCollectiblesPurchase();
};

/** `HabboCatalog.onPurchaseOK` / `onPurchaseError`: the confirmation dialog is disposed, whichever offer it carries. */
export const onCollectiblesPurchaseAnswered = () => {
    if (collectiblesStore.getState().purchaseOffer) closeCollectiblesPurchase();
};
