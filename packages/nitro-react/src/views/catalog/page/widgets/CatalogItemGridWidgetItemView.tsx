import { CatalogPricingModelEnum, FurnitureTypeEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { ReactNode, useRef } from 'react';

import { useCatalogOfferProduct } from '#base/hooks';
import { Border, Icon, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';
import { EFFECT_CLASSID_NINJA_DISAPPEAR } from '#base/utils';

import { CatalogProductIconView } from '../../CatalogProductIconView';
import { CatalogItemGridWidgetItemPriceView } from './CatalogItemGridWidgetItemPriceView';
import { CatalogLimitedItemGridOverlayView } from './CatalogLimitedItemGridOverlayView';

export interface CatalogItemGridWidgetItemViewProps {
    offer: IPurchasableOffer;
    /** `ProductGridItem.activate`: the grid's selected item shows its `ITEM_HILIGHT`. */
    isActive: boolean;
    /** `ItemGridCatalogWidget.select`'s selection colour for `border_outline` - blue, or orange in the builders club. */
    hilightColor: string;
    /** `createGridItem`: the builders club uses the price-less `gridItem` for every offer. */
    isBuilderPage: boolean;
    /** `BundleProductContainer.setBundleCounter`: a bundle's number on the page, from 1. */
    bundleCounter: number | undefined;
    /** `loadGraphics`'s `StringArrayStuffData` for the guild the page's furni are bought for, or `undefined` for none. */
    guildStuffData: readonly string[] | undefined;
    /** `ProductGridItem.eventProc`'s `WME_DOWN`: the item asks the grid to select it. */
    onSelect: (offer: IPurchasableOffer) => void;
    /** Its `WME_OUT` while still pressed: the grid's `startDragAndDrop` (a grid that drags nothing leaves it out). */
    onDragOut?: (offer: IPurchasableOffer) => void;
}

/**
 * One offer of the grid - `ProductGridItem` / `ProductContainer` on the template
 * `ItemGridCatalogWidget.createGridItem` picks: `grid_item_with_price_multi` (53x74) for a credits
 * + activity points price, `grid_item_with_price_single` (53x74, its highlight 62 high) for any
 * other price (silver included), and the bare 36x36 `gridItem` for a free offer or any offer in
 * the builders club. The priced templates keep the icon's elements in `small_container` at 8,2.
 *
 * What the item shows, each as its Flash class sets it:
 * - `activate`: the `ITEM_HILIGHT` borders (style 2 in `0xa1a19b`, the style 3 outline in the
 *   selection colour and the style 3 face inside it).
 * - the icon, centred in `image` (`Product.initIcon`, `CatalogProductIconView`) - for a bundle the
 *   `ctlg_pic_deal_icon_narrow` picture (`BundleProductContainer.initProductIcon`) with the
 *   bundle's number in Volter Bold (`bundleCounter`). A single chat style offer on a priced
 *   template uses the wide view (`SingleProductContainer.useWideView`): the item grows to the
 *   region's 73px maximum, `small_container` hides and the icon is centred in the 60x36
 *   `image_wide` at 6,2 instead.
 * - `badge_add_on` (`ProductContainer.set view`): `catalog_icon_badge_included` for an offer of
 *   more than one product that comes with a badge or an extra chat style, else
 *   `catalog_icon_ninja_effect_included` for a two-product offer carrying the ninja disappear
 *   effect; the priced templates draw it under the icon, `gridItem` over it.
 * - `setClubIconLevel`: the HC icon (style 11, 3px right) or the VIP one (style 12).
 * - `Product.view`: the red `multiContainer` with `x<count>` for a product bought more than once.
 * - `SingleProductContainer.enableLimitedItemLayout`: a limited edition gets the
 *   `unique_item_label_1` background, the grid overlay plaque with its series size, and the
 *   `unique_item_sold_out_tile` when none is left.
 *
 * A press selects the item and a press that leaves it starts dragging the offer into the room
 * (`eventProc`: `WME_DOWN`, then `WME_OUT` on the pressed item).

 */
export const CatalogItemGridWidgetItemView = ({ offer, isActive, hilightColor, isBuilderPage, bundleCounter, guildStuffData, onSelect, onDragOut }: CatalogItemGridWidgetItemViewProps) => {
    const product = useCatalogOfferProduct(offer);
    // `ProductGridItem`'s pressed target, kept between the press and the pointer leaving.
    const pressed = useRef(false);

    const hasPrice = !isBuilderPage && ((offer.priceInCredits > 0) || (offer.priceInActivityPoints > 0) || (offer.priceInSilver > 0));
    const isMulti = hasPrice && (offer.priceInCredits > 0) && (offer.priceInActivityPoints > 0);
    // `SingleProductContainer.useWideView`: only the priced templates have `image_wide`.
    const isWide = hasPrice && !!offer.isSingleChatStyle;
    const width = hasPrice ? (isWide ? 73 : 53) : 36;
    const height = hasPrice ? 74 : 36;
    const hilightHeight = hasPrice ? (isMulti ? 74 : 62) : 36;
    const isBundle = (Number(offer.pricingModel) === Number(CatalogPricingModelEnum.Bundle));
    const isLimited = (Number(offer.pricingModel) === Number(CatalogPricingModelEnum.Single)) && !!product?.isUnique;
    const addOnIcon = (((!!offer.badgeCode || !!offer.extraChatStyleCode) && (offer.products.length > 1))
        ? 'catalog/catalog_icon_badge_included.png'
        : (((offer.products.length === 2) && offer.products.some(item => (item.productType === FurnitureTypeEnum.Effect) && (item.classId === EFFECT_CLASSID_NINJA_DISAPPEAR)))
                ? 'catalog/catalog_icon_ninja_effect_included.png'
                : undefined));

    const badgeAddOn = addOnIcon && (
        <ThemeImage
            name="badge_add_on"
            src={LayoutImage(addOnIcon)}
            layout={{ position: 'absolute', left: hasPrice ? 8 : 0, top: hasPrice ? 2 : 0 }}
        />
    );

    const icon: ReactNode = (
        <>
            {isLimited && (
                <ThemeImage
                    name="unique_item_background_bitmap"
                    src={LayoutImage('shared/unique_item_label_1.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
            )}
            {isBundle
                ? (
                        <ThemeImage
                            name="image"
                            src={LayoutImage('catalog/ctlg_pic_deal_icon_narrow.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                        />
                    )
                : product && (
                    <CatalogProductIconView
                        product={product}
                        guildStuffData={guildStuffData}
                    />
                )}
            {isLimited && product && <CatalogLimitedItemGridOverlayView serialNumber={product.uniqueSize} />}
            {(offer.clubLevel === 1) && (
                <Icon
                    name="clubLevelIcon"
                    variant={11}
                    layout={{ position: 'absolute', left: 18, top: 2 }}
                />
            )}
            {(offer.clubLevel === 2) && (
                <Icon
                    name="clubLevelIcon"
                    variant={12}
                    layout={{ position: 'absolute', left: 15, top: 2 }}
                />
            )}
            {isBundle && (bundleCounter !== undefined) && (
                <ThemeText
                    name="bundleCounter"
                    text={String(bundleCounter)}
                    textStyle="regular"
                    textOptions={{ fontFamily: 'Volter Bold', fill: '#cccc66' }}
                    flashFormat={hasPrice ? { antiAliasType: 'advanced' } : undefined}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 18, top: 18 }}
                />
            )}
            {product && (product.productCount > 1) && (
                <Border
                    variant="2"
                    name="multiContainer"
                    tintColor="#ff3300"
                    layout={{ position: 'absolute', left: 18, width: 17, top: 21, height: 13 }}
                >
                    <ThemeText
                        name="multiCounter"
                        text={`x${product.productCount}`}
                        textStyle="regular"
                        textOptions={{ fill: '#cccc66' }}
                        flashFormat={hasPrice ? { antiAliasType: 'advanced' } : undefined}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 3, top: 0 }}
                    />
                </Border>
            )}
            {!hasPrice && badgeAddOn}
            {isLimited && product && (product.uniqueLeft === 0) && (
                <ThemeImage
                    name="unique_item_sold_out_bitmap"
                    src={LayoutImage('catalog/unique_item_sold_out_tile.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 7, height: 29 }}
                />
            )}
        </>
    );

    return (
        <Region
            cursor="pointer"
            onPointerDown={() => {
                pressed.current = true;
                onSelect(offer);
            }}
            onPointerUp={() => {
                pressed.current = false;
            }}
            onPointerOut={() => {
                if (!pressed.current) return;

                pressed.current = false;
                onDragOut?.(offer);
            }}
            layout={{ width, height, flexShrink: 0 }}
        >
            {isActive && (
                <Border
                    variant="2"
                    tintColor="#a1a19b"
                    layout={{ position: 'absolute', left: 0, width, top: 0, height: hilightHeight }}
                >
                    <Border
                        variant="3"
                        name="border_outline"
                        tintColor={hilightColor}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <Border
                            variant="3"
                            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                        />
                    </Border>
                </Border>
            )}
            {isWide && product && (
                <Region
                    name="wide_container"
                    layout={{ position: 'absolute', left: 6, width: 60, top: 2, height: 36 }}
                >
                    <CatalogProductIconView
                        product={product}
                        width={60}
                        height={36}
                    />
                </Region>
            )}
            {hasPrice && badgeAddOn}
            {hasPrice
                ? !isWide && (
                        <Region
                            name="small_container"
                            layout={{ position: 'absolute', left: 8, width: 36, top: 2, height: 36 }}
                        >
                            {icon}
                        </Region>
                    )
                : icon}
            {hasPrice && <CatalogItemGridWidgetItemPriceView offer={offer} />}
        </Region>
    );
};
