import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

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
            layout={{ width: 575, height: 430, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Border
                    variant="3"
                    tintColor="#ffde5a"
                    layout={{ position: 'absolute', left: 13, width: 320, top: 48, height: 249 }}
                >
                    <Region
                        name="txt_title"
                        layout={{ position: 'absolute', left: 10, width: 301, top: 12, height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTxtTitle ?? 'UFO - Ultimate first time offer'}
                            textStyle="text-style-ubuntu-condensed-title"
                            textOptions={{ fill: '#000001' }}
                        />
                    </Region>
                    <Region
                        name="txt_description"
                        layout={{ position: 'absolute', left: 12, width: 262, top: 45, height: 195, maxWidth: 355, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTxtDescription ?? 'This is just this insane offer which is going to span over several several lines. Yee.Lorem ipsumdolor sit amet etc. '}
                            textOptions={{ wordWrap: true, wordWrapWidth: 262 }}
                        />
                    </Region>
                </Border>
                <ThemeImage
                    name="pricebg"
                    src={srcPricebg ?? layoutImage('catalogue_ufo_pricebg.png')}
                    layout={{ position: 'absolute', left: 236, width: 136, top: 188, height: 138 }}
                />
                <Region layout={{ position: 'absolute', left: 247, width: 122, top: 194, height: 134, justifyContent: 'center' }}>
                    <Region
                        name="txt_price_label"
                        layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 97, top: 10, bottom: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionTxtPriceLabel ?? 'Price:'}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="txt_price_credits"
                        layout={{ position: 'absolute', right: 21, width: 89, top: 27, bottom: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionTxtPriceCredits ?? '40'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        name="credit_icon"
                        src={srcCreditIcon ?? layoutImage('pursearea_credits_icon2.png')}
                        layout={{ position: 'absolute', left: 87, width: 22, top: 43, height: 22 }}
                    />
                    <Region
                        name="txt_price_activityPoints"
                        layout={{ position: 'absolute', right: 22, width: 89, top: 59, bottom: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionTxtPriceActivityPoints ?? '20'}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Icon
                        variant="0"
                        name="activityPoints_icon"
                        layout={{ position: 'absolute', left: 88, width: 22, top: 74, height: 22 }}
                    />
                    <Region
                        name="txt_plus_character"
                        layout={{ position: 'absolute', marginLeft: -45.5, marginRight: 45.5, width: 41, top: 62, bottom: 41, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionTxtPlusCharacter ?? ' '}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Region>
                <ThemeImage
                    name="bmp_illustration"
                    src={srcBmpIllustration}
                    layout={{ position: 'absolute', left: 379, width: 179, top: 47, height: 283 }}
                />
                <Region layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 540, top: 316, height: 70, justifyContent: 'center' }}>
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
                        <Region layout={{ position: 'absolute', marginLeft: -14.5, marginRight: 14.5, top: 0, flexDirection: 'row' }}>
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

/** Row template `cnt_quantity` of TargetedOfferDialogLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferDialogLayoutCntQuantityItemProps {
    layout?: BoxLayout;
}

export const TargetedOfferDialogLayoutCntQuantityItem = ({ layout }: TargetedOfferDialogLayoutCntQuantityItemProps) => {
    const t = useTranslation();
    const [ quantityInputValue, setQuantityInputValue ] = useState('');

    return (
        <Region
            name="cnt_quantity"
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

/** Row template `btn_get_credits` of TargetedOfferDialogLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferDialogLayoutBtnGetCreditsItemProps {
    layout?: BoxLayout;
    onBtnGetCredits?: () => void;
}

export const TargetedOfferDialogLayoutBtnGetCreditsItem = ({ layout, onBtnGetCredits }: TargetedOfferDialogLayoutBtnGetCreditsItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="6"
            name="btn_get_credits"
            tintColor="#4faf4f"
            onPointerTap={onBtnGetCredits}
            layout={{ width: 189, height: 30, flexShrink: 0, ...layout }}
        >
            {t('targeted.offer.button.credits')}
        </ButtonThick>
    );
};

/** Row template `btn_buy` of TargetedOfferDialogLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferDialogLayoutBtnBuyItemProps {
    layout?: BoxLayout;
    onBtnBuy?: () => void;
}

export const TargetedOfferDialogLayoutBtnBuyItem = ({ layout, onBtnBuy }: TargetedOfferDialogLayoutBtnBuyItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="6"
            name="btn_buy"
            tintColor="#4faf4f"
            onPointerTap={onBtnBuy}
            layout={{ width: 172, height: 30, flexShrink: 0, ...layout }}
        >
            {t('targeted.offer.button.buy')}
        </ButtonThick>
    );
};
