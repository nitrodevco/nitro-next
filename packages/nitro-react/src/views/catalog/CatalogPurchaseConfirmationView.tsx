import { CatalogTypeEnum } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { buyFromPurchaseDialog, closePurchaseDialog } from '#base/commands';
import { CatalogPurchaseRequest, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { Border, Box, Button, ButtonThick, CheckBox, Frame, LayoutImage, ReflectResize, Region, ThemeImage, ThemeText } from '#base/theme';
import { calculateBundlePrice, getDiscountItemsCount } from '#base/utils';

import { CatalogCurrencyIcon } from './CatalogCurrencyIcon';
import { CatalogOfferImageView } from './CatalogOfferImageView';
import { CatalogGiftWrappingView } from './purchase/CatalogGiftWrappingView';

/** The `content` itemlist's height in the layout; the frame grows by what the list grows past it. */
const CONTENT_TEMPLATE_HEIGHT = 294;

/** `onRaffleTimerTick`: a dot more every 150ms, back to one after 14. */
const RAFFLE_TICK_MS = 150;
const RAFFLE_MAX_DOTS = 14;

/**
 * `raffle_container` while `ltdRaffleStarted` runs (`updateDots`): the raffling text with its dots,
 * in the etched border, and the limited edition tile beside it.
 */
const CatalogPurchaseRaffleView = () => {
    const [ dots, setDots ] = useState(1);
    const t = useTranslation();

    useEffect(() => {
        const timer = setInterval(() => setDots(value => ((value >= RAFFLE_MAX_DOTS) ? 1 : (value + 1))), RAFFLE_TICK_MS);

        return () => clearInterval(timer);
    }, []);

    return (
        <Region
            name="raffle_container"
            layout={{ width: 304, height: 49, marginLeft: 9, flexShrink: 0 }}
        >
            <Border
                variant="4"
                tintColor="#ebf9fc"
                layout={{ position: 'absolute', left: 0, width: 304, top: 0, height: 49 }}
            >
                <ThemeText
                    name="raffle_text"
                    text={`${t('catalog.purchase.confirmation.dialog.raffling')}${'.'.repeat(dots)}`}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 229 }}
                    flashFormat={{ etchingPosition: 'left' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 233, top: 9 }}
                />
            </Border>
            <ThemeImage
                src={LayoutImage('shared/unique_item_large_tile_upright.png')}
                bitmap={{ stretchedX: false, stretchedY: false }}
                layout={{ position: 'absolute', left: 260, width: 34, top: 6, height: 37 }}
            />
        </Region>
    );
};

/**
 * `PurchaseConfirmationDialog.showConfirmationDialog` on `purchase_confirmation.xml`: the product
 * picture in its bordered box, the product's name (`getProductData(localizationId).name`), the
 * quantity when `catalog.multiple.purchase.enabled` and more than one, the bonus items the bundle
 * discount adds (`freeQuantity`, `shop.bonus.items.count`), the price
 * (`HabboCatalogUtils.showPriceInContainer`: a `price_display` of `amount_N` - the price times the
 * quantity, `+ ` before the second - and the big currency icon `unit_N`, credits then activity
 * points then silver), then the rows of the `content` list: the credit spending disclaimer while
 * `disclaimer.credit_spending.enabled` (its checkbox enables the buy button), the limited edition
 * raffle while it runs, and the buttons.
 *
 * The list is `reflect_vertical_resize_to_parent`, so the window grows or shrinks by what the list
 * differs from its 294px: 253px high with neither the disclaimer nor the raffle.
 *
 * The buy button reads "rent" for a rent offer (`RentUtils.updateBuyCaption`) and "gift" for a
 * purchase turned into gifting (`turnIntoGifting`, which also sets the window's gift title); it and
 * the cancel button lock once pressed (`onBuyButtonClick`), until the dialog closes. The `nft_image`
 * widget is for NFT store offers, which have a window of their own.
 */
const CatalogPurchaseConfirmationDialogView = ({ purchase }: { purchase: CatalogPurchaseRequest }) => {
    const isPurchasing = useCatalogStore(x => x.isPurchasing);
    const catalogType = useCatalogStore(x => x.catalogType);
    const ltdRaffleRunning = useCatalogStore(x => x.ltdRaffleRunning);
    const bundleDiscountRuleset = useCatalogStore(x => x.bundleDiscountRuleset);
    const productData = useSystemStore(x => x.productData[purchase.offer.localizationId]);
    const multiplePurchaseEnabled = (useConfigValue<boolean>('catalog.multiple.purchase.enabled') === true) && (catalogType !== CatalogTypeEnum.BuildersClub);
    const disclaimerEnabled = (useConfigValue<boolean>('disclaimer.credit_spending.enabled') === true);
    // `setDisclaimerAccepted`: accepted for the purchase on show only - a new offer starts unticked.
    const [ acceptedFor, setAcceptedFor ] = useState<CatalogPurchaseRequest | undefined>(undefined);
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    const { offer, quantity, asGift } = purchase;
    const disclaimerAccepted = !disclaimerEnabled || (acceptedFor === purchase);
    // `bundleDiscountEnabled` (not in the builders club) -> `getDiscountItemsCount(quantity)`.
    const freeItems = (catalogType !== CatalogTypeEnum.BuildersClub) ? getDiscountItemsCount(bundleDiscountRuleset, quantity) : 0;

    // `HabboCatalogUtils.getPriceArray`: credits, activity points, silver; `{ 0, credits }` when free.
    const prices: { amount: number; unit: number }[] = [];

    if (offer.priceInCredits > 0) prices.push({ amount: calculateBundlePrice(offer.bundlePurchaseAllowed, offer.priceInCredits, quantity), unit: -1 });
    if (offer.priceInActivityPoints > 0) prices.push({ amount: calculateBundlePrice(offer.bundlePurchaseAllowed, offer.priceInActivityPoints, quantity), unit: offer.activityPointType });
    if (offer.priceInSilver > 0) prices.push({ amount: offer.priceInSilver, unit: 1000 });
    if (!prices.length) prices.push({ amount: 0, unit: -1 });

    const buyCaption = asGift ? 'catalog.purchase_confirmation.gift' : (offer.isRentOffer ? 'catalog.purchase_confirmation.rent' : 'catalog.purchase_confirmation.buy');

    return (
        <Frame
            id="catalog-purchase-confirmation"
            variant="3"
            centered
            rememberPosition={false}
            caption={t(asGift ? 'catalog.purchase_confirmation.gift.title' : 'catalog.purchase_confirmation.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            margins={[ 1, 25, 1, 5 ]}
            onClose={() => closePurchaseDialog(store)}
            layout={{ position: 'absolute', width: 325, height: 339, minWidth: 275, minHeight: 150 }}
        >
            <ReflectResize
                height={CONTENT_TEMPLATE_HEIGHT}
                layout={{ position: 'absolute', left: 0, width: 323, top: 8, flexDirection: 'column', gap: 10 }}
            >
                <Region
                    name="content"
                    layout={{ width: 323, height: 171, flexShrink: 0 }}
                >
                    <Border
                        variant="0"
                        tintColor="#f1f1f1"
                        layout={{ position: 'absolute', left: 10, width: 126, top: 12, height: 152, overflow: 'hidden' }}
                    >
                        {/* `product_image`: `setImage` draws the picture centred in the 126x152 bitmap. */}
                        <Region
                            name="product_image"
                            layout={{ position: 'absolute', left: 1, width: 126, top: 1, height: 152, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <CatalogOfferImageView
                                offer={offer}
                                previewImage={purchase.previewImage}
                            />
                        </Region>
                    </Border>
                    <Region
                        name="properties_itemlist"
                        layout={{ position: 'absolute', left: 143, width: 176, top: 8, flexDirection: 'column', gap: 7 }}
                    >
                        <ThemeText
                            name="product_name"
                            text={productData?.name ?? ''}
                            textStyle="u_bold"
                            textOptions={{ fontSize: 14, wordWrap: true, wordWrapWidth: 173 }}
                            verticalAlign="top"
                            layout={{ width: 177, flexShrink: 0 }}
                        />
                        {multiplePurchaseEnabled && (quantity > 1) && (
                            <ThemeText
                                name="quantity"
                                text={`X ${quantity}`}
                                textStyle="u_bold"
                                textOptions={{ fontSize: 14 }}
                                verticalAlign="top"
                                layout={{ flexShrink: 0 }}
                            />
                        )}
                        {(freeItems > 0) && (
                            <ThemeText
                                name="freeQuantity"
                                text={t('shop.bonus.items.count', '', { amount: String(freeItems) })}
                                textStyle="u_bold"
                                textOptions={{ fontSize: 14 }}
                                verticalAlign="top"
                                layout={{ flexShrink: 0 }}
                            />
                        )}
                        <Region layout={{ flexDirection: 'row', flexShrink: 0 }}>
                            <ThemeText
                                text={t('catalog.purchase.confirmation.dialog.cost')}
                                textStyle="u_regular"
                                textOptions={{ fontSize: 14 }}
                                verticalAlign="top"
                                layout={{ marginTop: 1, flexShrink: 0 }}
                            />
                            <Region
                                name="purchase_cost_box"
                                layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1, flexShrink: 0 }}
                            >
                                <Box layout={{ width: 1, height: 1 }} />
                                {prices.map((price, index) => (
                                    <Box
                                        key={index}
                                        layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
                                    >
                                        <ThemeText
                                            name={`amount_${index}`}
                                            text={`${(index > 0) ? '+ ' : ''}${price.amount}`}
                                            textStyle="u_bold"
                                            textOptions={{ fontSize: 14 }}
                                            verticalAlign="top"
                                            layout={{ marginTop: 1 }}
                                        />
                                        <CatalogCurrencyIcon
                                            type={price.unit}
                                            big
                                        />
                                    </Box>
                                ))}
                                <Box layout={{ width: 2, height: 1 }} />
                            </Region>
                        </Region>
                    </Region>
                </Region>
                {disclaimerEnabled && (
                    <Region
                        name="disclaimer"
                        layout={{ width: 311, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={t('disclaimer.credit_spending')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 274 }}
                            verticalAlign="top"
                            layout={{ marginLeft: 33, width: 278 }}
                        />
                        <CheckBox
                            variant="3"
                            name="spending_disclaimer"
                            selected={disclaimerAccepted}
                            onPointerTap={() => setAcceptedFor(disclaimerAccepted ? undefined : purchase)}
                            layout={{ position: 'absolute', left: 13, width: 296, top: 0, height: 16 }}
                        />
                    </Region>
                )}
                {ltdRaffleRunning && <CatalogPurchaseRaffleView />}
                <Region
                    name="buttons"
                    layout={{ height: 27, marginLeft: 13, flexDirection: 'row', gap: 76, flexShrink: 0 }}
                >
                    <Button
                        variant="3"
                        name="cancel_button"
                        disabled={isPurchasing}
                        onPointerTap={() => !isPurchasing && closePurchaseDialog(store)}
                        layout={{ width: 110, height: 27, flexShrink: 0 }}
                    >
                        {t('catalog.purchase_confirmation.cancel')}
                    </Button>
                    <ButtonThick
                        variant="5"
                        name="buy_button"
                        tintColor="#00aa00"
                        disabled={isPurchasing || !disclaimerAccepted}
                        onPointerTap={() => !isPurchasing && disclaimerAccepted && buyFromPurchaseDialog(send, store)}
                        layout={{ width: 110, height: 27, flexShrink: 0 }}
                    >
                        {t(buyCaption)}
                    </ButtonThick>
                </Region>
            </ReflectResize>
        </Frame>
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
