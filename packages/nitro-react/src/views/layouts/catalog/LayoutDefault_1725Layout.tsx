import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `1725_layout_default_xml` (layout "ctlg_default_3x3", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutDefault_1725LayoutProps {
    activityPointDisplayWidget?: LayoutDefault_1725LayoutActivityPointDisplayWidgetProps;
    bundlePurchaseExtraInfoWidget?: LayoutDefault_1725LayoutBundlePurchaseExtraInfoWidgetProps;
    itemGridWidget?: LayoutDefault_1725LayoutItemGridWidgetProps;
    layout?: BoxLayout;
    limitedItemWidget?: LayoutDefault_1725LayoutLimitedItemWidgetProps;
    productViewWidget?: LayoutDefault_1725LayoutProductViewWidgetProps;
    purchaseWidget?: LayoutDefault_1725LayoutPurchaseWidgetProps;
    soldLtdItemsWidget?: LayoutDefault_1725LayoutSoldLtdItemsWidgetProps;
    specialInfoWidget?: LayoutDefault_1725LayoutSpecialInfoWidgetProps;
    spinnerWidget?: LayoutDefault_1725LayoutSpinnerWidgetProps;
    totalPriceWidget?: LayoutDefault_1725LayoutTotalPriceWidgetProps;
}

export const LayoutDefault_1725Layout = ({ activityPointDisplayWidget, bundlePurchaseExtraInfoWidget, itemGridWidget, layout, limitedItemWidget, productViewWidget, purchaseWidget, soldLtdItemsWidget, specialInfoWidget, spinnerWidget, totalPriceWidget }: LayoutDefault_1725LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <LayoutDefault_1725LayoutProductViewWidget {...productViewWidget} />
                <LayoutDefault_1725LayoutItemGridWidget {...itemGridWidget} />
                <LayoutDefault_1725LayoutPurchaseWidget {...purchaseWidget} />
                <LayoutDefault_1725LayoutActivityPointDisplayWidget {...activityPointDisplayWidget} />
                <LayoutDefault_1725LayoutSpecialInfoWidget {...specialInfoWidget} />
                <LayoutDefault_1725LayoutBundlePurchaseExtraInfoWidget {...bundlePurchaseExtraInfoWidget} />
                <LayoutDefault_1725LayoutSpinnerWidget {...spinnerWidget} />
                <LayoutDefault_1725LayoutTotalPriceWidget {...totalPriceWidget} />
                <LayoutDefault_1725LayoutLimitedItemWidget {...limitedItemWidget} />
                <LayoutDefault_1725LayoutSoldLtdItemsWidget {...soldLtdItemsWidget} />
            </Region>
        </Region>
    );
};

/** Named region `productViewWidget` of LayoutDefault_1725Layout - configured through the parent's `productViewWidget` prop. */
export interface LayoutDefault_1725LayoutProductViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1725LayoutProductViewWidget = ({ layout }: LayoutDefault_1725LayoutProductViewWidgetProps) => {
    return (
        <Region
            name="productViewWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 120, height: 180, ...layout }}
        />
    );
};

/** Named region `itemGridWidget` of LayoutDefault_1725Layout - configured through the parent's `itemGridWidget` prop. */
export interface LayoutDefault_1725LayoutItemGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1725LayoutItemGridWidget = ({ layout }: LayoutDefault_1725LayoutItemGridWidgetProps) => {
    return (
        <Region
            name="itemGridWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 305, height: 120, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutDefault_1725Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutDefault_1725LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1725LayoutPurchaseWidget = ({ layout }: LayoutDefault_1725LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30, ...layout }}
        />
    );
};

/** Named region `activityPointDisplayWidget` of LayoutDefault_1725Layout - configured through the parent's `activityPointDisplayWidget` prop. */
export interface LayoutDefault_1725LayoutActivityPointDisplayWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1725LayoutActivityPointDisplayWidget = ({ layout }: LayoutDefault_1725LayoutActivityPointDisplayWidgetProps) => {
    return (
        <Region
            name="activityPointDisplayWidget"
            layout={{ position: 'absolute', left: 183, width: 175, top: 123, height: 25, ...layout }}
        />
    );
};

/** Named region `specialInfoWidget` of LayoutDefault_1725Layout - configured through the parent's `specialInfoWidget` prop. */
export interface LayoutDefault_1725LayoutSpecialInfoWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1725LayoutSpecialInfoWidget = ({ layout }: LayoutDefault_1725LayoutSpecialInfoWidgetProps) => {
    return (
        <Region
            name="specialInfoWidget"
            params={16}
            layout={{ position: 'absolute', left: 114, width: 142, top: 118, height: 73, ...layout }}
        />
    );
};

/** Named region `bundlePurchaseExtraInfoWidget` of LayoutDefault_1725Layout - configured through the parent's `bundlePurchaseExtraInfoWidget` prop. */
export interface LayoutDefault_1725LayoutBundlePurchaseExtraInfoWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1725LayoutBundlePurchaseExtraInfoWidget = ({ layout }: LayoutDefault_1725LayoutBundlePurchaseExtraInfoWidgetProps) => {
    return (
        <Region
            name="bundlePurchaseExtraInfoWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 120, height: 155, ...layout }}
        />
    );
};

/** Named region `spinnerWidget` of LayoutDefault_1725Layout - configured through the parent's `spinnerWidget` prop. */
export interface LayoutDefault_1725LayoutSpinnerWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1725LayoutSpinnerWidget = ({ layout }: LayoutDefault_1725LayoutSpinnerWidgetProps) => {
    return (
        <Region
            name="spinnerWidget"
            params={147456}
            layout={{ position: 'absolute', left: 0, width: 180, top: 275, height: 25, ...layout }}
        />
    );
};

/** Named region `totalPriceWidget` of LayoutDefault_1725Layout - configured through the parent's `totalPriceWidget` prop. */
export interface LayoutDefault_1725LayoutTotalPriceWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1725LayoutTotalPriceWidget = ({ layout }: LayoutDefault_1725LayoutTotalPriceWidgetProps) => {
    return (
        <Region
            name="totalPriceWidget"
            params={147456}
            layout={{ position: 'absolute', left: 180, width: 180, top: 275, height: 25, ...layout }}
        />
    );
};

/** Named region `limitedItemWidget` of LayoutDefault_1725Layout - configured through the parent's `limitedItemWidget` prop. */
export interface LayoutDefault_1725LayoutLimitedItemWidgetProps {
    layout?: BoxLayout;
    visibleLimitedItemWidget?: boolean;
}

export const LayoutDefault_1725LayoutLimitedItemWidget = ({ layout, visibleLimitedItemWidget }: LayoutDefault_1725LayoutLimitedItemWidgetProps) => {
    return (
        <Region
            name="limitedItemWidget"
            visible={visibleLimitedItemWidget ?? false}
            layout={{ position: 'absolute', left: 187, width: 174, top: 122, height: 40, ...layout }}
        >
            <WidgetSlot
                widgetType="limited_item_overlay_supply"
                name="unique_item_overlay_container"
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 40 }}
            />
        </Region>
    );
};

/** Named region `soldLtdItemsWidget` of LayoutDefault_1725Layout - configured through the parent's `soldLtdItemsWidget` prop. */
export interface LayoutDefault_1725LayoutSoldLtdItemsWidgetProps {
    layout?: BoxLayout;
}

export const LayoutDefault_1725LayoutSoldLtdItemsWidget = ({ layout }: LayoutDefault_1725LayoutSoldLtdItemsWidgetProps) => {
    return (
        <Region
            name="soldLtdItemsWidget"
            layout={{ position: 'absolute', left: 0, width: 360, top: 425, height: 30, ...layout }}
        />
    );
};
