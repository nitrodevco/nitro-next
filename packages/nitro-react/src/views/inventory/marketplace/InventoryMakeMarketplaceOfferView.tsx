import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { makeMarketplaceOffer, releaseMarketplaceOfferItems } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { INVENTORY_FURNI_CATEGORY_POSTER, InventoryFurniItem, useInventoryMarketplaceActions, useInventoryStore } from '#base/context/inventory';
import { useSystemStore, useTranslation } from '#base/context/system';
import { useFurnitureImageTexture } from '#base/hooks';
import { Box, TemplateBindings, TemplateWindow } from '#base/theme';
import { calculateMarketplaceFinalPrice } from '#base/utils';
import { LimitedItemPreviewOverlayView } from '#base/views/shared/LimitedItemPreviewOverlayView';
import { RarityItemGridOverlayView } from '#base/views/shared/RarityItemGridOverlayView';

/** `furni_image`'s size in the layout: the bitmap `setFurniImage` draws the picture into. */
const FURNI_IMAGE_SIZE = 70;

/** AS3 `int(parseInt(...))`: what is not a number is 0. */
const toInt = (text: string) => {
    const value = parseInt(text, 10);

    return isNaN(value) ? 0 : value;
};

/**
 * `setFurniImage`: the item at 64 facing 90 degrees (`getFurnitureImage` / `getWallItemImage`),
 * drawn into a new bitmap of `furni_image`'s size at `int((size - image size) * 0.5)` - centred, and
 * cut to that bitmap.
 */
const OfferItemImage = ({ item }: { item: InventoryFurniItem }) => {
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const furniData = (item.isWallItem ? wallItems : floorItems)[item.typeId];
    const { texture, width, height } = useFurnitureImageTexture(furniData?.className, furniData?.colorIndex ?? 0, 2, RoomGeometryScaleType.ZoomedIn, item.isWallItem ? 0 : item.extra);

    if (!texture) return null;

    return (
        <Box
            pointerTransparent
            layout={{ position: 'absolute', left: 0, top: 0, width: FURNI_IMAGE_SIZE, height: FURNI_IMAGE_SIZE, overflow: 'hidden' }}
        >
            <pixiSprite
                texture={texture}
                eventMode="none"
                layout={{ position: 'absolute', left: Math.trunc((FURNI_IMAGE_SIZE - width) * 0.5), top: Math.trunc((FURNI_IMAGE_SIZE - height) * 0.5), width, height }}
            />
        </Box>
    );
};

interface InventoryMakeMarketplaceOfferViewProps {
    item: InventoryFurniItem;
    maxAmount: number;
}

/**
 * Flash's `MarketplaceView.showMakeOffer` on `habbo-inventory-com/make_marketplace_offer_xml`,
 * built and centred (`center()`): the item's picture (`setFurniImage`), its name and description
 * (`${<wall|room>Item.name|desc.<type>}`, a poster's `${poster_<id>_name|desc}`; the layout keeps
 * the description hidden), the expiry (`expiration_info_days`, the configuration's hours in days),
 * `sellinmarketplace.amount` naming the most that can go in one offer, and the two inputs taking
 * digits only. A limited item shows its plaque (`unique_item_overlay_widget`,
 * `limited_item_overlay_preview`) and an item with a rarity level its rarity plaque
 * (`rarity_item_overlay_widget`).
 *
 * `resetPriceStats` hides the three price lines until `updateItemStats` brings the item's stats:
 * each line then shows only for a value above 0 (`updatePriceStatLine`), and `copy suggested
 * price` only for a suggested price above 0 - before the stats it shows as the layout has it,
 * and does nothing.
 *
 * `checkPrice` runs on every change of either field: a price above the maximum becomes the
 * maximum, the amount is kept between 1 and the maximum amount (`parseOfferAmount`), and
 * `final_price` shows `sell.in.marketplace.revenue.label` with what the seller gets
 * (`calculateFinalPrice`) - or, under the minimum, `shop.marketplace.invalid.price` with the post
 * button disabled. Posting asks for confirmation (`showConfirmation`: `inventory.marketplace.confirm_offer.*`,
 * the `.multiple` text for more than one item) and closes the window; the confirmation's OK makes
 * the offer (`makeOffer`), and every way out releases the locked items (`releaseItems`).
 */
export const InventoryMakeMarketplaceOfferView = ({ item, maxAmount }: InventoryMakeMarketplaceOfferViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const configuration = useInventoryStore(x => x.marketplaceConfiguration);
    const stats = useInventoryStore(x => x.marketplaceViewStats);
    const showConfirm = useSystemStore(x => x.showConfirm);
    const { setMarketplaceView } = useInventoryMarketplaceActions();
    const [ priceText, setPriceText ] = useState('');
    // `showMakeOffer`: `amount_input.text = _offerAmount` (1).
    const [ amountText, setAmountText ] = useState('1');

    /** `clickHandler`'s `cancel_make_offer_button` / `header_button_close`: `releaseItems`, then `disposeView`. */
    const close = () => {
        releaseMarketplaceOfferItems();
        setMarketplaceView(undefined);
    };

    const [ frame ] = useState(() => ({ id: 'inventory-make-marketplace-offer', centered: true, rememberPosition: false, onClose: close }));

    const legacyString = item.stuffData.getLegacyString();
    const isPoster = (item.category === INVENTORY_FURNI_CATEGORY_POSTER);
    const nameKey = isPoster ? `poster_${legacyString}_name` : `${item.isWallItem ? 'wallItem' : 'roomItem'}.name.${item.typeId}`;
    const descKey = isPoster ? `poster_${legacyString}_desc` : `${item.isWallItem ? 'wallItem' : 'roomItem'}.desc.${item.typeId}`;
    // `_furniName`: `getLocalization(name key)`, for the confirmation.
    const furniName = t(nameKey);

    // `parseOfferAmount`: 1 to `_maxOfferAmount`, written back into the field.
    const parseOfferAmount = (text: string) => Math.min(maxAmount, Math.max(1, toInt(text)));

    /** `checkPrice`, over what the fields would hold after this change. */
    const checkPrice = (nextPrice: string, nextAmount: string) => {
        let price = nextPrice;

        if (toInt(price) > configuration.offerMaxPrice) price = String(configuration.offerMaxPrice);

        setPriceText(price);
        setAmountText(String(parseOfferAmount(nextAmount)));
    };

    const price = toInt(priceText);
    const priceValid = (price >= configuration.offerMinPrice);
    const finalPriceText = priceValid
        ? `${t('sell.in.marketplace.revenue.label')}: ${calculateMarketplaceFinalPrice(price, configuration.sellingFeePercentage, configuration.halfTaxLimit)}`
        : t('shop.marketplace.invalid.price', '', { minPrice: String(configuration.offerMinPrice), maxPrice: String(configuration.offerMaxPrice) });

    // `make_offer_button`: the price and amount read, `showConfirmation`, then `disposeView`.
    const post = () => {
        const offerPrice = toInt(priceText);
        const amount = parseOfferAmount(amountText);
        const finalPrice = calculateMarketplaceFinalPrice(offerPrice, configuration.sellingFeePercentage, configuration.halfTaxLimit);
        const key = (amount > 1) ? 'inventory.marketplace.confirm_offer.info.multiple' : 'inventory.marketplace.confirm_offer.info';
        const text = (amount > 1)
            ? t(key, key, { amount: String(amount), furniname: furniName, price: String(offerPrice), total: String(finalPrice * amount) })
            : t(key, key, { furniname: furniName, price: String(finalPrice) });

        // `confirmationCallback`: OK makes the offer; either way the items are released.
        showConfirm(t('inventory.marketplace.confirm_offer.title', 'inventory.marketplace.confirm_offer.title'), text, () => {
            makeMarketplaceOffer(send, offerPrice, amount);
            releaseMarketplaceOfferItems();
        }, { onCancel: releaseMarketplaceOfferItems });

        setMarketplaceView(undefined);
    };

    // `copy_suggested_price_button`: with a suggested price, into `price_input` and the clipboard (`System.setClipboard`), then `checkPrice`.
    const copySuggestedPrice = () => {
        if (!stats || (stats.suggestedPrice <= 0)) return;

        const suggested = String(stats.suggestedPrice);

        void navigator.clipboard?.writeText(suggested).catch(() => undefined);
        checkPrice(suggested, amountText);
    };

    /** `updatePriceStatLine`: shown with its text for a value above 0; hidden before the stats (`resetPriceStats`). */
    const statLine = (value: number | undefined, text: () => string) => ((value !== undefined) && (value > 0))
        ? { visible: true, caption: text() }
        : { visible: false, caption: '' };

    const isLimited = (item.stuffData.uniqueNumber > 0);
    const rarityLevel = item.stuffData.rarityLevel;

    const bindings: TemplateBindings = {
        furni_image: { children: <OfferItemImage item={item} /> },
        // `uniqueSerialNumber > 0`: the limited plaque with the serial and series size.
        unique_item_overlay_widget: isLimited
            ? {
                    visible: true,
                    children: (
                        <LimitedItemPreviewOverlayView
                            serialNumber={item.stuffData.uniqueNumber}
                            seriesSize={item.stuffData.uniqueSeries}
                        />
                    ),
                }
            : { visible: false },
        // `rarityLevel >= 0`: the rarity plaque.
        rarity_item_overlay_widget: (rarityLevel >= 0)
            ? { visible: true, children: <RarityItemGridOverlayView rarityLevel={rarityLevel} /> }
            : { visible: false },
        // `setText("furni_name" / "furni_desc", "${key}")`.
        furni_name: { caption: `\${${nameKey}}` },
        furni_desc: { caption: `\${${descKey}}` },
        // The parameters `showMakeOffer` registers before the window is built.
        expiration_info: { caption: t('inventory.marketplace.make_offer.expiration_info_days', '', { days: String(configuration.expirationHours / 24) }) },
        amount_request: { caption: t('sellinmarketplace.amount', '', { max_amount: String(maxAmount) }) },
        // `restrict = "0-9"`; `WE_CHANGE` -> `checkPrice`.
        price_input: { caption: priceText, restrict: '0-9', onChange: value => checkPrice(value, amountText) },
        amount_input: { caption: amountText, restrict: '0-9', onChange: value => checkPrice(priceText, value) },
        average_price: statLine(stats?.averagePrice, () => t('inventory.marketplace.make_offer.average_price', '', { days: String(configuration.averagePricePeriod), price: String(stats?.averagePrice) })),
        lowest_price: statLine(stats?.lowestCurrentPrice, () => t('inventory.marketplace.make_offer.lowest_price', '', { price: String(stats?.lowestCurrentPrice) })),
        suggested_price: statLine(stats?.suggestedPrice, () => t('inventory.marketplace.make_offer.suggested_price', '', { price: String(stats?.suggestedPrice) })),
        copy_suggested_price_button: { visible: stats ? (stats.suggestedPrice > 0) : true, onPointerTap: copySuggestedPrice },
        final_price: { caption: finalPriceText },
        make_offer_button: { disabled: !priceValid, onPointerTap: post },
        cancel_make_offer_button: { onPointerTap: close },
    };

    return (
        <TemplateWindow
            id="habbo-inventory-com/make_marketplace_offer_xml"
            frame={frame}
            bindings={bindings}
        />
    );
};
