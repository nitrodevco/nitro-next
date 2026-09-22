/**
 * An offer's price box - `HabboCatalogUtils.showPriceOnProduct`: the `priceDisplayWidget` border
 * (style 6, at least 20x28) around `price_box_new`, which `showPriceInContainer` fills with a
 * `price_display` list (`renderPriceInContainer` / `renderPriceItem`). The product view puts it in
 * the bottom right corner of its room canvas, 6px in; the simple price widget at the top right of
 * its `fake_productimage`. The builders club draws none.
 *
 * `getPriceArray` lists the prices in order - credits (as the seasonal currency on a page that
 * accepts it as credits), activity points, silver - or a single `0` in credits when there are
 * none; each is its `amount_N` text (bold 14px `u_bold`, `+ ` before all but the first) and the big
 * currency icon `unit_N`. The two 1px / 2px `spacing` containers stay at the list's ends and the
 * list puts 1px between its items. `price_display` has room for two prices, as in Flash.
 *
 * The border takes the price's colour: gold without activity points, the duckets' blue or the
 * points' green (a seasonal currency's preset border colour) without credits, silver's grey with
 * silver; an offer with both credits and points keeps the skin's own colour.
 */
import { IPurchasableOffer } from '@nitrodevco/nitro-api';

import { useConfigData } from '#base/context/system';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';
import { calculateBundlePrice, getSeasonalCurrencyActivityPointType } from '#base/utils';

import { CatalogCurrencyIcon } from '../../CatalogCurrencyIcon';

/** `HabboCatalogUtils.DEFAULT_ACTIVITY_POINTS_PRICE_COLOR`. */
const DEFAULT_ACTIVITY_POINTS_PRICE_COLOR = 0x89d3c8;
/** `showPriceOnProduct`'s border colours. */
const PRICE_COLOR_NO_ACTIVITY_POINTS = 0xe4c47d;
const PRICE_COLOR_DUCKETS = 0xabc5d7;
const PRICE_COLOR_SILVER = 0xf0f0f0;
/** `priceDisplayWidget`'s `height`; its `height_min` is 28. */
const PRICE_BOX_HEIGHT = 29;
/** Silver and emerald as `getPriceArray` names them. */
const UNIT_SILVER = 1000;

interface PriceItem {
    amount: number;
    unit: number;
}

/** A hotel variable as the text `getProperty` returns, empty when it is not set. */
const configText = (value: unknown): string => (((typeof value === 'string') || (typeof value === 'number') || (typeof value === 'boolean')) ? String(value) : '');

/** `HabboCatalogUtils.getPriceArray(offer, quantity, seasonal)`. */
const getPriceArray = (offer: IPurchasableOffer, quantity: number, seasonal: boolean, config: Record<string, unknown>): PriceItem[] => {
    const prices: PriceItem[] = [];

    if (offer.priceInCredits > 0) prices.push({ amount: calculateBundlePrice(offer.bundlePurchaseAllowed, offer.priceInCredits, quantity), unit: seasonal ? getSeasonalCurrencyActivityPointType(config) : -1 });

    if (offer.priceInActivityPoints > 0) prices.push({ amount: calculateBundlePrice(offer.bundlePurchaseAllowed, offer.priceInActivityPoints, quantity), unit: offer.activityPointType });

    if (offer.priceInSilver > 0) prices.push({ amount: offer.priceInSilver, unit: UNIT_SILVER });

    if (!prices.length) prices.push({ amount: 0, unit: -1 });

    return prices;
};

/** `HabboCatalogUtils.getSeasonalCurrencyPriceColor`: the preset border colour of the currency the hotel names for the type. */
const getSeasonalCurrencyPriceColor = (type: number, config: Record<string, unknown>): number => {
    if ((type < 101) || (type > 105)) return DEFAULT_ACTIVITY_POINTS_PRICE_COLOR;

    const currency = configText(config[`seasonalcurrency.id.${type}`]);

    if (currency === '') return DEFAULT_ACTIVITY_POINTS_PRICE_COLOR;

    const color = configText(config[`seasonalcurrency.${currency}.color`]);

    if (color === '') return DEFAULT_ACTIVITY_POINTS_PRICE_COLOR;

    // `ColorConverter.hexToUint` of the preset: `#rrggbb` read as hex, 0 when it is not one.
    const border = parseInt(configText(config[`seasonalcurrency.preset.${color}.border`]).replace('#', ''), 16);

    return isNaN(border) ? 0 : border;
};

/** The colour `showPriceOnProduct` gives the box, or `undefined` for the skin's own. */
const getPriceBoxColor = (offer: IPurchasableOffer, config: Record<string, unknown>): number | undefined => {
    let color: number | undefined = undefined;

    if (offer.priceInActivityPoints === 0) color = PRICE_COLOR_NO_ACTIVITY_POINTS;

    if (offer.priceInCredits === 0) {
        if (offer.activityPointType === 0) color = PRICE_COLOR_DUCKETS;
        else if ((offer.activityPointType >= 101) && (offer.activityPointType <= 105)) color = getSeasonalCurrencyPriceColor(offer.activityPointType, config);
        else color = DEFAULT_ACTIVITY_POINTS_PRICE_COLOR;
    }

    if (offer.priceInSilver > 0) color = PRICE_COLOR_SILVER;

    return color;
};

export interface CatalogPriceDisplayViewProps {
    offer: IPurchasableOffer;
    quantity?: number;
    /** `showPriceInContainer`'s fourth argument: credits are shown as the seasonal currency. */
    seasonal?: boolean;
    /** Its fifth: the seasonal currency's `.combo` icon, 53px wide. */
    combo?: boolean;
}

/** The `price_display` list itself - `showPriceInContainer` into a container. */
export const CatalogPriceDisplayView = ({ offer, quantity = 1, seasonal = false, combo = false }: CatalogPriceDisplayViewProps) => {
    const config = useConfigData();
    const prices = getPriceArray(offer, quantity, seasonal, config).slice(0, 2);

    return (
        <Region
            name="price_box"
            layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1, height: 21 }}
        >
            <Region
                name="spacing"
                layout={{ width: 1, height: 1, flexShrink: 0 }}
            />
            {prices.map((price, index) => [
                <ThemeText
                    key={`amount_${index}`}
                    name={`amount_${index}`}
                    text={`${(index > 0) ? '+ ' : ''}${price.amount}`}
                    textStyle="u_bold"
                    textOptions={{ fontSize: 14 }}
                    verticalAlign="top"
                    layout={{ marginTop: 1, flexShrink: 0 }}
                />,
                <CatalogCurrencyIcon
                    key={`unit_${index}`}
                    type={price.unit}
                    big
                    combo={combo}
                    layout={{ flexShrink: 0 }}
                />,
            ])}
            <Region
                name="spacing"
                layout={{ width: 2, height: 1, flexShrink: 0 }}
            />
        </Region>
    );
};

export interface CatalogProductPriceViewProps extends CatalogPriceDisplayViewProps {
    /** Where the box sits: its right or left edge and its top or bottom, as `showPriceOnProduct` works them out. */
    layout: BoxLayout;
}

/** The `priceDisplayWidget` box `showPriceOnProduct` adds: 3px either side of `price_box_new`, which sits 4px down. */
export const CatalogProductPriceView = ({ offer, quantity, seasonal, combo, layout }: CatalogProductPriceViewProps) => {
    const config = useConfigData();
    const color = getPriceBoxColor(offer, config);

    return (
        <Border
            variant="6"
            tintColor={(color === undefined) ? undefined : `#${color.toString(16).padStart(6, '0')}`}
            layout={{ position: 'absolute', minWidth: 20, height: PRICE_BOX_HEIGHT, flexDirection: 'row', alignItems: 'flex-start', ...layout }}
        >
            <Region layout={{ width: 3, height: 10, marginTop: 4, flexShrink: 0 }} />
            <Region
                name="price_box_new"
                layout={{ marginTop: 4, flexShrink: 0 }}
            >
                <CatalogPriceDisplayView
                    offer={offer}
                    quantity={quantity}
                    seasonal={seasonal}
                    combo={combo}
                />
            </Region>
            <Region layout={{ width: 3, height: 10, marginTop: 4, flexShrink: 0 }} />
        </Border>
    );
};
