import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1724_layout_guild_forum_xml` (layout "layout_guild_forum", 360x662) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildForumLayoutProps {
    ctlgDefault3x3?: LayoutGuildForumLayoutCtlgDefault3x3Props;
    layout?: BoxLayout;
}

export const LayoutGuildForumLayout = ({ ctlgDefault3x3, layout }: LayoutGuildForumLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 662, ...layout }}>
            <LayoutGuildForumLayoutCtlgDefault3x3 {...ctlgDefault3x3} />
        </Region>
    );
};

/** Named region `firstProductAutoSelectorWidget` of LayoutGuildForumLayout - configured through the parent's `firstProductAutoSelectorWidget` prop. */
export interface LayoutGuildForumLayoutFirstProductAutoSelectorWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildForumLayoutFirstProductAutoSelectorWidget = ({ layout }: LayoutGuildForumLayoutFirstProductAutoSelectorWidgetProps) => {
    return (
        <Region
            name="firstProductAutoSelectorWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30, ...layout }}
        />
    );
};

/** Named region `simplePriceWidget` of LayoutGuildForumLayout - configured through the parent's `simplePriceWidget` prop. */
export interface LayoutGuildForumLayoutSimplePriceWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildForumLayoutSimplePriceWidget = ({ layout }: LayoutGuildForumLayoutSimplePriceWidgetProps) => {
    return (
        <Region
            name="simplePriceWidget"
            params={1024}
            layout={{ position: 'absolute', left: 48, width: 47, bottom: 91, height: 28, ...layout }}
        />
    );
};

/** Named region `guildBadgeViewWidget` of LayoutGuildForumLayout - configured through the parent's `guildBadgeViewWidget` prop. */
export interface LayoutGuildForumLayoutGuildBadgeViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildForumLayoutGuildBadgeViewWidget = ({ layout }: LayoutGuildForumLayoutGuildBadgeViewWidgetProps) => {
    return (
        <Region
            name="guildBadgeViewWidget"
            params={1024}
            layout={{ position: 'absolute', left: 271, width: 40, bottom: 70, height: 40, ...layout }}
        />
    );
};

/** Named region `guildForumSelectorWidget` of LayoutGuildForumLayout - configured through the parent's `guildForumSelectorWidget` prop. */
export interface LayoutGuildForumLayoutGuildForumSelectorWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildForumLayoutGuildForumSelectorWidget = ({ layout }: LayoutGuildForumLayoutGuildForumSelectorWidgetProps) => {
    return (
        <Region
            name="guildForumSelectorWidget"
            params={1040}
            layout={{ position: 'absolute', left: 90, width: 180, bottom: 25, height: 85, ...layout }}
        />
    );
};

/** Named region `warningWidget` of LayoutGuildForumLayout - configured through the parent's `warningWidget` prop. */
export interface LayoutGuildForumLayoutWarningWidgetProps {
    captionWarningText?: string;
    layout?: BoxLayout;
}

export const LayoutGuildForumLayoutWarningWidget = ({ captionWarningText, layout }: LayoutGuildForumLayoutWarningWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="warningWidget"
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 30, height: 32, ...layout }}
        >
            <Region
                name="warning_text"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionWarningText ?? t('catalog.alert.group_has_forum')}
                    textOptions={{ fill: '#6f0000', wordWrap: true, wordWrapWidth: 360 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `purchaseWidget` of LayoutGuildForumLayout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutGuildForumLayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutGuildForumLayoutPurchaseWidget = ({ layout }: LayoutGuildForumLayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            tags={[ 'NO_GIFT_OPTION' ]}
            params={1040}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30, ...layout }}
        />
    );
};

/** Named region `ctlg_default_3x3` of LayoutGuildForumLayout - configured through the parent's `ctlgDefault3x3` prop. */
export interface LayoutGuildForumLayoutCtlgDefault3x3Props {
    captionCtlgDescription?: string;
    captionCtlgSelectproduct?: string;
    firstProductAutoSelectorWidget?: LayoutGuildForumLayoutFirstProductAutoSelectorWidgetProps;
    guildBadgeViewWidget?: LayoutGuildForumLayoutGuildBadgeViewWidgetProps;
    guildForumSelectorWidget?: LayoutGuildForumLayoutGuildForumSelectorWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: LayoutGuildForumLayoutPurchaseWidgetProps;
    simplePriceWidget?: LayoutGuildForumLayoutSimplePriceWidgetProps;
    warningWidget?: LayoutGuildForumLayoutWarningWidgetProps;
}

export const LayoutGuildForumLayoutCtlgDefault3x3 = ({ captionCtlgDescription, captionCtlgSelectproduct, firstProductAutoSelectorWidget, guildBadgeViewWidget, guildForumSelectorWidget, layout, purchaseWidget, simplePriceWidget, warningWidget }: LayoutGuildForumLayoutCtlgDefault3x3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <LayoutGuildForumLayoutFirstProductAutoSelectorWidget {...firstProductAutoSelectorWidget} />
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
            <Region
                name="ctlg_description"
                tags={[ 'E' ]}
                params={2049}
                layout={{ position: 'absolute', left: 0, width: 260, top: 10, bottom: 124, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('loremipsum.html')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                />
            </Region>
            <ThemeImage
                params={16}
                src="${image.library.url}catalogue/guild_forums_teaser.gif"
                layout={{ position: 'absolute', left: 254, width: 106, top: 35, height: 200 }}
            />
            <LayoutGuildForumLayoutSimplePriceWidget {...simplePriceWidget} />
            <LayoutGuildForumLayoutGuildBadgeViewWidget {...guildBadgeViewWidget} />
            <LayoutGuildForumLayoutGuildForumSelectorWidget {...guildForumSelectorWidget} />
            <LayoutGuildForumLayoutWarningWidget {...warningWidget} />
            <LayoutGuildForumLayoutPurchaseWidget {...purchaseWidget} />
        </Region>
    );
};
