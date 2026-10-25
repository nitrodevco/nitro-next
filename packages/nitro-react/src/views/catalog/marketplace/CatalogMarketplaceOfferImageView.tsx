import { ThemeImage } from '#base/theme';
import { MarketplaceOfferData } from '#base/utils';

import { getMarketplaceOfferIconUrl } from './marketplaceOfferIcon';

/**
 * The offer's furni icon as the marketplace code copies it into an `item_image` bitmap: centred and
 * unscaled (`copyPixels` / `draw` at `(width - image.width) / 2`). The icon is the room engine's, so
 * it is injected into the template's bitmap.
 */
export interface CatalogMarketplaceOfferImageViewProps {
    offer: MarketplaceOfferData;
    withExtraData: boolean;
    /** The `item_image` bitmap's size, which the icon is centred in. */
    width: number;
    height: number;
}

export const CatalogMarketplaceOfferImageView = ({ offer, withExtraData, width, height }: CatalogMarketplaceOfferImageViewProps) => {
    const iconUrl = getMarketplaceOfferIconUrl(offer, withExtraData);

    if (iconUrl === '') return null;

    return (
        <ThemeImage
            src={iconUrl}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={{ position: 'absolute', left: 0, width, top: 0, height }}
        />
    );
};
