import { BoxLayout, Region } from '#base/theme';

/** Generated from `1633_layout_marketplace_xml` (layout "ctlg_marketplace", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutMarketplace_1633LayoutProps {
    layout?: BoxLayout;
}

export const LayoutMarketplace_1633Layout = ({ layout }: LayoutMarketplace_1633LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_marketplace"
                params={16}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="marketPlaceWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 70, height: 390 }}
                />
            </Region>
        </Region>
    );
};
