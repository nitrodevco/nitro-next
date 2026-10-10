import { IPurchasableOffer } from '@nitrodevco/nitro-api';
import { TemplateBindings } from '@nitrodevco/nitro-theme';
import { useEffect, useState } from 'react';

import { CatalogWidgetEventEnum, CatalogWidgetSpinnerEvent } from '#base/context/catalog';
import { useConfigData, useConfigValue } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { calculateBundlePrice, CURRENCY_TYPE_SILVER, getCurrencyIconStyle, getSeasonalCurrencyActivityPointType } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { CatalogWidgetView, useCatalogWidgetView } from '../catalogWidgetView';

/** A total and the total before the bundle discount, for one `total_left` / `total_right`. */
interface Total {
    raw: number;
    discounted: number;
}

/**
 * `clear`, `createCurrencyIndicators` and `updateCurrencyIndicators` for the offer and quantity: the
 * window shows for a bulk offer.
 */
const totalPriceView = (offer: IPurchasableOffer | undefined, quantity: number, seasonal: boolean, config: Record<string, unknown>): CatalogWidgetView => {
    const bindings: TemplateBindings = {
        '': { visible: !!offer?.bundlePurchaseAllowed },
        plus: { visible: false },
        amount_text_left: { visible: false },
        total_left: { visible: false },
        total_right: { visible: false },
        currency_indicator_bitmap_left: { visible: false },
    };
    const totals: Record<string, Total> = {};
    let comboIcon: string | undefined = undefined;

    if (!offer) return { template: 'totalPriceWidget', bindings };

    // `bundleDiscountEnabled` is true here: a builders club page never gets this far.
    const credits: Total = { raw: quantity * offer.priceInCredits, discounted: calculateBundlePrice(true, offer.priceInCredits, quantity) };
    const points: Total = { raw: quantity * offer.priceInActivityPoints, discounted: calculateBundlePrice(true, offer.priceInActivityPoints, quantity) };
    const silver: Total = { raw: quantity * offer.priceInSilver, discounted: calculateBundlePrice(true, offer.priceInSilver, quantity) };

    if (offer.priceInCredits > 0) {
        const side = ((offer.priceInActivityPoints > 0) || (offer.priceInSilver > 0)) ? 'left' : 'right';
        const icon = `currency_indicator_bitmap_${side}`;

        bindings[`amount_text_${side}`] = { visible: true, caption: String(credits.discounted) };
        bindings[icon] = { visible: true, style: String(seasonal ? getCurrencyIconStyle(getSeasonalCurrencyActivityPointType(config), config, true, true) : getCurrencyIconStyle(-1, config, true)) };
        totals[`total_${side}`] = credits;

        if (side === 'left') bindings.plus = { visible: true };
        if (seasonal) comboIcon = icon;
    }

    // The points' or the silver's total takes `total_left`, over the credits' there.
    if ((offer.priceInActivityPoints > 0) || (offer.priceInSilver > 0)) {
        const total = (offer.priceInSilver > 0) ? silver : points;

        bindings.amount_text_right = { caption: String(total.discounted) };
        bindings.currency_indicator_bitmap_right = { style: String(getCurrencyIconStyle((offer.priceInActivityPoints > 0) ? offer.activityPointType : CURRENCY_TYPE_SILVER, config, true)) };
        totals.total_left = total;
    }

    for (const [ key, total ] of Object.entries(totals)) {
        const shown = (total.raw !== total.discounted);

        bindings[key] = { visible: shown };
        bindings[`${key}/text`] = { caption: shown ? String(total.raw) : '0' };
    }

    return {
        template: 'totalPriceWidget',
        bindings,
        arrange: ({ find }) => {
            if (comboIcon) find(comboIcon)?.setWidth(53);

            // The strike as wide as the total it strikes.
            for (const key of Object.keys(totals)) {
                const text = find(`${key}/text`);

                if (text) find(`${key}/strike`)?.setWidth(text.width);
            }
        },
    };
};

/**
 * The quantity's total, the embedded `totalPriceWidget` of `layout_default_3x3.xml` - Flash's
 * `TotalPriceWidget`, shown only for an offer that can be bought in bulk. The `totalprice_container`
 * list holds the total beside the big currency icon.
 *
 * `createCurrencyIndicators` places the prices: credits alone go right (`amount_text_right` and its
 * icon); credits with activity points or silver go left (`amount_text_left`, its icon and a `+`),
 * and the points - or without points the silver - go right with their icon. On a page that takes
 * the seasonal currency as credits the credits icon is that currency's 53px `.combo` icon.
 * `updateCurrencyIndicators` writes the right text from the silver whenever the offer has silver,
 * so an offer with both points and silver shows the silver beside the points' icon, as in Flash.
 *
 * The totals go through `calculateBundlePrice` (outside the builders club), which is the price
 * times the quantity in this client, so the struck-through undiscounted `total_left` /
 * `total_right` - shown only when the two differ - stay hidden. The points' or silver's total
 * takes `total_left` even when the credits' is there too, as in Flash.
 *
 * With `catalog.multiple.purchase.enabled` on (and not on a builders club page) `init` subscribes
 * to `SELECT_PRODUCT` (the offer, the quantity back to 1, shown for a bulk offer) and
 * `CWSE_VALUE_CHANGED` (the quantity), and tells the product view it is there
 * (`TOTAL_PRICE_WIDGET_INITIALIZED`), which is what lets the product view show the spinner.
 */
export const CatalogTotalPriceWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ activeOffer, setActiveOffer ] = useState<IPurchasableOffer | undefined>(undefined);
    const [ quantity, setQuantity ] = useState(1);
    const multiplePurchaseEnabled = (useConfigValue<boolean>('catalog.multiple.purchase.enabled') === true) && !page.isBuilderPage;
    const config = useConfigData();

    useCatalogWidgetEvent(page, CatalogWidgetSpinnerEvent.VALUE_CHANGED, (event) => {
        if (multiplePurchaseEnabled) setQuantity(event.value);
    });

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, (event) => {
        if (!multiplePurchaseEnabled) return;

        setActiveOffer(event.offer);
        setQuantity(1);
    });

    useEffect(() => {
        if (multiplePurchaseEnabled) page.events.dispatchEvent({ type: CatalogWidgetEventEnum.TOTAL_PRICE_WIDGET_INITIALIZED });
    }, [ page, multiplePurchaseEnabled ]);

    useCatalogWidgetView(totalPriceView(activeOffer, quantity, page.acceptSeasonCurrencyAsCredits, config));

    return null;
};
