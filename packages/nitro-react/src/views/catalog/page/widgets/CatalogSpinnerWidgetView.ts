import { useState } from 'react';

import { CatalogWidgetSpinnerEvent, useCatalogStore } from '#base/context/catalog';
import { useConfigBoolean, useTranslation } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { clamp, getDiscountItemsCount } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { useCatalogWidgetView } from '../catalogWidgetView';

/** `SpinnerCatalogWidget`'s starting minimum and maximum. */
const MIN_VALUE = 1;
const MAX_VALUE = 100;

/**
 * The quantity picker, the embedded `spinnerWidget` of `layout_default_3x3.xml` (its
 * `quantitySelection`) - Flash's `SpinnerCatalogWidget`: the `quantityLabel` and the digits-only
 * `text_value` input.
 *
 * Hidden until the product view shows it (`CWSE_SHOW` / `CWSE_HIDE`); with
 * `catalog.multiple.purchase.enabled` off, or on a builders club page, it ignores every event and
 * stays hidden (`init` returns before subscribing).
 * `CWSE_RESET` sets the value and the steps to skip (the ruleset's flat price steps),
 * `CWSE_SET_MIN` and `CWSE_SET_MAX` its range; every change is clamped and announced as
 * `CWSE_VALUE_CHANGED` (`refresh`), which the purchase and total price widgets read. A typed value
 * that is not a number counts as 1 and an emptied field stays empty, where Flash would carry the
 * `NaN` on.
 *
 * `refresh` also counts the free items the quantity earns under the bundle discount ruleset
 * (`getDiscountItemsCount`, outside the builders club): above none, the green `discountContainer`
 * behind the input shows `shop.bonus.items.count` (`%amount%`, small italic) beside the
 * `catalogue_bundle_star`.
 *
 * The layout's `text_header` and the `button_less` / `button_more` pair are `visible="false"` and
 * nothing shows them, so neither they nor the hold-to-repeat stepping behind the buttons (which is
 * all the skipped steps change) are drawn.
 */
export const CatalogSpinnerWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ visible, setVisible ] = useState(false);
    const [ minValue, setMinValue ] = useState(MIN_VALUE);
    const [ maxValue, setMaxValue ] = useState(MAX_VALUE);
    const [ valueText, setValueText ] = useState('1');
    const [ discountItemsCount, setDiscountItemsCount ] = useState(0);
    const ruleset = useCatalogStore(x => x.bundleDiscountRuleset);
    const multiplePurchaseEnabled = (useConfigBoolean('catalog.multiple.purchase.enabled')) && !page.isBuilderPage;
    const bundleDiscountEnabled = !page.isBuilderPage;
    const t = useTranslation();

    /** `refresh`: clamp, announce, show the value unless the field was emptied, and count the bonus items. */
    const refresh = (next: number, text: string = valueText) => {
        const clamped = clamp(next, minValue, maxValue);

        page.events.dispatchEvent({ type: CatalogWidgetSpinnerEvent.VALUE_CHANGED, value: clamped });

        setValueText(text.length ? clamped.toString() : '');

        if (bundleDiscountEnabled) setDiscountItemsCount(getDiscountItemsCount(ruleset, clamped));
    };

    useCatalogWidgetEvent(page, CatalogWidgetSpinnerEvent.RESET, (event) => {
        if (multiplePurchaseEnabled) refresh(event.value);
    });

    useCatalogWidgetEvent(page, CatalogWidgetSpinnerEvent.SHOW, () => {
        if (multiplePurchaseEnabled) setVisible(true);
    });

    useCatalogWidgetEvent(page, CatalogWidgetSpinnerEvent.HIDE, () => {
        if (multiplePurchaseEnabled) setVisible(false);
    });

    useCatalogWidgetEvent(page, CatalogWidgetSpinnerEvent.SET_MAX, (event) => {
        if (multiplePurchaseEnabled) setMaxValue(event.value);
    });

    useCatalogWidgetEvent(page, CatalogWidgetSpinnerEvent.SET_MIN, (event) => {
        if (multiplePurchaseEnabled) setMinValue(event.value);
    });

    /** `onInputEvent`: the typed value, through `refresh`. */
    const onInput = (text: string) => {
        const typed = parseInt(text);

        refresh(isNaN(typed) ? 1 : typed, text);
    };

    useCatalogWidgetView({
        template: 'spinnerWidget',
        bindings: {
            '': { visible },
            text_value: { caption: valueText, onChange: onInput, restrict: '0123456789' },
            discountContainer: { visible: discountItemsCount > 0 },
            'promo.info': { caption: t('shop.bonus.items.count', '', { amount: String(discountItemsCount) }) },
        },
    });

    return null;
};
