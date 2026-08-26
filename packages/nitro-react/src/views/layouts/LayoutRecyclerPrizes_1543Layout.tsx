import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1543_layout_recycler_prizes_xml` (layout "ctlg_recycler_prizes", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecyclerPrizes_1543LayoutProps {
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1543Layout = ({ layout }: LayoutRecyclerPrizes_1543LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_default_3x3"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="ctlg_selectproduct"
                    params={16}
                    layout={{ position: 'absolute', left: 2, width: 128, top: 133, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('catalog_selectproduct')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <Region
                    name="specialInfoWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 180, width: 142, top: 116, height: 73 }}
                />
                <Region
                    name="recyclerPrizesWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 146, height: 314 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 314 }}
                    >
                        <Region
                            name="itemList"
                            params={16}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        />
                    </ScrollArea>
                    <Region
                        name="productView"
                        params={16}
                        layout={{ position: 'absolute', left: 180, width: 180, top: 0, height: 277 }}
                    >
                        <ThemeImage
                            name="ctlg_teaserimg_1"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 162 }}
                        />
                        <Region
                            name="ctlg_product_name"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 74, top: 166, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('lorem.title')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region
                            name="ctlg_description"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 162, top: 183, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('lorem.title')}
                                textStyle="text-style-u-small"
                                textOptions={{ wordWrap: true, wordWrapWidth: 162 }}
                            />
                        </Region>
                        <ScrollArea
                            orientation="vertical"
                            layout={{ position: 'absolute', left: 18, width: 142, top: 87, height: 76 }}
                        >
                            <Region
                                name="bundleGrid"
                                params={16}
                                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                            />
                        </ScrollArea>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
