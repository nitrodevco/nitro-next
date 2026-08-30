import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `ctlg_info_rentables` of LayoutInfoRentables_1671Layout - configured through the parent's `ctlgInfoRentables` prop. */
export interface LayoutInfoRentables_1671LayoutCtlgInfoRentablesProps {
    captionCtlgText1?: string;
    captionCtlgText2?: string;
    captionCtlgText3?: string;
    captionCtlgText4?: string;
    captionCtlgText5?: string;
    layout?: BoxLayout;
    srcRentablesRulepic1?: string;
    srcRentablesRulepic2?: string;
    srcRentablesRulepic3?: string;
    srcRentablesRulepic4?: string;
    srcRentablesRulepic5?: string;
}

export const LayoutInfoRentables_1671LayoutCtlgInfoRentables = ({ captionCtlgText1, captionCtlgText2, captionCtlgText3, captionCtlgText4, captionCtlgText5, layout, srcRentablesRulepic1, srcRentablesRulepic2, srcRentablesRulepic3, srcRentablesRulepic4, srcRentablesRulepic5 }: LayoutInfoRentables_1671LayoutCtlgInfoRentablesProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_info_rentables"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="2"
                tintColor="#d8d8d8"
                layout={{ position: 'absolute', marginLeft: 1, marginRight: -1, width: 328, top: 149, height: 295 }}
            >
                <Region layout={{ position: 'absolute', left: 10, right: 9, top: 9, bottom: 5, flexDirection: 'column', gap: 3 }}>
                    <Region layout={{ alignSelf: 'stretch', height: 47, flexShrink: 0 }}>
                        <ThemeImage
                            src={layoutImage('toolbar_duckat_icon_0.png')}
                            layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                        />
                        <ThemeText
                            text={captionCtlgText1 ?? t('lorem.html')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                            name="ctlg_text_1"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 31, width: 232, top: 3, bottom: 0 }}
                        />
                        <ThemeImage
                            name="rentables_rulepic1"
                            src={srcRentablesRulepic1 ?? '${image.library.url}catalogue/rentables_rulepic1.gif'}
                            layout={{ position: 'absolute', right: 0, width: 40, top: 1, height: 40 }}
                        />
                    </Region>
                    <Region layout={{ alignSelf: 'stretch', height: 47, flexShrink: 0 }}>
                        <ThemeImage
                            src={layoutImage('toolbar_duckat_icon_0.png')}
                            layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                        />
                        <ThemeText
                            text={captionCtlgText2 ?? t('lorem.html')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                            name="ctlg_text_2"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 31, width: 232, top: 3, bottom: 0 }}
                        />
                        <ThemeImage
                            name="rentables_rulepic2"
                            src={srcRentablesRulepic2 ?? '${image.library.url}catalogue/rentables_rulepic2.gif'}
                            layout={{ position: 'absolute', right: 0, width: 40, top: 1, height: 40 }}
                        />
                    </Region>
                    <Region layout={{ alignSelf: 'stretch', height: 47, flexShrink: 0 }}>
                        <ThemeImage
                            src={layoutImage('toolbar_duckat_icon_0.png')}
                            layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                        />
                        <ThemeText
                            text={captionCtlgText3 ?? t('lorem.html')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                            name="ctlg_text_3"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 31, width: 232, top: 3, bottom: 0 }}
                        />
                        <ThemeImage
                            name="rentables_rulepic3"
                            src={srcRentablesRulepic3 ?? '${image.library.url}catalogue/rentables_rulepic3.gif'}
                            layout={{ position: 'absolute', right: 0, width: 40, top: 1, height: 40 }}
                        />
                    </Region>
                    <Region layout={{ alignSelf: 'stretch', height: 47, flexShrink: 0 }}>
                        <ThemeImage
                            src={layoutImage('toolbar_duckat_icon_0.png')}
                            layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                        />
                        <ThemeText
                            text={captionCtlgText4 ?? t('lorem.html')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                            name="ctlg_text_4"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 31, width: 232, top: 3, bottom: 0 }}
                        />
                        <ThemeImage
                            name="rentables_rulepic4"
                            src={srcRentablesRulepic4 ?? '${image.library.url}catalogue/rentables_rulepic4.gif'}
                            layout={{ position: 'absolute', right: 0, width: 40, top: 1, height: 46 }}
                        />
                    </Region>
                    <Region layout={{ alignSelf: 'stretch', height: 47, flexShrink: 0 }}>
                        <ThemeImage
                            src={layoutImage('toolbar_duckat_icon_0.png')}
                            layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                        />
                        <ThemeText
                            text={captionCtlgText5 ?? t('lorem.html')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                            name="ctlg_text_5"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 31, width: 232, top: 3, bottom: 0 }}
                        />
                        <ThemeImage
                            name="rentables_rulepic5"
                            src={srcRentablesRulepic5 ?? '${image.library.url}catalogue/rentables_rulepic5.gif'}
                            layout={{ position: 'absolute', right: 0, width: 40, top: 1, height: 40 }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
