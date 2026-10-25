import { CatalogTypeEnum } from '@nitrodevco/nitro-api';
import { Container as PixiContainer } from 'pixi.js';
import { useCallback, useEffect, useState } from 'react';

import { buyFromPurchaseDialog, closePurchaseDialog } from '#base/commands';
import { CatalogPurchaseRequest, useCatalogPurchaseActions, useCatalogStore, useCatalogStoreApi, useCatalogType } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigBoolean, useConfigData, useSystemStore, useTranslation } from '#base/context/system';
import { Box, TemplateWindow, useTemplateLibrary } from '#base/theme';
import { getDiscountItemsCount, getOfferProduct } from '#base/utils';

import { CatalogOfferImageView } from './CatalogOfferImageView';
import { CATALOG_LIBRARY, catalogTemplateId } from './page/catalogTemplates';
import { priceDisplayItem } from './page/widgets/catalogPrice';
import { CatalogGiftWrappingView } from './purchase/CatalogGiftWrappingView';

/** `onRaffleTimerTick`: a dot more every 150ms, back to one after 14. */
const RAFFLE_TICK_MS = 150;
const RAFFLE_MAX_DOTS = 14;

/** `ltdRaffleStarted` / `updateDots`: the dots after the raffling text while the raffle runs. */
const useRaffleDots = (running: boolean) => {
    const [ dots, setDots ] = useState(1);

    useEffect(() => {
        if (!running) return;

        const timer = setInterval(() => setDots(value => ((value >= RAFFLE_MAX_DOTS) ? 1 : (value + 1))), RAFFLE_TICK_MS);

        return () => {
            clearInterval(timer);
            setDots(1);
        };
    }, [ running ]);

    return dots;
};

/**
 * `PurchaseConfirmationDialog.showConfirmationDialog` on `purchase_confirmation`: `product_image`
 * shows the product picture (`setImage`, centred), `product_name` the product's name
 * (`getProductData(localizationId).name`), `quantity` the quantity when
 * `catalog.multiple.purchase.enabled` and more than one (else removed from `properties_itemlist`),
 * `freeQuantity` the bonus items the bundle discount adds (`shop.bonus.items.count`), and
 * `purchase_cost_box` the price (`HabboCatalogUtils.showPriceInContainer`). `disclaimer` is disposed
 * unless `disclaimer.credit_spending.enabled`, when its checkbox enables the buy button
 * (`setDisclaimerAccepted`, unticked on show); `raffle_container` shows while the limited edition
 * raffle runs (`ltdRaffleStarted` / `ltdRaffleEnded`). The `nft_image` widget is for NFT store
 * offers, which have a window of their own, so it is hidden.
 *
 * The buy button reads "rent" for a rent offer (`RentUtils.updateBuyCaption`) and "gift" for a
 * purchase turned into gifting (`turnIntoGifting`, which also sets the window's gift title); it and
 * the cancel button lock once pressed (`onBuyButtonClick`), until the dialog closes.
 */
const CatalogPurchaseConfirmationDialogView = ({ purchase }: { purchase: CatalogPurchaseRequest }) => {
    const isPurchasing = useCatalogStore(x => x.isPurchasing);
    const catalogType = useCatalogType();
    const ltdRaffleRunning = useCatalogStore(x => x.ltdRaffleRunning);
    const bundleDiscountRuleset = useCatalogStore(x => x.bundleDiscountRuleset);
    // The offer's product data as the page offer resolved it (`getOfferProductData`), else the table's.
    const storedProductData = useSystemStore(x => x.productData[purchase.offer.localizationId]);
    const productData = getOfferProduct(purchase.offer)?.productData ?? storedProductData;
    const multiplePurchaseEnabled = (useConfigBoolean('catalog.multiple.purchase.enabled')) && (catalogType !== CatalogTypeEnum.BuildersClub);
    const disclaimerEnabled = (useConfigBoolean('disclaimer.credit_spending.enabled'));
    const config = useConfigData();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    // `setDisclaimerAccepted`: accepted for the purchase on show only - a new offer starts unticked.
    const [ acceptedFor, setAcceptedFor ] = useState<CatalogPurchaseRequest | undefined>(undefined);
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const dots = useRaffleDots(ltdRaffleRunning);
    const { setPurchaseIconNode } = useCatalogPurchaseActions();
    const iconRef = useCallback((node: PixiContainer | null) => setPurchaseIconNode(node ?? undefined), [ setPurchaseIconNode ]);
    // `header_button_close` and `cancel_button` both `onClose`.
    const [ frame ] = useState(() => ({ id: 'catalog-purchase-confirmation', centered: true, rememberPosition: false, onClose: () => closePurchaseDialog(store) }));

    const { offer, quantity, asGift } = purchase;
    const disclaimerAccepted = !disclaimerEnabled || (acceptedFor === purchase);
    // `bundleDiscountEnabled` (not in the builders club) -> `getDiscountItemsCount(quantity)`.
    const freeItems = (catalogType !== CatalogTypeEnum.BuildersClub) ? getDiscountItemsCount(bundleDiscountRuleset, quantity) : 0;
    const buyCaption = asGift ? 'catalog.purchase_confirmation.gift' : (offer.isRentOffer ? 'catalog.purchase_confirmation.rent' : 'catalog.purchase_confirmation.buy');

    if (!templates || !templates[catalogTemplateId('price_display')]) return null;

    return (
        <TemplateWindow
            id={catalogTemplateId('purchase_confirmation')}
            frame={frame}
            bindings={{
                '': { caption: `\${${asGift ? 'catalog.purchase_confirmation.gift.title' : 'catalog.purchase_confirmation.title'}}` },
                product_image: { children: (
                    <Box
                        // `getIconWrapper`: the picture `onPurchaseOK` flies into the toolbar.
                        ref={iconRef}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <CatalogOfferImageView
                            offer={offer}
                            previewImage={purchase.previewImage}
                        />
                    </Box>
                ) },
                nft_image: { visible: false },
                product_name: { caption: productData?.name ?? '' },
                quantity: (multiplePurchaseEnabled && (quantity > 1)) ? { caption: `X ${quantity}` } : { visible: false },
                freeQuantity: (freeItems > 0) ? { caption: t('shop.bonus.items.count', '', { amount: String(freeItems) }) } : { visible: false },
                purchase_cost_box: { items: [ priceDisplayItem(templates, offer, { config, quantity }) ] },
                disclaimer: { visible: disclaimerEnabled },
                spending_disclaimer: {
                    selected: disclaimerAccepted,
                    onPointerTap: () => setAcceptedFor(disclaimerAccepted ? undefined : purchase),
                },
                raffle_container: { visible: ltdRaffleRunning },
                raffle_text: { caption: `${t('catalog.purchase.confirmation.dialog.raffling')}${'.'.repeat(dots)}` },
                cancel_button: {
                    disabled: isPurchasing,
                    onPointerTap: () => !isPurchasing && closePurchaseDialog(store),
                },
                buy_button: {
                    caption: `\${${buyCaption}}`,
                    disabled: isPurchasing || !disclaimerAccepted,
                    onPointerTap: () => !isPurchasing && disclaimerAccepted && buyFromPurchaseDialog(send, store),
                },
            }}
        />
    );
};

/**
 * Flash's `PurchaseConfirmationDialog` - one dialog, two windows: the confirmation
 * (`purchase_confirmation`) and, once a gift purchase's button is pressed (`showGiftDialog`), the
 * gift wrapping window that replaces it (`gift_wrapping`, `purchase/CatalogGiftWrappingView`).
 * Mounted by `CatalogComponent` whether the catalogue window shows or not: a drop into the room
 * opens it while the catalogue is hidden, as Flash's dialog is a window of its own.
 */
export const CatalogPurchaseConfirmationView = () => {
    const activePurchase = useCatalogStore(x => x.activePurchase);
    const purchaseDialogView = useCatalogStore(x => x.purchaseDialogView);

    if (!activePurchase) return null;

    if (purchaseDialogView === 'gift') return <CatalogGiftWrappingView purchase={activePurchase} />;

    return <CatalogPurchaseConfirmationDialogView purchase={activePurchase} />;
};
