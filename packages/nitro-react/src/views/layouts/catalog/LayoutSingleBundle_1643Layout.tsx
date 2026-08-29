import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1643_layout_single_bundle_xml` (layout "ctlg_single_bundle", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSingleBundle_1643LayoutProps {
    ctlgSingleBundle?: LayoutSingleBundle_1643LayoutCtlgSingleBundleProps;
    layout?: BoxLayout;
}

export const LayoutSingleBundle_1643Layout = ({ ctlgSingleBundle, layout }: LayoutSingleBundle_1643LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutSingleBundle_1643LayoutCtlgSingleBundle {...ctlgSingleBundle} />
        </Region>
    );
};

/** Named region `purchaseWidget` of LayoutSingleBundle_1643Layout - configured through the parent's `purchaseWidget` prop. */
export interface LayoutSingleBundle_1643LayoutPurchaseWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSingleBundle_1643LayoutPurchaseWidget = ({ layout }: LayoutSingleBundle_1643LayoutPurchaseWidgetProps) => {
    return (
        <Region
            name="purchaseWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30, ...layout }}
        />
    );
};

/** Named region `bundleGrid` of LayoutSingleBundle_1643Layout - configured through the parent's `bundleGrid` prop. */
export interface LayoutSingleBundle_1643LayoutBundleGridProps {
    layout?: BoxLayout;
}

export const LayoutSingleBundle_1643LayoutBundleGrid = ({ layout }: LayoutSingleBundle_1643LayoutBundleGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 176, top: 0, height: 157, ...layout }}
        >
            <Region
                name="bundleGrid"
                params={16}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `bundleGridScrollWidget` of LayoutSingleBundle_1643Layout - configured through the parent's `bundleGridScrollWidget` prop. */
export interface LayoutSingleBundle_1643LayoutBundleGridScrollWidgetProps {
    bundleGrid?: LayoutSingleBundle_1643LayoutBundleGridProps;
    layout?: BoxLayout;
}

export const LayoutSingleBundle_1643LayoutBundleGridScrollWidget = ({ bundleGrid, layout }: LayoutSingleBundle_1643LayoutBundleGridScrollWidgetProps) => {
    return (
        <Region
            name="bundleGridScrollWidget"
            tags={[ 'EMBEDDED' ]}
            params={16}
            layout={{ position: 'absolute', left: 164, width: 176, top: 207, height: 157, ...layout }}
        >
            <LayoutSingleBundle_1643LayoutBundleGrid {...bundleGrid} />
        </Region>
    );
};

/** Named region `addOnBadgeViewWidget` of LayoutSingleBundle_1643Layout - configured through the parent's `addOnBadgeViewWidget` prop. */
export interface LayoutSingleBundle_1643LayoutAddOnBadgeViewWidgetProps {
    layout?: BoxLayout;
}

export const LayoutSingleBundle_1643LayoutAddOnBadgeViewWidget = ({ layout }: LayoutSingleBundle_1643LayoutAddOnBadgeViewWidgetProps) => {
    return (
        <Region
            name="addOnBadgeViewWidget"
            layout={{ position: 'absolute', left: 292, width: 40, top: 167, height: 40, ...layout }}
        />
    );
};

/** Named region `fake_productimage` of LayoutSingleBundle_1643Layout - configured through the parent's `fakeProductimage` prop. */
export interface LayoutSingleBundle_1643LayoutFakeProductimageProps {
    layout?: BoxLayout;
}

export const LayoutSingleBundle_1643LayoutFakeProductimage = ({ layout }: LayoutSingleBundle_1643LayoutFakeProductimageProps) => {
    return (
        <Region
            name="fake_productimage"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 83, top: 0, height: 30, ...layout }}
        />
    );
};

/** Named region `simplePriceWidget` of LayoutSingleBundle_1643Layout - configured through the parent's `simplePriceWidget` prop. */
export interface LayoutSingleBundle_1643LayoutSimplePriceWidgetProps {
    fakeProductimage?: LayoutSingleBundle_1643LayoutFakeProductimageProps;
    layout?: BoxLayout;
}

export const LayoutSingleBundle_1643LayoutSimplePriceWidget = ({ fakeProductimage, layout }: LayoutSingleBundle_1643LayoutSimplePriceWidgetProps) => {
    return (
        <Region
            name="simplePriceWidget"
            layout={{ position: 'absolute', left: 63, width: 83, top: 167, height: 30, ...layout }}
        >
            <LayoutSingleBundle_1643LayoutFakeProductimage {...fakeProductimage} />
        </Region>
    );
};

/** Named region `ctlg_single_bundle` of LayoutSingleBundle_1643Layout - configured through the parent's `ctlgSingleBundle` prop. */
export interface LayoutSingleBundle_1643LayoutCtlgSingleBundleProps {
    addOnBadgeViewWidget?: LayoutSingleBundle_1643LayoutAddOnBadgeViewWidgetProps;
    bundleGridScrollWidget?: LayoutSingleBundle_1643LayoutBundleGridScrollWidgetProps;
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    captionCtlgText1?: string;
    layout?: BoxLayout;
    purchaseWidget?: LayoutSingleBundle_1643LayoutPurchaseWidgetProps;
    simplePriceWidget?: LayoutSingleBundle_1643LayoutSimplePriceWidgetProps;
    srcCtlgSpecialImg?: string;
    srcCtlgTeaserimg1?: string;
}

export const LayoutSingleBundle_1643LayoutCtlgSingleBundle = ({ addOnBadgeViewWidget, bundleGridScrollWidget, captionCtlgDescription, captionCtlgSpecialTxt, captionCtlgText1, layout, purchaseWidget, simplePriceWidget, srcCtlgSpecialImg, srcCtlgTeaserimg1 }: LayoutSingleBundle_1643LayoutCtlgSingleBundleProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_single_bundle"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_description"
                params={1}
                layout={{ position: 'absolute', left: 15, width: 329, top: 103, height: 62, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 329 }}
                />
            </Region>
            <Region
                name="ctlg_special_txt"
                params={1}
                layout={{ position: 'absolute', left: 159, width: 173, top: 182, height: 25, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSpecialTxt ?? t('lorem.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 173 }}
                />
            </Region>
            <LayoutSingleBundle_1643LayoutPurchaseWidget {...purchaseWidget} />
            <LayoutSingleBundle_1643LayoutBundleGridScrollWidget {...bundleGridScrollWidget} />
            <ThemeImage
                name="ctlg_teaserimg_1"
                params={16}
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/ctlg_furnimatic_image.gif'}
                layout={{ position: 'absolute', left: 7, width: 137, top: 169, height: 218 }}
            />
            <Border
                variant="3"
                params={16}
                tintColor="#e0e0e0"
                layout={{ position: 'absolute', left: 17, width: 324, top: 385, height: 40 }}
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
            <LayoutSingleBundle_1643LayoutAddOnBadgeViewWidget {...addOnBadgeViewWidget} />
            <LayoutSingleBundle_1643LayoutSimplePriceWidget {...simplePriceWidget} />
        </Region>
    );
};
