/**
 * The currency icon the catalogue draws beside a price: an icon-set style picked by the purse's
 * `§_-u1R§.getIconStyleFor(type, catalog, big, combo)` (`com/sulake/habbo/catalog/purse`), which
 * every Flash price display calls - `ProductContainer.createCurrencyIndicators` (the grid items,
 * small), `TotalPriceWidget.createCurrencyIndicators` and `HabboCatalogUtils.renderPriceItem`
 * (the purchase confirmation's `price_display`, big).
 *
 * `-1` and `7` are credits, `0` duckets, `3` and `5` the other activity points, `1000` silver and
 * `1001` emeralds; the seasonal types (101-105) take their icon from the currency the hotel names
 * in `seasonalcurrency.id.<type>`, and anything else from `currencyiconstyle.<size>.<type>`.
 * `SEASONAL_CURRENCY_ICONS` is `createSeasonalCurrencyIconMap()` - `[small, big]` per currency.
 */
import { useConfigData } from '#base/context/system';
import { BoxLayout, Icon } from '#base/theme';
import { getCurrencyIconStyle } from '#base/utils';

export interface CurrencyIconProps {
    /** The activity point type, `-1` for credits. */
    type: number;
    /** `getIconStyleFor`'s third argument: the 22px icons of the price displays, not the grid's 14px ones. */
    big: boolean;
    /** `getIconStyleFor`'s fourth argument: the `.combo` style of a seasonal currency shown as credits (the 53px icon). */
    combo?: boolean;
    layout?: BoxLayout;
}

export const CurrencyIcon = ({ type, big, combo = false, layout }: CurrencyIconProps) => {
    const config = useConfigData();

    return (
        <Icon
            variant={getCurrencyIconStyle(type, config, big, combo)}
            layout={layout}
        />
    );
};
