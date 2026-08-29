import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1646_targeted_offer_dialog_variation_xml` (layout "targeted_offer_variations", 640x480) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TargetedOfferDialogVariationLayoutProps {
    captionTxtStatus?: string;
    captionTxtTimeLeft?: string;
    captionTxtTimeLeftLabel1?: string;
    captionTxtTimeLeftLabel2?: string;
    itemlistButtonbar?: TargetedOfferDialogVariationLayoutItemlistButtonbarProps;
    layout?: BoxLayout;
    onClose?: () => void;
    srcBmpIllustration?: string;
}

export const TargetedOfferDialogVariationLayout = ({ captionTxtStatus, captionTxtTimeLeft, captionTxtTimeLeftLabel1, captionTxtTimeLeftLabel2, itemlistButtonbar, layout, onClose, srcBmpIllustration }: TargetedOfferDialogVariationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 640, height: 480, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <ThemeImage
                    name="bmp_illustration"
                    src={srcBmpIllustration}
                    layout={{ position: 'absolute', left: 0, width: 638, top: 35, height: 340 }}
                />
                <Region layout={{ position: 'absolute', marginLeft: 5, marginRight: -5, width: 540, top: 366, height: 70, justifyContent: 'center' }}>
                    <Region
                        name="txt_status"
                        layout={{ position: 'absolute', left: 0, width: 540, top: 14, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionTxtStatus ?? t('targeted.offer.not.enough.credits')}
                            textStyle="text-style-u-bold"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <TargetedOfferDialogVariationLayoutItemlistButtonbar {...itemlistButtonbar} />
                </Region>
                <Border
                    variant="3"
                    name="cnt_time_left"
                    tintColor="#fc5046"
                    layout={{ position: 'absolute', left: -3, width: 641, top: -5, height: 40 }}
                >
                    <Region layout={{ position: 'absolute', left: 5, width: 631, top: 7, height: 30, justifyContent: 'center' }}>
                        <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, top: 0, flexDirection: 'row' }}>
                            <Region
                                name="txt_time_left_label_1"
                                layout={{ width: 15, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionTxtTimeLeftLabel1 ?? '...'}
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <Region
                                name="txt_time_left"
                                layout={{ width: 66, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionTxtTimeLeft ?? '00:00'}
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <Region
                                name="txt_time_left_label_2"
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
    tags?: string[];
}

export const TargetedOfferDialogVariationLayoutCntQuantityItem = ({ layout, tags }: TargetedOfferDialogVariationLayoutCntQuantityItemProps) => {
    const t = useTranslation();
    const [ quantityInputValue, setQuantityInputValue ] = useState('');

    return (
        <Region
            name="cnt_quantity"
            tags={tags}
            layout={{ width: 100, height: 30, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 100, top: 4, height: 17, maxWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('catalog.bundlewidget.quantity')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <Border
                variant="0"
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
    tags?: string[];
}

export const TargetedOfferDialogVariationLayoutBtnGetCreditsItem = ({ layout, onBtnGetCredits, tags }: TargetedOfferDialogVariationLayoutBtnGetCreditsItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="6"
            name="btn_get_credits"
            tags={tags}
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
    tags?: string[];
}

export const TargetedOfferDialogVariationLayoutBtnBuyItem = ({ layout, onBtnBuy, tags }: TargetedOfferDialogVariationLayoutBtnBuyItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="6"
            name="btn_buy"
            tags={tags}
            tintColor="#4faf4f"
            onPointerTap={onBtnBuy}
            layout={{ width: 172, height: 30, flexShrink: 0, ...layout }}
        >
            {t('targeted.offer.button.buy')}
        </ButtonThick>
    );
};

/** Named region `itemlist_buttonbar` of TargetedOfferDialogVariationLayout - configured through the parent's `itemlistButtonbar` prop. */
export interface TargetedOfferDialogVariationLayoutItemlistButtonbarProps {
    itemsItemlistButtonbar?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const TargetedOfferDialogVariationLayoutItemlistButtonbar = ({ itemsItemlistButtonbar, layout, tags }: TargetedOfferDialogVariationLayoutItemlistButtonbarProps) => {
    return (
        <Region
            name="itemlist_buttonbar"
            tags={tags}
            layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, top: 38, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsItemlistButtonbar ?? (
                <>
                    <TargetedOfferDialogVariationLayoutCntQuantityItem />
                    <TargetedOfferDialogVariationLayoutBtnGetCreditsItem />
                    <TargetedOfferDialogVariationLayoutBtnBuyItem />
                </>
            )}
        </Region>
    );
};
