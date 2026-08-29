import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, CheckBox, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1653_targeted_offer_purchase_confirmation_xml` (layout "targeted_offer_purchase_confirmation", 325x291) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TargetedOfferPurchaseConfirmationLayoutProps {
    content?: TargetedOfferPurchaseConfirmationLayoutContentProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const TargetedOfferPurchaseConfirmationLayout = ({ content, layout, onClose }: TargetedOfferPurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('catalog.purchase_confirmation.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 325, height: 291, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <TargetedOfferPurchaseConfirmationLayoutContent {...content} />
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
            layout={{ width: 311, height: 17, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 33, width: 278, top: 0, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('disclaimer.credit_spending')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 278 }}
                />
            </Region>
            <CheckBox
                variant="3"
                name="spending_disclaimer"
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
            layout={{ minWidth: 315, minHeight: 27, flexShrink: 0, flexDirection: 'row', gap: 76, ...layout }}
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
            layout={{ width: 177, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
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
            layout={{ width: 41, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionQuantity ?? ''}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Named region `purchase_cost_box` of TargetedOfferPurchaseConfirmationLayout - configured through the parent's `purchaseCostBox` prop. */
export interface TargetedOfferPurchaseConfirmationLayoutPurchaseCostBoxProps {
    layout?: BoxLayout;
}

export const TargetedOfferPurchaseConfirmationLayoutPurchaseCostBox = ({ layout }: TargetedOfferPurchaseConfirmationLayoutPurchaseCostBoxProps) => {
    return (
        <Region
            name="purchase_cost_box"
            layout={{ width: 20, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `properties_itemlist` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItemProps {
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    purchaseCostBox?: TargetedOfferPurchaseConfirmationLayoutPurchaseCostBoxProps;
}

export const TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItem = ({ itemsPropertiesItemlist, layout, purchaseCostBox }: TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="properties_itemlist"
            layout={{ width: 176, height: 90, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsPropertiesItemlist ?? (
                <>
                    <TargetedOfferPurchaseConfirmationLayoutProductNameItem />
                    <TargetedOfferPurchaseConfirmationLayoutQuantityItem />
                </>
            )}
            <Region layout={{ flexShrink: 0, flexDirection: 'row' }}>
                <Region layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('catalog.purchase.confirmation.dialog.cost')}
                        textStyle="text-style-u-regular"
                    />
                </Region>
                <TargetedOfferPurchaseConfirmationLayoutPurchaseCostBox {...purchaseCostBox} />
            </Region>
        </Region>
    );
};

/** Named region `properties_itemlist` of TargetedOfferPurchaseConfirmationLayout - configured through the parent's `propertiesItemlist` prop. */
export interface TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistProps {
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const TargetedOfferPurchaseConfirmationLayoutPropertiesItemlist = ({ itemsPropertiesItemlist, layout }: TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistProps) => {
    return (
        <Region
            name="properties_itemlist"
            layout={{ position: 'absolute', left: 102, width: 176, top: 24, height: 64, flexDirection: 'column', gap: 7, ...layout }}
        >
            {itemsPropertiesItemlist ?? (
                <TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItem />
            )}
        </Region>
    );
};

/** Named region `content` of TargetedOfferPurchaseConfirmationLayout - configured through the parent's `content` prop. */
export interface TargetedOfferPurchaseConfirmationLayoutContentProps {
    itemsContent?: ReactNode;
    layout?: BoxLayout;
    propertiesItemlist?: TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistProps;
}

export const TargetedOfferPurchaseConfirmationLayoutContent = ({ itemsContent, layout, propertiesItemlist }: TargetedOfferPurchaseConfirmationLayoutContentProps) => {
    return (
        <Region
            name="content"
            layout={{ position: 'absolute', left: 0, right: 2, top: 8, bottom: 48, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsContent ?? (
                <>
                    <TargetedOfferPurchaseConfirmationLayoutDisclaimerItem />
                    <TargetedOfferPurchaseConfirmationLayoutButtonsItem />
                </>
            )}
            <Region layout={{ minWidth: 404, minHeight: 171, flexShrink: 0, flexDirection: 'column', gap: 5 }}>
                <Region layout={{ width: 344, height: 171, flexShrink: 0 }}>
                    <TargetedOfferPurchaseConfirmationLayoutPropertiesItemlist {...propertiesItemlist} />
                    <ThemeImage
                        src="${image.library.url}targetedoffers/coins_diamonds_icon.png"
                        layout={{ position: 'absolute', left: 13, width: 68, top: 23, height: 40 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
