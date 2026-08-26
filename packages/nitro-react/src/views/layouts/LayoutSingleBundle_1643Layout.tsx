import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1643_layout_single_bundle_xml` (layout "ctlg_single_bundle", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSingleBundle_1643LayoutProps {
    layout?: BoxLayout;
}

export const LayoutSingleBundle_1643Layout = ({ layout }: LayoutSingleBundle_1643LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_single_bundle"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="ctlg_description"
                    params={1}
                    layout={{ position: 'absolute', left: 15, width: 329, top: 103, height: 62, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('lorem.html')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 329 }}
                    />
                </Region>
                <Region
                    name="ctlg_special_txt"
                    params={1}
                    layout={{ position: 'absolute', left: 159, width: 173, top: 182, height: 25, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('lorem.html')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 173 }}
                    />
                </Region>
                <Region
                    name="purchaseWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                />
                <Region
                    name="bundleGridScrollWidget"
                    tags={[ 'EMBEDDED' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 164, width: 176, top: 207, height: 157 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 176, top: 0, height: 157 }}
                    >
                        <Region
                            name="bundleGrid"
                            params={16}
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
                        />
                    </ScrollArea>
                </Region>
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    params={16}
                    src="${image.library.url}catalogue/ctlg_furnimatic_image.gif"
                    layout={{ position: 'absolute', left: 7, width: 137, top: 169, height: 218 }}
                />
                <Border
                    variant="3"
                    params={16}
                    tintColor="#e0e0e0"
                    layout={{ position: 'absolute', left: 17, width: 324, top: 385, height: 40 }}
                >
                    <ThemeImage
                        name="ctlg_special_img"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 10, width: 32, top: 5, height: 30 }}
                    />
                    <Region
                        name="ctlg_text_1"
                        params={1}
                        layout={{ position: 'absolute', left: 51, width: 256, top: 10, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('lorem.html')} />
                    </Region>
                </Border>
                <Region
                    name="addOnBadgeViewWidget"
                    layout={{ position: 'absolute', left: 292, width: 40, top: 167, height: 40 }}
                />
                <Region
                    name="simplePriceWidget"
                    layout={{ position: 'absolute', left: 63, width: 83, top: 167, height: 30 }}
                >
                    <Region
                        name="fake_productimage"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 83, top: 0, height: 30 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
