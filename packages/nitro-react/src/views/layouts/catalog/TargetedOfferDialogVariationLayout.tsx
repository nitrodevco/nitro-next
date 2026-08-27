import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

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
            params={32769}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 640, height: 480, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="bmp_illustration"
                    params={16}
                    src={srcBmpIllustration}
                    layout={{ position: 'absolute', left: 0, width: 638, top: 35, height: 340 }}
                />
                <Region
                    params={786448}
                    layout={{ position: 'absolute', left: 55, width: 540, top: 366, height: 70 }}
                >
                    <Region
                        name="txt_status"
                        params={147472}
                        layout={{ position: 'absolute', left: 0, width: 540, top: 14, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionTxtStatus ?? t('targeted.offer.not.enough.credits')}
                            textStyle="text-style-u-bold"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="itemlist_buttonbar"
                        params={934096}
                        layout={{ position: 'absolute', left: 30, width: 481, top: 38, height: 300, flexDirection: 'row', gap: 10 }}
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
                    params={16400}
                    tintColor="#fc5046"
                    layout={{ position: 'absolute', left: -3, width: 641, top: -5, height: 40 }}
                >
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 5, width: 631, top: 7, height: 30 }}
                    >
                        <Region
                            params={933936}
                            layout={{ position: 'absolute', left: 268, width: 96, top: 0, height: 30, flexDirection: 'row' }}
                        >
                            <Region
                                name="txt_time_left_label_1"
                                params={144}
                                layout={{ width: 15, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionTxtTimeLeftLabel1 ?? '...'}
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <Region
                                name="txt_time_left"
                                params={8405136}
                                layout={{ width: 66, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionTxtTimeLeft ?? '00:00'}
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <Region
                                name="txt_time_left_label_2"
                                params={144}
                                layout={{ width: 15, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionTxtTimeLeftLabel2 ?? '...'}
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Frame>
    );
};

/** Row template `cnt_quantity` of TargetedOfferDialogVariationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferDialogVariationLayoutCntQuantityItemProps {
    layout?: BoxLayout;
}

export const TargetedOfferDialogVariationLayoutCntQuantityItem = ({ layout }: TargetedOfferDialogVariationLayoutCntQuantityItemProps) => {
    const t = useTranslation();
    const [ quantityInputValue, setQuantityInputValue ] = useState('');

    return (
        <Region
            name="cnt_quantity"
            params={786640}
            layout={{ width: 100, height: 30, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 100, top: 4, height: 17, maxWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('catalog.bundlewidget.quantity')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <Border
                variant="0"
                params={16}
                layout={{ position: 'absolute', left: 65, width: 30, top: 0, height: 25 }}
            >
                <TextInput
                    value={quantityInputValue}
                    onChange={setQuantityInputValue}
                    layout={{ position: 'absolute', left: 3, width: 22, top: 5, height: 15 }}
                />
            </Border>
        </Region>
    );
};

/** Row template `btn_get_credits` of TargetedOfferDialogVariationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferDialogVariationLayoutBtnGetCreditsItemProps {
    layout?: BoxLayout;
    onBtnGetCredits?: () => void;
}

export const TargetedOfferDialogVariationLayoutBtnGetCreditsItem = ({ layout, onBtnGetCredits }: TargetedOfferDialogVariationLayoutBtnGetCreditsItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="6"
            name="btn_get_credits"
            params={917713}
            tintColor="#4faf4f"
            onPointerTap={onBtnGetCredits}
            layout={{ width: 189, height: 30, flexShrink: 0, ...layout }}
        >
            {t('targeted.offer.button.credits')}
        </ButtonThick>
    );
};

/** Row template `btn_buy` of TargetedOfferDialogVariationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferDialogVariationLayoutBtnBuyItemProps {
    layout?: BoxLayout;
    onBtnBuy?: () => void;
}

export const TargetedOfferDialogVariationLayoutBtnBuyItem = ({ layout, onBtnBuy }: TargetedOfferDialogVariationLayoutBtnBuyItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="6"
            name="btn_buy"
            params={917713}
            tintColor="#4faf4f"
            onPointerTap={onBtnBuy}
            layout={{ width: 172, height: 30, flexShrink: 0, ...layout }}
        >
            {t('targeted.offer.button.buy')}
        </ButtonThick>
    );
};
