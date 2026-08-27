import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, CheckBox, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1653_targeted_offer_purchase_confirmation_xml` (layout "targeted_offer_purchase_confirmation", 325x291) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TargetedOfferPurchaseConfirmationLayoutProps {
    itemsContent?: ReactNode;
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const TargetedOfferPurchaseConfirmationLayout = ({ itemsContent, itemsPropertiesItemlist, layout, onClose }: TargetedOfferPurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={35073}
            caption={t('catalog.purchase_confirmation.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 325, height: 291, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="content"
                    params={8538256}
                    layout={{ position: 'absolute', left: 0, width: 323, top: 8, height: 235, flexDirection: 'column', gap: 10 }}
                >
                    {itemsContent ?? (
                        <>
                            <TargetedOfferPurchaseConfirmationLayoutDisclaimerItem />
                            <TargetedOfferPurchaseConfirmationLayoutButtonsItem />
                        </>
                    )}
                    <Region
                        params={131088}
                        layout={{ width: 404, height: 171, flexShrink: 0, flexDirection: 'column', gap: 5 }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 344, height: 171, flexShrink: 0 }}
                        >
                            <Region
                                name="properties_itemlist"
                                params={16}
                                layout={{ position: 'absolute', left: 102, width: 176, top: 24, height: 64, flexDirection: 'column', gap: 7 }}
                            >
                                {itemsPropertiesItemlist ?? (
                                    <TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItem />
                                )}
                            </Region>
                            <ThemeImage
                                params={16}
                                src="${image.library.url}targetedoffers/coins_diamonds_icon.png"
                                layout={{ position: 'absolute', left: 13, width: 68, top: 23, height: 40 }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `disclaimer` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutDisclaimerItemProps {
    layout?: BoxLayout;
    onSpendingDisclaimer?: () => void;
}

export const TargetedOfferPurchaseConfirmationLayoutDisclaimerItem = ({ layout, onSpendingDisclaimer }: TargetedOfferPurchaseConfirmationLayoutDisclaimerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="disclaimer"
            params={147472}
            layout={{ width: 311, height: 17, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 33, width: 278, top: 0, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('disclaimer.credit_spending')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 278 }}
                />
            </Region>
            <CheckBox
                variant="3"
                name="spending_disclaimer"
                params={17}
                onPointerTap={onSpendingDisclaimer}
                layout={{ position: 'absolute', left: 13, width: 296, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Row template `cancel_button` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
}

export const TargetedOfferPurchaseConfirmationLayoutCancelButtonItem = ({ layout, onCancelButton }: TargetedOfferPurchaseConfirmationLayoutCancelButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="cancel_button"
            params={132113}
            onPointerTap={onCancelButton}
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('catalog.purchase_confirmation.cancel')}
        </Button>
    );
};

/** Row template `buy_button` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutBuyButtonItemProps {
    layout?: BoxLayout;
    onBuyButton?: () => void;
}

export const TargetedOfferPurchaseConfirmationLayoutBuyButtonItem = ({ layout, onBuyButton }: TargetedOfferPurchaseConfirmationLayoutBuyButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="buy_button"
            params={132113}
            tintColor="#00aa00"
            onPointerTap={onBuyButton}
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('catalog.purchase_confirmation.buy')}
        </ButtonThick>
    );
};

/** Row template `buttons` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutButtonsItemProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const TargetedOfferPurchaseConfirmationLayoutButtonsItem = ({ itemsButtons, layout }: TargetedOfferPurchaseConfirmationLayoutButtonsItemProps) => {
    return (
        <Region
            name="buttons"
            params={131088}
            layout={{ width: 315, height: 27, flexShrink: 0, flexDirection: 'row', gap: 76, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <TargetedOfferPurchaseConfirmationLayoutCancelButtonItem />
                    <TargetedOfferPurchaseConfirmationLayoutBuyButtonItem />
                </>
            )}
        </Region>
    );
};

/** Row template `product_name` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
}

export const TargetedOfferPurchaseConfirmationLayoutProductNameItem = ({ captionProductName, layout }: TargetedOfferPurchaseConfirmationLayoutProductNameItemProps) => {
    return (
        <Region
            name="product_name"
            params={8536080}
            layout={{ width: 177, height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionProductName ?? '001 lorem ipsum title that wraps around'}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 177 }}
            />
        </Region>
    );
};

/** Row template `quantity` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutQuantityItemProps {
    captionQuantity?: string;
    layout?: BoxLayout;
}

export const TargetedOfferPurchaseConfirmationLayoutQuantityItem = ({ captionQuantity, layout }: TargetedOfferPurchaseConfirmationLayoutQuantityItemProps) => {
    return (
        <Region
            name="quantity"
            params={8536080}
            layout={{ width: 41, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionQuantity ?? ''}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Row template `properties_itemlist` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItemProps {
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItem = ({ itemsPropertiesItemlist, layout }: TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="properties_itemlist"
            params={3145744}
            layout={{ width: 176, height: 90, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsPropertiesItemlist ?? (
                <>
                    <TargetedOfferPurchaseConfirmationLayoutProductNameItem />
                    <TargetedOfferPurchaseConfirmationLayoutQuantityItem />
                </>
            )}
            <Region
                params={147472}
                layout={{ width: 288, height: 22, flexShrink: 0, flexDirection: 'row' }}
            >
                <Region
                    params={16}
                    layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('catalog.purchase.confirmation.dialog.cost')}
                        textStyle="text-style-u-regular"
                    />
                </Region>
                <Region
                    name="purchase_cost_box"
                    params={147472}
                    layout={{ width: 20, height: 22, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};
