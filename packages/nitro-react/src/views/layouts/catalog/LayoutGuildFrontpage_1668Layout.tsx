import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { BuyGuildWidget, BuyGuildWidgetProps } from '#base/views/layouts/catalog/widgets/BuyGuildWidget';

/** Generated from `1668_layout_guild_frontpage_xml` (layout "ctlg_guild_frontpage", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildFrontpage_1668LayoutProps {
    ctlgGuildFrontpage?: LayoutGuildFrontpage_1668LayoutCtlgGuildFrontpageProps;
    layout?: BoxLayout;
}

export const LayoutGuildFrontpage_1668Layout = ({ ctlgGuildFrontpage, layout }: LayoutGuildFrontpage_1668LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutGuildFrontpage_1668LayoutCtlgGuildFrontpage {...ctlgGuildFrontpage} />
        </Region>
    );
};

/** Named region `ctlg_guild_frontpage` of LayoutGuildFrontpage_1668Layout - configured through the parent's `ctlgGuildFrontpage` prop. */
export interface LayoutGuildFrontpage_1668LayoutCtlgGuildFrontpageProps {
    buyGuildWidget?: BuyGuildWidgetProps;
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutGuildFrontpage_1668LayoutCtlgGuildFrontpage = ({ buyGuildWidget, captionCtlgDescription, captionCtlgSpecialTxt, layout, srcCtlgTeaserimg1 }: LayoutGuildFrontpage_1668LayoutCtlgGuildFrontpageProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_guild_frontpage"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={1040}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 359, bottom: 9, height: 163 }}
            />
            <Region
                name="ctlg_special_txt"
                params={16}
                layout={{ position: 'absolute', left: 15, width: 106, top: 32, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSpecialTxt ?? t('lorem.title')}
                    textStyle="text-style-u-headline-medium"
                />
            </Region>
            <Region
                name="ctlg_description"
                params={16}
                layout={{ position: 'absolute', left: 15, width: 335, top: 76, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.header')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 335 }}
                />
            </Region>
            <BuyGuildWidget
                layout={{ position: 'absolute', left: 49, width: 267, bottom: 184, height: 45 }}
                {...buyGuildWidget}
            />
        </Region>
    );
};
