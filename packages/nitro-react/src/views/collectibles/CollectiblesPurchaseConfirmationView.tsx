/**
 * The purchase confirmation of a mint token pack or a collectibles shop offer -
 * `PurchaseConfirmationDialog.showConfirmationDialog` on `purchase_confirmation` for a
 * `MintTokenPurchaseOffer` (product type `MINT_TOKEN`) or an `NftStorePurchaseOffer` (`n`), the
 * layout `CatalogPurchaseConfirmationView` draws for a catalogue offer, with what differs for
 * these two:
 *
 * - the frame is `#2a2a2a` (`_window.color`) rather than the catalogue's blue;
 * - a shop offer's product is shown in the `nft_image` `product_image` widget and the dialog is
 *   done there; a pack hides the widget and centres `getMintTokenProductIcon` (`minting_token_large`)
 *   in `product_image` (`setImage`);
 * - the price (`showPriceInContainer`) is the pack's silver (unit 1000) or the offer's emeralds
 *   (unit 1001);
 * - buying sends `PurchaseMintTokenMessageComposer(offerId, wallet)` or
 *   `NftStorePurchaseMessageComposer(productCode, wallet)` (`purchaseMintTokens` /
 *   `purchaseNftOffer`) and disables both buttons until the answer takes the dialog down.
 *
 * The product name is the product data's name for the offer's product code (`getProductData`);
 * `quantity` and `freeQuantity` are not shown for a single, undiscounted purchase, and the raffle
 * is hidden. `disclaimer` is disposed unless `disclaimer.credit_spending.enabled`, when its
 * checkbox enables the buy button (`setDisclaimerAccepted`, unticked on show).
 */
import { useState } from 'react';

import { closeCollectiblesPurchase, confirmCollectiblesPurchase } from '#base/commands';
import { useCollectiblesStore } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useConfigValue, useSystemStore } from '#base/context/system';
import { LayoutImage, TemplateWindow, ThemeImage, useTemplate, useTemplateFrame } from '#base/theme';
import { priceDisplayBindings } from '#base/views/catalog/page/widgets/catalogPrice';
import { CollectiblesPreviewSlots, CollectiblesProductPreview } from '#base/views/shared/CollectiblesProductPreview';

/** `_window.color` for a `MintTokenPurchaseOffer` or `NftStorePurchaseOffer`. */
const COLLECTIBLES_PURCHASE_COLOR = 2763306;
/** `HabboCatalogUtils.getPriceArray`'s units for silver and emeralds. */
const PRICE_UNIT_SILVER = 1000;
const PRICE_UNIT_EMERALD = 1001;
/** The effect previewer's temporary room for `nft_image`. */
const PURCHASE_PREVIEW_ROOM_ID = 1003;

/** `product_image.xml` in the 126 x 152 `nft_image` widget. */
const NFT_IMAGE_SLOTS: CollectiblesPreviewSlots = {
    productPreview: { left: 0, top: 0, width: 126, height: 152 },
    placeholder: { left: 0, top: 0, width: 126, height: 152, src: LayoutImage('habbo-window-manager-com/collectables_collection_default.png'), centered: true },
    unknown: { left: 0, top: 0, width: 126, height: 152, src: LayoutImage('habbo-window-manager-com/collectables_icon_curator_stamp_large.png'), stretched: false },
    badge: { left: 0, top: 0, width: 126, height: 152, zoom: 2 },
    pet: { left: 0, top: 0, width: 126, height: 152, zoom: 1, shrinkOnOverflow: false },
    avatar: { left: 18, top: 11, width: 90, height: 130 },
    effect: { left: 13, top: -4, width: 100, height: 260, roomId: PURCHASE_PREVIEW_ROOM_ID },
};

export const CollectiblesPurchaseConfirmationView = () => {
    const { send } = useWebSocketContext();
    const purchaseOffer = useCollectiblesStore(x => x.purchaseOffer);
    const purchasing = useCollectiblesStore(x => x.purchasing);
    const preview = useCollectiblesStore(x => x.purchasePreview);
    const productCode = purchaseOffer?.offer.productCode ?? '';
    const productName = useSystemStore(x => x.productData[productCode]?.name);
    const config = useConfigData();
    const disclaimerEnabled = (useConfigValue<boolean>('disclaimer.credit_spending.enabled') === true);
    // `setDisclaimerAccepted`: accepted for the offer on show only - a new offer starts unticked.
    const [ acceptedFor, setAcceptedFor ] = useState<unknown>(undefined);
    const priceDisplay = useTemplate('habbo-catalog-com/price_display');
    // `header_button_close` and `cancel_button` both `onClose`.
    const frame = useTemplateFrame({ id: 'collectibles-purchase-confirmation', centered: true, rememberPosition: false, onClose: closeCollectiblesPurchase });

    if (!purchaseOffer || !priceDisplay) return null;

    const isNft = (purchaseOffer.kind === 'nft');
    const disclaimerAccepted = !disclaimerEnabled || (acceptedFor === purchaseOffer);
    const price = isNft
        ? { amount: purchaseOffer.offer.emeraldPrice, unit: PRICE_UNIT_EMERALD }
        : { amount: purchaseOffer.offer.silverPrice, unit: PRICE_UNIT_SILVER };

    return (
        <TemplateWindow
            id="habbo-catalog-com/purchase_confirmation"
            frame={frame}
            bindings={{
                '': { color: COLLECTIBLES_PURCHASE_COLOR },
                product_image: {
                    asset: '',
                    children: !isNft && (
                        <ThemeImage
                            src={LayoutImage('habbo-catalog-com/minting_token_large.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 0, top: 0, width: 126, height: 152 }}
                        />
                    ),
                },
                nft_image: {
                    visible: isNft,
                    children: isNft && (
                        <CollectiblesProductPreview
                            preview={preview}
                            slots={NFT_IMAGE_SLOTS}
                        />
                    ),
                },
                product_name: { caption: productName ?? '' },
                quantity: { visible: false },
                freeQuantity: { visible: false },
                // `getPriceArray`: a price of nothing is 0 credits.
                purchase_cost_box: { items: [ { key: 'price_display', from: priceDisplay, bindings: priceDisplayBindings([ (price.amount > 0) ? price : { amount: 0, unit: -1 } ], config) } ] },
                disclaimer: { visible: disclaimerEnabled },
                spending_disclaimer: {
                    selected: disclaimerAccepted,
                    onPointerTap: () => setAcceptedFor(disclaimerAccepted ? undefined : purchaseOffer),
                },
                raffle_container: { visible: false },
                cancel_button: { disabled: purchasing, onPointerTap: () => !purchasing && closeCollectiblesPurchase() },
                buy_button: { disabled: purchasing || !disclaimerAccepted, onPointerTap: () => !purchasing && disclaimerAccepted && confirmCollectiblesPurchase(send) },
            }}
        />
    );
};
