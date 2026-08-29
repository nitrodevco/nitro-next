import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Dropmenu, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1180_chest_upgrade_xml` (layout "chest_upgrade", 353x287) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChestUpgradeLayoutProps {
    content?: ChestUpgradeLayoutContentProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ChestUpgradeLayout = ({ content, layout, onClose }: ChestUpgradeLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('wiredchests.upgrade.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 353, height: 287, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ChestUpgradeLayoutContent {...content} />
            </Region>
        </Frame>
    );
};

/** Row template `error_text` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutErrorTextItemProps {
    captionErrorText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChestUpgradeLayoutErrorTextItem = ({ captionErrorText, layout, tags }: ChestUpgradeLayoutErrorTextItemProps) => {
    return (
        <Region
            name="error_text"
            tags={tags}
            layout={{ width: 327, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionErrorText ?? 'Purchase not possible: already at maximum chest capacity'}
                textOptions={{ fill: '#c42f3d', wordWrap: true, wordWrapWidth: 327 }}
            />
        </Region>
    );
};

/** Row template `cancel_button` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
    tags?: string[];
}

export const ChestUpgradeLayoutCancelButtonItem = ({ layout, onCancelButton, tags }: ChestUpgradeLayoutCancelButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="cancel_button"
            tags={tags}
            onPointerTap={onCancelButton}
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('catalog.purchase_confirmation.cancel')}
        </Button>
    );
};

/** Row template `buy_button` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutBuyButtonItemProps {
    layout?: BoxLayout;
    onBuyButton?: () => void;
    tags?: string[];
}

export const ChestUpgradeLayoutBuyButtonItem = ({ layout, onBuyButton, tags }: ChestUpgradeLayoutBuyButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="buy_button"
            tags={tags}
            tintColor="#00aa00"
            onPointerTap={onBuyButton}
            layout={{ width: 110, height: 27, flexShrink: 0, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27, ...layout }}
        >
            {t('catalog.purchase_confirmation.buy')}
        </ButtonThick>
    );
};

/** Row template `buttons` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutButtonsItemProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChestUpgradeLayoutButtonsItem = ({ itemsButtons, layout, tags }: ChestUpgradeLayoutButtonsItemProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            layout={{ minWidth: 341, minHeight: 27, flexShrink: 0, flexDirection: 'row', gap: 105, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <ChestUpgradeLayoutCancelButtonItem />
                    <ChestUpgradeLayoutBuyButtonItem />
                </>
            )}
        </Region>
    );
};

/** Row template `product_name` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChestUpgradeLayoutProductNameItem = ({ captionProductName, layout, tags }: ChestUpgradeLayoutProductNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="product_name"
            tags={tags}
            layout={{ width: 197, height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionProductName ?? t('wiredchests.upgrade.capacity.extra')}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            />
        </Region>
    );
};

/** Row template `current_capacity` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutCurrentCapacityItemProps {
    captionCurrentCapacity?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChestUpgradeLayoutCurrentCapacityItem = ({ captionCurrentCapacity, layout, tags }: ChestUpgradeLayoutCurrentCapacityItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="current_capacity"
            tags={tags}
            layout={{ width: 197, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCurrentCapacity ?? t('wiredchests.upgrade.capacity.current')}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            />
        </Region>
    );
};

/** Row template `new_capacity` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutNewCapacityItemProps {
    captionNewCapacity?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChestUpgradeLayoutNewCapacityItem = ({ captionNewCapacity, layout, tags }: ChestUpgradeLayoutNewCapacityItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="new_capacity"
            tags={tags}
            layout={{ width: 197, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNewCapacity ?? t('wiredchests.upgrade.capacity.new')}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            />
        </Region>
    );
};

/** Named region `properties_itemlist` of ChestUpgradeLayout - configured through the parent's `propertiesItemlist` prop. */
export interface ChestUpgradeLayoutPropertiesItemlistProps {
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    onAmountSelectionDropmenu?: () => void;
    tags?: string[];
}

export const ChestUpgradeLayoutPropertiesItemlist = ({ itemsPropertiesItemlist, layout, onAmountSelectionDropmenu, tags }: ChestUpgradeLayoutPropertiesItemlistProps) => {
    const t = useTranslation();

    return (
        <Region
            name="properties_itemlist"
            tags={tags}
            layout={{ position: 'absolute', left: 143, right: 9, top: 15, height: 132, flexDirection: 'column', gap: 4, ...layout }}
        >
            {itemsPropertiesItemlist ?? (
                <>
                    <ChestUpgradeLayoutProductNameItem />
                    <ChestUpgradeLayoutCurrentCapacityItem />
                    <ChestUpgradeLayoutNewCapacityItem />
                </>
            )}
            <Region layout={{ width: 276, height: 25, flexShrink: 0, flexDirection: 'row', gap: 5 }}>
                <Region layout={{ width: 213, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText text={t('wiredchests.upgrade.capacity.amount')} />
                </Region>
                <Dropmenu
                    variant="3"
                    name="amount_selection_dropmenu"
                    onPointerTap={onAmountSelectionDropmenu}
                    layout={{ width: 58, height: 25, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `purchase_cost_box` of ChestUpgradeLayout - configured through the parent's `purchaseCostBox` prop. */
export interface ChestUpgradeLayoutPurchaseCostBoxProps {
    captionPlus?: string;
    captionPriceCredits?: string;
    captionPriceDiamonds?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChestUpgradeLayoutPurchaseCostBox = ({ captionPlus, captionPriceCredits, captionPriceDiamonds, layout, tags }: ChestUpgradeLayoutPurchaseCostBoxProps) => {
    return (
        <Region
            name="purchase_cost_box"
            tags={tags}
            layout={{ width: 88, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 25, flexDirection: 'row', gap: 2 }}>
                <Region
                    name="price_credits"
                    layout={{ width: 12, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionPriceCredits ?? '0'} />
                </Region>
                <Icon
                    variant="34"
                    layout={{ width: 22, height: 22, flexShrink: 0 }}
                />
                <Region
                    name="plus"
                    layout={{ width: 12, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionPlus ?? ' '} />
                </Region>
                <Region
                    name="price_diamonds"
                    layout={{ width: 12, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionPriceDiamonds ?? '0'} />
                </Region>
                <Icon
                    variant="41"
                    layout={{ width: 22, height: 22, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `content` of ChestUpgradeLayout - configured through the parent's `content` prop. */
export interface ChestUpgradeLayoutContentProps {
    itemsContent?: ReactNode;
    layout?: BoxLayout;
    propertiesItemlist?: ChestUpgradeLayoutPropertiesItemlistProps;
    purchaseCostBox?: ChestUpgradeLayoutPurchaseCostBoxProps;
    srcProductImage?: string;
    tags?: string[];
}

export const ChestUpgradeLayoutContent = ({ itemsContent, layout, propertiesItemlist, purchaseCostBox, srcProductImage, tags }: ChestUpgradeLayoutContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 2, top: 8, bottom: 38, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsContent ?? (
                <>
                    <ChestUpgradeLayoutErrorTextItem />
                    <ChestUpgradeLayoutButtonsItem />
                </>
            )}
            <Region layout={{ width: 349, height: 164, flexShrink: 0 }}>
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
                </Border>
                <ChestUpgradeLayoutPropertiesItemlist {...propertiesItemlist} />
                <Region layout={{ position: 'absolute', left: 142, width: 356, top: 137, height: 22, flexDirection: 'row' }}>
                    <Region layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('catalog.purchase.confirmation.dialog.cost')}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                    <ChestUpgradeLayoutPurchaseCostBox {...purchaseCostBox} />
                </Region>
            </Region>
        </Region>
    );
};
