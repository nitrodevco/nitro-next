import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1543_layout_recycler_prizes_xml` (layout "ctlg_recycler_prizes", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecyclerPrizes_1543LayoutProps {
    ctlgDefault3x3?: LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3Props;
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1543Layout = ({ ctlgDefault3x3, layout }: LayoutRecyclerPrizes_1543LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3 {...ctlgDefault3x3} />
        </Region>
    );
};

/** Named region `specialInfoWidget` of LayoutRecyclerPrizes_1543Layout - configured through the parent's `specialInfoWidget` prop. */
export interface LayoutRecyclerPrizes_1543LayoutSpecialInfoWidgetProps {
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1543LayoutSpecialInfoWidget = ({ layout }: LayoutRecyclerPrizes_1543LayoutSpecialInfoWidgetProps) => {
    return (
        <Region
            name="specialInfoWidget"
            params={16}
            layout={{ position: 'absolute', left: 180, width: 142, top: 116, height: 73, ...layout }}
        />
    );
};

/** Named region `itemList` of LayoutRecyclerPrizes_1543Layout - configured through the parent's `itemList` prop. */
export interface LayoutRecyclerPrizes_1543LayoutItemListProps {
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1543LayoutItemList = ({ layout }: LayoutRecyclerPrizes_1543LayoutItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 314, ...layout }}
        >
            <Region
                name="itemList"
                params={16}
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `bundleGrid` of LayoutRecyclerPrizes_1543Layout - configured through the parent's `bundleGrid` prop. */
export interface LayoutRecyclerPrizes_1543LayoutBundleGridProps {
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1543LayoutBundleGrid = ({ layout }: LayoutRecyclerPrizes_1543LayoutBundleGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 18, width: 142, top: 87, height: 76, ...layout }}
        >
            <Region
                name="bundleGrid"
                params={16}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `productView` of LayoutRecyclerPrizes_1543Layout - configured through the parent's `productView` prop. */
export interface LayoutRecyclerPrizes_1543LayoutProductViewProps {
    bundleGrid?: LayoutRecyclerPrizes_1543LayoutBundleGridProps;
    captionCtlgDescription?: string;
    captionCtlgProductName?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
}

export const LayoutRecyclerPrizes_1543LayoutProductView = ({ bundleGrid, captionCtlgDescription, captionCtlgProductName, layout, srcCtlgTeaserimg1 }: LayoutRecyclerPrizes_1543LayoutProductViewProps) => {
    const t = useTranslation();

    return (
        <Region
            name="productView"
            params={16}
            layout={{ position: 'absolute', left: 180, width: 180, top: 0, height: 277, ...layout }}
        >
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1}
                layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 162 }}
            />
            <Region
                name="ctlg_product_name"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 74, top: 166, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgProductName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="ctlg_description"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 162, top: 183, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.title')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 162 }}
                />
            </Region>
            <LayoutRecyclerPrizes_1543LayoutBundleGrid {...bundleGrid} />
        </Region>
    );
};

/** Named region `recyclerPrizesWidget` of LayoutRecyclerPrizes_1543Layout - configured through the parent's `recyclerPrizesWidget` prop. */
export interface LayoutRecyclerPrizes_1543LayoutRecyclerPrizesWidgetProps {
    itemList?: LayoutRecyclerPrizes_1543LayoutItemListProps;
    layout?: BoxLayout;
    productView?: LayoutRecyclerPrizes_1543LayoutProductViewProps;
}

export const LayoutRecyclerPrizes_1543LayoutRecyclerPrizesWidget = ({ itemList, layout, productView }: LayoutRecyclerPrizes_1543LayoutRecyclerPrizesWidgetProps) => {
    return (
        <Region
            name="recyclerPrizesWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 146, height: 314, ...layout }}
        >
            <LayoutRecyclerPrizes_1543LayoutItemList {...itemList} />
            <LayoutRecyclerPrizes_1543LayoutProductView {...productView} />
        </Region>
    );
};

/** Named region `ctlg_default_3x3` of LayoutRecyclerPrizes_1543Layout - configured through the parent's `ctlgDefault3x3` prop. */
export interface LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3Props {
    captionCtlgSelectproduct?: string;
    layout?: BoxLayout;
    recyclerPrizesWidget?: LayoutRecyclerPrizes_1543LayoutRecyclerPrizesWidgetProps;
    specialInfoWidget?: LayoutRecyclerPrizes_1543LayoutSpecialInfoWidgetProps;
}

export const LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3 = ({ captionCtlgSelectproduct, layout, recyclerPrizesWidget, specialInfoWidget }: LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_default_3x3"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_selectproduct"
                params={16}
                layout={{ position: 'absolute', left: 2, width: 128, top: 133, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSelectproduct ?? t('catalog_selectproduct')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <LayoutRecyclerPrizes_1543LayoutSpecialInfoWidget {...specialInfoWidget} />
            <LayoutRecyclerPrizes_1543LayoutRecyclerPrizesWidget {...recyclerPrizesWidget} />
        </Region>
    );
};
