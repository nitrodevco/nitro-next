import { IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useRef } from 'react';

import { CatalogPage, CatalogWidgetBundleDisplayExtraInfoEvent, CatalogWidgetEventEnum, CatalogWidgetSpinnerEvent, useCatalogStore } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';

/** `ExtraInfoItemData.TYPE_RESET_MESSAGE`: the row `setBundleInfoWidgetToOffer` resets the bundle info with. */
const EXTRA_INFO_TYPE_RESET_MESSAGE = 5;

/**
 * The quantity half of `ProductViewCatalogWidget.onPreviewProduct`, which
 * `SongDiskProductViewCatalogWidget` inherits: an offer bought in bulk
 * (`catalog.multiple.purchase.enabled`, off on builder pages, and the offer's
 * `bundlePurchaseAllowed`) once the total price widget is there resets and shows the spinner -
 * `setSpinnerToBundleRuleset` with the ruleset's flat price steps (not on builder pages), maximum
 * and minimum - and resets the bundle info to the offer (`setBundleInfoWidgetToOffer`); any other
 * offer hides both. Returns the function to call with the selected offer, which answers whether
 * the offer is bought in bulk - the product view then leaves its price box off.
 */
export const useProductQuantityWidgets = (page: CatalogPage) => {
    const totalPriceWidgetInitialized = useRef(false);
    const multiplePurchaseEnabled = (useConfigValue<boolean>('catalog.multiple.purchase.enabled') === true) && !page.isBuilderPage;
    const ruleset = useCatalogStore(x => x.bundleDiscountRuleset);
    const flatPriceSteps = useCatalogStore(x => x.bundleDiscountFlatPriceSteps);
    const bundleDiscountEnabled = !page.isBuilderPage;

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.TOTAL_PRICE_WIDGET_INITIALIZED, () => {
        totalPriceWidgetInitialized.current = true;
    });

    return (offer: IPurchasableOffer): boolean => {
        const bulk = multiplePurchaseEnabled && offer.bundlePurchaseAllowed && totalPriceWidgetInitialized.current;

        if (!bulk) {
            page.events.dispatchEvent({ type: CatalogWidgetSpinnerEvent.HIDE, value: 1 });
            page.events.dispatchEvent({ type: CatalogWidgetBundleDisplayExtraInfoEvent.HIDE, id: -1 });

            return false;
        }

        page.events.dispatchEvent({ type: CatalogWidgetSpinnerEvent.RESET, value: 1, skipSteps: bundleDiscountEnabled ? flatPriceSteps : undefined });
        page.events.dispatchEvent({ type: CatalogWidgetSpinnerEvent.SHOW, value: 1 });

        if (ruleset) page.events.dispatchEvent({ type: CatalogWidgetSpinnerEvent.SET_MAX, value: ruleset.maxPurchaseSize });

        page.events.dispatchEvent({ type: CatalogWidgetSpinnerEvent.SET_MIN, value: 1 });
        page.events.dispatchEvent({
            type: CatalogWidgetBundleDisplayExtraInfoEvent.RESET,
            id: -1,
            data: {
                type: EXTRA_INFO_TYPE_RESET_MESSAGE,
                text: '',
                quantity: 0,
                priceCredits: offer.priceInCredits,
                priceActivityPoints: offer.priceInActivityPoints,
                activityPointType: offer.activityPointType,
                priceSilver: offer.priceInSilver,
                badgeCode: offer.badgeCode ?? '',
                achievementCode: '',
                discountPriceCredits: 0,
                discountPriceActivityPoints: 0,
            },
        });

        return true;
    };
};
