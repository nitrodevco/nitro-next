import { BoxLayout, Region } from '#base/theme';

import { MarketPlaceOwnItemsWidgetLayoutMarketPlaceContent, MarketPlaceOwnItemsWidgetLayoutMarketPlaceContentProps } from './MarketPlaceOwnItemsWidgetLayoutMarketPlaceContent';

/** Generated from `1704_marketPlaceOwnItemsWidget_xml` (layout "marketPlaceOwnItemsWidget", 340x390) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MarketPlaceOwnItemsWidgetLayoutProps {
    layout?: BoxLayout;
    marketPlaceContent?: MarketPlaceOwnItemsWidgetLayoutMarketPlaceContentProps;
}

export const MarketPlaceOwnItemsWidgetLayout = ({ layout, marketPlaceContent }: MarketPlaceOwnItemsWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 340, height: 390, ...layout }}>
            <MarketPlaceOwnItemsWidgetLayoutMarketPlaceContent {...marketPlaceContent} />
        </Region>
    );
};
