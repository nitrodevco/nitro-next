import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1680_layout_guild_custom_furni_xml` (layout "ctlg_guild_custom_furni", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildCustomFurni_1680LayoutProps {
    ctlgDefault3x3?: LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3Props;
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1680Layout = ({ ctlgDefault3x3, layout }: LayoutGuildCustomFurni_1680LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3 {...ctlgDefault3x3} />
        </Region>
    );
};

/** Named region `itemGridWidget` of LayoutGuildCustomFurni_1680Layout - configured through the parent's `itemGridWidget` prop. */
export interface LayoutGuildCustomFurni_1680LayoutItemGridWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1680LayoutItemGridWidget = ({ layout }: LayoutGuildCustomFurni_1680LayoutItemGridWidgetProps) => {
    return (
        <Region
            name="itemGridWidget"
            tags={[ 'E' ]}
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 245, bottom: 90, ...layout }}
        />
    );
};

/** Named region `productViewWidget` of LayoutGuildCustomFurni_1680Layout - configured through the parent's `productViewWidget` prop. */
export interface LayoutGuildCustomFurni_1680LayoutProductViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1680LayoutProductViewWidget = ({ layout }: LayoutGuildCustomFurni_1680LayoutProductViewWidgetProps) => {
    return (
        <Region
            name="productViewWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240, ...layout }}
        />
    );
};

/** Named region `guildSelectorWidget` of LayoutGuildCustomFurni_1680Layout - configured through the parent's `guildSelectorWidget` prop. */
export interface LayoutGuildCustomFurni_1680LayoutGuildSelectorWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1680LayoutGuildSelectorWidget = ({ layout }: LayoutGuildCustomFurni_1680LayoutGuildSelectorWidgetProps) => {
    return (
        <Region
            name="guildSelectorWidget"
            params={1040}
            layout={{ position: 'absolute', left: 90, width: 180, bottom: 0, height: 85, ...layout }}
        />
    );
};

/** Named region `specialInfoWidget` of LayoutGuildCustomFurni_1680Layout - configured through the parent's `specialInfoWidget` prop. */
export interface LayoutGuildCustomFurni_1680LayoutSpecialInfoWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1680LayoutSpecialInfoWidget = ({ layout }: LayoutGuildCustomFurni_1680LayoutSpecialInfoWidgetProps) => {
    return (
        <Region
            name="specialInfoWidget"
            params={16}
            layout={{ position: 'absolute', left: 94, width: 142, top: 18, height: 73, ...layout }}
        />
    );
};

/** Named region `activityPointDisplayWidget` of LayoutGuildCustomFurni_1680Layout - configured through the parent's `activityPointDisplayWidget` prop. */
export interface LayoutGuildCustomFurni_1680LayoutActivityPointDisplayWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1680LayoutActivityPointDisplayWidget = ({ layout }: LayoutGuildCustomFurni_1680LayoutActivityPointDisplayWidgetProps) => {
    return (
        <Region
            name="activityPointDisplayWidget"
            params={16}
            layout={{ position: 'absolute', left: 199, width: 156, top: 190, height: 28, ...layout }}
        />
    );
};

/** Named region `guildBadgeViewWidget` of LayoutGuildCustomFurni_1680Layout - configured through the parent's `guildBadgeViewWidget` prop. */
export interface LayoutGuildCustomFurni_1680LayoutGuildBadgeViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1680LayoutGuildBadgeViewWidget = ({ layout }: LayoutGuildCustomFurni_1680LayoutGuildBadgeViewWidgetProps) => {
    return (
        <Region
            name="guildBadgeViewWidget"
            layout={{ position: 'absolute', left: 307, width: 40, top: 138, height: 40, ...layout }}
        />
    );
};

/** Named region `purchaseWidget` of LayoutGuildCustomFurni_1680Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutGuildCustomFurni_1680LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1680LayoutPurchaseWidget = ({ layout }: LayoutGuildCustomFurni_1680LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30, ...layout }}
        />
    );
};

/** Named region `ctlg_default_3x3` of LayoutGuildCustomFurni_1680Layout - configured through the parent's `ctlgDefault3x3` prop. */
export interface LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3Props {
    activityPointDisplayWidget?: LayoutGuildCustomFurni_1680LayoutActivityPointDisplayWidgetProps;
    captionCtlgSelectproduct?: string;
    guildBadgeViewWidget?: LayoutGuildCustomFurni_1680LayoutGuildBadgeViewWidgetProps;
    guildSelectorWidget?: LayoutGuildCustomFurni_1680LayoutGuildSelectorWidgetProps;
    itemGridWidget?: LayoutGuildCustomFurni_1680LayoutItemGridWidgetProps;
    layout?: BoxLayout;
    productViewWidget?: LayoutGuildCustomFurni_1680LayoutProductViewWidgetProps;
    purchaseWidget?: LayoutGuildCustomFurni_1680LayoutPurchaseWidgetProps;
    specialInfoWidget?: LayoutGuildCustomFurni_1680LayoutSpecialInfoWidgetProps;
}

export const LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3 = ({ activityPointDisplayWidget, captionCtlgSelectproduct, guildBadgeViewWidget, guildSelectorWidget, itemGridWidget, layout, productViewWidget, purchaseWidget, specialInfoWidget }: LayoutGuildCustomFurni_1680LayoutCtlgDefault3x3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 5, width: 107, top: 134, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <LayoutGuildCustomFurni_1680LayoutItemGridWidget {...itemGridWidget} />
            <LayoutGuildCustomFurni_1680LayoutProductViewWidget {...productViewWidget} />
            <LayoutGuildCustomFurni_1680LayoutGuildSelectorWidget {...guildSelectorWidget} />
            <LayoutGuildCustomFurni_1680LayoutSpecialInfoWidget {...specialInfoWidget} />
            <LayoutGuildCustomFurni_1680LayoutActivityPointDisplayWidget {...activityPointDisplayWidget} />
            <LayoutGuildCustomFurni_1680LayoutGuildBadgeViewWidget {...guildBadgeViewWidget} />
            <LayoutGuildCustomFurni_1680LayoutPurchaseWidget {...purchaseWidget} />
        </Region>
    );
};
