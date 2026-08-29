import { BoxLayout, Region } from '#base/theme';
import { MarketPlaceWidget2, MarketPlaceWidget2Props } from '#base/views/layouts/catalog/widgets/MarketPlaceWidget2';

/** Generated from `1633_layout_marketplace_xml` (layout "ctlg_marketplace", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMarketplace_1633LayoutProps {
    ctlgMarketplace?: LayoutMarketplace_1633LayoutCtlgMarketplaceProps;
    layout?: BoxLayout;
}

export const LayoutMarketplace_1633Layout = ({ ctlgMarketplace, layout }: LayoutMarketplace_1633LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutMarketplace_1633LayoutCtlgMarketplace {...ctlgMarketplace} />
        </Region>
    );
};

/** Named region `ctlg_marketplace` of LayoutMarketplace_1633Layout - configured through the parent's `ctlgMarketplace` prop. */
export interface LayoutMarketplace_1633LayoutCtlgMarketplaceProps {
    layout?: BoxLayout;
    marketPlaceWidget?: MarketPlaceWidget2Props;
}

export const LayoutMarketplace_1633LayoutCtlgMarketplace = ({ layout, marketPlaceWidget }: LayoutMarketplace_1633LayoutCtlgMarketplaceProps) => {
    return (
        <Region
            name="ctlg_marketplace"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <MarketPlaceWidget2
                layout={{ position: 'absolute', left: 0, width: 360, top: 70, height: 390 }}
                {...marketPlaceWidget}
            />
        </Region>
    );
};
