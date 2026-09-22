import { IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { CatalogWidgetEventEnum, CatalogWidgetSpinnerEvent } from '#base/context/catalog';
import { useConfigData, useConfigValue, useTranslation } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Region, ThemeText } from '#base/theme';
import { calculateBundlePrice, getSeasonalCurrencyActivityPointType } from '#base/utils';

import { CatalogCurrencyIcon } from '../../CatalogCurrencyIcon';
import { CatalogWidgetProps } from '../CatalogPageRegistry';

/** Silver as `§_-u1R§.getIconStyleFor` names it. */
const UNIT_SILVER = 1000;

/**
 * The quantity's total, the embedded `totalPriceWidget` of `layout_default_3x3.xml` - Flash's
 * `TotalPriceWidget`, shown only for an offer that can be bought in bulk. The `totalprice_container`
 * list holds the total in bold `u_regular` beside the big currency icon.
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
 * `total_right` - shown only when the two differ - stay hidden.
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
    const t = useTranslation();

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

    if (!activeOffer || !activeOffer.bundlePurchaseAllowed) return null;

    // `bundleDiscountEnabled` is true here: a builders club page never gets this far.
    const credits = calculateBundlePrice(true, activeOffer.priceInCredits, quantity);
    const activityPoints = calculateBundlePrice(true, activeOffer.priceInActivityPoints, quantity);
    const silver = calculateBundlePrice(true, activeOffer.priceInSilver, quantity);
    const hasCredits = (activeOffer.priceInCredits > 0);
    const hasActivityPoints = (activeOffer.priceInActivityPoints > 0);
    const hasSilver = (activeOffer.priceInSilver > 0);
    const creditsLeft = hasCredits && (hasActivityPoints || hasSilver);
    const seasonal = page.acceptSeasonCurrencyAsCredits;
    const creditsIcon = (
        <CatalogCurrencyIcon
            type={seasonal ? getSeasonalCurrencyActivityPointType(config) : -1}
            big
            combo={seasonal}
            layout={{ marginTop: 1 }}
        />
    );

    let rightText: string | undefined = undefined;
    let rightIcon: number | undefined = undefined;

    if (hasCredits && !creditsLeft) rightText = String(credits);

    if (hasActivityPoints || hasSilver) {
        rightText = String(hasSilver ? silver : activityPoints);
        rightIcon = hasActivityPoints ? activeOffer.activityPointType : UNIT_SILVER;
    }

    return (
        <>
            <ThemeText
                text={t('catalog.bundlewidget.price')}
                textStyle="u_regular"
                textOptions={{ fill: '#666666' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 20, top: 3 }}
            />
            <Region
                name="totalprice_container"
                layout={{ position: 'absolute', left: 85, top: 1, flexDirection: 'row', alignItems: 'flex-start' }}
            >
                {creditsLeft && (
                    <>
                        <ThemeText
                            name="amount_text_left"
                            text={String(credits)}
                            textStyle="u_regular"
                            flashFormat={{ bold: true, gridFitType: 'subpixel' }}
                            verticalAlign="top"
                            layout={{ marginTop: 3 }}
                        />
                        {creditsIcon}
                        <ThemeText
                            name="plus"
                            text="+"
                            textStyle="u_regular"
                            flashFormat={{ bold: true }}
                            verticalAlign="top"
                            layout={{ marginTop: 3, marginLeft: -2 }}
                        />
                    </>
                )}
                {(rightText !== undefined) && (
                    <>
                        <ThemeText
                            name="amount_text_right"
                            text={rightText}
                            textStyle="u_regular"
                            flashFormat={{ bold: true, gridFitType: 'subpixel' }}
                            verticalAlign="top"
                            layout={{ marginTop: 3 }}
                        />
                        {(rightIcon === undefined)
                            ? creditsIcon
                            : (
                                    <CatalogCurrencyIcon
                                        type={rightIcon}
                                        big
                                        layout={{ marginTop: 1 }}
                                    />
                                )}
                    </>
                )}
            </Region>
        </>
    );
};
