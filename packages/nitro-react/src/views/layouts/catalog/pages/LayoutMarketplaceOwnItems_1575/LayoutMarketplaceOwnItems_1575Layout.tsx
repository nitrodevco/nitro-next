import { BoxLayout, Region } from '#base/theme';

import { LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItems, LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItemsProps } from './LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItems';

/** Generated from `1575_layout_marketplace_own_items_xml` (layout "ctlg_marketplace", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMarketplaceOwnItems_1575LayoutProps {
    ctlgMarketplaceOwnItems?: LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItemsProps;
    layout?: BoxLayout;
}

export const LayoutMarketplaceOwnItems_1575Layout = ({ ctlgMarketplaceOwnItems, layout }: LayoutMarketplaceOwnItems_1575LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutMarketplaceOwnItems_1575LayoutCtlgMarketplaceOwnItems {...ctlgMarketplaceOwnItems} />
        </Region>
    );
};
