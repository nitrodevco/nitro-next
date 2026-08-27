import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1587_layout_single_bundle_xml` (layout "ctlg_single_bundle", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSingleBundle_1587LayoutProps {
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    captionCtlgText1?: string;
    layout?: BoxLayout;
    srcCtlgSpecialImg?: string;
    srcCtlgTeaserimg1?: string;
}

export const LayoutSingleBundle_1587Layout = ({ captionCtlgDescription, captionCtlgSpecialTxt, captionCtlgText1, layout, srcCtlgSpecialImg, srcCtlgTeaserimg1 }: LayoutSingleBundle_1587LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_single_bundle"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="ctlg_description"
                    params={1}
                    layout={{ position: 'absolute', left: 15, width: 329, top: 13, height: 62, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgDescription ?? t('lorem.html')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 329 }}
                    />
                </Region>
                <Region
                    name="ctlg_special_txt"
                    params={1}
                    layout={{ position: 'absolute', left: 159, width: 173, top: 92, height: 25, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgSpecialTxt ?? t('lorem.html')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 173 }}
                    />
                </Region>
                <Border
                    variant="6"
                    name="bundleGridScrollWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 164, width: 186, top: 117, height: 247 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 4, width: 178, top: 3, height: 238 }}
                    >
                        <Region
                            name="bundleGrid"
                            params={2064}
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
                        />
                    </ScrollArea>
                </Border>
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    params={16}
                    src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/small_movie_roomteaser.gif'}
                    layout={{ position: 'absolute', left: 6, width: 157, top: 119, height: 238 }}
                />
                <Border
                    variant="3"
                    params={1040}
                    tintColor="#e0e0e0"
                    layout={{ position: 'absolute', left: 17, width: 324, top: 385, height: 40 }}
                >
                    <ThemeImage
                        name="ctlg_special_img"
                        params={16}
                        src={srcCtlgSpecialImg}
                        layout={{ position: 'absolute', left: 10, width: 32, top: 5, height: 30 }}
                    />
                    <Region
                        name="ctlg_text_1"
                        params={1}
                        layout={{ position: 'absolute', left: 51, width: 256, top: 10, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionCtlgText1 ?? t('lorem.html')} />
                    </Region>
                </Border>
                <Region
                    name="addOnBadgeViewWidget"
                    layout={{ position: 'absolute', left: 12, width: 40, top: 125, height: 40 }}
                />
                <Region
                    name="simplePriceWidget"
                    layout={{ position: 'absolute', left: 74, width: 83, top: 125, height: 30 }}
                >
                    <Region
                        name="fake_productimage"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 83, top: 0, height: 30 }}
                    />
                </Region>
                <Region
                    name="purchaseWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                />
            </Region>
        </Region>
    );
};
