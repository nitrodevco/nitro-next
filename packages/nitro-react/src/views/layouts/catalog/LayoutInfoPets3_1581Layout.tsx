import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1581_layout_info_pets3_xml` (layout "ctlg_pets3", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoPets3_1581LayoutProps {
    captionCtlgText1?: string;
    captionCtlgText2?: string;
    captionCtlgText3?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutInfoPets3_1581Layout = ({ captionCtlgText1, captionCtlgText2, captionCtlgText3, layout, srcCtlgTeaserimg1 }: LayoutInfoPets3_1581LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_pets2"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Border
                    variant="2"
                    params={2064}
                    tintColor="#8899a2"
                    layout={{ position: 'absolute', left: 10, width: 340, top: 10, height: 440 }}
                >
                    <ThemeImage
                        name="ctlg_teaserimg_1"
                        params={16}
                        src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/ctlg_pet_note.gif'}
                        layout={{ position: 'absolute', left: 20, width: 57, top: 10, height: 57 }}
                    />
                    <Region
                        name="ctlg_text_1"
                        params={16}
                        layout={{ position: 'absolute', left: 85, width: 242, top: 26, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCtlgText1 ?? t('lorem.title')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 242 }}
                        />
                    </Region>
                    <Region
                        name="ctlg_text_2"
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 307, top: 72, height: 124, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCtlgText2 ?? t('lorem.content')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 307 }}
                        />
                    </Region>
                    <Region
                        name="ctlg_text_3"
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 306, top: 270, height: 138, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCtlgText3 ?? t('lorem.newline')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 306 }}
                        />
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
