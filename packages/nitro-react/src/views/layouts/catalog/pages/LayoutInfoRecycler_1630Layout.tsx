import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1630_layout_info_recycler_xml` (layout "ctlg_recycler_info", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoRecycler_1630LayoutProps {
    ctlgRecyclerInfo?: LayoutInfoRecycler_1630LayoutCtlgRecyclerInfoProps;
    layout?: BoxLayout;
}

export const LayoutInfoRecycler_1630Layout = ({ ctlgRecyclerInfo, layout }: LayoutInfoRecycler_1630LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutInfoRecycler_1630LayoutCtlgRecyclerInfo {...ctlgRecyclerInfo} />
        </Region>
    );
};

/** Named region `ctlg_recycler_info` of LayoutInfoRecycler_1630Layout - configured through the parent's `ctlgRecyclerInfo` prop. */
export interface LayoutInfoRecycler_1630LayoutCtlgRecyclerInfoProps {
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutInfoRecycler_1630LayoutCtlgRecyclerInfo = ({ captionCtlgDescription, captionCtlgSpecialTxt, layout, srcCtlgTeaserimg1 }: LayoutInfoRecycler_1630LayoutCtlgRecyclerInfoProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_recycler_info"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#fbc362"
                layout={{ position: 'absolute', left: 10, width: 340, top: 140, height: 310 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/ctlg_ecotron_box.gif'}
                    layout={{ position: 'absolute', left: 20, width: 57, top: 10, height: 57 }}
                />
                <Region
                    name="ctlg_description"
                    layout={{ position: 'absolute', left: 83, width: 242, top: 26, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgDescription ?? t('lorem.title')}
                        textStyle="text-style-u-headline-medium"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 242 }}
                    />
                </Region>
                <Region
                    name="ctlg_special_txt"
                    layout={{ position: 'absolute', left: 15, width: 307, top: 72, height: 283, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgSpecialTxt ?? t('lorem.newline')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 307 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
