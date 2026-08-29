import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/**
 * Catalog widget `recyclerPrizesWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutRecyclerPrizes_1543Layout); each passes its own placement through `layout`.
 */
/** Named region `itemList` of RecyclerPrizesWidget - configured through the parent's `itemList` prop. */
export interface RecyclerPrizesWidgetItemListProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const RecyclerPrizesWidgetItemList = ({ layout, tags }: RecyclerPrizesWidgetItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 314, ...layout }}
        >
            <Region
                name="itemList"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `bundleGrid` of RecyclerPrizesWidget - configured through the parent's `bundleGrid` prop. */
export interface RecyclerPrizesWidgetBundleGridProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const RecyclerPrizesWidgetBundleGrid = ({ layout, tags }: RecyclerPrizesWidgetBundleGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 18, width: 142, top: 87, height: 76, ...layout }}
        >
            <Region
                name="bundleGrid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `productView` of RecyclerPrizesWidget - configured through the parent's `productView` prop. */
export interface RecyclerPrizesWidgetProductViewProps {
    bundleGrid?: RecyclerPrizesWidgetBundleGridProps;
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
    tags?: string[];
}

export const RecyclerPrizesWidgetProductView = ({ bundleGrid, captionCtlgDescription, captionCtlgProductName, layout, srcCtlgTeaserimg1, tags }: RecyclerPrizesWidgetProductViewProps) => {
    const t = useTranslation();

    return (
        <Region
            name="productView"
            tags={tags}
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
            <RecyclerPrizesWidgetBundleGrid {...bundleGrid} />
        </Region>
    );
};

/** Named region `recyclerPrizesWidget` of RecyclerPrizesWidget - configured through the parent's `recyclerPrizesWidget` prop. */
export interface RecyclerPrizesWidgetProps {
    itemList?: RecyclerPrizesWidgetItemListProps;
    layout?: BoxLayout;
    productView?: RecyclerPrizesWidgetProductViewProps;
    tags?: string[];
}

export const RecyclerPrizesWidget = ({ itemList, layout, productView, tags }: RecyclerPrizesWidgetProps) => {
    return (
        <Region
            name="recyclerPrizesWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <RecyclerPrizesWidgetItemList {...itemList} />
            <RecyclerPrizesWidgetProductView {...productView} />
        </Region>
    );
};
