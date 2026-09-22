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

const SEASONAL_CURRENCY_ICONS: Record<string, [ number, number ]> = {
    snowflakes: [ 27, 27 ],
    horseshoes: [ 31, 30 ],
    nuts: [ 39, 38 ],
    stars: [ 45, 44 ],
    clouds: [ 46, 47 ],
    plain_pumpkins: [ 49, 50 ],
    seashells: [ 55, 55 ],
    flowers: [ 59, 58 ],
    candy: [ 61, 60 ],
    popsicles: [ 63, 62 ],
    golden_fishes: [ 65, 64 ],
    balloons: [ 67, 66 ],
    pumpkins: [ 69, 68 ],
    easter_eggs: [ 73, 72 ],
    truffles: [ 75, 74 ],
    blue_balloons: [ 77, 76 ],
    mushrooms: [ 79, 78 ],
    acorn: [ 81, 80 ],
    coconuts: [ 83, 82 ],
    cards: [ 85, 84 ],
    letter: [ 87, 86 ],
};

/** A hotel variable as the text `getProperty` returns, empty when it is not set. */
const configText = (value: unknown): string => (((typeof value === 'string') || (typeof value === 'number') || (typeof value === 'boolean')) ? String(value) : '');

/** `§_-u1R§.getIconStyleFor`: `config` is the hotel's variables, read the way `getBoolean` / `getProperty` / `getInteger` read them. */
const getCurrencyIconStyle = (type: number, config: Record<string, unknown>, big: boolean, combo: boolean = false): number => {
    if ((type === -1) || (type === 7)) return big ? 34 : 35;
    if (type === 0) return big ? 32 : 33;
    if (type === 3) return big ? 36 : 37;

    if (type === 5) {
        if (configText(config['diamonds.enabled']) === 'true') return big ? 41 : 42;

        return big ? 53 : 54;
    }

    if (type === 1000) return big ? 56 : 57;
    if (type === 1001) return big ? 70 : 71;

    if ((type >= 101) && (type <= 105)) {
        const icons = SEASONAL_CURRENCY_ICONS[configText(config[`seasonalcurrency.id.${type}`])];

        if (icons) return big ? icons[1] : icons[0];
    }

    const style = parseInt(configText(config[`currencyiconstyle.${big ? 'big' : 'small'}.${type}${combo ? '.combo' : ''}`]));

    return isNaN(style) ? 0 : style;
};

export interface CatalogCurrencyIconProps {
    /** The activity point type, `-1` for credits. */
    type: number;
    /** `getIconStyleFor`'s third argument: the 22px icons of the price displays, not the grid's 14px ones. */
    big: boolean;
    /** `getIconStyleFor`'s fourth argument: the `.combo` style of a seasonal currency shown as credits (the 53px icon). */
    combo?: boolean;
    layout?: BoxLayout;
}

export const CatalogCurrencyIcon = ({ type, big, combo = false, layout }: CatalogCurrencyIconProps) => {
    const config = useConfigData();

    return (
        <Icon
            variant={getCurrencyIconStyle(type, config, big, combo)}
            layout={layout}
        />
    );
};
