import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1586_layout_guild_custom_furni_xml` (layout "ctlg_guild_custom_furni", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildCustomFurni_1586LayoutProps {
    ctlgDefault3x3?: LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3Props;
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1586Layout = ({ ctlgDefault3x3, layout }: LayoutGuildCustomFurni_1586LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3 {...ctlgDefault3x3} />
        </Region>
    );
};

/** Named region `itemGridWidget` of LayoutGuildCustomFurni_1586Layout - configured through the parent's `itemGridWidget` prop. */
export interface LayoutGuildCustomFurni_1586LayoutItemGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1586LayoutItemGridWidget = ({ layout }: LayoutGuildCustomFurni_1586LayoutItemGridWidgetProps) => {
    return (
        <Region
            name="itemGridWidget"
            tags={[ 'E' ]}
            params={16}
            layout={{ position: 'absolute', left: 5, width: 170, top: 150, height: 185, ...layout }}
        />
    );
};

/** Named region `productViewWidget` of LayoutGuildCustomFurni_1586Layout - configured through the parent's `productViewWidget` prop. */
export interface LayoutGuildCustomFurni_1586LayoutProductViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1586LayoutProductViewWidget = ({ layout }: LayoutGuildCustomFurni_1586LayoutProductViewWidgetProps) => {
    return (
        <Region
            name="productViewWidget"
            params={16}
            layout={{ position: 'absolute', left: 180, width: 175, top: 150, height: 275, ...layout }}
        />
    );
};

/** Named region `guildSelectorWidget` of LayoutGuildCustomFurni_1586Layout - configured through the parent's `guildSelectorWidget` prop. */
export interface LayoutGuildCustomFurni_1586LayoutGuildSelectorWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1586LayoutGuildSelectorWidget = ({ layout }: LayoutGuildCustomFurni_1586LayoutGuildSelectorWidgetProps) => {
    return (
        <Region
            name="guildSelectorWidget"
            params={16}
            layout={{ position: 'absolute', left: 5, width: 170, top: 340, height: 85, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutGuildCustomFurni_1586Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutGuildCustomFurni_1586LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1586LayoutPurchaseWidget = ({ layout }: LayoutGuildCustomFurni_1586LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30, ...layout }}
        />
    );
};

/** Named region `specialInfoWidget` of LayoutGuildCustomFurni_1586Layout - configured through the parent's `specialInfoWidget` prop. */
export interface LayoutGuildCustomFurni_1586LayoutSpecialInfoWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1586LayoutSpecialInfoWidget = ({ layout }: LayoutGuildCustomFurni_1586LayoutSpecialInfoWidgetProps) => {
    return (
        <Region
            name="specialInfoWidget"
            params={16}
            layout={{ position: 'absolute', left: 194, width: 142, top: 118, height: 73, ...layout }}
        />
    );
};

/** Named region `activityPointDisplayWidget` of LayoutGuildCustomFurni_1586Layout - configured through the parent's `activityPointDisplayWidget` prop. */
export interface LayoutGuildCustomFurni_1586LayoutActivityPointDisplayWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1586LayoutActivityPointDisplayWidget = ({ layout }: LayoutGuildCustomFurni_1586LayoutActivityPointDisplayWidgetProps) => {
    return (
        <Region
            name="activityPointDisplayWidget"
            params={16}
            layout={{ position: 'absolute', left: 199, width: 156, top: 120, height: 28, ...layout }}
        />
    );
};

/** Named region `guildBadgeViewWidget` of LayoutGuildCustomFurni_1586Layout - configured through the parent's `guildBadgeViewWidget` prop. */
export interface LayoutGuildCustomFurni_1586LayoutGuildBadgeViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1586LayoutGuildBadgeViewWidget = ({ layout }: LayoutGuildCustomFurni_1586LayoutGuildBadgeViewWidgetProps) => {
    return (
        <Region
            name="guildBadgeViewWidget"
            layout={{ position: 'absolute', left: 202, width: 40, top: 378, height: 40, ...layout }}
        />
    );
};

/** Named region `ctlg_default_3x3` of LayoutGuildCustomFurni_1586Layout - configured through the parent's `ctlgDefault3x3` prop. */
export interface LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3Props {
    activityPointDisplayWidget?: LayoutGuildCustomFurni_1586LayoutActivityPointDisplayWidgetProps;
    captionCtlgSelectproduct?: string;
    guildBadgeViewWidget?: LayoutGuildCustomFurni_1586LayoutGuildBadgeViewWidgetProps;
    guildSelectorWidget?: LayoutGuildCustomFurni_1586LayoutGuildSelectorWidgetProps;
    itemGridWidget?: LayoutGuildCustomFurni_1586LayoutItemGridWidgetProps;
    layout?: BoxLayout;
    productViewWidget?: LayoutGuildCustomFurni_1586LayoutProductViewWidgetProps;
    purchaseWidget?: LayoutGuildCustomFurni_1586LayoutPurchaseWidgetProps;
    specialInfoWidget?: LayoutGuildCustomFurni_1586LayoutSpecialInfoWidgetProps;
}

export const LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3 = ({ activityPointDisplayWidget, captionCtlgSelectproduct, guildBadgeViewWidget, guildSelectorWidget, itemGridWidget, layout, productViewWidget, purchaseWidget, specialInfoWidget }: LayoutGuildCustomFurni_1586LayoutCtlgDefault3x3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                params={16}
                layout={{ position: 'absolute', left: 5, width: 107, top: 134, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <LayoutGuildCustomFurni_1586LayoutItemGridWidget {...itemGridWidget} />
            <LayoutGuildCustomFurni_1586LayoutProductViewWidget {...productViewWidget} />
            <LayoutGuildCustomFurni_1586LayoutGuildSelectorWidget {...guildSelectorWidget} />
            <LayoutGuildCustomFurni_1586LayoutPurchaseWidget {...purchaseWidget} />
            <LayoutGuildCustomFurni_1586LayoutSpecialInfoWidget {...specialInfoWidget} />
            <LayoutGuildCustomFurni_1586LayoutActivityPointDisplayWidget {...activityPointDisplayWidget} />
            <LayoutGuildCustomFurni_1586LayoutGuildBadgeViewWidget {...guildBadgeViewWidget} />
        </Region>
    );
};
