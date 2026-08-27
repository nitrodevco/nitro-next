import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `1725_layout_default_xml` (layout "ctlg_default_3x3", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutDefault_1725LayoutProps {
    layout?: BoxLayout;
    visibleLimitedItemWidget?: boolean;
}

export const LayoutDefault_1725Layout = ({ layout, visibleLimitedItemWidget }: LayoutDefault_1725LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="productViewWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 120, height: 180 }}
                />
                <Region
                    name="itemGridWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 305, height: 120 }}
                />
                <Region
                    name="purchaseWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                />
                <Region
                    name="activityPointDisplayWidget"
                    layout={{ position: 'absolute', left: 183, width: 175, top: 123, height: 25 }}
                />
                <Region
                    name="specialInfoWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 114, width: 142, top: 118, height: 73 }}
                />
                <Region
                    name="bundlePurchaseExtraInfoWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 120, height: 155 }}
                />
                <Region
                    name="spinnerWidget"
                    params={147456}
                    layout={{ position: 'absolute', left: 0, width: 180, top: 275, height: 25 }}
                />
                <Region
                    name="totalPriceWidget"
                    params={147456}
                    layout={{ position: 'absolute', left: 180, width: 180, top: 275, height: 25 }}
                />
                <Region
                    name="limitedItemWidget"
                    visible={visibleLimitedItemWidget ?? false}
                    layout={{ position: 'absolute', left: 187, width: 174, top: 122, height: 40 }}
                >
                    <WidgetSlot
                        widgetType="limited_item_overlay_supply"
                        name="unique_item_overlay_container"
                        params={147472}
                        layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 40 }}
                    />
                </Region>
                <Region
                    name="soldLtdItemsWidget"
                    layout={{ position: 'absolute', left: 0, width: 360, top: 425, height: 30 }}
                />
            </Region>
        </Region>
    );
};
