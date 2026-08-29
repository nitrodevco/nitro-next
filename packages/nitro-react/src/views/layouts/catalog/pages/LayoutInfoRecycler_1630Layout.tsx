import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1630_layout_info_recycler_xml` (layout "ctlg_recycler_info", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoRecycler_1630LayoutProps {
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutInfoRecycler_1630Layout = ({ captionCtlgDescription, captionCtlgSpecialTxt, layout, srcCtlgTeaserimg1 }: LayoutInfoRecycler_1630LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_recycler_info"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="2"
                    tintColor="#fbc362"
                    layout={{ position: 'absolute', left: 10, right: 10, bottom: 10, height: 310, justifyContent: 'center' }}
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
                        layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 307, top: 72, height: 283, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCtlgSpecialTxt ?? t('lorem.newline')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 307 }}
                        />
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
