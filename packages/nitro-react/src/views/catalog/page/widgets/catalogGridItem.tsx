/**
 * A catalogue grid item - `ItemGridCatalogWidget.createGridItem` with `ProductGridItem` and
 * `ProductContainer` setting it up - as a clone of the template the offer's price picks:
 * `grid_item_with_price_multi` for credits and activity points, `grid_item_with_price_single` for
 * any other price (silver included), the bare `gridItem` for a free offer or any offer in the
 * builders club.
 *
 * - `ProductGridItem.set view`: the icon in `image` (`Product.initIcon` - `CatalogProductIconView`);
 *   a single chat style offer on a priced template uses `image_wide` instead and the item takes the
 *   region's maximum width (`SingleProductContainer.useWideView`). `activate` shows the
 *   `ITEM_HILIGHT` borders, `border_outline` in the grid's selection colour.
 * - `ProductContainer.set view`: `badge_add_on` (`catalog_icon_badge_included`, or
 *   `catalog_icon_ninja_effect_included` for a two-product offer with the ninja effect), the club
 *   icon (style 11 three pixels right, or 12), `multiContainer` with `x<count>`.
 * - `createCurrencyIndicators`: the amounts and their small currency icons.
 * - `SingleProductContainer.enableLimitedItemLayout`: a limited edition's label, overlay plaque and
 *   sold-out tile; `BundleProductContainer`: the deal picture and the bundle's number.
 */
import { CatalogPricingModelEnum, FurnitureTypeEnum, IProduct, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { Template, TemplateBindings, TemplateItem } from '@nitrodevco/nitro-theme';
import { FederatedPointerEvent } from 'pixi.js';

import { CURRENCY_TYPE_SILVER, EFFECT_CLASSID_NINJA_DISAPPEAR, getCurrencyIconStyle, getOfferProduct } from '#base/utils';
import { LimitedItemGridOverlayView } from '#base/views/shared/LimitedItemGridOverlayView';

import { CatalogProductIconView } from '../../CatalogProductIconView';
import { catalogTemplateId } from '../catalogTemplates';

/** `ItemGridCatalogWidget.select`: `border_outline`'s colour, in the normal catalogue and the builders club. */
export const GRID_HILIGHT_NORMAL = 6538729;
export const GRID_HILIGHT_BUILDERS_CLUB = 16758076;

export interface CatalogGridItemOptions {
    templates: Record<string, Template>;
    config: Record<string, unknown>;
    /** `createGridItem`: the builders club takes the bare `gridItem` for every offer. */
    isBuilderPage: boolean;
    /** `ProductGridItem.activate`. */
    isActive: boolean;
    hilightColor: number;
    /** `BundleProductContainer.setBundleCounter`: a bundle's number on the page, from 1. */
    bundleCounter?: number;
    /** `loadGraphics`'s `StringArrayStuffData` for the guild the page's furni are bought for. */
    guildStuffData?: readonly string[];
    /** `eventProc`'s `WME_DOWN`, `WME_UP` and `WME_OUT`. */
    onPointerDown?: (event: FederatedPointerEvent) => void;
    onPointerUp?: (event: FederatedPointerEvent) => void;
    onPointerOut?: (event: FederatedPointerEvent) => void;
}

/** `createGridItem`'s template for an offer. */
export const gridItemTemplateName = (offer: IPurchasableOffer, isBuilderPage: boolean) => {
    if (isBuilderPage || (!(offer.priceInCredits > 0) && !(offer.priceInActivityPoints > 0) && !(offer.priceInSilver > 0))) return 'gridItem';

    return ((offer.priceInCredits > 0) && (offer.priceInActivityPoints > 0)) ? 'grid_item_with_price_multi' : 'grid_item_with_price_single';
};

/**
 * One product of a bundle - the bare `gridItem` that `BundleProductContainer.populateItemGrid` and
 * `BundleGridViewCatalogWidget.populateItemGrid` clone per product: its `clubLevelIcon` hidden, the
 * product's icon in `image` (`Product.initIcon`), and for a product bought more than once
 * `multiContainer` with `x<count>` (`Product.view`). The items are never selected (the bundle's
 * `select` does nothing), so no highlight shows.
 */
export const bundleProductItem = (product: IProduct, key: string, templates: Record<string, Template>): TemplateItem => ({
    key,
    from: templates[catalogTemplateId('gridItem')],
    bindings: {
        image: { children: <CatalogProductIconView product={product} /> },
        clubLevelIcon: { visible: false },
        bundleCounter: { visible: false },
        multiContainer: { visible: product.productCount > 1 },
        multiCounter: { caption: `x${product.productCount}` },
    },
});

/** The grid item clone for an offer. */
export const catalogGridItem = (offer: IPurchasableOffer, key: string, options: CatalogGridItemOptions): TemplateItem => {
    const { templates, config, isBuilderPage, isActive, hilightColor, bundleCounter, guildStuffData } = options;
    const product = getOfferProduct(offer);
    const name = gridItemTemplateName(offer, isBuilderPage);
    const priced = name !== 'gridItem';
    const isBundle = Number(offer.pricingModel) === Number(CatalogPricingModelEnum.Bundle);
    const isLimited = (Number(offer.pricingModel) === Number(CatalogPricingModelEnum.Single)) && !!product?.isUnique;
    const isWide = priced && !!offer.isSingleChatStyle;
    const addOnIcon = ((!!offer.badgeCode || !!offer.extraChatStyleCode) && (offer.products.length > 1))
        ? 'habbo-catalog-com-catalog_icon_badge_included'
        : (((offer.products.length === 2) && offer.products.some(item => (item.productType === FurnitureTypeEnum.Effect) && (item.classId === EFFECT_CLASSID_NINJA_DISAPPEAR)))
                ? 'habbo-catalog-com-catalog_icon_ninja_effect_included'
                : '');
    const icon = isBundle
        ? undefined
        : product && (
            <CatalogProductIconView
                product={product}
                width={isWide ? 60 : 36}
                height={36}
                guildStuffData={guildStuffData}
            />
        );

    const bindings: TemplateBindings = {
        '': { onPointerDown: options.onPointerDown, onPointerUp: options.onPointerUp, onPointerOut: options.onPointerOut },
        '#ITEM_HILIGHT': { visible: isActive },
        border_outline: { color: hilightColor },
        image: isBundle ? { asset: 'habbo-catalog-com-ctlg_pic_deal_icon_narrow' } : { children: isWide ? undefined : icon },
        badge_add_on: { asset: addOnIcon },
        clubLevelIcon: offer.clubLevel > 0 ? { visible: true, style: (offer.clubLevel === 1) ? '11' : '12' } : { visible: false },
        bundleCounter: { visible: isBundle && (bundleCounter !== undefined), caption: String(bundleCounter ?? '') },
        multiContainer: { visible: !!product && (product.productCount > 1) },
        multiCounter: { caption: product ? `x${product.productCount}` : '' },
        unique_item_background_bitmap: { visible: isLimited },
        unique_item_overlay_container: isLimited && product ? { visible: true, children: <LimitedItemGridOverlayView serialNumber={product.uniqueSize} /> } : { visible: false },
        unique_item_sold_out_bitmap: { visible: isLimited && !!product && (product.uniqueLeft === 0) },
    };

    if (priced) {
        bindings.wide_container = { visible: isWide };
        bindings.small_container = { visible: !isWide };
        bindings.image_wide = { children: isWide ? icon : undefined };

        // `createCurrencyIndicators`: credits on the left with points beside them, else the points or silver on the right.
        if ((offer.priceInCredits > 0) && (offer.priceInActivityPoints > 0)) {
            bindings.amount_text_left = { caption: String(offer.priceInCredits) };
            bindings.currency_indicator_bitmap_left = { style: String(getCurrencyIconStyle(-1, config, false)) };
            bindings.amount_text_right = { caption: String(offer.priceInActivityPoints) };
            bindings.currency_indicator_bitmap_right = { style: String(getCurrencyIconStyle(offer.activityPointType, config, false)) };
        } else {
            const [ amount, unit ] = (offer.priceInActivityPoints > 0)
                ? [ offer.priceInActivityPoints, offer.activityPointType ]
                : (offer.priceInSilver > 0) ? [ offer.priceInSilver, CURRENCY_TYPE_SILVER ] : [ offer.priceInCredits, -1 ];

            bindings.amount_text_right = { caption: String(amount) };
            bindings.currency_indicator_bitmap_right = { style: String(getCurrencyIconStyle(unit, config, false)) };
        }
    }

    return {
        key,
        from: templates[catalogTemplateId(name)],
        bindings,
        // `useWideView`: the item takes the region's maximum width.
        arrange: isWide ? ({ root }) => root()?.setWidth(73) : undefined,
    };
};
