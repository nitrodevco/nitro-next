import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `recyclerPrizesWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutRecyclerPrizes_1543Layout); each passes its own placement through `layout`.
 */
/** Named region `recyclerPrizesWidget` of RecyclerPrizesWidget - configured through the parent's `recyclerPrizesWidget` prop. */
export interface RecyclerPrizesWidgetProps extends CatalogWidgetFlags {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    itemsBundleGrid?: ReactNode;
    itemsItemList?: ReactNode;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
    tintCtlgTeaserimg1?: string;
}

export const RecyclerPrizesWidget = ({ captionCtlgDescription, captionCtlgProductName, itemsBundleGrid, itemsItemList, layout, srcCtlgTeaserimg1, tintCtlgTeaserimg1 }: RecyclerPrizesWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="recyclerPrizesWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 314 }}
            >
                <Region
                    name="itemList"
                    layout={{ flexDirection: 'column', width: '100%' }}
                >
                    {itemsItemList}
                </Region>
            </ScrollArea>
            <Region
                name="productView"
                layout={{ position: 'absolute', left: 180, width: 180, top: 0, height: 277 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    src={srcCtlgTeaserimg1}
                    tint={tintCtlgTeaserimg1}
                    layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 162 }}
                />
                <Region
                    name="ctlg_product_name"
                    layout={{ position: 'absolute', left: 0, width: 74, top: 166, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgProductName ?? t('lorem.title')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    name="ctlg_description"
                    layout={{ position: 'absolute', left: 0, width: 162, top: 183, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgDescription ?? t('lorem.title')}
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
                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                    >
                        {itemsBundleGrid}
                    </Region>
                </ScrollArea>
            </Region>
        </Region>
    );
};
