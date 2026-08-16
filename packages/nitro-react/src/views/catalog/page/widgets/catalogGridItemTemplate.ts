import { CatalogPricingTypeEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';

type CatalogGridItemTemplate = {
    width: number;
    height: number;
    highlightHeight: number;
    highlightInset: number;
    artwork: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
};

// Native geometry from gridItem and the single/multi-price grid item XML layouts.
const GRID_ITEM_TEMPLATES = {
    noPrice: {
        width: 36,
        height: 36,
        highlightHeight: 36,
        highlightInset: 2,
        artwork: { left: 0, top: 0, width: 36, height: 36 },
    },
    singlePrice: {
        width: 53,
        height: 74,
        highlightHeight: 62,
        highlightInset: 2,
        artwork: { left: 8, top: 2, width: 36, height: 36 },
    },
    combinedPrice: {
        width: 53,
        height: 74,
        highlightHeight: 74,
        highlightInset: 2,
        artwork: { left: 8, top: 2, width: 36, height: 36 },
    },
} as const satisfies Record<string, CatalogGridItemTemplate>;

// ItemGridCatalogWidget keeps the XML's horizontal spacing and resets vertical spacing.
export const CATALOG_GRID_SPACING = {
    horizontal: 3,
    vertical: 0,
} as const;

export const getCatalogGridItemTemplate = (
    offer: IPurchasableOffer,
): CatalogGridItemTemplate => {
    if (offer.pricingType === CatalogPricingTypeEnum.None)
        return GRID_ITEM_TEMPLATES.noPrice;

    if (offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints)
        return GRID_ITEM_TEMPLATES.combinedPrice;

    return GRID_ITEM_TEMPLATES.singlePrice;
};

export const getCatalogGridCellSize = (offers: readonly IPurchasableOffer[]) =>
    offers.reduce(
        (size, offer) => {
            const template = getCatalogGridItemTemplate(offer);

            return {
                width: Math.max(size.width, template.width),
                height: Math.max(size.height, template.height),
            };
        },
        {
            width: GRID_ITEM_TEMPLATES.noPrice.width,
            height: GRID_ITEM_TEMPLATES.noPrice.height,
        },
    );
