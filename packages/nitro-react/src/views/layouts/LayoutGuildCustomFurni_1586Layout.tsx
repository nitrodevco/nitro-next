import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1586_layout_guild_custom_furni_xml` (layout "ctlg_guild_custom_furni", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildCustomFurni_1586LayoutProps {
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1586Layout = ({ layout }: LayoutGuildCustomFurni_1586LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_default_3x3"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="ctlg_selectproduct"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 107, top: 134, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('catalog_selectproduct')}
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
                <Region
                    name="itemGridWidget"
                    tags={[ 'E' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 170, top: 150, height: 185 }}
                />
                <Region
                    name="productViewWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 180, width: 175, top: 150, height: 275 }}
                />
                <Region
                    name="guildSelectorWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 170, top: 340, height: 85 }}
                />
                <Region
                    name="purchaseWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                />
                <Region
                    name="specialInfoWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 194, width: 142, top: 118, height: 73 }}
                />
                <Region
                    name="activityPointDisplayWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 199, width: 156, top: 120, height: 28 }}
                />
                <Region
                    name="guildBadgeViewWidget"
                    layout={{ position: 'absolute', left: 202, width: 40, top: 378, height: 40 }}
                />
            </Region>
        </Region>
    );
};
