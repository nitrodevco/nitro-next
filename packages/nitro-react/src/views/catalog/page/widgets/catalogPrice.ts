/**
 * An offer's price as the catalogue's code builds it from templates.
 *
 * `HabboCatalogUtils.showPriceInContainer` fills a container with a `price_display` list
 * (`renderPriceInContainer` / `renderPriceItem`): `getPriceArray` lists the prices in order -
 * credits (as the seasonal currency on a page that accepts it as credits), activity points, silver -
 * or a single `0` in credits when there are none; each is its `amount_N` text (`+ ` before all but
 * the first) and the big currency icon `unit_N`, 53px wide for a seasonal `.combo` icon. The items
 * of a price it does not have are removed, the closing `spacing` kept.
 *
 * `showPriceOnProduct` adds a `priceDisplayWidget` box with that list in its `price_box_new` to a
 * widget's window, placed against a reference window (`room_canvas_container`, or the one the
 * widget names): its right edge `dx` from the reference's, and `dy` in from its top or its bottom.
 * The box takes the price's colour: gold without activity points, the duckets' blue or the points'
 * green (a seasonal currency's preset border colour) without credits, silver's grey with silver; an
 * offer with both credits and points keeps the skin's own colour. The builders club draws none.
 */
import { IPurchasableOffer } from '@nitrodevco/nitro-api';
import { LayoutWindow, Template, TemplateBindings, TemplateItem } from '@nitrodevco/nitro-theme';

import { calculateBundlePrice, CURRENCY_TYPE_SILVER, getCurrencyIconStyle, getSeasonalCurrencyActivityPointType } from '#base/utils';

import { catalogTemplateId } from '../catalogTemplates';
import { findLayoutChild } from '../catalogWidgetView';

/** `HabboCatalogUtils.DEFAULT_ACTIVITY_POINTS_PRICE_COLOR`. */
const DEFAULT_ACTIVITY_POINTS_PRICE_COLOR = 0x89d3c8;
/** `showPriceOnProduct`'s box colours. */
const PRICE_COLOR_NO_ACTIVITY_POINTS = 0xe4c47d;
const PRICE_COLOR_DUCKETS = 0xabc5d7;
const PRICE_COLOR_SILVER = 0xf0f0f0;
/** `price_display` has room for two prices. */
const PRICE_DISPLAY_SLOTS = 2;

export interface PriceItem {
    amount: number;
    unit: number;
}

export interface CatalogPriceOptions {
    config: Record<string, unknown>;
    quantity?: number;
    /** `showPriceInContainer`'s fourth argument: credits are shown as the seasonal currency. */
    seasonal?: boolean;
    /** Its fifth: the seasonal currency's `.combo` icon, 53px wide. */
    combo?: boolean;
}

/** A hotel variable as the text `getProperty` returns, empty when it is not set. */
const configText = (value: unknown): string => (((typeof value === 'string') || (typeof value === 'number') || (typeof value === 'boolean')) ? String(value) : '');

/** `HabboCatalogUtils.getPriceArray(offer, quantity, seasonal)`. */
export const getPriceArray = (offer: IPurchasableOffer, quantity: number, seasonal: boolean, config: Record<string, unknown>): PriceItem[] => {
    const prices: PriceItem[] = [];

    if (offer.priceInCredits > 0) prices.push({ amount: calculateBundlePrice(offer.bundlePurchaseAllowed, offer.priceInCredits, quantity), unit: seasonal ? getSeasonalCurrencyActivityPointType(config) : -1 });

    if (offer.priceInActivityPoints > 0) prices.push({ amount: calculateBundlePrice(offer.bundlePurchaseAllowed, offer.priceInActivityPoints, quantity), unit: offer.activityPointType });

    if (offer.priceInSilver > 0) prices.push({ amount: offer.priceInSilver, unit: CURRENCY_TYPE_SILVER });

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
export const getPriceBoxColor = (offer: IPurchasableOffer, config: Record<string, unknown>): number | undefined => {
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

/** `renderPriceInContainer`'s bindings of a `price_display` list for prices. */
export const priceDisplayBindings = (prices: readonly PriceItem[], config: Record<string, unknown>, combo = false, hideAmounts = false): TemplateBindings => {
    const bindings: TemplateBindings = {};

    for (let index = 0; index < PRICE_DISPLAY_SLOTS; index++) {
        const price = prices[index];

        if (!price) {
            bindings[`amount_${index}`] = { visible: false };
            bindings[`unit_${index}`] = { visible: false };
            continue;
        }

        bindings[`amount_${index}`] = { caption: hideAmounts ? '' : `${(index > 0) ? '+ ' : ''}${price.amount}` };
        bindings[`unit_${index}`] = { style: String(getCurrencyIconStyle(price.unit, config, true, combo)) };
    }

    return bindings;
};

/** `showPriceInContainer(container, offer, quantity, seasonal, combo)`: the `price_display` clone a container gets. */
export const priceDisplayItem = (templates: Record<string, Template>, offer: IPurchasableOffer, options: CatalogPriceOptions, key = 'price_display'): TemplateItem => {
    const { config, quantity = 1, seasonal = false, combo = false } = options;
    const prices = getPriceArray(offer, quantity, seasonal, config).slice(0, PRICE_DISPLAY_SLOTS);

    return {
        key,
        from: templates[catalogTemplateId('price_display')],
        bindings: priceDisplayBindings(prices, config, combo),
        arrange: (seasonal && combo)
            ? ({ find }) => {
                    for (let index = 0; index < prices.length; index++) find(`unit_${index}`)?.setWidth(53);
                }
            : undefined,
    };
};

export interface PriceBoxPlacement {
    /** The window the box is placed against when the widget has no `room_canvas_container`. */
    reference?: string;
    /** `param5`: the box's right edge from the reference's. */
    dx: number;
    /** `param6`: measured from the reference's top, not its bottom. */
    top: boolean;
    /** `param7`: in from that edge. */
    dy: number;
}

/** The reference `showPriceOnProduct` places against: the widget's `room_canvas_container`, else the one it names. */
const findReference = (widget: LayoutWindow, name: string | undefined) => findLayoutChild(widget, 'room_canvas_container') ?? (name ? findLayoutChild(widget, name) : undefined);

/**
 * `showPriceOnProduct`: the `priceDisplayWidget` box added to the widget's window (the box's parent);
 * `undefined` in the builders club.
 */
export const priceBoxItem = (templates: Record<string, Template>, offer: IPurchasableOffer, options: CatalogPriceOptions & { builder: boolean; placement: PriceBoxPlacement }): TemplateItem | undefined => {
    if (options.builder) return undefined;

    const color = getPriceBoxColor(offer, options.config);
    const { reference, dx, top, dy } = options.placement;

    return {
        key: 'priceDisplayWidget',
        from: templates[catalogTemplateId('priceDisplayWidget')],
        bindings: {
            '': (color === undefined) ? {} : { color },
            price_box_new: { items: [ priceDisplayItem(templates, offer, options) ] },
        },
        arrange: ({ root }) => {
            const box = root();
            const widget = box?.parent;
            const target = widget && findReference(widget, reference);

            if (!box || !target) return;

            box.setX(target.x + target.width + dx - box.width);
            box.setY(top ? (target.y + dy) : (target.y + target.height - (box.height + dy)));
        },
    };
};
