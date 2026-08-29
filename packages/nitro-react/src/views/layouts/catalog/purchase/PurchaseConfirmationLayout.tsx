import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, CheckBox, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1692_purchase_confirmation_xml` (layout "purchase_confirmation", 325x339) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PurchaseConfirmationLayoutProps {
    content?: PurchaseConfirmationLayoutContentProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const PurchaseConfirmationLayout = ({ content, layout, onClose }: PurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('catalog.purchase_confirmation.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 325, height: 339, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <PurchaseConfirmationLayoutContent {...content} />
            </Region>
        </Frame>
    );
};

/** Row template `disclaimer` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutDisclaimerItemProps {
    layout?: BoxLayout;
    onSpendingDisclaimer?: () => void;
}

export const PurchaseConfirmationLayoutDisclaimerItem = ({ layout, onSpendingDisclaimer }: PurchaseConfirmationLayoutDisclaimerItemProps) => {
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

/** Row template `raffle_container` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutRaffleContainerItemProps {
    captionRaffleText?: string;
    layout?: BoxLayout;
}

export const PurchaseConfirmationLayoutRaffleContainerItem = ({ captionRaffleText, layout }: PurchaseConfirmationLayoutRaffleContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="raffle_container"
            layout={{ width: 304, height: 49, flexShrink: 0, ...layout }}
        >
            <Border
                variant="4"
                tintColor="#ebf9fc"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="raffle_text"
                    layout={{ position: 'absolute', left: 10, width: 233, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRaffleText ?? t('catalog.purchase.confirmation.dialog.raffling')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 233 }}
                    />
                </Region>
            </Border>
            <ThemeImage
                src={layoutImage('unique_item_large_tile_upright.png')}
                layout={{ position: 'absolute', left: 260, width: 34, top: 6, height: 37 }}
            />
        </Region>
    );
};

/** Row template `cancel_button` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
}

export const PurchaseConfirmationLayoutCancelButtonItem = ({ layout, onCancelButton }: PurchaseConfirmationLayoutCancelButtonItemProps) => {
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

/** Row template `buy_button` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutBuyButtonItemProps {
    layout?: BoxLayout;
    onBuyButton?: () => void;
}

export const PurchaseConfirmationLayoutBuyButtonItem = ({ layout, onBuyButton }: PurchaseConfirmationLayoutBuyButtonItemProps) => {
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

/** Row template `buttons` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutButtonsItemProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const PurchaseConfirmationLayoutButtonsItem = ({ itemsButtons, layout }: PurchaseConfirmationLayoutButtonsItemProps) => {
    return (
        <Region
            name="buttons"
            layout={{ minWidth: 315, minHeight: 27, flexShrink: 0, flexDirection: 'row', gap: 76, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <PurchaseConfirmationLayoutCancelButtonItem />
                    <PurchaseConfirmationLayoutBuyButtonItem />
                </>
            )}
        </Region>
    );
};

/** Row template `product_name` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
}

export const PurchaseConfirmationLayoutProductNameItem = ({ captionProductName, layout }: PurchaseConfirmationLayoutProductNameItemProps) => {
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

/** Row template `quantity` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutQuantityItemProps {
    captionQuantity?: string;
    layout?: BoxLayout;
}

export const PurchaseConfirmationLayoutQuantityItem = ({ captionQuantity, layout }: PurchaseConfirmationLayoutQuantityItemProps) => {
    return (
        <Region
            name="quantity"
            layout={{ width: 41, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionQuantity ?? 'X 123'}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Row template `freeQuantity` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutFreeQuantityItemProps {
    captionFreeQuantity?: string;
    layout?: BoxLayout;
}

export const PurchaseConfirmationLayoutFreeQuantityItem = ({ captionFreeQuantity, layout }: PurchaseConfirmationLayoutFreeQuantityItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="freeQuantity"
            layout={{ width: 161, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionFreeQuantity ?? t('shop.bonus.items.count')}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Named region `purchase_cost_box` of PurchaseConfirmationLayout - configured through the parent's `purchaseCostBox` prop. */
export interface PurchaseConfirmationLayoutPurchaseCostBoxProps {
    layout?: BoxLayout;
}

export const PurchaseConfirmationLayoutPurchaseCostBox = ({ layout }: PurchaseConfirmationLayoutPurchaseCostBoxProps) => {
    return (
        <Region
            name="purchase_cost_box"
            layout={{ width: 20, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `properties_itemlist` of PurchaseConfirmationLayout - configured through the parent's `propertiesItemlist` prop. */
export interface PurchaseConfirmationLayoutPropertiesItemlistProps {
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    purchaseCostBox?: PurchaseConfirmationLayoutPurchaseCostBoxProps;
}

export const PurchaseConfirmationLayoutPropertiesItemlist = ({ itemsPropertiesItemlist, layout, purchaseCostBox }: PurchaseConfirmationLayoutPropertiesItemlistProps) => {
    const t = useTranslation();

    return (
        <Region
            name="properties_itemlist"
            layout={{ position: 'absolute', left: 143, width: 176, alignSelf: 'center', marginTop: -19.5, marginBottom: 19.5, height: 116, flexDirection: 'column', gap: 7, ...layout }}
        >
            {itemsPropertiesItemlist ?? (
                <>
                    <PurchaseConfirmationLayoutProductNameItem />
                    <PurchaseConfirmationLayoutQuantityItem />
                    <PurchaseConfirmationLayoutFreeQuantityItem />
                </>
            )}
            <Region layout={{ flexShrink: 0, flexDirection: 'row' }}>
                <Region layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('catalog.purchase.confirmation.dialog.cost')}
                        textStyle="text-style-u-regular"
                    />
                </Region>
                <PurchaseConfirmationLayoutPurchaseCostBox {...purchaseCostBox} />
            </Region>
        </Region>
    );
};

/** Named region `content` of PurchaseConfirmationLayout - configured through the parent's `content` prop. */
export interface PurchaseConfirmationLayoutContentProps {
    itemsContent?: ReactNode;
    layout?: BoxLayout;
    propertiesItemlist?: PurchaseConfirmationLayoutPropertiesItemlistProps;
    srcProductImage?: string;
}

export const PurchaseConfirmationLayoutContent = ({ itemsContent, layout, propertiesItemlist, srcProductImage }: PurchaseConfirmationLayoutContentProps) => {
    return (
        <Region
            name="content"
            layout={{ position: 'absolute', left: 0, right: 2, top: 8, bottom: 37, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsContent ?? (
                <>
                    <PurchaseConfirmationLayoutDisclaimerItem />
                    <PurchaseConfirmationLayoutRaffleContainerItem />
                    <PurchaseConfirmationLayoutButtonsItem />
                </>
            )}
            <Region layout={{ minWidth: 404, minHeight: 171, flexShrink: 0, flexDirection: 'column', gap: 5 }}>
                <Region layout={{ width: 344, height: 171, flexShrink: 0 }}>
                    <Border
                        variant="0"
                        tintColor="#f1f1f1"
                        layout={{ position: 'absolute', left: 10, width: 126, top: 12, height: 152 }}
                    >
                        <ThemeImage
                            name="product_image"
                            src={srcProductImage}
                            layout={{ position: 'absolute', left: 1, width: 126, top: 1, height: 152 }}
                        />
                        <WidgetSlot
                            widgetType="product_image"
                            name="nft_image"
                            layout={{ position: 'absolute', left: 0, width: 126, top: 0, height: 152 }}
                        />
                    </Border>
                    <PurchaseConfirmationLayoutPropertiesItemlist {...propertiesItemlist} />
                </Region>
            </Region>
        </Region>
    );
};
