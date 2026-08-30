import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `recyclerPrizesWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutRecyclerPrizes_1543Layout); each passes its own placement through `layout`.
 */
/** Named region `recyclerPrizesWidget` of RecyclerPrizesWidget2 - configured through the parent's `recyclerPrizesWidget` prop. */
export interface RecyclerPrizesWidget2Props extends CatalogWidgetFlags {
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    itemsBundleGrid?: ReactNode;
    itemsItemList?: ReactNode;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
    tintCtlgTeaserimg1?: string;
}

export const RecyclerPrizesWidget2 = ({ captionCtlgDescription, captionCtlgProductName, itemsBundleGrid, itemsItemList, layout, srcCtlgTeaserimg1, tintCtlgTeaserimg1 }: RecyclerPrizesWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="recyclerPrizesWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, width: 175, top: 0, bottom: 0 }}
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
                layout={{ position: 'absolute', right: 0, width: 180, top: 0, height: 277, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    src={srcCtlgTeaserimg1}
                    tint={tintCtlgTeaserimg1}
                    layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 162 }}
                />
                <ThemeText
                    text={captionCtlgProductName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                    name="ctlg_product_name"
                    layout={{ position: 'absolute', left: 0, width: 74, top: 166, height: 17 }}
                />
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 162 }}
                    name="ctlg_description"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, width: 162, top: 183, height: 15 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 142, top: 87, height: 76 }}
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
