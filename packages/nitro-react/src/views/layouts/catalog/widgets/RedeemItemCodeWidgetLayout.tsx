import { BoxLayout, Region } from '#base/theme';
import { RedeemItemCodeWidget2, RedeemItemCodeWidget2Props } from '#base/views/layouts/catalog/widgets/RedeemItemCodeWidget2';

/** Generated from `1579_redeemItemCodeWidget_xml` (layout "redeemItemCodeWidget", 282x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RedeemItemCodeWidgetLayoutProps {
    layout?: BoxLayout;
    redeemItemCodeWidget?: RedeemItemCodeWidget2Props;
}

export const RedeemItemCodeWidgetLayout = ({ layout, redeemItemCodeWidget }: RedeemItemCodeWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 282, height: 50, ...layout }}>
            <RedeemItemCodeWidget2
                layout={{ position: 'absolute', left: 38, width: 282, top: 350, height: 50 }}
                {...redeemItemCodeWidget}
            />
        </Region>
    );
};
