import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `recyclerPrizesWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutRecyclerPrizes_1537Layout); each passes its own placement through `layout`.
 */
/** Named region `itemList` of RecyclerPrizesWidget - configured through the parent's `itemList` prop. */
export interface RecyclerPrizesWidgetItemListProps {
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetItemList = ({ layout }: RecyclerPrizesWidgetItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 360, top: 237, bottom: 0, ...layout }}
        >
            <Region
                name="itemList"
                layout={{ flexDirection: 'column', gap: 11, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `bundleGrid` of RecyclerPrizesWidget - configured through the parent's `bundleGrid` prop. */
export interface RecyclerPrizesWidgetBundleGridProps {
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetBundleGrid = ({ layout }: RecyclerPrizesWidgetBundleGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 18, width: 142, top: 147, height: 76, ...layout }}
        >
            <Region
                name="bundleGrid"
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
}

export const RecyclerPrizesWidgetProductView = ({ bundleGrid, captionCtlgDescription, captionCtlgProductName, layout, srcCtlgTeaserimg1 }: RecyclerPrizesWidgetProductViewProps) => {
    const t = useTranslation();

    return (
        <Region
            name="productView"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240, ...layout }}
        >
            <WidgetSlot
                widgetType="product_image"
                name="product_viewer"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            />
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                visible={false}
            />
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
            <RecyclerPrizesWidgetBundleGrid {...bundleGrid} />
        </Region>
    );
};

/** Named region `recyclerPrizesWidget` of RecyclerPrizesWidget - configured through the parent's `recyclerPrizesWidget` prop. */
export interface RecyclerPrizesWidgetProps extends CatalogWidgetFlags {
    itemList?: RecyclerPrizesWidgetItemListProps;
    layout?: BoxLayout;
    productView?: RecyclerPrizesWidgetProductViewProps;
}

export const RecyclerPrizesWidget = ({ itemList, layout, productView }: RecyclerPrizesWidgetProps) => {
    return (
        <Region
            name="recyclerPrizesWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <RecyclerPrizesWidgetItemList {...itemList} />
            <RecyclerPrizesWidgetProductView {...productView} />
        </Region>
    );
};
