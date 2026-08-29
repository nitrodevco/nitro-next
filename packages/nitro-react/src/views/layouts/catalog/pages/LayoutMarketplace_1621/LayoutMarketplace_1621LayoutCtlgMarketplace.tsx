import { BoxLayout, Region } from '#base/theme';
import { MarketPlaceWidget2, MarketPlaceWidget2Props } from '#base/views/layouts/catalog/widgets/MarketPlaceWidget2/MarketPlaceWidget2';

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
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <MarketPlaceWidget2
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...marketPlaceWidget}
            />
        </Region>
    );
};
