import { LayoutImage, Region, ThemeImage } from '#base/theme';
import { isMarketplaceUniqueLimitedItem, MarketplaceOfferData } from '#base/utils';

import { CatalogLimitedItemGridOverlayView } from '../page/widgets/CatalogLimitedItemGridOverlayView';
import { CatalogRarityItemGridOverlayView } from '../page/widgets/CatalogRarityItemGridOverlayView';
import { getMarketplaceOfferIconUrl } from './marketplaceOfferIcon';

export interface CatalogMarketplaceOfferImageViewProps {
    offer: MarketplaceOfferData;
    withExtraData: boolean;
    left: number;
    top: number;
}

/**
 * The 40x40 `image_container` every marketplace offer row and the purchase confirmation carry:
 * `unique_item_background_bitmap` (`unique_item_label_1`, 36x36 at 2,2) shown for a limited item,
 * under the `item_image` bitmap the icon is copied into, centred and unscaled.
 *
 * Over the icon, both 36x36 at 2,2: for a limited item the `unique_item_overlay_widget`
 * (`limited_item_overlay_grid`, animated, with the stuff data's serial number), and for an item
 * whose stuff data has a rarity level (`rarityLevel >= 0`) the `rarity_item_overlay_widget`
 * (`rarity_item_overlay_grid`) - as `MarketPlaceCatalogWidget`, `MarketPlaceOwnItemsCatalogWidget`
 * and `MarketplaceConfirmationDialog` set them.
 */
export const CatalogMarketplaceOfferImageView = ({ offer, withExtraData, left, top }: CatalogMarketplaceOfferImageViewProps) => {
    const iconUrl = getMarketplaceOfferIconUrl(offer, withExtraData);

    return (
        <Region
            name="image_container"
            layout={{ position: 'absolute', left, width: 40, top, height: 40 }}
        >
            {isMarketplaceUniqueLimitedItem(offer) && (
                <ThemeImage
                    name="unique_item_background_bitmap"
                    src={LayoutImage('shared/unique_item_label_1.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
            )}
            {(iconUrl !== '') && (
                <ThemeImage
                    name="item_image"
                    src={iconUrl}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                />
            )}
            {isMarketplaceUniqueLimitedItem(offer) && offer.stuffData && (
                <Region
                    name="unique_item_overlay_widget"
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                >
                    <CatalogLimitedItemGridOverlayView serialNumber={offer.stuffData.uniqueNumber} />
                </Region>
            )}
            {offer.stuffData && (offer.stuffData.rarityLevel >= 0) && (
                <Region
                    name="rarity_item_overlay_widget"
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                >
                    <CatalogRarityItemGridOverlayView rarityLevel={offer.stuffData.rarityLevel} />
                </Region>
            )}
        </Region>
    );
};
