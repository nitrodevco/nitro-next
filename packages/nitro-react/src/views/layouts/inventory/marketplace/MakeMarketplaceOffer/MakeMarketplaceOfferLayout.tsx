import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { MakeMarketplaceOfferLayoutMainBorder, MakeMarketplaceOfferLayoutMainBorderProps } from './MakeMarketplaceOfferLayoutMainBorder';

/** Generated from `1341_make_marketplace_offer_xml` (layout "make_marketplace_offer", 300x429) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MakeMarketplaceOfferLayoutProps {
    layout?: BoxLayout;
    mainBorder?: MakeMarketplaceOfferLayoutMainBorderProps;
    onClose?: () => void;
}

export const MakeMarketplaceOfferLayout = ({ layout, mainBorder, onClose }: MakeMarketplaceOfferLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('inventory.marketplace.make_offer.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 300, height: 429, minWidth: 300, minHeight: 429, ...layout }}
        >
            <MakeMarketplaceOfferLayoutMainBorder {...mainBorder} />
        </Frame>
    );
};
