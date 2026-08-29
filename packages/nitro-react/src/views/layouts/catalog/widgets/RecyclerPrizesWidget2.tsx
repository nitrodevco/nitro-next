import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `recyclerPrizesWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutRecyclerPrizes_1543Layout); each passes its own placement through `layout`.
 */
/** Named region `itemList` of RecyclerPrizesWidget2 - configured through the parent's `itemList` prop. */
export interface RecyclerPrizesWidget2ItemListProps {
    layout?: BoxLayout;
}

export const RecyclerPrizesWidget2ItemList = ({ layout }: RecyclerPrizesWidget2ItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 314, ...layout }}
        >
            <Region
                name="itemList"
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `bundleGrid` of RecyclerPrizesWidget2 - configured through the parent's `bundleGrid` prop. */
export interface RecyclerPrizesWidget2BundleGridProps {
    layout?: BoxLayout;
}

export const RecyclerPrizesWidget2BundleGrid = ({ layout }: RecyclerPrizesWidget2BundleGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 18, width: 142, top: 87, height: 76, ...layout }}
        >
            <Region
                name="bundleGrid"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `productView` of RecyclerPrizesWidget2 - configured through the parent's `productView` prop. */
export interface RecyclerPrizesWidget2ProductViewProps {
    bundleGrid?: RecyclerPrizesWidget2BundleGridProps;
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const RecyclerPrizesWidget2ProductView = ({ bundleGrid, captionCtlgDescription, captionCtlgProductName, layout, srcCtlgTeaserimg1 }: RecyclerPrizesWidget2ProductViewProps) => {
    const t = useTranslation();

    return (
        <Region
            name="productView"
            layout={{ position: 'absolute', left: 180, width: 180, top: 0, height: 277, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1}
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
            <RecyclerPrizesWidget2BundleGrid {...bundleGrid} />
        </Region>
    );
};

/** Named region `recyclerPrizesWidget` of RecyclerPrizesWidget2 - configured through the parent's `recyclerPrizesWidget` prop. */
export interface RecyclerPrizesWidget2Props extends CatalogWidgetFlags {
    itemList?: RecyclerPrizesWidget2ItemListProps;
    layout?: BoxLayout;
    productView?: RecyclerPrizesWidget2ProductViewProps;
}

export const RecyclerPrizesWidget2 = ({ itemList, layout, productView }: RecyclerPrizesWidget2Props) => {
    return (
        <Region
            name="recyclerPrizesWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <RecyclerPrizesWidget2ItemList {...itemList} />
            <RecyclerPrizesWidget2ProductView {...productView} />
        </Region>
    );
};
