import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1578_layout_info_recycler_xml` (layout "ctlg_recycler_info", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoRecycler_1578LayoutProps {
    ctlgRecyclerInfo?: LayoutInfoRecycler_1578LayoutCtlgRecyclerInfoProps;
    layout?: BoxLayout;
}

export const LayoutInfoRecycler_1578Layout = ({ ctlgRecyclerInfo, layout }: LayoutInfoRecycler_1578LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutInfoRecycler_1578LayoutCtlgRecyclerInfo {...ctlgRecyclerInfo} />
        </Region>
    );
};

/** Named region `ctlg_recycler_info` of LayoutInfoRecycler_1578Layout - configured through the parent's `ctlgRecyclerInfo` prop. */
export interface LayoutInfoRecycler_1578LayoutCtlgRecyclerInfoProps {
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutInfoRecycler_1578LayoutCtlgRecyclerInfo = ({ captionCtlgDescription, captionCtlgSpecialTxt, layout, srcCtlgTeaserimg1 }: LayoutInfoRecycler_1578LayoutCtlgRecyclerInfoProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_recycler_info"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="2"
                params={2064}
                tintColor="#fbc362"
                layout={{ position: 'absolute', left: 10, width: 340, top: 10, bottom: 10 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    params={16}
                    src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/ctlg_ecotron_box.gif'}
                    layout={{ position: 'absolute', left: 20, width: 57, top: 10, height: 57 }}
                />
                <Region
                    name="ctlg_description"
                    params={16}
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
                    params={16}
                    layout={{ position: 'absolute', left: 15, width: 307, top: 72, height: 138, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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
