import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ScrollArea, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1167_furni_chest_contents_xml` (layout "furni_chest_contents", 458x264) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FurniChestContentsLayoutProps {
    captionFurniName?: string;
    captionNoItemsText?: string;
    captionSearchPlaceholder?: string;
    itemsGridItems?: ReactNode;
    itemsWithdrawCont?: ReactNode;
    layout?: BoxLayout;
    onClearSearchButton?: () => void;
    onViewLogsByFurniBtn?: () => void;
    srcPlaceholderPreviewImage?: string;
    visibleSearchBorder?: boolean;
    visibleViewLogsByFurniBtn?: boolean;
}

export const FurniChestContentsLayout = ({ captionFurniName, captionNoItemsText, captionSearchPlaceholder, itemsGridItems, itemsWithdrawCont, layout, onClearSearchButton, onViewLogsByFurniBtn, srcPlaceholderPreviewImage, visibleSearchBorder, visibleViewLogsByFurniBtn }: FurniChestContentsLayoutProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 458, height: 264, ...layout }}>
            <Region
                name="furni_chest"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 458, top: 0, height: 264 }}
            >
                <Border
                    variant="2"
                    name="items_grid_border"
                    params={2192}
                    tintColor="#e3e3e3"
                    layout={{ position: 'absolute', left: 9, right: 194, top: 11, bottom: 11 }}
                >
                    <Region
                        visible={visibleSearchBorder ?? false}
                        layout={{ position: 'absolute', left: 5, right: 5, top: 4, height: 24, minHeight: 24, maxHeight: 24 }}
                    >
                        <Border
                            variant="105"
                            name="search_border"
                            params={144}
                            layout={{ width: '100%', height: '100%' }}
                        >
                            <Region
                                name="search_placeholder"
                                params={16}
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
                            <Region
                                name="clear_search_button"
                                params={81}
                                onPointerTap={onClearSearchButton}
                                cursor="pointer"
                                layout={{ position: 'absolute', right: 3, width: 20, top: 2, height: 20 }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('icons_close.png')}
                                    layout={{ position: 'absolute', left: 4, width: 11, top: 4, height: 12 }}
                                />
                            </Region>
                        </Border>
                    </Region>
                    <Region
                        name="no_items_text"
                        params={3935440}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -54.5, width: 108, top: '50%', marginTop: -8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionNoItemsText ?? t('wiredchests.furni_chest.no_items')} />
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5 }}
                    >
                        <Region
                            name="grid_items"
                            params={2192}
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3, width: '100%' }}
                        >
                            {itemsGridItems ?? (
                                <FurniChestContentsLayoutFurniTemplateItem />
                            )}
                        </Region>
                    </ScrollArea>
                </Border>
                <Region
                    name="right_panel"
                    params={2128}
                    layout={{ position: 'absolute', right: 9, width: 175, top: 11, bottom: 11 }}
                >
                    <Border
                        variant="2"
                        params={2192}
                        tintColor="#d8d8d8"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 31 }}
                    >
                        <Region
                            name="furni_name"
                            tags={[ 'furni_name' ]}
                            params={786576}
                            layout={{ position: 'absolute', left: 5, right: -20, top: 5, height: 17, minWidth: 190, maxWidth: 190, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionFurniName ?? 'furni_name'}
                                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                            />
                        </Region>
                        <Region
                            name="stretching_preview_image_container"
                            params={2192}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 26, bottom: 0 }}
                        >
                            <WidgetSlot
                                widgetType="product_image"
                                name="preview_image"
                                params={2192}
                                layout={{ position: 'absolute', left: 2, right: 3, top: 9, bottom: 9 }}
                            />
                        </Region>
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 10, bottom: 0 }}
                        >
                            <ThemeImage
                                name="placeholder_preview_image"
                                params={2192}
                                src={srcPlaceholderPreviewImage ?? layoutImage('wired_chests_images_classic_furni_chest_empty.png')}
                                layout={{ position: 'absolute', left: 0, right: 0, top: 10, bottom: 0 }}
                            />
                        </Region>
                    </Border>
                    <Region
                        name="options"
                        params={1168}
                        layout={{ position: 'absolute', left: 0, right: 0, bottom: -31, height: 62 }}
                    >
                        <Region
                            name="withdraw_cont"
                            params={409680}
                            layout={{ position: 'absolute', right: 0, top: 9, flexDirection: 'row', gap: 10 }}
                        >
                            {itemsWithdrawCont ?? (
                                <>
                                    <FurniChestContentsLayoutWithdrawInputItem />
                                    <FurniChestContentsLayoutWithdrawBtnItem />
                                </>
                            )}
                        </Region>
                        <Region
                            visible={visibleViewLogsByFurniBtn ?? false}
                            layout={{ position: 'absolute', right: 0, width: 73, top: 37, height: 22, minWidth: 60 }}
                        >
                            <Button
                                variant="3"
                                name="view_logs_by_furni_btn"
                                params={393297}
                                onPointerTap={onViewLogsByFurniBtn}
                                layout={{ width: '100%', height: '100%' }}
                            >
                                {t('wiredchests.view_logs')}
                            </Button>
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `furni_template` of FurniChestContentsLayout - pass real rows through its `items…` slot. */
export interface FurniChestContentsLayoutFurniTemplateItemProps {
    captionFurniQuantity?: string;
    layout?: BoxLayout;
    onFurniTemplate?: () => void;
    srcOutlineFocus?: string;
    srcUniqueItemBackgroundBitmap?: string;
    visibleNumberContainer?: boolean;
}

export const FurniChestContentsLayoutFurniTemplateItem = ({ captionFurniQuantity, layout, onFurniTemplate, srcOutlineFocus, srcUniqueItemBackgroundBitmap, visibleNumberContainer }: FurniChestContentsLayoutFurniTemplateItemProps) => {
    return (
        <Region
            name="furni_template"
            params={17}
            onPointerTap={onFurniTemplate}
            cursor="pointer"
            layout={{ width: 42, height: 42, flexShrink: 0, ...layout }}
        >
            <Border
                variant="5"
                name="border"
                params={16}
                tintColor="#cbcbcb"
                layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
            >
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                >
                    <ThemeImage
                        name="unique_item_background_bitmap"
                        params={16}
                        src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="product_icon"
                    name="furni_icon"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40 }}
                />
                <Region
                    name="number_container"
                    params={278672}
                    visible={visibleNumberContainer ?? false}
                    backgroundColor="#2f6982"
                    layout={{ position: 'absolute', left: 27, right: 0, top: 2, height: 16 }}
                >
                    <Region
                        name="number_container_inner_border"
                        params={4194320}
                        backgroundColor="#ffffff"
                        layout={{ position: 'absolute', left: 1, width: 11, top: 1, height: 14 }}
                    >
                        <Region
                            name="furni_quantity"
                            params={4194320}
                            layout={{ position: 'absolute', left: 1, top: 1, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionFurniQuantity ?? '0'}
                                textStyle="text-style-regular"
                                textOptions={{ fill: '#2f6982' }}
                            />
                        </Region>
                    </Region>
                </Region>
                <WidgetSlot
                    widgetType="limited_item_overlay_grid"
                    name="unique_item_overlay_container"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
                <WidgetSlot
                    widgetType="rarity_item_overlay_grid"
                    name="rarity_item_overlay_container"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                />
            </Border>
            <ThemeImage
                name="outline_focus"
                params={16}
                src={srcOutlineFocus ?? layoutImage('inventory_thumb_selected_outline.png')}
                layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
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
            params={393233}
            onPointerTap={onWithdrawBtn}
            layout={{ width: 73, height: 22, flexShrink: 0, minWidth: 60, ...layout }}
        >
            {t('wiredchests.withdraw')}
        </Button>
    );
};
