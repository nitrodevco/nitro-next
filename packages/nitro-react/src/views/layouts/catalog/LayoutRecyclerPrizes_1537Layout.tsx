import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1537_layout_recycler_prizes_xml` (layout "ctlg_recycler_prizes", 360x659) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecyclerPrizes_1537LayoutProps {
    ctlgDefault3x3?: LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3Props;
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1537Layout = ({ ctlgDefault3x3, layout }: LayoutRecyclerPrizes_1537LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 659, ...layout }}>
            <LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3 {...ctlgDefault3x3} />
        </Region>
    );
};

/** Named region `specialInfoWidget` of LayoutRecyclerPrizes_1537Layout - configured through the parent's `specialInfoWidget` prop. */
export interface LayoutRecyclerPrizes_1537LayoutSpecialInfoWidgetProps {
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1537LayoutSpecialInfoWidget = ({ layout }: LayoutRecyclerPrizes_1537LayoutSpecialInfoWidgetProps) => {
    return (
        <Region
            name="specialInfoWidget"
            params={16}
            layout={{ position: 'absolute', left: 100, width: 142, top: 46, height: 73, ...layout }}
        />
    );
};

/** Named region `itemList` of LayoutRecyclerPrizes_1537Layout - configured through the parent's `itemList` prop. */
export interface LayoutRecyclerPrizes_1537LayoutItemListProps {
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1537LayoutItemList = ({ layout }: LayoutRecyclerPrizes_1537LayoutItemListProps) => {
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

/** Named region `bundleGrid` of LayoutRecyclerPrizes_1537Layout - configured through the parent's `bundleGrid` prop. */
export interface LayoutRecyclerPrizes_1537LayoutBundleGridProps {
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1537LayoutBundleGrid = ({ layout }: LayoutRecyclerPrizes_1537LayoutBundleGridProps) => {
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

/** Named region `productView` of LayoutRecyclerPrizes_1537Layout - configured through the parent's `productView` prop. */
export interface LayoutRecyclerPrizes_1537LayoutProductViewProps {
    bundleGrid?: LayoutRecyclerPrizes_1537LayoutBundleGridProps;
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutRecyclerPrizes_1537LayoutProductView = ({ bundleGrid, captionCtlgDescription, captionCtlgProductName, layout, srcCtlgTeaserimg1 }: LayoutRecyclerPrizes_1537LayoutProductViewProps) => {
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
            <LayoutRecyclerPrizes_1537LayoutBundleGrid {...bundleGrid} />
        </Region>
    );
};

/** Named region `recyclerPrizesWidget` of LayoutRecyclerPrizes_1537Layout - configured through the parent's `recyclerPrizesWidget` prop. */
export interface LayoutRecyclerPrizes_1537LayoutRecyclerPrizesWidgetProps {
    itemList?: LayoutRecyclerPrizes_1537LayoutItemListProps;
    layout?: BoxLayout;
    productView?: LayoutRecyclerPrizes_1537LayoutProductViewProps;
}

export const LayoutRecyclerPrizes_1537LayoutRecyclerPrizesWidget = ({ itemList, layout, productView }: LayoutRecyclerPrizes_1537LayoutRecyclerPrizesWidgetProps) => {
    return (
        <Region
            name="recyclerPrizesWidget"
            tags={[ 'WIDE' ]}
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <LayoutRecyclerPrizes_1537LayoutItemList {...itemList} />
            <LayoutRecyclerPrizes_1537LayoutProductView {...productView} />
        </Region>
    );
};

/** Named region `ctlg_default_3x3` of LayoutRecyclerPrizes_1537Layout - configured through the parent's `ctlgDefault3x3` prop. */
export interface LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3Props {
    captionCtlgSelectproduct?: string;
    layout?: BoxLayout;
    recyclerPrizesWidget?: LayoutRecyclerPrizes_1537LayoutRecyclerPrizesWidgetProps;
    specialInfoWidget?: LayoutRecyclerPrizes_1537LayoutSpecialInfoWidgetProps;
}

export const LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3 = ({ captionCtlgSelectproduct, layout, recyclerPrizesWidget, specialInfoWidget }: LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
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
            <LayoutRecyclerPrizes_1537LayoutSpecialInfoWidget {...specialInfoWidget} />
            <LayoutRecyclerPrizes_1537LayoutRecyclerPrizesWidget {...recyclerPrizesWidget} />
        </Region>
    );
};
