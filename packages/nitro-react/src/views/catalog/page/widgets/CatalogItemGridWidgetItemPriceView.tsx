import { IPurchasableOffer } from '@nitrodevco/nitro-api';

import { Region, ThemeText } from '#base/theme';

import { CatalogCurrencyIcon } from '../../CatalogCurrencyIcon';

/** `§_-u1R§`'s silver unit, which `createCurrencyIndicators` asks the icon for. */
const UNIT_SILVER = 1000;

export interface CatalogItemGridWidgetItemPriceViewProps {
    offer: IPurchasableOffer;
}

/**
 * A grid item's `totalprice_container` rows, filled by `ProductContainer.createCurrencyIndicators`:
 * the amount in bold `u_regular` and the small currency icon beside it, 1px apart, right-aligned
 * to the item.
 *
 * `grid_item_with_price_multi` (credits and activity points) has the credits and their icon at 36
 * and `+`, the points and their icon at 51. `grid_item_with_price_single` has one row, whose text
 * `createCurrencyIndicators` writes in turn: the credits, then the activity points over them, and
 * without points the silver over them - so an offer priced in credits and silver shows the silver
 * with its icon, as in the client. The icon keeps the template's credits style unless points or
 * silver set it.
 */
export const CatalogItemGridWidgetItemPriceView = ({ offer }: CatalogItemGridWidgetItemPriceViewProps) => {
    const isMulti = (offer.priceInCredits > 0) && (offer.priceInActivityPoints > 0);

    if (isMulti) {
        return (
            <>
                <Region
                    name="totalprice_container"
                    layout={{ position: 'absolute', right: 2, top: 36, flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
                >
                    <ThemeText
                        name="amount_text_left"
                        text={String(offer.priceInCredits)}
                        textStyle="u_regular"
                        flashFormat={{ bold: true }}
                        verticalAlign="top"
                        layout={{ marginTop: 2 }}
                    />
                    <CatalogCurrencyIcon
                        type={-1}
                        big={false}
                        layout={{ marginTop: 4 }}
                    />
                </Region>
                <Region
                    name="totalprice_container"
                    layout={{ position: 'absolute', right: 2, top: 51, flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
                >
                    <ThemeText
                        name="plus"
                        text="+"
                        textStyle="u_regular"
                        flashFormat={{ bold: true }}
                        verticalAlign="top"
                        layout={{ marginTop: 2 }}
                    />
                    <ThemeText
                        name="amount_text_right"
                        text={String(offer.priceInActivityPoints)}
                        textStyle="u_regular"
                        flashFormat={{ bold: true }}
                        verticalAlign="top"
                        layout={{ marginTop: 2 }}
                    />
                    <CatalogCurrencyIcon
                        type={offer.activityPointType}
                        big={false}
                        layout={{ marginTop: 4 }}
                    />
                </Region>
            </>
        );
    }

    let amount = offer.priceInCredits;
    let unit = -1;

    if (offer.priceInActivityPoints > 0) {
        amount = offer.priceInActivityPoints;
        unit = offer.activityPointType;
    } else if (offer.priceInSilver > 0) {
        amount = offer.priceInSilver;
        unit = UNIT_SILVER;
    }

    return (
        <Region
            name="totalprice_container"
            layout={{ position: 'absolute', right: 2, top: 36, flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
        >
            <ThemeText
                name="amount_text_right"
                text={String(amount)}
                textStyle="u_regular"
                flashFormat={{ bold: true }}
                verticalAlign="top"
                layout={{ marginTop: 2 }}
            />
            <CatalogCurrencyIcon
                type={unit}
                big={false}
                layout={{ marginTop: 4 }}
            />
        </Region>
    );
};
