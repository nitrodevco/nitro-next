import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/**
 * Catalog widget `recyclerPrizesWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutRecyclerPrizes_1537Layout); each passes its own placement through `layout`.
 */
/** Named region `itemList` of RecyclerPrizesWidget2 - configured through the parent's `itemList` prop. */
export interface RecyclerPrizesWidget2ItemListProps {
    layout?: BoxLayout;
}

export const RecyclerPrizesWidget2ItemList = ({ layout }: RecyclerPrizesWidget2ItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 360, top: 237, bottom: 0, ...layout }}
        >
            <Region
                name="itemList"
                params={2064}
                layout={{ flexDirection: 'column', gap: 11, width: '100%' }}
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
            layout={{ position: 'absolute', left: 18, width: 142, top: 147, height: 76, ...layout }}
        >
            <Region
                name="bundleGrid"
                params={16}
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
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240, ...layout }}
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
            <RecyclerPrizesWidget2BundleGrid {...bundleGrid} />
        </Region>
    );
};

/** Named region `recyclerPrizesWidget` of RecyclerPrizesWidget2 - configured through the parent's `recyclerPrizesWidget` prop. */
export interface RecyclerPrizesWidget2Props {
    itemList?: RecyclerPrizesWidget2ItemListProps;
    layout?: BoxLayout;
    productView?: RecyclerPrizesWidget2ProductViewProps;
}

export const RecyclerPrizesWidget2 = ({ itemList, layout, productView }: RecyclerPrizesWidget2Props) => {
    return (
        <Region
            name="recyclerPrizesWidget"
            tags={[ 'WIDE' ]}
            params={2064}
            layout={{ position: 'absolute', ...layout }}
        >
            <RecyclerPrizesWidget2ItemList {...itemList} />
            <RecyclerPrizesWidget2ProductView {...productView} />
        </Region>
    );
};
