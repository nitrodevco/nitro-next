import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { BuyGuildWidget2, BuyGuildWidget2Props } from '#base/views/layouts/catalog/widgets/BuyGuildWidget2';

/** Generated from `1682_layout_guild_frontpage_xml` (layout "ctlg_guild_frontpage", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildFrontpage_1682LayoutProps {
    ctlgGuildFrontpage?: LayoutGuildFrontpage_1682LayoutCtlgGuildFrontpageProps;
    layout?: BoxLayout;
}

export const LayoutGuildFrontpage_1682Layout = ({ ctlgGuildFrontpage, layout }: LayoutGuildFrontpage_1682LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutGuildFrontpage_1682LayoutCtlgGuildFrontpage {...ctlgGuildFrontpage} />
        </Region>
    );
};

/** Named region `ctlg_guild_frontpage` of LayoutGuildFrontpage_1682Layout - configured through the parent's `ctlgGuildFrontpage` prop. */
export interface LayoutGuildFrontpage_1682LayoutCtlgGuildFrontpageProps {
    buyGuildWidget?: BuyGuildWidget2Props;
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutGuildFrontpage_1682LayoutCtlgGuildFrontpage = ({ buyGuildWidget, captionCtlgDescription, captionCtlgSpecialTxt, layout, srcCtlgTeaserimg1 }: LayoutGuildFrontpage_1682LayoutCtlgGuildFrontpageProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_guild_frontpage"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 359, top: 288, height: 163 }}
            />
            <Region
                name="ctlg_special_txt"
                params={16}
                layout={{ position: 'absolute', left: 15, width: 74, top: 152, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSpecialTxt ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="ctlg_description"
                params={16}
                layout={{ position: 'absolute', left: 15, width: 335, top: 176, height: 82, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.header')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 335 }}
                />
            </Region>
            <BuyGuildWidget2
                layout={{ position: 'absolute', left: 49, width: 267, top: 251, height: 45 }}
                {...buyGuildWidget}
            />
        </Region>
    );
};
