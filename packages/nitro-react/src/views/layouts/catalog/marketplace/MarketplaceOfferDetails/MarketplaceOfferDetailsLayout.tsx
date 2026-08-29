import { BoxLayout, Region } from '#base/theme';

import { MarketplaceOfferDetailsLayoutDetailsContainer, MarketplaceOfferDetailsLayoutDetailsContainerProps } from './MarketplaceOfferDetailsLayoutDetailsContainer';

/** Generated from `1628_marketplace_offer_details_xml` (layout "marketplace_offer_details", 340x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MarketplaceOfferDetailsLayoutProps {
    detailsContainer?: MarketplaceOfferDetailsLayoutDetailsContainerProps;
    layout?: BoxLayout;
}

export const MarketplaceOfferDetailsLayout = ({ detailsContainer, layout }: MarketplaceOfferDetailsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 340, height: 460, ...layout }}>
            <MarketplaceOfferDetailsLayoutDetailsContainer {...detailsContainer} />
        </Region>
    );
};
