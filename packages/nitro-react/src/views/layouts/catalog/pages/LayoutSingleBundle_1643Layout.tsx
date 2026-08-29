import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { AddOnBadgeViewWidget, AddOnBadgeViewWidgetProps } from '#base/views/layouts/catalog/widgets/AddOnBadgeViewWidget';
import { BundleGridScrollWidget, BundleGridScrollWidgetProps } from '#base/views/layouts/catalog/widgets/BundleGridScrollWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SimplePriceWidget, SimplePriceWidgetProps } from '#base/views/layouts/catalog/widgets/SimplePriceWidget';

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

/** Named region `ctlg_single_bundle` of LayoutSingleBundle_1643Layout - configured through the parent's `ctlgSingleBundle` prop. */
export interface LayoutSingleBundle_1643LayoutCtlgSingleBundleProps {
    addOnBadgeViewWidget?: AddOnBadgeViewWidgetProps;
    bundleGridScrollWidget?: BundleGridScrollWidgetProps;
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    captionCtlgText1?: string;
    layout?: BoxLayout;
    purchaseWidget?: PurchaseWidgetProps;
    simplePriceWidget?: SimplePriceWidgetProps;
    srcCtlgSpecialImg?: string;
    srcCtlgTeaserimg1?: string;
    tags?: string[];
}

export const LayoutSingleBundle_1643LayoutCtlgSingleBundle = ({ addOnBadgeViewWidget, bundleGridScrollWidget, captionCtlgDescription, captionCtlgSpecialTxt, captionCtlgText1, layout, purchaseWidget, simplePriceWidget, srcCtlgSpecialImg, srcCtlgTeaserimg1, tags }: LayoutSingleBundle_1643LayoutCtlgSingleBundleProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_single_bundle"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_description"
                layout={{ position: 'absolute', left: 15, width: 329, top: 103, height: 62, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 329 }}
                />
            </Region>
            <Region
                name="ctlg_special_txt"
                layout={{ position: 'absolute', left: 159, width: 173, top: 182, height: 25, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgSpecialTxt ?? t('lorem.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 173 }}
                />
            </Region>
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                {...purchaseWidget}
            />
            <BundleGridScrollWidget
                tags={[ 'EMBEDDED' ]}
                layout={{ position: 'absolute', left: 164, width: 176, top: 207, height: 157 }}
                {...bundleGridScrollWidget}
            />
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/ctlg_furnimatic_image.gif'}
                layout={{ position: 'absolute', left: 7, width: 137, top: 169, height: 218 }}
            />
            <Border
                variant="3"
                tintColor="#e0e0e0"
                layout={{ position: 'absolute', left: 17, width: 324, top: 385, height: 40 }}
            >
                <ThemeImage
                    name="ctlg_special_img"
                    src={srcCtlgSpecialImg}
                    layout={{ position: 'absolute', left: 10, width: 32, top: 5, height: 30 }}
                />
                <Region
                    name="ctlg_text_1"
                    layout={{ position: 'absolute', left: 51, width: 256, top: 10, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionCtlgText1 ?? t('lorem.html')} />
                </Region>
            </Border>
            <AddOnBadgeViewWidget
                layout={{ position: 'absolute', left: 292, width: 40, top: 167, height: 40 }}
                {...addOnBadgeViewWidget}
            />
            <SimplePriceWidget
                layout={{ position: 'absolute', left: 63, width: 83, top: 167, height: 30 }}
                {...simplePriceWidget}
            />
        </Region>
    );
};
