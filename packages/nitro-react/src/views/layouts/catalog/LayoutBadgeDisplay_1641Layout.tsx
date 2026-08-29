import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1641_layout_badge_display_xml` (layout "ctlg_badge_display", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBadgeDisplay_1641LayoutProps {
    ctlgBadgedisplay?: LayoutBadgeDisplay_1641LayoutCtlgBadgedisplayProps;
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1641Layout = ({ ctlgBadgedisplay, layout }: LayoutBadgeDisplay_1641LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutBadgeDisplay_1641LayoutCtlgBadgedisplay {...ctlgBadgedisplay} />
        </Region>
    );
};

/** Named region `productViewWidget` of LayoutBadgeDisplay_1641Layout - configured through the parent's `productViewWidget` prop. */
export interface LayoutBadgeDisplay_1641LayoutProductViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1641LayoutProductViewWidget = ({ layout }: LayoutBadgeDisplay_1641LayoutProductViewWidgetProps) => {
    return (
        <Region
            name="productViewWidget"
            params={16}
            layout={{ position: 'absolute', left: 180, width: 175, top: 150, height: 248, ...layout }}
        />
    );
};

/** Named region `specialInfoWidget` of LayoutBadgeDisplay_1641Layout - configured through the parent's `specialInfoWidget` prop. */
export interface LayoutBadgeDisplay_1641LayoutSpecialInfoWidgetProps {
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1641LayoutSpecialInfoWidget = ({ layout }: LayoutBadgeDisplay_1641LayoutSpecialInfoWidgetProps) => {
    return (
        <Region
            name="specialInfoWidget"
            params={16}
            layout={{ position: 'absolute', left: 169, width: 142, top: 118, height: 73, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutBadgeDisplay_1641Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutBadgeDisplay_1641LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1641LayoutPurchaseWidget = ({ layout }: LayoutBadgeDisplay_1641LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30, ...layout }}
        />
    );
};

/** Named region `itemGridWidget` of LayoutBadgeDisplay_1641Layout - configured through the parent's `itemGridWidget` prop. */
export interface LayoutBadgeDisplay_1641LayoutItemGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1641LayoutItemGridWidget = ({ layout }: LayoutBadgeDisplay_1641LayoutItemGridWidgetProps) => {
    return (
        <Region
            name="itemGridWidget"
            params={16}
            layout={{ position: 'absolute', left: 5, width: 170, top: 150, height: 73, ...layout }}
        />
    );
};

/** Named region `limitedItemWidget` of LayoutBadgeDisplay_1641Layout - configured through the parent's `limitedItemWidget` prop. */
export interface LayoutBadgeDisplay_1641LayoutLimitedItemWidgetProps {
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1641LayoutLimitedItemWidget = ({ layout }: LayoutBadgeDisplay_1641LayoutLimitedItemWidgetProps) => {
    return (
        <Region
            name="limitedItemWidget"
            layout={{ position: 'absolute', left: 181, width: 170, top: 400, height: 30, ...layout }}
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

/** Named region `badgeGrid` of LayoutBadgeDisplay_1641Layout - configured through the parent's `badgeGrid` prop. */
export interface LayoutBadgeDisplay_1641LayoutBadgeGridProps {
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1641LayoutBadgeGrid = ({ layout }: LayoutBadgeDisplay_1641LayoutBadgeGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 195, ...layout }}
        >
            <Region
                name="badgeGrid"
                params={16}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `userBadgeSelectorWidget` of LayoutBadgeDisplay_1641Layout - configured through the parent's `userBadgeSelectorWidget` prop. */
export interface LayoutBadgeDisplay_1641LayoutUserBadgeSelectorWidgetProps {
    badgeGrid?: LayoutBadgeDisplay_1641LayoutBadgeGridProps;
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1641LayoutUserBadgeSelectorWidget = ({ badgeGrid, layout }: LayoutBadgeDisplay_1641LayoutUserBadgeSelectorWidgetProps) => {
    return (
        <Region
            name="userBadgeSelectorWidget"
            params={16}
            layout={{ position: 'absolute', left: 4, width: 170, top: 242, height: 175, ...layout }}
        >
            <LayoutBadgeDisplay_1641LayoutBadgeGrid {...badgeGrid} />
        </Region>
    );
};

/** Named region `ctlg_badgedisplay` of LayoutBadgeDisplay_1641Layout - configured through the parent's `ctlgBadgedisplay` prop. */
export interface LayoutBadgeDisplay_1641LayoutCtlgBadgedisplayProps {
    captionCtlgSelectbadge?: string;
    captionCtlgSelectproduct?: string;
    itemGridWidget?: LayoutBadgeDisplay_1641LayoutItemGridWidgetProps;
    layout?: BoxLayout;
    limitedItemWidget?: LayoutBadgeDisplay_1641LayoutLimitedItemWidgetProps;
    productViewWidget?: LayoutBadgeDisplay_1641LayoutProductViewWidgetProps;
    purchaseWidget?: LayoutBadgeDisplay_1641LayoutPurchaseWidgetProps;
    specialInfoWidget?: LayoutBadgeDisplay_1641LayoutSpecialInfoWidgetProps;
    userBadgeSelectorWidget?: LayoutBadgeDisplay_1641LayoutUserBadgeSelectorWidgetProps;
}

export const LayoutBadgeDisplay_1641LayoutCtlgBadgedisplay = ({ captionCtlgSelectbadge, captionCtlgSelectproduct, itemGridWidget, layout, limitedItemWidget, productViewWidget, purchaseWidget, specialInfoWidget, userBadgeSelectorWidget }: LayoutBadgeDisplay_1641LayoutCtlgBadgedisplayProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_badgedisplay"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                params={16}
                layout={{ position: 'absolute', left: 5, width: 107, top: 130, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <LayoutBadgeDisplay_1641LayoutProductViewWidget {...productViewWidget} />
            <LayoutBadgeDisplay_1641LayoutSpecialInfoWidget {...specialInfoWidget} />
            <LayoutBadgeDisplay_1641LayoutPurchaseWidget {...purchaseWidget} />
            <LayoutBadgeDisplay_1641LayoutItemGridWidget {...itemGridWidget} />
            <LayoutBadgeDisplay_1641LayoutLimitedItemWidget {...limitedItemWidget} />
            <Region
                name="ctlg_selectbadge"
                params={16}
                layout={{ position: 'absolute', left: 5, width: 100, top: 227, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectbadge ?? t('catalog_selectbadge')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <LayoutBadgeDisplay_1641LayoutUserBadgeSelectorWidget {...userBadgeSelectorWidget} />
        </Region>
    );
};
