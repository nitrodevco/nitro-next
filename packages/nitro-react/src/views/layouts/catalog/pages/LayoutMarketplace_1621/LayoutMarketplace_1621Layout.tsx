import { BoxLayout, Region } from '#base/theme';

import { LayoutMarketplace_1621LayoutCtlgMarketplace, LayoutMarketplace_1621LayoutCtlgMarketplaceProps } from './LayoutMarketplace_1621LayoutCtlgMarketplace';

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
