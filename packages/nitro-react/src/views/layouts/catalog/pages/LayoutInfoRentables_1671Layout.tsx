import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1671_layout_info_rentables_xml` (layout "ctlg_info_rentables", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoRentables_1671LayoutProps {
    ctlgInfoRentables?: LayoutInfoRentables_1671LayoutCtlgInfoRentablesProps;
    layout?: BoxLayout;
}

export const LayoutInfoRentables_1671Layout = ({ ctlgInfoRentables, layout }: LayoutInfoRentables_1671LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutInfoRentables_1671LayoutCtlgInfoRentables {...ctlgInfoRentables} />
        </Region>
    );
};

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
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#d8d8d8"
                layout={{ position: 'absolute', left: 17, width: 328, top: 149, height: 295 }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 309, top: 9, height: 281, flexDirection: 'column', gap: 3 }}>
                    <Region layout={{ width: 306, height: 47, flexShrink: 0 }}>
                        <ThemeImage
                            src={layoutImage('toolbar_duckat_icon_0.png')}
                            layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                        />
                        <Region
                            name="ctlg_text_1"
                            layout={{ position: 'absolute', left: 31, width: 232, top: 3, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCtlgText1 ?? t('lorem.html')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                            />
                        </Region>
                        <ThemeImage
                            name="rentables_rulepic1"
                            src={srcRentablesRulepic1 ?? '${image.library.url}catalogue/rentables_rulepic1.gif'}
                            layout={{ position: 'absolute', left: 266, width: 40, top: 1, height: 40 }}
                        />
                    </Region>
                    <Region layout={{ width: 306, height: 47, flexShrink: 0 }}>
                        <ThemeImage
                            src={layoutImage('toolbar_duckat_icon_0.png')}
                            layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                        />
                        <Region
                            name="ctlg_text_2"
                            layout={{ position: 'absolute', left: 31, width: 232, top: 3, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCtlgText2 ?? t('lorem.html')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                            />
                        </Region>
                        <ThemeImage
                            name="rentables_rulepic2"
                            src={srcRentablesRulepic2 ?? '${image.library.url}catalogue/rentables_rulepic2.gif'}
                            layout={{ position: 'absolute', left: 266, width: 40, top: 1, height: 40 }}
                        />
                    </Region>
                    <Region layout={{ width: 306, height: 47, flexShrink: 0 }}>
                        <ThemeImage
                            src={layoutImage('toolbar_duckat_icon_0.png')}
                            layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                        />
                        <Region
                            name="ctlg_text_3"
                            layout={{ position: 'absolute', left: 31, width: 232, top: 3, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCtlgText3 ?? t('lorem.html')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                            />
                        </Region>
                        <ThemeImage
                            name="rentables_rulepic3"
                            src={srcRentablesRulepic3 ?? '${image.library.url}catalogue/rentables_rulepic3.gif'}
                            layout={{ position: 'absolute', left: 266, width: 40, top: 1, height: 40 }}
                        />
                    </Region>
                    <Region layout={{ width: 306, height: 47, flexShrink: 0 }}>
                        <ThemeImage
                            src={layoutImage('toolbar_duckat_icon_0.png')}
                            layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                        />
                        <Region
                            name="ctlg_text_4"
                            layout={{ position: 'absolute', left: 31, width: 232, top: 3, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCtlgText4 ?? t('lorem.html')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                            />
                        </Region>
                        <ThemeImage
                            name="rentables_rulepic4"
                            src={srcRentablesRulepic4 ?? '${image.library.url}catalogue/rentables_rulepic4.gif'}
                            layout={{ position: 'absolute', left: 266, width: 40, top: 1, height: 46 }}
                        />
                    </Region>
                    <Region layout={{ width: 306, height: 47, flexShrink: 0 }}>
                        <ThemeImage
                            src={layoutImage('toolbar_duckat_icon_0.png')}
                            layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                        />
                        <Region
                            name="ctlg_text_5"
                            layout={{ position: 'absolute', left: 31, width: 232, top: 3, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCtlgText5 ?? t('lorem.html')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                            />
                        </Region>
                        <ThemeImage
                            name="rentables_rulepic5"
                            src={srcRentablesRulepic5 ?? '${image.library.url}catalogue/rentables_rulepic5.gif'}
                            layout={{ position: 'absolute', left: 266, width: 40, top: 1, height: 40 }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
