import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `recyclerPrizesWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutRecyclerPrizes_1537Layout); each passes its own placement through `layout`.
 */
/** Named region `recyclerPrizesWidget` of RecyclerPrizesWidget2 - configured through the parent's `recyclerPrizesWidget` prop. */
export interface RecyclerPrizesWidget2Props extends CatalogWidgetFlags {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
    visibleCtlgTeaserimg1?: boolean;
}

export const RecyclerPrizesWidget2 = ({ captionCtlgDescription, captionCtlgProductName, layout, srcCtlgTeaserimg1, visibleCtlgTeaserimg1 }: RecyclerPrizesWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="recyclerPrizesWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, width: 360, top: 237, bottom: 0 }}
            >
                <Region
                    name="itemList"
                    layout={{ flexDirection: 'column', gap: 11, width: '100%' }}
                />
            </ScrollArea>
            <Region
                name="productView"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            >
                <WidgetSlot
                    widgetType="product_image"
                    name="product_viewer"
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                />
                {(visibleCtlgTeaserimg1 ?? false) && (
                    <ThemeImage
                        name="ctlg_teaserimg_1"
                        src={srcCtlgTeaserimg1}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                    />
                )}
                <Region
                    name="ctlg_product_name"
                    layout={{ position: 'absolute', left: 10, width: 74, top: 16, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgProductName ?? t('lorem.title')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    name="ctlg_description"
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
                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                    />
                </ScrollArea>
            </Region>
        </Region>
    );
};
