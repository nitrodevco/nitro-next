import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ScrollArea, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1167_furni_chest_contents_xml` (layout "furni_chest_contents", 458x264) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FurniChestContentsLayoutProps {
    furniChest?: FurniChestContentsLayoutFurniChestProps;
    layout?: BoxLayout;
}

export const FurniChestContentsLayout = ({ furniChest, layout }: FurniChestContentsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 458, height: 264, ...layout }}>
            <FurniChestContentsLayoutFurniChest {...furniChest} />
        </Region>
    );
};

/** Named region `clear_search_button` of FurniChestContentsLayout - configured through the parent's `clearSearchButton` prop. */
export interface FurniChestContentsLayoutClearSearchButtonProps {
    layout?: BoxLayout;
    onClearSearchButton?: () => void;
}

export const FurniChestContentsLayoutClearSearchButton = ({ layout, onClearSearchButton }: FurniChestContentsLayoutClearSearchButtonProps) => {
    return (
        <Region
            name="clear_search_button"
            onPointerTap={onClearSearchButton}
            cursor="pointer"
            layout={{ position: 'absolute', right: 3, width: 20, top: 2, height: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_close.png')}
                layout={{ position: 'absolute', left: 4, width: 11, top: 4, height: 12 }}
            />
        </Region>
    );
};

/** Named region `number_container_inner_border` of FurniChestContentsLayout - configured through the parent's `numberContainerInnerBorder` prop. */
export interface FurniChestContentsLayoutNumberContainerInnerBorderProps {
    captionFurniQuantity?: string;
    layout?: BoxLayout;
}

export const FurniChestContentsLayoutNumberContainerInnerBorder = ({ captionFurniQuantity, layout }: FurniChestContentsLayoutNumberContainerInnerBorderProps) => {
    return (
        <Region
            name="number_container_inner_border"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 1, width: 11, top: 1, height: 14, ...layout }}
        >
            <Region
                name="furni_quantity"
                layout={{ position: 'absolute', left: 1, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFurniQuantity ?? '0'}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#2f6982' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `number_container` of FurniChestContentsLayout - configured through the parent's `numberContainer` prop. */
export interface FurniChestContentsLayoutNumberContainerProps {
    layout?: BoxLayout;
    numberContainerInnerBorder?: FurniChestContentsLayoutNumberContainerInnerBorderProps;
    visibleNumberContainer?: boolean;
}

export const FurniChestContentsLayoutNumberContainer = ({ layout, numberContainerInnerBorder, visibleNumberContainer }: FurniChestContentsLayoutNumberContainerProps) => {
    return (
        <Region
            name="number_container"
            visible={visibleNumberContainer ?? false}
            backgroundColor="#2f6982"
            layout={{ position: 'absolute', left: 27, right: 0, top: 2, height: 16, ...layout }}
        >
            <FurniChestContentsLayoutNumberContainerInnerBorder {...numberContainerInnerBorder} />
        </Region>
    );
};

/** Row template `furni_template` of FurniChestContentsLayout - pass real rows through its `items…` slot. */
export interface FurniChestContentsLayoutFurniTemplateItemProps {
    layout?: BoxLayout;
    numberContainer?: FurniChestContentsLayoutNumberContainerProps;
    onFurniTemplate?: () => void;
    srcOutlineFocus?: string;
    srcUniqueItemBackgroundBitmap?: string;
}

export const FurniChestContentsLayoutFurniTemplateItem = ({ layout, numberContainer, onFurniTemplate, srcOutlineFocus, srcUniqueItemBackgroundBitmap }: FurniChestContentsLayoutFurniTemplateItemProps) => {
    return (
        <Region
            name="furni_template"
            onPointerTap={onFurniTemplate}
            cursor="pointer"
            layout={{ width: 42, height: 42, flexShrink: 0, ...layout }}
        >
            <Border
                variant="5"
                name="border"
                tintColor="#cbcbcb"
                layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
            >
                <ThemeImage
                    name="unique_item_background_bitmap"
                    src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    visible={false}
                />
                <WidgetSlot
                    widgetType="product_icon"
                    name="furni_icon"
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                />
                <FurniChestContentsLayoutNumberContainer {...numberContainer} />
                <WidgetSlot
                    widgetType="limited_item_overlay_grid"
                    name="unique_item_overlay_container"
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
                <WidgetSlot
                    widgetType="rarity_item_overlay_grid"
                    name="rarity_item_overlay_container"
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
            </Border>
            <ThemeImage
                name="outline_focus"
                src={srcOutlineFocus ?? layoutImage('inventory_thumb_selected_outline.png')}
                layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
            />
        </Region>
    );
};

/** Named region `grid_items` of FurniChestContentsLayout - configured through the parent's `gridItems` prop. */
export interface FurniChestContentsLayoutGridItemsProps {
    itemsGridItems?: ReactNode;
    layout?: BoxLayout;
}

export const FurniChestContentsLayoutGridItems = ({ itemsGridItems, layout }: FurniChestContentsLayoutGridItemsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5, ...layout }}
        >
            <Region
                name="grid_items"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3, width: '100%' }}
            >
                {itemsGridItems ?? (
                    <FurniChestContentsLayoutFurniTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `stretching_preview_image_container` of FurniChestContentsLayout - configured through the parent's `stretchingPreviewImageContainer` prop. */
export interface FurniChestContentsLayoutStretchingPreviewImageContainerProps {
    layout?: BoxLayout;
}

export const FurniChestContentsLayoutStretchingPreviewImageContainer = ({ layout }: FurniChestContentsLayoutStretchingPreviewImageContainerProps) => {
    return (
        <Region
            name="stretching_preview_image_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 26, bottom: 0, ...layout }}
        >
            <WidgetSlot
                widgetType="product_image"
                name="preview_image"
                layout={{ position: 'absolute', left: 2, right: 3, top: 9, bottom: 9 }}
            />
        </Region>
    );
};

/** Row template `withdraw_input` of FurniChestContentsLayout - pass real rows through its `items…` slot. */
export interface FurniChestContentsLayoutWithdrawInputItemProps {
    layout?: BoxLayout;
}

export const FurniChestContentsLayoutWithdrawInputItem = ({ layout }: FurniChestContentsLayoutWithdrawInputItemProps) => {
    const [ withdrawInputValue, setWithdrawInputValue ] = useState('');

    return (
        <TextInput
            value={withdrawInputValue}
            onChange={setWithdrawInputValue}
            layout={{ width: 30, height: 19, flexShrink: 0, minWidth: 30, maxWidth: 30, ...layout }}
        />
    );
};

/** Row template `withdraw_btn` of FurniChestContentsLayout - pass real rows through its `items…` slot. */
export interface FurniChestContentsLayoutWithdrawBtnItemProps {
    layout?: BoxLayout;
    onWithdrawBtn?: () => void;
}

export const FurniChestContentsLayoutWithdrawBtnItem = ({ layout, onWithdrawBtn }: FurniChestContentsLayoutWithdrawBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="withdraw_btn"
            onPointerTap={onWithdrawBtn}
            layout={{ width: 73, height: 22, flexShrink: 0, minWidth: 60, ...layout }}
        >
            {t('wiredchests.withdraw')}
        </Button>
    );
};

/** Named region `withdraw_cont` of FurniChestContentsLayout - configured through the parent's `withdrawCont` prop. */
export interface FurniChestContentsLayoutWithdrawContProps {
    itemsWithdrawCont?: ReactNode;
    layout?: BoxLayout;
}

export const FurniChestContentsLayoutWithdrawCont = ({ itemsWithdrawCont, layout }: FurniChestContentsLayoutWithdrawContProps) => {
    return (
        <Region
            name="withdraw_cont"
            layout={{ position: 'absolute', right: 0, top: 9, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsWithdrawCont ?? (
                <>
                    <FurniChestContentsLayoutWithdrawInputItem />
                    <FurniChestContentsLayoutWithdrawBtnItem />
                </>
            )}
        </Region>
    );
};

/** Named region `options` of FurniChestContentsLayout - configured through the parent's `options` prop. */
export interface FurniChestContentsLayoutOptionsProps {
    layout?: BoxLayout;
    onViewLogsByFurniBtn?: () => void;
    visibleViewLogsByFurniBtn?: boolean;
    withdrawCont?: FurniChestContentsLayoutWithdrawContProps;
}

export const FurniChestContentsLayoutOptions = ({ layout, onViewLogsByFurniBtn, visibleViewLogsByFurniBtn, withdrawCont }: FurniChestContentsLayoutOptionsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="options"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: -31, height: 62, ...layout }}
        >
            <FurniChestContentsLayoutWithdrawCont {...withdrawCont} />
            <Button
                variant="3"
                name="view_logs_by_furni_btn"
                onPointerTap={onViewLogsByFurniBtn}
                visible={visibleViewLogsByFurniBtn ?? false}
                layout={{ position: 'absolute', right: 0, width: 73, top: 37, height: 22, minWidth: 60 }}
            >
                {t('wiredchests.view_logs')}
            </Button>
        </Region>
    );
};

/** Named region `right_panel` of FurniChestContentsLayout - configured through the parent's `rightPanel` prop. */
export interface FurniChestContentsLayoutRightPanelProps {
    captionFurniName?: string;
    layout?: BoxLayout;
    options?: FurniChestContentsLayoutOptionsProps;
    srcPlaceholderPreviewImage?: string;
    stretchingPreviewImageContainer?: FurniChestContentsLayoutStretchingPreviewImageContainerProps;
}

export const FurniChestContentsLayoutRightPanel = ({ captionFurniName, layout, options, srcPlaceholderPreviewImage, stretchingPreviewImageContainer }: FurniChestContentsLayoutRightPanelProps) => {
    return (
        <Region
            name="right_panel"
            layout={{ position: 'absolute', right: 9, width: 175, top: 11, bottom: 11, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#d8d8d8"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 31 }}
            >
                <Region
                    name="furni_name"
                    layout={{ position: 'absolute', left: 5, right: -20, top: 5, height: 17, minWidth: 190, maxWidth: 190, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionFurniName ?? 'furni_name'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                    />
                </Region>
                <FurniChestContentsLayoutStretchingPreviewImageContainer {...stretchingPreviewImageContainer} />
                <ThemeImage
                    name="placeholder_preview_image"
                    src={srcPlaceholderPreviewImage ?? layoutImage('wired_chests_images_classic_furni_chest_empty.png')}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 10, bottom: 0 }}
                    visible={false}
                />
            </Border>
            <FurniChestContentsLayoutOptions {...options} />
        </Region>
    );
};

/** Named region `furni_chest` of FurniChestContentsLayout - configured through the parent's `furniChest` prop. */
export interface FurniChestContentsLayoutFurniChestProps {
    captionNoItemsText?: string;
    captionSearchPlaceholder?: string;
    clearSearchButton?: FurniChestContentsLayoutClearSearchButtonProps;
    gridItems?: FurniChestContentsLayoutGridItemsProps;
    layout?: BoxLayout;
    rightPanel?: FurniChestContentsLayoutRightPanelProps;
    visibleSearchBorder?: boolean;
}

export const FurniChestContentsLayoutFurniChest = ({ captionNoItemsText, captionSearchPlaceholder, clearSearchButton, gridItems, layout, rightPanel, visibleSearchBorder }: FurniChestContentsLayoutFurniChestProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region
            name="furni_chest"
            layout={{ position: 'absolute', left: 0, width: 458, top: 0, height: 264, ...layout }}
        >
            <Border
                variant="2"
                name="items_grid_border"
                tintColor="#e3e3e3"
                layout={{ position: 'absolute', left: 9, right: 194, top: 11, bottom: 11, justifyContent: 'center' }}
            >
                <Border
                    variant="105"
                    name="search_border"
                    visible={visibleSearchBorder ?? false}
                    layout={{ position: 'absolute', left: 5, right: 5, top: 4, height: 24, minHeight: 24, maxHeight: 24 }}
                >
                    <Region
                        name="search_placeholder"
                        layout={{ position: 'absolute', left: 4, width: 82, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionSearchPlaceholder ?? t('catalog.search')}
                            textOptions={{ fill: '#666666' }}
                        />
                    </Region>
                    <TextInput
                        value={searchInputValue}
                        onChange={setSearchInputValue}
                        textColor="#666666"
                        layout={{ position: 'absolute', left: 4, right: 25, top: 3, height: 18, minHeight: 18, maxHeight: 18 }}
                    />
                    <FurniChestContentsLayoutClearSearchButton {...clearSearchButton} />
                </Border>
                <Region
                    name="no_items_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 108, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionNoItemsText ?? t('wiredchests.furni_chest.no_items')} />
                </Region>
                <FurniChestContentsLayoutGridItems {...gridItems} />
            </Border>
            <FurniChestContentsLayoutRightPanel {...rightPanel} />
        </Region>
    );
};
