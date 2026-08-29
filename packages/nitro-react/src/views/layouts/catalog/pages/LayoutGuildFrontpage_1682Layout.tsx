import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { BuyGuildWidget, BuyGuildWidgetProps } from '#base/views/layouts/catalog/widgets/BuyGuildWidget';

/** Generated from `1682_layout_guild_frontpage_xml` (layout "ctlg_guild_frontpage", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildFrontpage_1682LayoutProps {
    buyGuildWidget?: BuyGuildWidgetProps;
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
    tintCtlgTeaserimg1?: string;
}

export const LayoutGuildFrontpage_1682Layout = ({ buyGuildWidget, captionCtlgDescription, captionCtlgSpecialTxt, layout, srcCtlgTeaserimg1, tintCtlgTeaserimg1 }: LayoutGuildFrontpage_1682LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_guild_frontpage"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    src={srcCtlgTeaserimg1}
                    tint={tintCtlgTeaserimg1}
                    layout={{ position: 'absolute', left: 0, width: 359, bottom: 9, height: 163 }}
                />
                <Region
                    name="ctlg_special_txt"
                    layout={{ position: 'absolute', left: 15, width: 74, top: 152, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgSpecialTxt ?? t('lorem.title')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    name="ctlg_description"
                    layout={{ position: 'absolute', right: 10, width: 335, top: 176, height: 82, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgDescription ?? t('lorem.header')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 335 }}
                    />
                </Region>
                <BuyGuildWidget
                    layout={{ position: 'absolute', marginLeft: 2.5, marginRight: -2.5, width: 267, top: 251, height: 45 }}
                    {...buyGuildWidget}
                />
            </Region>
        </Region>
    );
};
