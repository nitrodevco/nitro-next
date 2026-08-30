import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { AddOnBadgeViewWidget, AddOnBadgeViewWidgetProps } from '#base/views/layouts/catalog/widgets/AddOnBadgeViewWidget';
import { BundleGridScrollWidget, BundleGridScrollWidgetProps } from '#base/views/layouts/catalog/widgets/BundleGridScrollWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SimplePriceWidget, SimplePriceWidgetProps } from '#base/views/layouts/catalog/widgets/SimplePriceWidget';

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
}

export const LayoutSingleBundle_1643LayoutCtlgSingleBundle = ({ addOnBadgeViewWidget, bundleGridScrollWidget, captionCtlgDescription, captionCtlgSpecialTxt, captionCtlgText1, layout, purchaseWidget, simplePriceWidget, srcCtlgSpecialImg, srcCtlgTeaserimg1 }: LayoutSingleBundle_1643LayoutCtlgSingleBundleProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_single_bundle"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionCtlgDescription ?? t('lorem.html')}
                textOptions={{ wordWrap: true, wordWrapWidth: 329 }}
                name="ctlg_description"
                verticalAlign="top"
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 329, top: 103, height: 62 }}
            />
            <ThemeText
                text={captionCtlgSpecialTxt ?? t('lorem.html')}
                textOptions={{ wordWrap: true, wordWrapWidth: 173 }}
                name="ctlg_special_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 159, width: 173, top: 182, height: 25 }}
            />
            <PurchaseWidget
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 30 }}
                {...purchaseWidget}
            />
            <BundleGridScrollWidget
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
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 324, top: 385, height: 40 }}
            >
                <ThemeImage
                    name="ctlg_special_img"
                    src={srcCtlgSpecialImg}
                    layout={{ position: 'absolute', left: 10, width: 32, top: 5, height: 30 }}
                />
                <ThemeText
                    text={captionCtlgText1 ?? t('lorem.html')}
                    name="ctlg_text_1"
                    layout={{ position: 'absolute', left: 51, width: 256, top: 10, bottom: 8 }}
                />
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
