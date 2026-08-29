import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1669_layout_badge_display_xml` (layout "ctlg_badge_display", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBadgeDisplay_1669LayoutProps {
    ctlgBadgedisplay?: LayoutBadgeDisplay_1669LayoutCtlgBadgedisplayProps;
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1669Layout = ({ ctlgBadgedisplay, layout }: LayoutBadgeDisplay_1669LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutBadgeDisplay_1669LayoutCtlgBadgedisplay {...ctlgBadgedisplay} />
        </Region>
    );
};

/** Named region `productViewWidget` of LayoutBadgeDisplay_1669Layout - configured through the parent's `productViewWidget` prop. */
export interface LayoutBadgeDisplay_1669LayoutProductViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1669LayoutProductViewWidget = ({ layout }: LayoutBadgeDisplay_1669LayoutProductViewWidgetProps) => {
    return (
        <Region
            name="productViewWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240, ...layout }}
        />
    );
};

/** Named region `specialInfoWidget` of LayoutBadgeDisplay_1669Layout - configured through the parent's `specialInfoWidget` prop. */
export interface LayoutBadgeDisplay_1669LayoutSpecialInfoWidgetProps {
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1669LayoutSpecialInfoWidget = ({ layout }: LayoutBadgeDisplay_1669LayoutSpecialInfoWidgetProps) => {
    return (
        <Region
            name="specialInfoWidget"
            params={16}
            layout={{ position: 'absolute', left: 99, width: 142, top: 13, height: 73, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutBadgeDisplay_1669Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutBadgeDisplay_1669LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1669LayoutPurchaseWidget = ({ layout }: LayoutBadgeDisplay_1669LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30, ...layout }}
        />
    );
};

/** Named region `itemGridWidget` of LayoutBadgeDisplay_1669Layout - configured through the parent's `itemGridWidget` prop. */
export interface LayoutBadgeDisplay_1669LayoutItemGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1669LayoutItemGridWidget = ({ layout }: LayoutBadgeDisplay_1669LayoutItemGridWidgetProps) => {
    return (
        <Region
            name="itemGridWidget"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 95, top: 245, bottom: 40, ...layout }}
        />
    );
};

/** Named region `limitedItemWidget` of LayoutBadgeDisplay_1669Layout - configured through the parent's `limitedItemWidget` prop. */
export interface LayoutBadgeDisplay_1669LayoutLimitedItemWidgetProps {
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1669LayoutLimitedItemWidget = ({ layout }: LayoutBadgeDisplay_1669LayoutLimitedItemWidgetProps) => {
    return (
        <Region
            name="limitedItemWidget"
            layout={{ position: 'absolute', left: 180, width: 170, top: 20, height: 30, ...layout }}
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

/** Named region `cancel_search_btn` of LayoutBadgeDisplay_1669Layout - configured through the parent's `cancelSearchBtn` prop. */
export interface LayoutBadgeDisplay_1669LayoutCancelSearchBtnProps {
    layout?: BoxLayout;
    onCancelSearchBtn?: () => void;
    visibleCancelSearchBtn?: boolean;
}

export const LayoutBadgeDisplay_1669LayoutCancelSearchBtn = ({ layout, onCancelSearchBtn, visibleCancelSearchBtn }: LayoutBadgeDisplay_1669LayoutCancelSearchBtnProps) => {
    return (
        <Region
            name="cancel_search_btn"
            params={81}
            visible={visibleCancelSearchBtn ?? false}
            onPointerTap={onCancelSearchBtn}
            cursor="pointer"
            layout={{ position: 'absolute', right: 4, width: 19, top: 3, height: 19, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('icons_close.png')}
                layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 12 }}
            />
        </Region>
    );
};

/** Named region `badgeGrid` of LayoutBadgeDisplay_1669Layout - configured through the parent's `badgeGrid` prop. */
export interface LayoutBadgeDisplay_1669LayoutBadgeGridProps {
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1669LayoutBadgeGrid = ({ layout }: LayoutBadgeDisplay_1669LayoutBadgeGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 0, top: 30, bottom: 0, ...layout }}
        >
            <Region
                name="badgeGrid"
                params={2192}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `userBadgeSelectorWidget` of LayoutBadgeDisplay_1669Layout - configured through the parent's `userBadgeSelectorWidget` prop. */
export interface LayoutBadgeDisplay_1669LayoutUserBadgeSelectorWidgetProps {
    badgeGrid?: LayoutBadgeDisplay_1669LayoutBadgeGridProps;
    cancelSearchBtn?: LayoutBadgeDisplay_1669LayoutCancelSearchBtnProps;
    captionSearchPlaceholder?: string;
    layout?: BoxLayout;
}

export const LayoutBadgeDisplay_1669LayoutUserBadgeSelectorWidget = ({ badgeGrid, cancelSearchBtn, captionSearchPlaceholder, layout }: LayoutBadgeDisplay_1669LayoutUserBadgeSelectorWidgetProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region
            name="userBadgeSelectorWidget"
            params={2064}
            layout={{ position: 'absolute', left: 105, width: 255, top: 245, bottom: 40, ...layout }}
        >
            <Border
                variant="105"
                name="search_input_border"
                params={144}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26 }}
            >
                <TextInput
                    value={searchInputValue}
                    onChange={setSearchInputValue}
                    maxLength={40}
                    layout={{ position: 'absolute', left: 6, right: 78, top: 3, height: 19, minWidth: 171, maxWidth: 171 }}
                />
                <Region
                    name="search_placeholder"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 83, top: 3, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSearchPlaceholder ?? t('generic.search')}
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
                <LayoutBadgeDisplay_1669LayoutCancelSearchBtn {...cancelSearchBtn} />
            </Border>
            <LayoutBadgeDisplay_1669LayoutBadgeGrid {...badgeGrid} />
        </Region>
    );
};

/** Named region `ctlg_badgedisplay` of LayoutBadgeDisplay_1669Layout - configured through the parent's `ctlgBadgedisplay` prop. */
export interface LayoutBadgeDisplay_1669LayoutCtlgBadgedisplayProps {
    captionCtlgSelectbadge?: string;
    captionCtlgSelectproduct?: string;
    itemGridWidget?: LayoutBadgeDisplay_1669LayoutItemGridWidgetProps;
    layout?: BoxLayout;
    limitedItemWidget?: LayoutBadgeDisplay_1669LayoutLimitedItemWidgetProps;
    productViewWidget?: LayoutBadgeDisplay_1669LayoutProductViewWidgetProps;
    purchaseWidget?: LayoutBadgeDisplay_1669LayoutPurchaseWidgetProps;
    specialInfoWidget?: LayoutBadgeDisplay_1669LayoutSpecialInfoWidgetProps;
    userBadgeSelectorWidget?: LayoutBadgeDisplay_1669LayoutUserBadgeSelectorWidgetProps;
}

export const LayoutBadgeDisplay_1669LayoutCtlgBadgedisplay = ({ captionCtlgSelectbadge, captionCtlgSelectproduct, itemGridWidget, layout, limitedItemWidget, productViewWidget, purchaseWidget, specialInfoWidget, userBadgeSelectorWidget }: LayoutBadgeDisplay_1669LayoutCtlgBadgedisplayProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_badgedisplay"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                params={1040}
                visible={false}
                layout={{ position: 'absolute', left: 5, width: 107, bottom: 40, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <LayoutBadgeDisplay_1669LayoutProductViewWidget {...productViewWidget} />
            <LayoutBadgeDisplay_1669LayoutSpecialInfoWidget {...specialInfoWidget} />
            <LayoutBadgeDisplay_1669LayoutPurchaseWidget {...purchaseWidget} />
            <LayoutBadgeDisplay_1669LayoutItemGridWidget {...itemGridWidget} />
            <LayoutBadgeDisplay_1669LayoutLimitedItemWidget {...limitedItemWidget} />
            <Region
                name="ctlg_selectbadge"
                params={1040}
                visible={false}
                layout={{ position: 'absolute', left: 190, width: 100, bottom: 44, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectbadge ?? t('catalog_selectbadge')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <LayoutBadgeDisplay_1669LayoutUserBadgeSelectorWidget {...userBadgeSelectorWidget} />
        </Region>
    );
};
