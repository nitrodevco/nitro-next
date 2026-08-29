import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { BuyGuildWidget2, BuyGuildWidget2Props } from '#base/views/layouts/catalog/widgets/BuyGuildWidget2';

/** Generated from `1668_layout_guild_frontpage_xml` (layout "ctlg_guild_frontpage", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildFrontpage_1668LayoutProps {
    buyGuildWidget?: BuyGuildWidget2Props;
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutGuildFrontpage_1668Layout = ({ buyGuildWidget, captionCtlgDescription, captionCtlgSpecialTxt, layout, srcCtlgTeaserimg1 }: LayoutGuildFrontpage_1668LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_guild_frontpage"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    src={srcCtlgTeaserimg1}
                    layout={{ position: 'absolute', left: 0, width: 359, bottom: 9, height: 163 }}
                />
                <Region
                    name="ctlg_special_txt"
                    layout={{ position: 'absolute', left: 15, width: 106, top: 32, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgSpecialTxt ?? t('lorem.title')}
                        textStyle="text-style-u-headline-medium"
                    />
                </Region>
                <Region
                    name="ctlg_description"
                    layout={{ position: 'absolute', left: 15, width: 335, top: 76, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgDescription ?? t('lorem.header')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 335 }}
                    />
                </Region>
                <BuyGuildWidget2
                    layout={{ position: 'absolute', left: 49, width: 267, bottom: 184, height: 45 }}
                    {...buyGuildWidget}
                />
            </Region>
        </Region>
    );
};
