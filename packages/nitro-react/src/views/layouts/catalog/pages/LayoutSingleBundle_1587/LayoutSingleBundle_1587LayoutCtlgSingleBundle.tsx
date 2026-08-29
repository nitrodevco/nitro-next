import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { AddOnBadgeViewWidget, AddOnBadgeViewWidgetProps } from '#base/views/layouts/catalog/widgets/AddOnBadgeViewWidget';
import { PurchaseWidget, PurchaseWidgetProps } from '#base/views/layouts/catalog/widgets/PurchaseWidget';
import { SimplePriceWidget, SimplePriceWidgetProps } from '#base/views/layouts/catalog/widgets/SimplePriceWidget';

/** Named region `ctlg_single_bundle` of LayoutSingleBundle_1587Layout - configured through the parent's `ctlgSingleBundle` prop. */
export interface LayoutSingleBundle_1587LayoutCtlgSingleBundleProps {
    addOnBadgeViewWidget?: AddOnBadgeViewWidgetProps;
    captionCtlgDescription?: string;
    captionCtlgSpecialTxt?: string;
    captionCtlgText1?: string;
    itemsBundleGrid?: ReactNode;
    layout?: BoxLayout;
    purchaseWidget?: PurchaseWidgetProps;
    simplePriceWidget?: SimplePriceWidgetProps;
    srcCtlgSpecialImg?: string;
    srcCtlgTeaserimg1?: string;
}

export const LayoutSingleBundle_1587LayoutCtlgSingleBundle = ({ addOnBadgeViewWidget, captionCtlgDescription, captionCtlgSpecialTxt, captionCtlgText1, itemsBundleGrid, layout, purchaseWidget, simplePriceWidget, srcCtlgSpecialImg, srcCtlgTeaserimg1 }: LayoutSingleBundle_1587LayoutCtlgSingleBundleProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_single_bundle"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_description"
                layout={{ position: 'absolute', left: 15, width: 329, top: 13, height: 62, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('lorem.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 329 }}
                />
            </Region>
            <Region
                name="ctlg_special_txt"
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
                layout={{ position: 'absolute', left: 164, width: 186, top: 117, bottom: 96 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 4, width: 178, top: 3, bottom: 6 }}
                >
                    <Region
                        name="bundleGrid"
                        layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
                    >
                        {itemsBundleGrid}
                    </Region>
                </ScrollArea>
            </Border>
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/small_movie_roomteaser.gif'}
                layout={{ position: 'absolute', left: 6, width: 157, top: 119, height: 238 }}
            />
            <Border
                variant="3"
                tintColor="#e0e0e0"
                layout={{ position: 'absolute', left: 17, width: 324, bottom: 35, height: 40 }}
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
                    {captionCtlgText1 ?? t('lorem.html')}
                </Region>
            </Border>
            <AddOnBadgeViewWidget
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
