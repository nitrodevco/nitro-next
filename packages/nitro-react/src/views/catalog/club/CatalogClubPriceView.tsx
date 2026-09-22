/**
 * A club offer's price - `HabboCatalogUtils.showPriceInContainer` into a club dialog's or item's
 * price container: `price_display.xml`'s `price_box` (an `itemlist_horizontal`, spacing 1) with a
 * 1x1 spacer, an `amount_N` (`u_bold` 14, `+ ` before the second) and a big currency icon
 * `unit_N` (22 wide, `getIconStyleFor(unit, catalog, true)`) per price, and the closing 2x1
 * spacer - `renderPriceInContainer` removes the pairs past the prices it has. Prices are
 * `getPriceArray`'s (`getClubOfferPrices`).
 */
import { Box, Region, ThemeText } from '#base/theme';
import { getClubOfferPrices } from '#base/utils';

import { CatalogCurrencyIcon } from '../CatalogCurrencyIcon';

export interface CatalogClubPriceViewProps {
    priceCredits: number;
    priceActivityPoints: number;
    activityPointType: number;
}

export const CatalogClubPriceView = ({ priceCredits, priceActivityPoints, activityPointType }: CatalogClubPriceViewProps) => {
    const prices = getClubOfferPrices(priceCredits, priceActivityPoints, activityPointType);

    return (
        <Region
            name="price_box"
            layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
        >
            <Box layout={{ width: 1, height: 1, flexShrink: 0 }} />
            {prices.map((price, index) => (
                <Box
                    key={index}
                    layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1, flexShrink: 0 }}
                >
                    <ThemeText
                        name={`amount_${index}`}
                        text={`${(index > 0) ? '+ ' : ''}${price.amount}`}
                        textStyle="u_bold"
                        textOptions={{ fontSize: 14 }}
                        verticalAlign="top"
                        layout={{ marginTop: 1, flexShrink: 0 }}
                    />
                    <CatalogCurrencyIcon
                        type={price.unit}
                        big
                        layout={{ width: 22, height: 22, flexShrink: 0 }}
                    />
                </Box>
            ))}
            <Box layout={{ width: 2, height: 1, flexShrink: 0 }} />
        </Region>
    );
};
