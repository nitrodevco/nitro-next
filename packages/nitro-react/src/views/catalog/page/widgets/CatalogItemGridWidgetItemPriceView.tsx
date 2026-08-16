import { CatalogPricingTypeEnum, IPurchasableOffer } from "@nitrodevco/nitro-api"

import { BitmapText, NitroIcon } from "#base/theme";

type CatalogItemGridWidgetItemPriceViewProps = {
    offer: IPurchasableOffer;
}

type PriceLineProps = {
    amount: number;
    icon: string;
    className: string;
    plus?: boolean;
}

const PriceLine = (props: PriceLineProps) => {
    const { amount, icon, className, plus = false } = props;

    return (
        <div className={`absolute right-0.5 z-10 flex h-[19px] items-start justify-end gap-px ${className}`}>
            {plus &&
                <BitmapText
                    recipe="bold-12"
                    color="#000000"
                    align="center"
                    className="relative block h-[17px] w-2 shrink-0">
                    +
                </BitmapText>}
            <BitmapText
                recipe="bold-12"
                color="#000000"
                align="center"
                autoWidth
                className="relative block h-[17px] shrink-0">
                {amount}
            </BitmapText>
            <NitroIcon icon={icon} className="mt-1" />
        </div>
    );
}

export const CatalogItemGridWidgetItemPriceView = (props: CatalogItemGridWidgetItemPriceViewProps) => {
    const { offer } = props;

    if (!offer || offer.pricingType === CatalogPricingTypeEnum.None) return null;

    if (offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints)
        return (
            <>
                <PriceLine
                    amount={offer.priceInCredits}
                    icon="catalog-small-coin"
                    className="top-9"
                />
                <PriceLine
                    amount={offer.priceInActivityPoints}
                    icon="catalog-small-diamond"
                    className="top-[51px]"
                    plus
                />
            </>
        );

    return (
        <PriceLine
            amount={
                offer.pricingType === CatalogPricingTypeEnum.Credits
                    ? offer.priceInCredits
                    : offer.priceInActivityPoints
            }
            icon={
                offer.pricingType === CatalogPricingTypeEnum.Credits
                    ? 'catalog-small-coin'
                    : 'catalog-small-diamond'
            }
            className="top-9"
        />
    );
}
