import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { AddOnBadgeViewWidget2, AddOnBadgeViewWidget2Props } from '#base/views/layouts/catalog/widgets/AddOnBadgeViewWidget2';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SimplePriceWidget, SimplePriceWidgetProps } from '#base/views/layouts/catalog/widgets/SimplePriceWidget';

/** Generated from `1587_layout_single_bundle_xml` (layout "ctlg_single_bundle", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSingleBundle_1587LayoutProps {
    ctlgSingleBundle?: LayoutSingleBundle_1587LayoutCtlgSingleBundleProps;
    layout?: BoxLayout;
}

export const LayoutSingleBundle_1587Layout = ({ ctlgSingleBundle, layout }: LayoutSingleBundle_1587LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSingleBundle_1587LayoutCtlgSingleBundle {...ctlgSingleBundle} />
        </Region>
    );
};

/** Named region `bundleGrid` of LayoutSingleBundle_1587Layout - configured through the parent's `bundleGrid` prop. */
export interface LayoutSingleBundle_1587LayoutBundleGridProps {
    layout?: BoxLayout;
}

export const LayoutSingleBundle_1587LayoutBundleGrid = ({ layout }: LayoutSingleBundle_1587LayoutBundleGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 4, width: 178, top: 3, bottom: 6, ...layout }}
        >
            <Region
                name="bundleGrid"
                params={2064}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `ctlg_single_bundle` of LayoutSingleBundle_1587Layout - configured through the parent's `ctlgSingleBundle` prop. */
export interface LayoutSingleBundle_1587LayoutCtlgSingleBundleProps {
    addOnBadgeViewWidget?: AddOnBadgeViewWidget2Props;
    bundleGrid?: LayoutSingleBundle_1587LayoutBundleGridProps;
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    captionCtlgText1?: string;
    layout?: BoxLayout;
    purchaseWidget?: PurchaseWidgetProps;
    simplePriceWidget?: SimplePriceWidgetProps;
    srcCtlgSpecialImg?: string;
    srcCtlgTeaserimg1?: string;
}

export const LayoutSingleBundle_1587LayoutCtlgSingleBundle = ({ addOnBadgeViewWidget, bundleGrid, captionCtlgDescription, captionCtlgSpecialTxt, captionCtlgText1, layout, purchaseWidget, simplePriceWidget, srcCtlgSpecialImg, srcCtlgTeaserimg1 }: LayoutSingleBundle_1587LayoutCtlgSingleBundleProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_single_bundle"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_description"
                params={1}
                layout={{ position: 'absolute', left: 15, width: 329, top: 13, height: 62, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 329 }}
                />
            </Region>
            <Region
                name="ctlg_special_txt"
                params={1}
                layout={{ position: 'absolute', left: 159, width: 173, top: 92, height: 25, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSpecialTxt ?? t('lorem.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 173 }}
                />
            </Region>
            <Border
                variant="6"
                name="bundleGridScrollWidget"
                tags={[ 'EMBEDDED' ]}
                params={2064}
                layout={{ position: 'absolute', left: 164, width: 186, top: 117, bottom: 96 }}
            >
                <LayoutSingleBundle_1587LayoutBundleGrid {...bundleGrid} />
            </Border>
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/small_movie_roomteaser.gif'}
                layout={{ position: 'absolute', left: 6, width: 157, top: 119, height: 238 }}
            />
            <Border
                variant="3"
                params={1040}
                tintColor="#e0e0e0"
                layout={{ position: 'absolute', left: 17, width: 324, bottom: 35, height: 40 }}
            >
                <ThemeImage
                    name="ctlg_special_img"
                    params={16}
                    src={srcCtlgSpecialImg}
                    layout={{ position: 'absolute', left: 10, width: 32, top: 5, height: 30 }}
                />
                <Region
                    name="ctlg_text_1"
                    params={1}
                    layout={{ position: 'absolute', left: 51, width: 256, top: 10, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionCtlgText1 ?? t('lorem.html')} />
                </Region>
            </Border>
            <AddOnBadgeViewWidget2
                layout={{ position: 'absolute', left: 12, width: 40, top: 125, height: 40 }}
                {...addOnBadgeViewWidget}
            />
            <SimplePriceWidget
                layout={{ position: 'absolute', left: 74, width: 83, top: 125, height: 30 }}
                {...simplePriceWidget}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
        </Region>
    );
};
