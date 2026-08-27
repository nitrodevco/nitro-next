import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1537_layout_recycler_prizes_xml` (layout "ctlg_recycler_prizes", 360x659) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecyclerPrizes_1537LayoutProps {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    captionCtlgSelectproduct?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutRecyclerPrizes_1537Layout = ({ captionCtlgDescription, captionCtlgProductName, captionCtlgSelectproduct, layout, srcCtlgTeaserimg1 }: LayoutRecyclerPrizes_1537LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 659, ...layout }}>
            <Region
                name="ctlg_default_3x3"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 659 }}
            >
                <Region
                    name="ctlg_selectproduct"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 128, top: 133, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <Region
                    name="specialInfoWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 100, width: 142, top: 46, height: 73 }}
                />
                <Region
                    name="recyclerPrizesWidget"
                    tags={[ 'WIDE' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 659 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 360, top: 237, height: 422 }}
                    >
                        <Region
                            name="itemList"
                            params={2064}
                            layout={{ flexDirection: 'column', gap: 11, width: '100%' }}
                        />
                    </ScrollArea>
                    <Region
                        name="productView"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                    >
                        <WidgetSlot
                            widgetType="product_image"
                            name="product_viewer"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                        />
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                        >
                            <ThemeImage
                                name="ctlg_teaserimg_1"
                                params={16}
                                src={srcCtlgTeaserimg1}
                                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                            />
                        </Region>
                        <Region
                            name="ctlg_product_name"
                            params={16}
                            layout={{ position: 'absolute', left: 10, width: 74, top: 16, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCtlgProductName ?? t('lorem.title')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region
                            name="ctlg_description"
                            params={16}
                            layout={{ position: 'absolute', left: 10, width: 162, top: 33, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCtlgDescription ?? t('lorem.title')}
                                textStyle="text-style-u-small"
                                textOptions={{ wordWrap: true, wordWrapWidth: 162 }}
                            />
                        </Region>
                        <ScrollArea
                            orientation="vertical"
                            layout={{ position: 'absolute', left: 18, width: 142, top: 147, height: 76 }}
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
