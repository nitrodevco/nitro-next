import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1724_layout_guild_forum_xml` (layout "layout_guild_forum", 360x662) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildForumLayoutProps {
    layout?: BoxLayout;
}

export const LayoutGuildForumLayout = ({ layout }: LayoutGuildForumLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 662, ...layout }}>
            <Region
                name="ctlg_default_3x3"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 662 }}
            >
                <Region
                    name="firstProductAutoSelectorWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
                <Region
                    name="ctlg_selectproduct"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 5, width: 107, top: 134, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('catalog_selectproduct')}
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
                <Region
                    name="ctlg_description"
                    tags={[ 'E' ]}
                    params={2049}
                    layout={{ position: 'absolute', left: 0, width: 260, top: 10, height: 528, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('loremipsum.html')}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                    />
                </Region>
                <ThemeImage
                    params={16}
                    src="${image.library.url}catalogue/guild_forums_teaser.gif"
                    layout={{ position: 'absolute', left: 254, width: 106, top: 35, height: 200 }}
                />
                <Region
                    name="simplePriceWidget"
                    params={1024}
                    layout={{ position: 'absolute', left: 48, width: 47, top: 543, height: 28 }}
                />
                <Region
                    name="guildBadgeViewWidget"
                    params={1024}
                    layout={{ position: 'absolute', left: 271, width: 40, top: 552, height: 40 }}
                />
                <Region
                    name="guildForumSelectorWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 90, width: 180, top: 552, height: 85 }}
                />
                <Region
                    name="warningWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 600, height: 32 }}
                >
                    <Region
                        name="warning_text"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('catalog.alert.group_has_forum')}
                            textOptions={{ fill: '#6f0000', wordWrap: true, wordWrapWidth: 360 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="purchaseWidget"
                    tags={[ 'NO_GIFT_OPTION' ]}
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 632, height: 30 }}
                />
            </Region>
        </Region>
    );
};
