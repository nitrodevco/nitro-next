import { BoxLayout, Region } from '#base/theme';
import { MarketPlaceWidget2, MarketPlaceWidget2Props } from '#base/views/layouts/catalog/widgets/MarketPlaceWidget2';

/** Generated from `1621_layout_marketplace_xml` (layout "ctlg_marketplace", 360x608) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMarketplace_1621LayoutProps {
    ctlgMarketplace?: LayoutMarketplace_1621LayoutCtlgMarketplaceProps;
    layout?: BoxLayout;
}

export const LayoutMarketplace_1621Layout = ({ ctlgMarketplace, layout }: LayoutMarketplace_1621LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 608, ...layout }}>
            <LayoutMarketplace_1621LayoutCtlgMarketplace {...ctlgMarketplace} />
        </Region>
    );
};

/** Named region `ctlg_marketplace` of LayoutMarketplace_1621Layout - configured through the parent's `ctlgMarketplace` prop. */
export interface LayoutMarketplace_1621LayoutCtlgMarketplaceProps {
    layout?: BoxLayout;
    marketPlaceWidget?: MarketPlaceWidget2Props;
}

export const LayoutMarketplace_1621LayoutCtlgMarketplace = ({ layout, marketPlaceWidget }: LayoutMarketplace_1621LayoutCtlgMarketplaceProps) => {
    return (
        <Region
            name="ctlg_marketplace"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <MarketPlaceWidget2
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                {...marketPlaceWidget}
            />
        </Region>
    );
};
