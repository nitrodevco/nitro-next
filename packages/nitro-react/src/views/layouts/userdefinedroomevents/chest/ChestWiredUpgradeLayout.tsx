import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1129_chest_wired_upgrade_xml` (layout "chest_wired_upgrade", 353x287) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChestWiredUpgradeLayoutProps {
    content?: ChestWiredUpgradeLayoutContentProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ChestWiredUpgradeLayout = ({ content, layout, onClose }: ChestWiredUpgradeLayoutProps) => {
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
                <ChestWiredUpgradeLayoutContent {...content} />
            </Region>
        </Frame>
    );
};

/** Row template `error_text` of ChestWiredUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestWiredUpgradeLayoutErrorTextItemProps {
    captionErrorText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChestWiredUpgradeLayoutErrorTextItem = ({ captionErrorText, layout, tags }: ChestWiredUpgradeLayoutErrorTextItemProps) => {
    return (
        <Region
            name="error_text"
            tags={tags}
            layout={{ width: 327, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionErrorText ?? 'Purchase not possible: A starters chest can not be upgraded to a Wired Chest.'}
                textOptions={{ fill: '#c42f3d', wordWrap: true, wordWrapWidth: 327 }}
            />
        </Region>
    );
};

/** Row template `cancel_button` of ChestWiredUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestWiredUpgradeLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
    tags?: string[];
}

export const ChestWiredUpgradeLayoutCancelButtonItem = ({ layout, onCancelButton, tags }: ChestWiredUpgradeLayoutCancelButtonItemProps) => {
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

/** Row template `buy_button` of ChestWiredUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestWiredUpgradeLayoutBuyButtonItemProps {
    layout?: BoxLayout;
    onBuyButton?: () => void;
    tags?: string[];
}

export const ChestWiredUpgradeLayoutBuyButtonItem = ({ layout, onBuyButton, tags }: ChestWiredUpgradeLayoutBuyButtonItemProps) => {
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

/** Row template `buttons` of ChestWiredUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestWiredUpgradeLayoutButtonsItemProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChestWiredUpgradeLayoutButtonsItem = ({ itemsButtons, layout, tags }: ChestWiredUpgradeLayoutButtonsItemProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            layout={{ minWidth: 341, minHeight: 27, flexShrink: 0, flexDirection: 'row', gap: 105, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <ChestWiredUpgradeLayoutCancelButtonItem />
                    <ChestWiredUpgradeLayoutBuyButtonItem />
                </>
            )}
        </Region>
    );
};

/** Row template `product_name` of ChestWiredUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestWiredUpgradeLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChestWiredUpgradeLayoutProductNameItem = ({ captionProductName, layout, tags }: ChestWiredUpgradeLayoutProductNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="product_name"
            tags={tags}
            layout={{ width: 197, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionProductName ?? t('wiredchests.upgrade.wired.info')}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            />
        </Region>
    );
};

/** Row template `warning` of ChestWiredUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestWiredUpgradeLayoutWarningItemProps {
    captionWarning?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChestWiredUpgradeLayoutWarningItem = ({ captionWarning, layout, tags }: ChestWiredUpgradeLayoutWarningItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="warning"
            tags={tags}
            layout={{ width: 197, height: 44, flexShrink: 0, minWidth: 197, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionWarning ?? t('wiredchests.big_fat_warning')}
                textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            />
        </Region>
    );
};

/** Named region `properties_itemlist` of ChestWiredUpgradeLayout - configured through the parent's `propertiesItemlist` prop. */
export interface ChestWiredUpgradeLayoutPropertiesItemlistProps {
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChestWiredUpgradeLayoutPropertiesItemlist = ({ itemsPropertiesItemlist, layout, tags }: ChestWiredUpgradeLayoutPropertiesItemlistProps) => {
    return (
        <Region
            name="properties_itemlist"
            tags={tags}
            layout={{ position: 'absolute', left: 143, right: 9, top: 15, height: 67, flexDirection: 'column', gap: 4, ...layout }}
        >
            {itemsPropertiesItemlist ?? (
                <>
                    <ChestWiredUpgradeLayoutProductNameItem />
                    <ChestWiredUpgradeLayoutWarningItem />
                </>
            )}
        </Region>
    );
};

/** Named region `content` of ChestWiredUpgradeLayout - configured through the parent's `content` prop. */
export interface ChestWiredUpgradeLayoutContentProps {
    captionFree?: string;
    itemsContent?: ReactNode;
    layout?: BoxLayout;
    propertiesItemlist?: ChestWiredUpgradeLayoutPropertiesItemlistProps;
    srcProductImage?: string;
    srcWiredIcon?: string;
    tags?: string[];
}

export const ChestWiredUpgradeLayoutContent = ({ captionFree, itemsContent, layout, propertiesItemlist, srcProductImage, srcWiredIcon, tags }: ChestWiredUpgradeLayoutContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 2, top: 8, bottom: 38, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsContent ?? (
                <>
                    <ChestWiredUpgradeLayoutErrorTextItem />
                    <ChestWiredUpgradeLayoutButtonsItem />
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
                    <ThemeImage
                        name="wired_icon"
                        src={srcWiredIcon ?? '${image.library.url}catalogue/icon_80.png'}
                        layout={{ position: 'absolute', left: 89, width: 30, top: 7, height: 30 }}
                    />
                </Border>
                <ChestWiredUpgradeLayoutPropertiesItemlist {...propertiesItemlist} />
                <Region layout={{ position: 'absolute', left: 142, width: 307, top: 137, height: 22, flexDirection: 'row' }}>
                    <Region layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('catalog.purchase.confirmation.dialog.cost')}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                    <Region
                        name="free"
                        layout={{ width: 39, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionFree ?? t('wiredchests.upgrade.wired.cost')} />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
