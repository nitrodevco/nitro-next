import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { TargetedOfferDialogLayoutBtnBuyItem } from './TargetedOfferDialogLayoutBtnBuyItem';
import { TargetedOfferDialogLayoutBtnGetCreditsItem } from './TargetedOfferDialogLayoutBtnGetCreditsItem';
import { TargetedOfferDialogLayoutCntQuantityItem } from './TargetedOfferDialogLayoutCntQuantityItem';

/** Generated from `1544_targeted_offer_dialog_xml` (layout "targeted_offer_window", 575x430) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TargetedOfferDialogLayoutProps {
    captionTxtDescription?: string;
    captionTxtPlusCharacter?: string;
    captionTxtPriceActivityPoints?: string;
    captionTxtPriceCredits?: string;
    captionTxtPriceLabel?: string;
    captionTxtStatus?: string;
    captionTxtTimeLeft?: string;
    captionTxtTimeLeftLabel1?: string;
    captionTxtTimeLeftLabel2?: string;
    captionTxtTitle?: string;
    itemsItemlistButtonbar?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    srcBmpIllustration?: string;
    srcCreditIcon?: string;
    srcPricebg?: string;
}

export const TargetedOfferDialogLayout = ({ captionTxtDescription, captionTxtPlusCharacter, captionTxtPriceActivityPoints, captionTxtPriceCredits, captionTxtPriceLabel, captionTxtStatus, captionTxtTimeLeft, captionTxtTimeLeftLabel1, captionTxtTimeLeftLabel2, captionTxtTitle, itemsItemlistButtonbar, layout, onClose, srcBmpIllustration, srcCreditIcon, srcPricebg }: TargetedOfferDialogLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 575, height: 430, minWidth: 575, minHeight: 430, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Border
                    variant="3"
                    tintColor="#ffde5a"
                    layout={{ position: 'absolute', left: 13, width: 320, top: 48, height: 249 }}
                >
                    <ThemeText
                        text={captionTxtTitle ?? 'UFO - Ultimate first time offer'}
                        textStyle="text-style-ubuntu-condensed-title"
                        textOptions={{ fill: '#000001' }}
                        name="txt_title"
                        layout={{ position: 'absolute', left: 10, width: 301, top: 12, height: 28 }}
                    />
                    <ThemeText
                        text={captionTxtDescription ?? 'This is just this insane offer which is going to span over several several lines. Yee.Lorem ipsumdolor sit amet etc. '}
                        textOptions={{ wordWrap: true, wordWrapWidth: 262 }}
                        name="txt_description"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 12, width: 262, top: 45, height: 195, maxWidth: 355 }}
                    />
                </Border>
                <ThemeImage
                    name="pricebg"
                    src={srcPricebg ?? layoutImage('catalogue_ufo_pricebg.png')}
                    layout={{ position: 'absolute', left: 236, width: 136, top: 188, height: 138 }}
                />
                <Region layout={{ position: 'absolute', left: 247, width: 122, top: 194, height: 134, justifyContent: 'center' }}>
                    <ThemeText
                        text={captionTxtPriceLabel ?? 'Price:'}
                        textOptions={{ align: 'center' }}
                        name="txt_price_label"
                        layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 97, top: 10, bottom: 100 }}
                    />
                    <ThemeText
                        text={captionTxtPriceCredits ?? '40'}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="txt_price_credits"
                        layout={{ position: 'absolute', right: 21, width: 89, top: 27, bottom: 64 }}
                    />
                    <ThemeImage
                        name="credit_icon"
                        src={srcCreditIcon ?? layoutImage('pursearea_credits_icon2.png')}
                        layout={{ position: 'absolute', left: 87, width: 22, top: 43, height: 22 }}
                    />
                    <ThemeText
                        text={captionTxtPriceActivityPoints ?? '20'}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="txt_price_activityPoints"
                        layout={{ position: 'absolute', right: 22, width: 89, top: 59, bottom: 32 }}
                    />
                    <Icon
                        variant="0"
                        name="activityPoints_icon"
                        layout={{ position: 'absolute', left: 88, width: 22, top: 74, height: 22 }}
                    />
                    <ThemeText
                        text={captionTxtPlusCharacter ?? ' '}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="txt_plus_character"
                        layout={{ position: 'absolute', marginLeft: -45.5, marginRight: 45.5, width: 41, top: 62, bottom: 41 }}
                    />
                </Region>
                <ThemeImage
                    name="bmp_illustration"
                    src={srcBmpIllustration}
                    layout={{ position: 'absolute', left: 379, width: 179, top: 47, height: 283 }}
                />
                <Region layout={{ position: 'absolute', marginLeft: 3.5, marginRight: -3.5, width: 540, top: 316, height: 70, justifyContent: 'center' }}>
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
                                <TargetedOfferDialogLayoutCntQuantityItem />
                                <TargetedOfferDialogLayoutBtnGetCreditsItem />
                                <TargetedOfferDialogLayoutBtnBuyItem />
                            </>
                        )}
                    </Region>
                </Region>
                <Border
                    variant="3"
                    name="cnt_time_left"
                    tintColor="#fc5046"
                    layout={{ position: 'absolute', left: -3, width: 579, top: -5, height: 40 }}
                >
                    <Region layout={{ position: 'absolute', left: 5, width: 569, top: 7, height: 30, justifyContent: 'center' }}>
                        <Region layout={{ position: 'absolute', marginLeft: -14.5, marginRight: 14.5, top: 0, bottom: 0, flexDirection: 'row' }}>
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
