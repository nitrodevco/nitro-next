import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1671_layout_info_rentables_xml` (layout "ctlg_info_rentables", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoRentables_1671LayoutProps {
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

export const LayoutInfoRentables_1671Layout = ({ captionCtlgText1, captionCtlgText2, captionCtlgText3, captionCtlgText4, captionCtlgText5, layout, srcRentablesRulepic1, srcRentablesRulepic2, srcRentablesRulepic3, srcRentablesRulepic4, srcRentablesRulepic5 }: LayoutInfoRentables_1671LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_info_rentables"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Border
                    variant="2"
                    params={16}
                    tintColor="#d8d8d8"
                    layout={{ position: 'absolute', left: 17, width: 328, top: 149, height: 295 }}
                >
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 309, top: 9, height: 281, flexDirection: 'column', gap: 3 }}
                    >
                        <Region
                            params={147472}
                            layout={{ width: 306, height: 47, flexShrink: 0 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('toolbar_duckat_icon_0.png')}
                                layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                            />
                            <Region
                                name="ctlg_text_1"
                                params={16}
                                layout={{ position: 'absolute', left: 31, width: 232, top: 3, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionCtlgText1 ?? t('lorem.html')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                                />
                            </Region>
                            <ThemeImage
                                name="rentables_rulepic1"
                                tags={[ 'S' ]}
                                params={16}
                                src={srcRentablesRulepic1 ?? '${image.library.url}catalogue/rentables_rulepic1.gif'}
                                layout={{ position: 'absolute', left: 266, width: 40, top: 1, height: 40 }}
                            />
                        </Region>
                        <Region
                            params={147472}
                            layout={{ width: 306, height: 47, flexShrink: 0 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('toolbar_duckat_icon_0.png')}
                                layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                            />
                            <Region
                                name="ctlg_text_2"
                                params={16}
                                layout={{ position: 'absolute', left: 31, width: 232, top: 3, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionCtlgText2 ?? t('lorem.html')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                                />
                            </Region>
                            <ThemeImage
                                name="rentables_rulepic2"
                                tags={[ 'S' ]}
                                params={16}
                                src={srcRentablesRulepic2 ?? '${image.library.url}catalogue/rentables_rulepic2.gif'}
                                layout={{ position: 'absolute', left: 266, width: 40, top: 1, height: 40 }}
                            />
                        </Region>
                        <Region
                            params={147472}
                            layout={{ width: 306, height: 47, flexShrink: 0 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('toolbar_duckat_icon_0.png')}
                                layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                            />
                            <Region
                                name="ctlg_text_3"
                                params={16}
                                layout={{ position: 'absolute', left: 31, width: 232, top: 3, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionCtlgText3 ?? t('lorem.html')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                                />
                            </Region>
                            <ThemeImage
                                name="rentables_rulepic3"
                                tags={[ 'S' ]}
                                params={16}
                                src={srcRentablesRulepic3 ?? '${image.library.url}catalogue/rentables_rulepic3.gif'}
                                layout={{ position: 'absolute', left: 266, width: 40, top: 1, height: 40 }}
                            />
                        </Region>
                        <Region
                            params={147472}
                            layout={{ width: 306, height: 47, flexShrink: 0 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('toolbar_duckat_icon_0.png')}
                                layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                            />
                            <Region
                                name="ctlg_text_4"
                                params={16}
                                layout={{ position: 'absolute', left: 31, width: 232, top: 3, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionCtlgText4 ?? t('lorem.html')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                                />
                            </Region>
                            <ThemeImage
                                name="rentables_rulepic4"
                                tags={[ 'S' ]}
                                params={16}
                                src={srcRentablesRulepic4 ?? '${image.library.url}catalogue/rentables_rulepic4.gif'}
                                layout={{ position: 'absolute', left: 266, width: 40, top: 1, height: 46 }}
                            />
                        </Region>
                        <Region
                            params={147472}
                            layout={{ width: 306, height: 47, flexShrink: 0 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('toolbar_duckat_icon_0.png')}
                                layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                            />
                            <Region
                                name="ctlg_text_5"
                                params={16}
                                layout={{ position: 'absolute', left: 31, width: 232, top: 3, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionCtlgText5 ?? t('lorem.html')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 232 }}
                                />
                            </Region>
                            <ThemeImage
                                name="rentables_rulepic5"
                                tags={[ 'S' ]}
                                params={16}
                                src={srcRentablesRulepic5 ?? '${image.library.url}catalogue/rentables_rulepic5.gif'}
                                layout={{ position: 'absolute', left: 266, width: 40, top: 1, height: 40 }}
                            />
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
