import { BoxLayout, Region } from '#base/theme';

/** Generated from `1691_layout_marketplace_own_items_xml` (layout "ctlg_marketplace", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMarketplaceOwnItems_1691LayoutProps {
    layout?: BoxLayout;
}

export const LayoutMarketplaceOwnItems_1691Layout = ({ layout }: LayoutMarketplaceOwnItems_1691LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_marketplace_own_items"
                params={16}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="marketPlaceOwnItemsWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 340, top: 70, height: 390 }}
                />
            </Region>
        </Region>
    );
};
