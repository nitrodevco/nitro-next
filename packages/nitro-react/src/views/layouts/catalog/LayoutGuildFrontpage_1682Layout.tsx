import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1682_layout_guild_frontpage_xml` (layout "ctlg_guild_frontpage", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutGuildFrontpage_1682LayoutProps {
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    layout?: BoxLayout;
    onStartGuildPurchase?: () => void;
    srcCtlgTeaserimg1?: string;
}

export const LayoutGuildFrontpage_1682Layout = ({ captionCtlgDescription, captionCtlgSpecialTxt, layout, onStartGuildPurchase, srcCtlgTeaserimg1 }: LayoutGuildFrontpage_1682LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_guild_frontpage"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
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
                <Region
                    name="buyGuildWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 49, width: 267, top: 251, height: 45, justifyContent: 'center' }}
                >
                    <Button
                        variant="3"
                        name="start_guild_purchase"
                        params={933905}
                        onPointerTap={onStartGuildPurchase}
                        layout={{ position: 'absolute', marginLeft: -4, marginRight: 4, width: 213, top: 2, height: 28, minWidth: 190, minHeight: 28, maxHeight: 50 }}
                    >
                        {t('catalog.start.guild.purchase.button')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};
