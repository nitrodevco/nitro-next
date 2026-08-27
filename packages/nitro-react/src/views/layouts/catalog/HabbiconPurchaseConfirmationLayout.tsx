import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1605_habbicon_purchase_confirmation_xml` (layout "habbicon_purchase_confirmation", 353x296) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabbiconPurchaseConfirmationLayoutProps {
    itemsContent?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const HabbiconPurchaseConfirmationLayout = ({ itemsContent, layout, onClose }: HabbiconPurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('habbicon_purchase.confirm.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 353, height: 296, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="content"
                    params={8405136}
                    layout={{ position: 'absolute', left: 0, width: 351, top: 8, height: 250, flexDirection: 'column', gap: 10 }}
                >
                    {itemsContent ?? (
                        <>
                            <HabbiconPurchaseConfirmationLayoutTopBodyItem />
                            <HabbiconPurchaseConfirmationLayoutValueAreaItem />
                            <HabbiconPurchaseConfirmationLayoutButtonsItem />
                        </>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `product_name` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutProductNameItem = ({ captionProductName, layout }: HabbiconPurchaseConfirmationLayoutProductNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="product_name"
            params={16528}
            layout={{ width: 197, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionProductName ?? t('habbicons.hud.title')}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            />
        </Region>
    );
};

/** Row template `description_text` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutDescriptionTextItemProps {
    captionDescriptionText?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutDescriptionTextItem = ({ captionDescriptionText, layout }: HabbiconPurchaseConfirmationLayoutDescriptionTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="description_text"
            params={16528}
            layout={{ width: 197, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDescriptionText ?? t('habbicon_purchase.confirm.habbicon.desc')}
                textStyle="text-style-u-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            />
        </Region>
    );
};

/** Row template `receive_row` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutReceiveRowItemProps {
    captionReceiveText?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutReceiveRowItem = ({ captionReceiveText, layout }: HabbiconPurchaseConfirmationLayoutReceiveRowItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="0"
            name="receive_row"
            params={16}
            tintColor="#f0e8cf"
            layout={{ width: 197, height: 28, flexShrink: 0, ...layout }}
        >
            <Region
                name="receive_text"
                params={16}
                layout={{ position: 'absolute', left: 8, width: 246, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionReceiveText ?? t('habbicon_purchase.confirm.habbicon.progress')}
                    textStyle="text-style-u-bold"
                />
            </Region>
        </Border>
    );
};

/** Row template `price_label` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutPriceLabelItemProps {
    captionPriceLabel?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutPriceLabelItem = ({ captionPriceLabel, layout }: HabbiconPurchaseConfirmationLayoutPriceLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="price_label"
            params={16}
            layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPriceLabel ?? t('catalog.purchase.confirmation.dialog.cost')}
                textStyle="text-style-u-regular"
            />
        </Region>
    );
};

/** Row template `price_amount` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutPriceAmountItemProps {
    captionPriceAmount?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutPriceAmountItem = ({ captionPriceAmount, layout }: HabbiconPurchaseConfirmationLayoutPriceAmountItemProps) => {
    return (
        <Region
            name="price_amount"
            params={16}
            layout={{ width: 12, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPriceAmount ?? '0'}
                textStyle="text-style-u-regular"
            />
        </Region>
    );
};

/** Row template `price_icon` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutPriceIconItemProps {
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutPriceIconItem = ({ layout }: HabbiconPurchaseConfirmationLayoutPriceIconItemProps) => {
    return (
        <Icon
            variant="34"
            name="price_icon"
            params={16}
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `price_value` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutPriceValueItemProps {
    itemsPriceValue?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutPriceValueItem = ({ itemsPriceValue, layout }: HabbiconPurchaseConfirmationLayoutPriceValueItemProps) => {
    return (
        <Region
            name="price_value"
            params={16}
            layout={{ width: 37, height: 22, flexShrink: 0, flexDirection: 'row', gap: 3, ...layout }}
        >
            {itemsPriceValue ?? (
                <>
                    <HabbiconPurchaseConfirmationLayoutPriceAmountItem />
                    <HabbiconPurchaseConfirmationLayoutPriceIconItem />
                </>
            )}
        </Region>
    );
};

/** Row template `top_body` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutTopBodyItemProps {
    captionPreviewLabel?: string;
    itemsPriceLine?: ReactNode;
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    srcProductImage?: string;
}

export const HabbiconPurchaseConfirmationLayoutTopBodyItem = ({ captionPreviewLabel, itemsPriceLine, itemsPropertiesItemlist, layout, srcProductImage }: HabbiconPurchaseConfirmationLayoutTopBodyItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_body"
            params={144}
            layout={{ width: 349, height: 164, flexShrink: 0, ...layout }}
        >
            <Border
                variant="0"
                name="preview_panel"
                params={16}
                tintColor="#f6f1df"
                layout={{ position: 'absolute', left: 10, width: 126, top: 12, height: 152 }}
            >
                <Border
                    variant="0"
                    name="preview_frame"
                    params={16}
                    layout={{ position: 'absolute', left: 20, width: 86, top: 19, height: 86 }}
                >
                    <ThemeImage
                        name="product_image"
                        params={16}
                        src={srcProductImage}
                        layout={{ position: 'absolute', left: 23, width: 40, top: 23, height: 40 }}
                    />
                </Border>
                <Region
                    name="preview_label"
                    params={16}
                    layout={{ position: 'absolute', left: 8, width: 110, top: 114, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionPreviewLabel ?? t('habbicons.hud.title')}
                        textStyle="text-style-u-bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 110, align: 'center' }}
                    />
                </Region>
            </Border>
            <Region
                name="properties_itemlist"
                params={144}
                layout={{ position: 'absolute', left: 143, width: 197, top: 15, height: 89, flexDirection: 'column', gap: 6 }}
            >
                {itemsPropertiesItemlist ?? (
                    <>
                        <HabbiconPurchaseConfirmationLayoutProductNameItem />
                        <HabbiconPurchaseConfirmationLayoutDescriptionTextItem />
                        <HabbiconPurchaseConfirmationLayoutReceiveRowItem />
                    </>
                )}
            </Region>
            <Region
                name="price_line"
                params={16400}
                layout={{ position: 'absolute', left: 144, width: 280, top: 134, height: 22, flexDirection: 'row', gap: 6 }}
            >
                {itemsPriceLine ?? (
                    <>
                        <HabbiconPurchaseConfirmationLayoutPriceLabelItem />
                        <HabbiconPurchaseConfirmationLayoutPriceValueItem />
                    </>
                )}
            </Region>
        </Region>
    );
};

/** Row template `normal_price_row` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutNormalPriceRowItemProps {
    captionNormalPriceAmount?: string;
    captionNormalPriceLabel?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutNormalPriceRowItem = ({ captionNormalPriceAmount, captionNormalPriceLabel, layout }: HabbiconPurchaseConfirmationLayoutNormalPriceRowItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="normal_price_row"
            params={144}
            layout={{ width: 327, height: 17, flexShrink: 0, ...layout }}
        >
            <Region
                name="normal_price_label"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionNormalPriceLabel ?? t('habbicon_purchase.confirm.normal_price')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region
                name="normal_price_amount"
                params={80}
                layout={{ position: 'absolute', left: 232, width: 95, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionNormalPriceAmount ?? '0'}
                    textStyle="text-style-u-regular"
                    textOptions={{ align: 'right' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `discount_row` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutDiscountRowItemProps {
    captionDiscountAmount?: string;
    captionDiscountLabel?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutDiscountRowItem = ({ captionDiscountAmount, captionDiscountLabel, layout }: HabbiconPurchaseConfirmationLayoutDiscountRowItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="discount_row"
            params={144}
            layout={{ width: 327, height: 17, flexShrink: 0, ...layout }}
        >
            <Region
                name="discount_label"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDiscountLabel ?? t('habbicon_purchase.confirm.discount')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#5f4c16' }}
                />
            </Region>
            <Region
                name="discount_amount"
                params={1040}
                layout={{ position: 'absolute', left: 232, width: 95, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionDiscountAmount ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#5f4c16', align: 'right' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `value_area` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutValueAreaItemProps {
    itemsValueArea?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutValueAreaItem = ({ itemsValueArea, layout }: HabbiconPurchaseConfirmationLayoutValueAreaItemProps) => {
    return (
        <Region
            name="value_area"
            params={144}
            layout={{ width: 327, height: 39, flexShrink: 0, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsValueArea ?? (
                <>
                    <HabbiconPurchaseConfirmationLayoutNormalPriceRowItem />
                    <HabbiconPurchaseConfirmationLayoutDiscountRowItem />
                </>
            )}
        </Region>
    );
};

/** Row template `cancel_button` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
}

export const HabbiconPurchaseConfirmationLayoutCancelButtonItem = ({ layout, onCancelButton }: HabbiconPurchaseConfirmationLayoutCancelButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="cancel_button"
            params={131089}
            onPointerTap={onCancelButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('catalog.purchase_confirmation.cancel')}
        </Button>
    );
};

/** Row template `confirm_button` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutConfirmButtonItemProps {
    layout?: BoxLayout;
    onConfirmButton?: () => void;
}

export const HabbiconPurchaseConfirmationLayoutConfirmButtonItem = ({ layout, onConfirmButton }: HabbiconPurchaseConfirmationLayoutConfirmButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="confirm_button"
            params={131089}
            tintColor="#00aa00"
            onPointerTap={onConfirmButton}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('catalog.purchase_confirmation.buy')}
        </ButtonThick>
    );
};

/** Row template `buttons` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutButtonsItemProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutButtonsItem = ({ itemsButtons, layout }: HabbiconPurchaseConfirmationLayoutButtonsItemProps) => {
    return (
        <Region
            name="buttons"
            params={131216}
            layout={{ width: 341, height: 27, flexShrink: 0, flexDirection: 'row', gap: 105, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <HabbiconPurchaseConfirmationLayoutCancelButtonItem />
                    <HabbiconPurchaseConfirmationLayoutConfirmButtonItem />
                </>
            )}
        </Region>
    );
};
