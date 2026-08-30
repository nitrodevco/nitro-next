import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { TargetedOfferDialogVariationLayoutBtnBuyItem } from './TargetedOfferDialogVariationLayoutBtnBuyItem';
import { TargetedOfferDialogVariationLayoutBtnGetCreditsItem } from './TargetedOfferDialogVariationLayoutBtnGetCreditsItem';
import { TargetedOfferDialogVariationLayoutCntQuantityItem } from './TargetedOfferDialogVariationLayoutCntQuantityItem';

/** Generated from `1646_targeted_offer_dialog_variation_xml` (layout "targeted_offer_variations", 640x480) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TargetedOfferDialogVariationLayoutProps {
    captionTxtStatus?: string;
    captionTxtTimeLeft?: string;
    captionTxtTimeLeftLabel1?: string;
    captionTxtTimeLeftLabel2?: string;
    itemsItemlistButtonbar?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    srcBmpIllustration?: string;
}

export const TargetedOfferDialogVariationLayout = ({ captionTxtStatus, captionTxtTimeLeft, captionTxtTimeLeftLabel1, captionTxtTimeLeftLabel2, itemsItemlistButtonbar, layout, onClose, srcBmpIllustration }: TargetedOfferDialogVariationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 640, height: 480, minWidth: 640, minHeight: 480, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <ThemeImage
                    name="bmp_illustration"
                    src={srcBmpIllustration}
                    layout={{ position: 'absolute', left: 0, width: 638, top: 35, height: 340 }}
                />
                <Region layout={{ position: 'absolute', marginLeft: 11, marginRight: -11, width: 540, top: 366, height: 70, justifyContent: 'center' }}>
                    <ThemeText
                        text={captionTxtStatus ?? t('targeted.offer.not.enough.credits')}
                        textStyle="text-style-u-bold"
                        textOptions={{ align: 'center' }}
                        name="txt_status"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 14, height: 21 }}
                    />
                    <Region
                        name="itemlist_buttonbar"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, top: 38, flexDirection: 'row', gap: 10 }}
                    >
                        {itemsItemlistButtonbar ?? (
                            <>
                                <TargetedOfferDialogVariationLayoutCntQuantityItem />
                                <TargetedOfferDialogVariationLayoutBtnGetCreditsItem />
                                <TargetedOfferDialogVariationLayoutBtnBuyItem />
                            </>
                        )}
                    </Region>
                </Region>
                <Border
                    variant="3"
                    name="cnt_time_left"
                    tintColor="#fc5046"
                    layout={{ position: 'absolute', left: -3, width: 641, top: -5, height: 40 }}
                >
                    <Region layout={{ position: 'absolute', left: 5, width: 631, top: 7, height: 30, justifyContent: 'center' }}>
                        <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, top: 0, bottom: 0, flexDirection: 'row' }}>
                            <ThemeText
                                text={captionTxtTimeLeftLabel1 ?? '...'}
                                textOptions={{ fill: '#ffffff' }}
                                name="txt_time_left_label_1"
                                layout={{ width: 15, height: 21, flexShrink: 0 }}
                            />
                            <ThemeText
                                text={captionTxtTimeLeft ?? '00:00'}
                                textOptions={{ fill: '#ffffff' }}
                                name="txt_time_left"
                                layout={{ width: 66, flexShrink: 0 }}
                            />
                            <ThemeText
                                text={captionTxtTimeLeftLabel2 ?? '...'}
                                textOptions={{ fill: '#ffffff' }}
                                name="txt_time_left_label_2"
                                layout={{ width: 15, height: 21, flexShrink: 0 }}
                            />
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Frame>
    );
};
