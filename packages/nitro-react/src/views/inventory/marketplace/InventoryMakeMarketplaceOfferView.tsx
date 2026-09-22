import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { makeMarketplaceOffer, releaseMarketplaceOfferItems } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { INVENTORY_FURNI_CATEGORY_POSTER, InventoryFurniItem, useInventoryMarketplaceActions, useInventoryStore } from '#base/context/inventory';
import { useSystemStore, useTranslation } from '#base/context/system';
import { Border, Box, Button, Frame, Region, TextInput, ThemeText } from '#base/theme';
import { calculateMarketplaceFinalPrice } from '#base/utils';
import { useFurnitureImageTexture } from '#base/views/catalog/useFurnitureImageTexture';

/** AS3 `int(...)` over `parseInt`: what is not a number is 0. */
const toInt = (text: string) => {
    const value = parseInt(text, 10);

    return isNaN(value) ? 0 : value;
};

/** `furni_image`: the item at 64 facing 90 degrees (`getFurnitureImage` / `getWallItemImage`), centred in its 70x70 bitmap. */
const OfferItemImage = ({ item }: { item: InventoryFurniItem }) => {
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const furniData = (item.isWallItem ? wallItems : floorItems)[item.typeId];
    const { texture, width, height } = useFurnitureImageTexture(furniData?.className, furniData?.colorIndex ?? 0, 2, RoomGeometryScaleType.ZoomedIn, item.isWallItem ? 0 : item.extra);

    if (!texture) return null;

    return (
        <pixiSprite
            texture={texture}
            width={width}
            height={height}
            layout={{}}
        />
    );
};

interface InventoryMakeMarketplaceOfferViewProps {
    item: InventoryFurniItem;
    maxAmount: number;
}

/**
 * `make_marketplace_offer` - Flash's `MarketplaceView.showMakeOffer` (300x429, style 3 frame in
 * `0x418db0`, margins 6/30/6/6): the item's picture in a 70x70 style 105 border, its name
 * (`u_headline_medium`; a poster by its poster id), the expiry (`expiration_info_days`, the
 * configuration's hours in days), the price and amount fields (digits only, right-aligned
 * `u_headline_small` labels; `sellinmarketplace.amount` names the most that can go in one offer),
 * then - collapsing when absent, as Flash's item list skips hidden rows - the average, lowest and
 * suggested prices from the item's stats with `copy suggested price`, the revenue box and the two
 * buttons.
 *
 * `checkPrice` runs on every change of either field: a price above the maximum becomes the
 * maximum, the amount is kept between 1 and the maximum amount, and the revenue box shows
 * `sell.in.marketplace.revenue.label` with what the seller gets (`calculateFinalPrice`) - or,
 * under the minimum, `shop.marketplace.invalid.price` with the post button disabled. Posting asks
 * for confirmation (`inventory.marketplace.confirm_offer.*`, the `.multiple` text for more than
 * one item) and closes the dialog; the confirmation's OK makes the offer (`makeOffer`), and every
 * way out releases the locked items.
 *
 * The limited item preview plaque and the rarity flag are window widgets this client has not
 * ported. The furni's description (`furni_desc`) is set but the layout keeps it hidden.
 */
export const InventoryMakeMarketplaceOfferView = ({ item, maxAmount }: InventoryMakeMarketplaceOfferViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const configuration = useInventoryStore(x => x.marketplaceConfiguration);
    const stats = useInventoryStore(x => x.marketplaceViewStats);
    const showConfirm = useSystemStore(x => x.showConfirm);
    const { setMarketplaceView } = useInventoryMarketplaceActions();
    const [ priceText, setPriceText ] = useState('');
    const [ amountText, setAmountText ] = useState('1');

    const posterId = item.stuffData.getLegacyString();
    const isPoster = (item.category === INVENTORY_FURNI_CATEGORY_POSTER);
    // `_furniName`: `<wall|room>Item.name.<type>`, or a poster's `poster_<id>_name`.
    const furniName = t(isPoster ? `poster_${posterId}_name` : `${item.isWallItem ? 'wallItem' : 'roomItem'}.name.${item.typeId}`);

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

    const close = () => {
        releaseMarketplaceOfferItems();
        setMarketplaceView(undefined);
    };

    // `make_offer_button` -> `showConfirmation`.
    const post = () => {
        const offerPrice = toInt(priceText);
        const amount = parseOfferAmount(amountText);
        const finalPrice = calculateMarketplaceFinalPrice(offerPrice, configuration.sellingFeePercentage, configuration.halfTaxLimit);
        const key = (amount > 1) ? 'inventory.marketplace.confirm_offer.info.multiple' : 'inventory.marketplace.confirm_offer.info';
        const text = (amount > 1)
            ? t(key, key, { amount: String(amount), furniname: furniName, price: String(offerPrice), total: String(finalPrice * amount) })
            : t(key, key, { furniname: furniName, price: String(finalPrice) });

        showConfirm(t('inventory.marketplace.confirm_offer.title', 'inventory.marketplace.confirm_offer.title'), text, () => {
            makeMarketplaceOffer(send, offerPrice, amount);
            releaseMarketplaceOfferItems();
        }, { onCancel: releaseMarketplaceOfferItems });

        setMarketplaceView(undefined);
    };

    const copySuggestedPrice = () => {
        if (!stats || (stats.suggestedPrice <= 0)) return;

        const suggested = String(stats.suggestedPrice);

        void navigator.clipboard?.writeText(suggested).catch(() => undefined);
        checkPrice(suggested, amountText);
    };

    // `updatePriceStatLine`: a line only for a value above 0.
    const statLines = stats
        ? [
                { name: 'average_price', value: stats.averagePrice, text: t('inventory.marketplace.make_offer.average_price', '', { days: String(configuration.averagePricePeriod), price: String(stats.averagePrice) }) },
                { name: 'lowest_price', value: stats.lowestCurrentPrice, text: t('inventory.marketplace.make_offer.lowest_price', '', { price: String(stats.lowestCurrentPrice) }) },
                { name: 'suggested_price', value: stats.suggestedPrice, text: t('inventory.marketplace.make_offer.suggested_price', '', { price: String(stats.suggestedPrice) }) },
            ].filter(line => line.value > 0)
        : [];

    return (
        <Frame
            id="inventory-make-marketplace-offer"
            variant="3"
            centered
            rememberPosition={false}
            caption={t('inventory.marketplace.make_offer.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            margins={[ 6, 30, 6, 6 ]}
            onClose={close}
            layout={{ position: 'absolute', width: 300, height: 429 }}
        >
            <Border
                variant="105"
                name="image_border"
                layout={{ position: 'absolute', left: 10, width: 70, top: 12, height: 70, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}
            >
                <OfferItemImage item={item} />
            </Border>
            <ThemeText
                name="furni_name"
                text={furniName}
                textStyle="u_headline_medium"
                textOptions={{ wordWrap: true, wordWrapWidth: 186 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 88, width: 190, top: 13 }}
            />
            <ThemeText
                name="expiration_info"
                text={t('inventory.marketplace.make_offer.expiration_info_days', '', { days: String(configuration.expirationHours / 24) })}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, width: 268, top: 87 }}
            />
            <Region layout={{ position: 'absolute', left: -86, width: 295, top: 131, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <ThemeText
                    name="price_request"
                    text={t('inventory.marketplace.make_offer.price_request')}
                    textStyle="u_headline_small"
                    verticalAlign="top"
                />
            </Region>
            <Border
                variant="105"
                name="input_border"
                layout={{ position: 'absolute', left: 212, width: 66, top: 129, height: 26 }}
            >
                <TextInput
                    value={priceText}
                    onChange={value => checkPrice(value, amountText)}
                    restrict="0-9"
                    textStyle="u_regular"
                    flashPlacement
                    alwaysShowSelection
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    layout={{ position: 'absolute', left: 8, width: 50, top: 3, height: 19 }}
                />
            </Border>
            <Region layout={{ position: 'absolute', left: -86, width: 295, top: 160, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <ThemeText
                    name="amount_request"
                    text={t('sellinmarketplace.amount', '', { max_amount: String(maxAmount) })}
                    textStyle="u_headline_small"
                    verticalAlign="top"
                />
            </Region>
            <Border
                variant="105"
                name="amount_input_border"
                layout={{ position: 'absolute', left: 212, width: 66, top: 158, height: 26 }}
            >
                <TextInput
                    value={amountText}
                    onChange={value => checkPrice(priceText, value)}
                    restrict="0-9"
                    textStyle="u_regular"
                    flashPlacement
                    alwaysShowSelection
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    layout={{ position: 'absolute', left: 8, width: 50, top: 3, height: 19 }}
                />
            </Border>
            <Box layout={{ position: 'absolute', left: 10, width: 268, top: 190, flexDirection: 'column', gap: 7 }}>
                {statLines.map(line => (
                    <ThemeText
                        key={line.name}
                        name={line.name}
                        text={line.text}
                        textStyle="u_regular"
                        verticalAlign="top"
                        layout={{ width: 268, height: 18, flexShrink: 0 }}
                    />
                ))}
                {stats && (stats.suggestedPrice > 0) && (
                    <Box layout={{ width: 268, height: 24, flexShrink: 0 }}>
                        <Button
                            variant="3"
                            name="copy_suggested_price_button"
                            textStyle="button_shiny_regular"
                            onPointerTap={copySuggestedPrice}
                            layout={{ position: 'absolute', left: 130, width: 138, top: 0, height: 24 }}
                        >
                            {t('inventory.marketplace.make_offer.copy_suggested_price')}
                        </Button>
                    </Box>
                )}
                <Border
                    variant="105"
                    name="final_price_border"
                    layout={{ width: 268, height: 54, flexShrink: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: 6, width: 257, top: 11, flexDirection: 'row', justifyContent: 'center' }}>
                        <ThemeText
                            name="final_price"
                            text={finalPriceText}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 253, align: 'center' }}
                            verticalAlign="top"
                        />
                    </Region>
                </Border>
                <Region
                    name="buttons"
                    layout={{ width: 270, height: 30, flexShrink: 0 }}
                >
                    <Button
                        variant="3"
                        name="cancel_make_offer_button"
                        textStyle="button_shiny_regular"
                        onPointerTap={close}
                        layout={{ position: 'absolute', left: 138, width: 130, top: 0, height: 28 }}
                    >
                        {t('inventory.marketplace.make_offer.cancel')}
                    </Button>
                    <Button
                        variant="3"
                        name="make_offer_button"
                        textStyle="button_shiny_regular"
                        disabled={!priceValid}
                        onPointerTap={post}
                        layout={{ position: 'absolute', left: 0, width: 130, top: 0, height: 28 }}
                    >
                        {t('inventory.marketplace.make_offer.post')}
                    </Button>
                </Region>
            </Box>
        </Frame>
    );
};
