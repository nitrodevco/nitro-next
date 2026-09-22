import { useState } from 'react';

import { CatalogWidgetSpinnerEvent, useCatalogStore } from '#base/context/catalog';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Border, LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { getDiscountItemsCount } from '#base/utils';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/** `SpinnerCatalogWidget`'s starting minimum and maximum. */
const MIN_VALUE = 1;
const MAX_VALUE = 100;

/**
 * The quantity picker, the embedded `spinnerWidget` of `layout_default_3x3.xml` (its
 * `quantitySelection`) - Flash's `SpinnerCatalogWidget`: the `quantityLabel` in grey and the
 * digits-only `text_value` input in a 30x25 style 0 border.
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
    const multiplePurchaseEnabled = (useConfigValue<boolean>('catalog.multiple.purchase.enabled') === true) && !page.isBuilderPage;
    const bundleDiscountEnabled = !page.isBuilderPage;
    const t = useTranslation();

    /** `refresh`: clamp, announce, show the value unless the field was emptied, and count the bonus items. */
    const refresh = (next: number, text: string = valueText) => {
        const clamped = Math.min(Math.max(next, minValue), maxValue);

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

    if (!visible) return null;

    return (
        <Region
            name="quantitySelection"
            layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 25 }}
        >
            <ThemeText
                name="quantityLabel"
                text={t('catalog.bundlewidget.quantity')}
                textStyle="u_regular"
                textOptions={{ fill: '#666666' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, top: 3, maxWidth: 100 }}
            />
            {(discountItemsCount > 0) && (
                <Border
                    variant="3"
                    name="discountContainer"
                    tintColor="#92d27c"
                    layout={{ position: 'absolute', left: 65, width: 135, top: 0, height: 25 }}
                >
                    <ThemeImage
                        name="thumbStar"
                        src={LayoutImage('window-manager/catalogue_bundle_star.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 108, width: 30, top: -2, height: 30 }}
                    />
                    <ThemeText
                        name="promo.info"
                        text={t('shop.bonus.items.count', '', { amount: String(discountItemsCount) })}
                        textStyle="u_regular"
                        textOptions={{ fontSize: 10 }}
                        flashFormat={{ italic: true }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 28, top: 5, maxWidth: 82 }}
                    />
                </Border>
            )}
            <Border
                variant="0"
                name="quantityInput"
                layout={{ position: 'absolute', left: 65, width: 30, top: 0, height: 25 }}
            >
                <TextInput
                    value={valueText}
                    onChange={onInput}
                    textStyle="u_small"
                    flashPlacement
                    restrict="0123456789"
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    layout={{ position: 'absolute', left: 3, width: 22, top: 5, height: 15 }}
                />
            </Border>
        </Region>
    );
};
