import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { FirstProductAutoSelectorWidget, FirstProductAutoSelectorWidgetProps } from '#base/views/layouts/catalog/widgets/FirstProductAutoSelectorWidget';
import { GuildBadgeViewWidget, GuildBadgeViewWidgetProps } from '#base/views/layouts/catalog/widgets/GuildBadgeViewWidget';
import { GuildForumSelectorWidget, GuildForumSelectorWidgetProps } from '#base/views/layouts/catalog/widgets/GuildForumSelectorWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SimplePriceWidget2, SimplePriceWidget2Props } from '#base/views/layouts/catalog/widgets/SimplePriceWidget2';
import { WarningWidget, WarningWidgetProps } from '#base/views/layouts/catalog/widgets/WarningWidget';

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

/** Named region `ctlg_default_3x3` of LayoutGuildForumLayout - configured through the parent's `ctlgDefault3x3` prop. */
export interface LayoutGuildForumLayoutCtlgDefault3x3Props {
    captionCtlgDescription?: string;
    captionCtlgSelectproduct?: string;
    firstProductAutoSelectorWidget?: FirstProductAutoSelectorWidgetProps;
    guildBadgeViewWidget?: GuildBadgeViewWidgetProps;
    guildForumSelectorWidget?: GuildForumSelectorWidgetProps;
    layout?: BoxLayout;
    purchaseWidget?: PurchaseWidgetProps;
    simplePriceWidget?: SimplePriceWidget2Props;
    warningWidget?: WarningWidgetProps;
}

export const LayoutGuildForumLayoutCtlgDefault3x3 = ({ captionCtlgDescription, captionCtlgSelectproduct, firstProductAutoSelectorWidget, guildBadgeViewWidget, guildForumSelectorWidget, layout, purchaseWidget, simplePriceWidget, warningWidget }: LayoutGuildForumLayoutCtlgDefault3x3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <FirstProductAutoSelectorWidget
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                {...firstProductAutoSelectorWidget}
            />
            <Region
                name="ctlg_selectproduct"
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
                layout={{ position: 'absolute', left: 0, width: 260, top: 10, bottom: 124, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('loremipsum.html')}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                />
            </Region>
            <ThemeImage
                src="${image.library.url}catalogue/guild_forums_teaser.gif"
                layout={{ position: 'absolute', left: 254, width: 106, top: 35, height: 200 }}
            />
            <SimplePriceWidget2
                layout={{ position: 'absolute', left: 48, width: 47, bottom: 91, height: 28 }}
                {...simplePriceWidget}
            />
            <GuildBadgeViewWidget
                layout={{ position: 'absolute', left: 271, width: 40, bottom: 70, height: 40 }}
                {...guildBadgeViewWidget}
            />
            <GuildForumSelectorWidget
                layout={{ position: 'absolute', left: 90, width: 180, bottom: 25, height: 85 }}
                {...guildForumSelectorWidget}
            />
            <WarningWidget
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 30, height: 32 }}
                {...warningWidget}
            />
            <PurchaseWidget
                noGiftOption
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};
