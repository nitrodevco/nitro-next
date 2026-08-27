import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1680_layout_guild_custom_furni_xml` (layout "ctlg_guild_custom_furni", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildCustomFurni_1680LayoutProps {
    captionCtlgSelectproduct?: string;
    layout?: BoxLayout;
}

export const LayoutGuildCustomFurni_1680Layout = ({ captionCtlgSelectproduct, layout }: LayoutGuildCustomFurni_1680LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_default_3x3"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
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
                <Region
                    name="itemGridWidget"
                    tags={[ 'E' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 245, height: 125 }}
                />
                <Region
                    name="productViewWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                />
                <Region
                    name="guildSelectorWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 90, width: 180, top: 375, height: 85 }}
                />
                <Region
                    name="specialInfoWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 94, width: 142, top: 18, height: 73 }}
                />
                <Region
                    name="activityPointDisplayWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 199, width: 156, top: 190, height: 28 }}
                />
                <Region
                    name="guildBadgeViewWidget"
                    layout={{ position: 'absolute', left: 307, width: 40, top: 138, height: 40 }}
                />
                <Region
                    name="purchaseWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                />
            </Region>
        </Region>
    );
};
