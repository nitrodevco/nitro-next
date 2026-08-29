import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Frame, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1278_inventory_xml` (layout "inventory", 490x342) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    subContentArea?: InventoryLayoutSubContentAreaProps;
    topContent?: InventoryLayoutTopContentProps;
}

export const InventoryLayout = ({ layout, onClose, subContentArea, topContent }: InventoryLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="inventoryBase"
            name="inventoryBase"
            caption={t('inventory.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 490, height: 342, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <InventoryLayoutTopContent
                    tags={[ 'TOP_CONTENT' ]}
                    {...topContent}
                />
                <InventoryLayoutSubContentArea {...subContentArea} />
            </Region>
        </Frame>
    );
};

/** Named region `empty_container` of InventoryLayout - configured through the parent's `emptyContainer` prop. */
export interface InventoryLayoutEmptyContainerProps {
    captionInventoryEmptyDescription?: string;
    captionInventoryEmptyTitle?: string;
    layout?: BoxLayout;
    onOpenCatalogBtn?: () => void;
    srcImage?: string;
    tags?: string[];
    visibleEmptyContainer?: boolean;
}

export const InventoryLayoutEmptyContainer = ({ captionInventoryEmptyDescription, captionInventoryEmptyTitle, layout, onOpenCatalogBtn, srcImage, tags, visibleEmptyContainer }: InventoryLayoutEmptyContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="empty_container"
            tags={tags}
            visible={visibleEmptyContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 478, top: 20, bottom: 3, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="image"
                src={srcImage ?? layoutImage('inventory_inventory_empty.png')}
                layout={{ position: 'absolute', left: 46, width: 180, top: 42, height: 180 }}
            />
            <Region layout={{ position: 'absolute', left: 287, width: 176, top: 64, height: 154, flexDirection: 'column', gap: 5 }}>
                <Region
                    name="inventory_empty_title"
                    tags={[ 'furni_description' ]}
                    layout={{ width: 176, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInventoryEmptyTitle ?? t('inventory.empty.title')}
                        textStyle="text-style-il-heading-2"
                        textOptions={{ fill: '#dd0000', wordWrap: true, wordWrapWidth: 176 }}
                    />
                </Region>
                <Region
                    name="inventory_empty_description"
                    tags={[ 'furni_description' ]}
                    layout={{ width: 176, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInventoryEmptyDescription ?? t('inventory.empty.desc')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 176 }}
                    />
                </Region>
            </Region>
            <Button
                variant="3"
                name="open_catalog_btn"
                onPointerTap={onOpenCatalogBtn}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', marginLeft: 76.5, marginRight: -76.5, width: 149, bottom: 2, height: 51 }}
            >
                {t('inventory.open.catalog')}
            </Button>
        </Region>
    );
};

/** Named region `loading_container` of InventoryLayout - configured through the parent's `loadingContainer` prop. */
export interface InventoryLayoutLoadingContainerProps {
    layout?: BoxLayout;
    srcDownloadImage?: string;
    tags?: string[];
    visibleLoadingContainer?: boolean;
}

export const InventoryLayoutLoadingContainer = ({ layout, srcDownloadImage, tags, visibleLoadingContainer }: InventoryLayoutLoadingContainerProps) => {
    return (
        <Region
            name="loading_container"
            tags={tags}
            visible={visibleLoadingContainer ?? false}
            layout={{ position: 'absolute', left: 6, width: 264, top: 27, bottom: 6, ...layout }}
        >
            <ThemeImage
                name="download_image"
                src={srcDownloadImage ?? layoutImage('inventory_download_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 264, top: 0, height: 268 }}
            />
        </Region>
    );
};

/** Named region `clear_filter_button` of InventoryLayout - configured through the parent's `clearFilterButton` prop. */
export interface InventoryLayoutClearFilterButtonProps {
    layout?: BoxLayout;
    onClearFilterButton?: () => void;
    tags?: string[];
    visibleClearFilterButton?: boolean;
}

export const InventoryLayoutClearFilterButton = ({ layout, onClearFilterButton, tags, visibleClearFilterButton }: InventoryLayoutClearFilterButtonProps) => {
    return (
        <Region
            name="clear_filter_button"
            tags={tags}
            visible={visibleClearFilterButton ?? false}
            onPointerTap={onClearFilterButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 120, width: 20, top: 0, height: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_close.png')}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `item_grid` of InventoryLayout - configured through the parent's `itemGrid` prop. */
export interface InventoryLayoutItemGridProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutItemGrid = ({ layout, tags }: InventoryLayoutItemGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 284, top: 0, bottom: 10, ...layout }}
        >
            <Region
                name="item_grid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `item_grid_pages` of InventoryLayout - configured through the parent's `itemGridPages` prop. */
export interface InventoryLayoutItemGridPagesProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutItemGridPages = ({ layout, tags }: InventoryLayoutItemGridPagesProps) => {
    return (
        <Region
            name="item_grid_pages"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 280, bottom: 1, height: 10, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 8, height: 14, flexShrink: 0 }}>
                <Region
                    tags={[ 'PAGE' ]}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="0"
                        textStyle="text-style-il-small"
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `grid_container` of InventoryLayout - configured through the parent's `gridContainer` prop. */
export interface InventoryLayoutGridContainerProps {
    captionItemsShown?: string;
    itemGrid?: InventoryLayoutItemGridProps;
    itemGridPages?: InventoryLayoutItemGridPagesProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutGridContainer = ({ captionItemsShown, itemGrid, itemGridPages, layout, tags }: InventoryLayoutGridContainerProps) => {
    return (
        <Region
            name="grid_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 284, top: 27, bottom: 3, ...layout }}
        >
            <InventoryLayoutItemGrid
                tags={[ 'FURNI_ITEM_GRID' ]}
                {...itemGrid}
            />
            <InventoryLayoutItemGridPages {...itemGridPages} />
            <Region
                name="items.shown"
                layout={{ position: 'absolute', right: 1, width: 98, bottom: -3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemsShown ?? 'Items shown: x/y'}
                    textOptions={{ fill: '#777777' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `furni_preview_region` of InventoryLayout - configured through the parent's `furniPreviewRegion` prop. */
export interface InventoryLayoutFurniPreviewRegionProps {
    layout?: BoxLayout;
    onFurniPreviewRegion?: () => void;
    tags?: string[];
}

export const InventoryLayoutFurniPreviewRegion = ({ layout, onFurniPreviewRegion, tags }: InventoryLayoutFurniPreviewRegionProps) => {
    return (
        <Region
            name="furni_preview_region"
            tags={tags}
            onPointerTap={onFurniPreviewRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, right: 5, top: 0, bottom: 107, minHeight: 50, ...layout }}
        />
    );
};

/** Row template `furni_name` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutFurniNameItemProps {
    captionFurniName?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutFurniNameItem = ({ captionFurniName, layout, tags }: InventoryLayoutFurniNameItemProps) => {
    return (
        <Region
            name="furni_name"
            tags={tags}
            layout={{ width: 190, height: 17, flexShrink: 0, minWidth: 190, maxWidth: 190, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionFurniName ?? 'name'}
                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            />
        </Region>
    );
};

/** Row template `furni_description` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutFurniDescriptionItemProps {
    captionFurniDescription?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutFurniDescriptionItem = ({ captionFurniDescription, layout, tags }: InventoryLayoutFurniDescriptionItemProps) => {
    return (
        <Region
            name="furni_description"
            tags={tags}
            layout={{ width: 190, height: 30, flexShrink: 0, minWidth: 190, maxWidth: 190, maxHeight: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionFurniDescription ?? 'description lakjdsf lkjas dflkjalkjasdflkja sdlfkj asdf'}
                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            />
        </Region>
    );
};

/** Row template `furni_extra` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutFurniExtraItemProps {
    captionFurniExtra?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutFurniExtraItem = ({ captionFurniExtra, layout, tags }: InventoryLayoutFurniExtraItemProps) => {
    return (
        <Region
            name="furni_extra"
            tags={tags}
            layout={{ width: 190, height: 17, flexShrink: 0, minWidth: 190, maxWidth: 190, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionFurniExtra ?? 'extra'}
                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            />
        </Region>
    );
};

/** Row template `spacer` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutSpacerItem = ({ layout, tags }: InventoryLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            tags={tags}
            layout={{ width: 30, height: 12, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `placeinroom_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutPlaceinroomBtnItemProps {
    layout?: BoxLayout;
    onPlaceinroomBtn?: () => void;
    tags?: string[];
}

export const InventoryLayoutPlaceinroomBtnItem = ({ layout, onPlaceinroomBtn, tags }: InventoryLayoutPlaceinroomBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="placeinroom_btn"
            tags={tags}
            onPointerTap={onPlaceinroomBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 180, height: 22, flexShrink: 0, ...layout }}
        >
            {t('inventory.furni.placetoroom')}
        </Button>
    );
};

/** Row template `goto_room_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutGotoRoomBtnItemProps {
    layout?: BoxLayout;
    onGotoRoomBtn?: () => void;
    tags?: string[];
}

export const InventoryLayoutGotoRoomBtnItem = ({ layout, onGotoRoomBtn, tags }: InventoryLayoutGotoRoomBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="goto_room_btn"
            tags={tags}
            onPointerTap={onGotoRoomBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 165, height: 22, flexShrink: 0, ...layout }}
        >
            {t('inventory.furni.gotoroom')}
        </Button>
    );
};

/** Row template `offertotrade_cnt` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutOffertotradeCntItemProps {
    layout?: BoxLayout;
}

export const InventoryLayoutOffertotradeCntItem = ({ layout }: InventoryLayoutOffertotradeCntItemProps) => {
    const [ offertotradeCntValue, setOffertotradeCntValue ] = useState('');

    return (
        <TextInput
            value={offertotradeCntValue}
            onChange={setOffertotradeCntValue}
            layout={{ width: 50, height: 19, flexShrink: 0, minWidth: 50, maxWidth: 50, ...layout }}
        />
    );
};

/** Row template `offertotrade_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutOffertotradeBtnItemProps {
    layout?: BoxLayout;
    onOffertotradeBtn?: () => void;
    tags?: string[];
}

export const InventoryLayoutOffertotradeBtnItem = ({ layout, onOffertotradeBtn, tags }: InventoryLayoutOffertotradeBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="offertotrade_btn"
            tags={tags}
            onPointerTap={onOffertotradeBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 148, height: 22, flexShrink: 0, minWidth: 60, ...layout }}
        >
            {t('inventory.trading.offer')}
        </Button>
    );
};

/** Row template `sell_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutSellBtnItemProps {
    layout?: BoxLayout;
    onSellBtn?: () => void;
    tags?: string[];
}

export const InventoryLayoutSellBtnItem = ({ layout, onSellBtn, tags }: InventoryLayoutSellBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="sell_btn"
            tags={tags}
            onPointerTap={onSellBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 167, height: 22, flexShrink: 0, ...layout }}
        >
            {t('inventory.marketplace.sell')}
        </Button>
    );
};

/** Row template `use_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutUseBtnItemProps {
    layout?: BoxLayout;
    onUseBtn?: () => void;
    tags?: string[];
}

export const InventoryLayoutUseBtnItem = ({ layout, onUseBtn, tags }: InventoryLayoutUseBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="use_btn"
            tags={tags}
            onPointerTap={onUseBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 125, height: 28, flexShrink: 0, ...layout }}
        >
            {t('inventory.furni.use')}
        </Button>
    );
};

/** Row template `extendrent_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutExtendrentBtnItemProps {
    layout?: BoxLayout;
    onExtendrentBtn?: () => void;
    tags?: string[];
}

export const InventoryLayoutExtendrentBtnItem = ({ layout, onExtendrentBtn, tags }: InventoryLayoutExtendrentBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="extendrent_btn"
            tags={tags}
            onPointerTap={onExtendrentBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 168, height: 22, flexShrink: 0, ...layout }}
        >
            {t('inventory.furni.extendrent')}
        </Button>
    );
};

/** Row template `buyrenteditem_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutBuyrenteditemBtnItemProps {
    layout?: BoxLayout;
    onBuyrenteditemBtn?: () => void;
    tags?: string[];
}

export const InventoryLayoutBuyrenteditemBtnItem = ({ layout, onBuyrenteditemBtn, tags }: InventoryLayoutBuyrenteditemBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="buyrenteditem_btn"
            tags={tags}
            onPointerTap={onBuyrenteditemBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 189, height: 22, flexShrink: 0, ...layout }}
        >
            {t('inventory.furni.buyrenteditem')}
        </Button>
    );
};

/** Named region `preview_element_list` of InventoryLayout - configured through the parent's `previewElementList` prop. */
export interface InventoryLayoutPreviewElementListProps {
    itemsPreviewElementList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutPreviewElementList = ({ itemsPreviewElementList, layout, tags }: InventoryLayoutPreviewElementListProps) => {
    return (
        <Region
            name="preview_element_list"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 2, height: 266, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPreviewElementList ?? (
                <>
                    <InventoryLayoutFurniNameItem tags={[ 'furni_name' ]} />
                    <InventoryLayoutFurniDescriptionItem tags={[ 'furni_description' ]} />
                    <InventoryLayoutFurniExtraItem tags={[ 'furni_extra' ]} />
                    <InventoryLayoutSpacerItem />
                    <InventoryLayoutPlaceinroomBtnItem tags={[ 'FIT:inventory.furni.placetoroom' ]} />
                    <InventoryLayoutGotoRoomBtnItem tags={[ 'FIT:inventory.furni.gotoroom' ]} />
                    <InventoryLayoutOffertotradeCntItem />
                    <InventoryLayoutOffertotradeBtnItem />
                    <InventoryLayoutSellBtnItem />
                    <InventoryLayoutUseBtnItem />
                    <InventoryLayoutExtendrentBtnItem tags={[ 'FIT:inventory.furni.extendrent' ]} />
                    <InventoryLayoutBuyrenteditemBtnItem tags={[ 'FIT:inventory.furni.buyrenteditem' ]} />
                </>
            )}
        </Region>
    );
};

/** Row template `tradeable_info_region` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutTradeableInfoRegionItemProps {
    captionTradeableNumber?: string;
    layout?: BoxLayout;
    onTradeableInfoRegion?: () => void;
    srcTradeableIcon?: string;
    tags?: string[];
}

export const InventoryLayoutTradeableInfoRegionItem = ({ captionTradeableNumber, layout, onTradeableInfoRegion, srcTradeableIcon, tags }: InventoryLayoutTradeableInfoRegionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tradeable_info_region"
            tags={tags}
            tooltip={t('inventory.furni.preview.tradeable_amount')}
            onPointerTap={onTradeableInfoRegion}
            cursor="pointer"
            layout={{ width: 52, height: 16, flexShrink: 0, ...layout }}
        >
            <Region
                name="tradeable_number"
                tags={[ 'NUMBER', 'COUNT' ]}
                layout={{ position: 'absolute', left: 33, width: 4, top: 1, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTradeableNumber ?? ''} />
            </Region>
            <ThemeImage
                name="tradeable_icon"
                src={srcTradeableIcon ?? layoutImage('inventory_furni_no_trade_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Row template `recyclable_info_region` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutRecyclableInfoRegionItemProps {
    captionRecyclableNumber?: string;
    layout?: BoxLayout;
    onRecyclableInfoRegion?: () => void;
    srcRecyclableIcon?: string;
    tags?: string[];
}

export const InventoryLayoutRecyclableInfoRegionItem = ({ captionRecyclableNumber, layout, onRecyclableInfoRegion, srcRecyclableIcon, tags }: InventoryLayoutRecyclableInfoRegionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="recyclable_info_region"
            tags={tags}
            tooltip={t('inventory.furni.preview.recyclable_amount')}
            onPointerTap={onRecyclableInfoRegion}
            cursor="pointer"
            layout={{ width: 52, height: 16, flexShrink: 0, ...layout }}
        >
            <Region
                name="recyclable_number"
                tags={[ 'NUMBER', 'COUNT' ]}
                layout={{ position: 'absolute', left: 18, width: 4, top: 1, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRecyclableNumber ?? ''} />
            </Region>
            <ThemeImage
                name="recyclable_icon"
                src={srcRecyclableIcon ?? layoutImage('inventory_furni_no_recycle_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `icons_element_list` of InventoryLayout - configured through the parent's `iconsElementList` prop. */
export interface InventoryLayoutIconsElementListProps {
    itemsIconsElementList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutIconsElementList = ({ itemsIconsElementList, layout, tags }: InventoryLayoutIconsElementListProps) => {
    return (
        <Region
            name="icons_element_list"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 34, flexDirection: 'column', ...layout }}
        >
            {itemsIconsElementList ?? (
                <>
                    <InventoryLayoutTradeableInfoRegionItem />
                    <InventoryLayoutRecyclableInfoRegionItem />
                </>
            )}
        </Region>
    );
};

/** Named region `preview_container` of InventoryLayout - configured through the parent's `previewContainer` prop. */
export interface InventoryLayoutPreviewContainerProps {
    furniPreviewRegion?: InventoryLayoutFurniPreviewRegionProps;
    iconsElementList?: InventoryLayoutIconsElementListProps;
    layout?: BoxLayout;
    onNextItemButton?: () => void;
    onViewItemButton?: () => void;
    previewElementList?: InventoryLayoutPreviewElementListProps;
    tags?: string[];
}

export const InventoryLayoutPreviewContainer = ({ furniPreviewRegion, iconsElementList, layout, onNextItemButton, onViewItemButton, previewElementList, tags }: InventoryLayoutPreviewContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            tags={tags}
            layout={{ position: 'absolute', left: 290, width: 180, top: 27, bottom: -3, ...layout }}
        >
            <InventoryLayoutFurniPreviewRegion {...furniPreviewRegion} />
            <WidgetSlot
                widgetType="room_previewer"
                name="furni_preview_widget"
                layout={{ position: 'absolute', left: 5, right: 5, top: 0, bottom: 107, minHeight: 50 }}
            />
            <InventoryLayoutPreviewElementList {...previewElementList} />
            <InventoryLayoutIconsElementList {...iconsElementList} />
            <WidgetSlot
                widgetType="rarity_item_overlay_preview"
                name="rarity_item_overlay_widget"
                layout={{ position: 'absolute', right: 23, width: 36, top: 5, height: 30 }}
            />
            <WidgetSlot
                widgetType="limited_item_overlay_preview"
                name="unique_limited_item_overlay_widget"
                layout={{ position: 'absolute', right: 21, width: 40, top: 4, height: 40 }}
            />
            <Button
                variant="3"
                name="nextItemButton"
                onPointerTap={onNextItemButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 16, width: 131, top: 5, height: 23 }}
            >
                {t('inventory.furni.next')}
            </Button>
            <Button
                variant="3"
                name="viewItemButton"
                onPointerTap={onViewItemButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 16, width: 131, top: 31, height: 23 }}
            >
                {t('inventory.furni.view')}
            </Button>
        </Region>
    );
};

/** Named region `furni` of InventoryLayout - configured through the parent's `furni` prop. */
export interface InventoryLayoutFurniProps {
    clearFilterButton?: InventoryLayoutClearFilterButtonProps;
    gridContainer?: InventoryLayoutGridContainerProps;
    layout?: BoxLayout;
    onFilterOptions?: () => void;
    onPlacementOptions?: () => void;
    previewContainer?: InventoryLayoutPreviewContainerProps;
    tags?: string[];
    visibleFurni?: boolean;
}

export const InventoryLayoutFurni = ({ clearFilterButton, gridContainer, layout, onFilterOptions, onPlacementOptions, previewContainer, tags, visibleFurni }: InventoryLayoutFurniProps) => {
    const [ filterValue, setFilterValue ] = useState('');

    return (
        <Region
            name="furni"
            tags={tags}
            visible={visibleFurni ?? false}
            layout={{ position: 'absolute', left: 0, width: 468, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="3"
                name="options_container"
                tintColor="#cacaca"
                layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 25 }}
            >
                <Border
                    variant="0"
                    layout={{ position: 'absolute', left: 4, width: 139, top: 3, height: 20 }}
                >
                    <TextInput
                        value={filterValue}
                        onChange={setFilterValue}
                        layout={{ position: 'absolute', left: 3, width: 122, top: 2, height: 15, minWidth: 60 }}
                    />
                    <InventoryLayoutClearFilterButton {...clearFilterButton} />
                </Border>
                <Dropmenu
                    variant="0"
                    name="filter.options"
                    onPointerTap={onFilterOptions}
                    layout={{ position: 'absolute', left: 150, width: 119, top: 2, height: 21 }}
                />
                <Dropmenu
                    variant="0"
                    name="placement.options"
                    onPointerTap={onPlacementOptions}
                    layout={{ position: 'absolute', left: 274, width: 119, top: 2, height: 21 }}
                />
            </Border>
            <InventoryLayoutGridContainer {...gridContainer} />
            <InventoryLayoutPreviewContainer {...previewContainer} />
        </Region>
    );
};

/** Named region `clear_filter_button` of InventoryLayout - configured through the parent's `clearFilterButton` prop. */
export interface InventoryLayoutClearFilterButton2Props {
    layout?: BoxLayout;
    onClearFilterButton?: () => void;
    tags?: string[];
    visibleClearFilterButton?: boolean;
}

export const InventoryLayoutClearFilterButton2 = ({ layout, onClearFilterButton, tags, visibleClearFilterButton }: InventoryLayoutClearFilterButton2Props) => {
    return (
        <Region
            name="clear_filter_button"
            tags={tags}
            visible={visibleClearFilterButton ?? false}
            onPointerTap={onClearFilterButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 120, width: 20, top: 0, height: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_close.png')}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `item_grid` of InventoryLayout - configured through the parent's `itemGrid` prop. */
export interface InventoryLayoutItemGrid2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutItemGrid2 = ({ layout, tags }: InventoryLayoutItemGrid2Props) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 284, top: 0, bottom: 10, ...layout }}
        >
            <Region
                name="item_grid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `item_grid_pages` of InventoryLayout - configured through the parent's `itemGridPages` prop. */
export interface InventoryLayoutItemGridPages2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutItemGridPages2 = ({ layout, tags }: InventoryLayoutItemGridPages2Props) => {
    return (
        <Region
            name="item_grid_pages"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 280, bottom: 1, height: 10, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 8, height: 14, flexShrink: 0 }}>
                <Region
                    tags={[ 'PAGE' ]}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="0"
                        textStyle="text-style-il-small"
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `grid_container` of InventoryLayout - configured through the parent's `gridContainer` prop. */
export interface InventoryLayoutGridContainer2Props {
    captionItemsShown?: string;
    itemGrid?: InventoryLayoutItemGrid2Props;
    itemGridPages?: InventoryLayoutItemGridPages2Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutGridContainer2 = ({ captionItemsShown, itemGrid, itemGridPages, layout, tags }: InventoryLayoutGridContainer2Props) => {
    return (
        <Region
            name="grid_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 284, top: 27, bottom: 3, ...layout }}
        >
            <InventoryLayoutItemGrid2
                tags={[ 'FURNI_ITEM_GRID' ]}
                {...itemGrid}
            />
            <InventoryLayoutItemGridPages2 {...itemGridPages} />
            <Region
                name="items.shown"
                visible={false}
                layout={{ position: 'absolute', right: 1, width: 98, bottom: -3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemsShown ?? 'Items shown: x/y'}
                    textOptions={{ fill: '#777777' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `nft_name` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutNftNameItemProps {
    captionNftName?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutNftNameItem = ({ captionNftName, layout, tags }: InventoryLayoutNftNameItemProps) => {
    return (
        <Region
            name="nft_name"
            tags={tags}
            layout={{ width: 190, height: 17, flexShrink: 0, minWidth: 190, maxWidth: 190, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNftName ?? 'name '}
                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            />
        </Region>
    );
};

/** Row template `nft_type` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutNftTypeItemProps {
    captionNftType?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutNftTypeItem = ({ captionNftType, layout, tags }: InventoryLayoutNftTypeItemProps) => {
    return (
        <Region
            name="nft_type"
            tags={tags}
            layout={{ width: 190, height: 17, flexShrink: 0, minWidth: 190, maxWidth: 190, maxHeight: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNftType ?? 'Type: furni fdgfgdf'}
                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            />
        </Region>
    );
};

/** Named region `nft_info` of InventoryLayout - configured through the parent's `nftInfo` prop. */
export interface InventoryLayoutNftInfoProps {
    itemsNftInfo?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutNftInfo = ({ itemsNftInfo, layout, tags }: InventoryLayoutNftInfoProps) => {
    return (
        <Region
            name="nft_info"
            tags={tags}
            layout={{ position: 'absolute', left: 5, right: 0, top: 5, height: 35, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsNftInfo ?? (
                <>
                    <InventoryLayoutNftNameItem tags={[ 'furni_name' ]} />
                    <InventoryLayoutNftTypeItem tags={[ 'furni_description' ]} />
                </>
            )}
        </Region>
    );
};

/** Row template `offertotrade_cnt` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutOffertotradeCntItem2Props {
    layout?: BoxLayout;
}

export const InventoryLayoutOffertotradeCntItem2 = ({ layout }: InventoryLayoutOffertotradeCntItem2Props) => {
    const [ offertotradeCntValue, setOffertotradeCntValue ] = useState('');

    return (
        <TextInput
            value={offertotradeCntValue}
            onChange={setOffertotradeCntValue}
            layout={{ width: 30, height: 19, flexShrink: 0, minWidth: 30, maxWidth: 30, ...layout }}
        />
    );
};

/** Row template `offertotrade_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutOffertotradeBtnItem2Props {
    layout?: BoxLayout;
    onOffertotradeBtn?: () => void;
    tags?: string[];
}

export const InventoryLayoutOffertotradeBtnItem2 = ({ layout, onOffertotradeBtn, tags }: InventoryLayoutOffertotradeBtnItem2Props) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="offertotrade_btn"
            tags={tags}
            onPointerTap={onOffertotradeBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 148, height: 22, flexShrink: 0, minWidth: 60, ...layout }}
        >
            {t('inventory.trading.offer')}
        </Button>
    );
};

/** Named region `offer_options` of InventoryLayout - configured through the parent's `offerOptions` prop. */
export interface InventoryLayoutOfferOptionsProps {
    itemsOfferOptions?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutOfferOptions = ({ itemsOfferOptions, layout, tags }: InventoryLayoutOfferOptionsProps) => {
    return (
        <Region
            name="offer_options"
            tags={tags}
            layout={{ position: 'absolute', left: -18, right: 5, top: 160, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsOfferOptions ?? (
                <>
                    <InventoryLayoutOffertotradeCntItem2 />
                    <InventoryLayoutOffertotradeBtnItem2 />
                </>
            )}
        </Region>
    );
};

/** Row template `tradeable_info_region` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutTradeableInfoRegionItem2Props {
    captionTradeableNumber?: string;
    layout?: BoxLayout;
    onTradeableInfoRegion?: () => void;
    srcTradeableIcon?: string;
    tags?: string[];
    visibleTradeableInfoRegion?: boolean;
}

export const InventoryLayoutTradeableInfoRegionItem2 = ({ captionTradeableNumber, layout, onTradeableInfoRegion, srcTradeableIcon, tags, visibleTradeableInfoRegion }: InventoryLayoutTradeableInfoRegionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="tradeable_info_region"
            tags={tags}
            tooltip={t('inventory.furni.preview.tradeable_amount')}
            visible={visibleTradeableInfoRegion ?? false}
            onPointerTap={onTradeableInfoRegion}
            cursor="pointer"
            layout={{ width: 52, height: 16, flexShrink: 0, ...layout }}
        >
            <Region
                name="tradeable_number"
                tags={[ 'NUMBER', 'COUNT' ]}
                layout={{ position: 'absolute', left: 33, width: 4, top: 1, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTradeableNumber ?? ''} />
            </Region>
            <ThemeImage
                name="tradeable_icon"
                src={srcTradeableIcon ?? layoutImage('inventory_furni_no_trade_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `icons_element_list` of InventoryLayout - configured through the parent's `iconsElementList` prop. */
export interface InventoryLayoutIconsElementList2Props {
    itemsIconsElementList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutIconsElementList2 = ({ itemsIconsElementList, layout, tags }: InventoryLayoutIconsElementList2Props) => {
    return (
        <Region
            name="icons_element_list"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 34, flexDirection: 'column', ...layout }}
        >
            {itemsIconsElementList ?? (
                <InventoryLayoutTradeableInfoRegionItem2 />
            )}
        </Region>
    );
};

/** Named region `preview_container` of InventoryLayout - configured through the parent's `previewContainer` prop. */
export interface InventoryLayoutPreviewContainer2Props {
    iconsElementList?: InventoryLayoutIconsElementList2Props;
    layout?: BoxLayout;
    nftInfo?: InventoryLayoutNftInfoProps;
    offerOptions?: InventoryLayoutOfferOptionsProps;
    onNextItemButton?: () => void;
    onViewItemButton?: () => void;
    tags?: string[];
    visibleNextItemButton?: boolean;
    visibleViewItemButton?: boolean;
}

export const InventoryLayoutPreviewContainer2 = ({ iconsElementList, layout, nftInfo, offerOptions, onNextItemButton, onViewItemButton, tags, visibleNextItemButton, visibleViewItemButton }: InventoryLayoutPreviewContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            tags={tags}
            layout={{ position: 'absolute', left: 290, width: 180, top: 27, bottom: -3, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#d8d8d8"
                layout={{ position: 'absolute', left: 0, width: 175, top: 5, height: 188 }}
            >
                <InventoryLayoutNftInfo {...nftInfo} />
                <WidgetSlot
                    widgetType="product_image"
                    name="nft_image"
                    layout={{ position: 'absolute', left: 2, width: 170, top: 45, height: 110 }}
                />
                <InventoryLayoutOfferOptions {...offerOptions} />
            </Border>
            <InventoryLayoutIconsElementList2 {...iconsElementList} />
            <WidgetSlot
                widgetType="rarity_item_overlay_preview"
                name="rarity_item_overlay_widget"
                visible={false}
                layout={{ position: 'absolute', right: 23, width: 36, top: 5, height: 30 }}
            />
            <WidgetSlot
                widgetType="limited_item_overlay_preview"
                name="unique_limited_item_overlay_widget"
                visible={false}
                layout={{ position: 'absolute', right: 21, width: 40, top: 4, height: 40 }}
            />
            <Region
                visible={visibleNextItemButton ?? false}
                layout={{ position: 'absolute', right: 16, width: 131, top: 5, height: 23 }}
            >
                <Button
                    variant="3"
                    name="nextItemButton"
                    onPointerTap={onNextItemButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ width: '100%', height: '100%' }}
                >
                    {t('inventory.furni.next')}
                </Button>
            </Region>
            <Region
                visible={visibleViewItemButton ?? false}
                layout={{ position: 'absolute', right: 16, width: 131, top: 31, height: 23 }}
            >
                <Button
                    variant="3"
                    name="viewItemButton"
                    onPointerTap={onViewItemButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ width: '100%', height: '100%' }}
                >
                    {t('inventory.furni.view')}
                </Button>
            </Region>
        </Region>
    );
};

/** Named region `collectibles` of InventoryLayout - configured through the parent's `collectibles` prop. */
export interface InventoryLayoutCollectiblesProps {
    clearFilterButton?: InventoryLayoutClearFilterButton2Props;
    gridContainer?: InventoryLayoutGridContainer2Props;
    layout?: BoxLayout;
    onFilterOptions?: () => void;
    previewContainer?: InventoryLayoutPreviewContainer2Props;
    tags?: string[];
    visibleCollectibles?: boolean;
}

export const InventoryLayoutCollectibles = ({ clearFilterButton, gridContainer, layout, onFilterOptions, previewContainer, tags, visibleCollectibles }: InventoryLayoutCollectiblesProps) => {
    const [ filterValue, setFilterValue ] = useState('');

    return (
        <Region
            name="collectibles"
            tags={tags}
            visible={visibleCollectibles ?? false}
            layout={{ position: 'absolute', left: 0, width: 468, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="3"
                name="options_container"
                tintColor="#cacaca"
                layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 25 }}
            >
                <Border
                    variant="0"
                    layout={{ position: 'absolute', left: 4, width: 139, top: 3, height: 20 }}
                >
                    <TextInput
                        value={filterValue}
                        onChange={setFilterValue}
                        layout={{ position: 'absolute', left: 3, width: 120, top: 2, height: 15, minWidth: 60 }}
                    />
                    <InventoryLayoutClearFilterButton2 {...clearFilterButton} />
                </Border>
                <Dropmenu
                    variant="0"
                    name="filter.options"
                    onPointerTap={onFilterOptions}
                    layout={{ position: 'absolute', left: 150, width: 119, top: 2, height: 21 }}
                />
            </Border>
            <InventoryLayoutGridContainer2 {...gridContainer} />
            <InventoryLayoutPreviewContainer2 {...previewContainer} />
        </Region>
    );
};

/** Named region `clear_filter_button` of InventoryLayout - configured through the parent's `clearFilterButton` prop. */
export interface InventoryLayoutClearFilterButton3Props {
    layout?: BoxLayout;
    onClearFilterButton?: () => void;
    tags?: string[];
    visibleClearFilterButton?: boolean;
}

export const InventoryLayoutClearFilterButton3 = ({ layout, onClearFilterButton, tags, visibleClearFilterButton }: InventoryLayoutClearFilterButton3Props) => {
    return (
        <Region
            name="clear_filter_button"
            tags={tags}
            visible={visibleClearFilterButton ?? false}
            onPointerTap={onClearFilterButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 120, width: 20, top: 0, height: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_close.png')}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `grid` of InventoryLayout - configured through the parent's `grid` prop. */
export interface InventoryLayoutGridProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutGrid = ({ layout, tags }: InventoryLayoutGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 274, top: 27, bottom: 3, ...layout }}
        >
            <Region
                name="grid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `preview_container` of InventoryLayout - configured through the parent's `previewContainer` prop. */
export interface InventoryLayoutPreviewContainer3Props {
    captionPreviewDescription?: string;
    captionPreviewInfo?: string;
    captionPreviewText?: string;
    layout?: BoxLayout;
    onPlaceButton?: () => void;
    srcPreviewImage?: string;
    tags?: string[];
}

export const InventoryLayoutPreviewContainer3 = ({ captionPreviewDescription, captionPreviewInfo, captionPreviewText, layout, onPlaceButton, srcPreviewImage, tags }: InventoryLayoutPreviewContainer3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            tags={tags}
            layout={{ position: 'absolute', right: -2, width: 190, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="preview_text"
                layout={{ position: 'absolute', left: 0, right: 124, top: 32, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPreviewText ?? 'PetName'}
                    textStyle="text-style-u-headline-small"
                />
            </Region>
            <ThemeImage
                name="preview_image"
                src={srcPreviewImage}
                layout={{ position: 'absolute', left: 5, width: 150, top: 53, height: 152 }}
            />
            <Region
                name="preview_description"
                layout={{ position: 'absolute', left: 4, right: 6, top: 205, height: 17, maxWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPreviewDescription ?? 'Lorem ipsumlkj lj'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 180 }}
                />
            </Region>
            <Region
                name="preview_info"
                visible={false}
                layout={{ position: 'absolute', marginLeft: -13, marginRight: 13, width: 154, top: 200, bottom: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPreviewInfo ?? '...'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 154 }}
                />
            </Region>
            <Button
                variant="3"
                name="place_button"
                onPointerTap={onPlaceButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, width: 158, bottom: 4, height: 28, minWidth: 158, maxWidth: 158 }}
            >
                {t('inventory.pets.placetoroom')}
            </Button>
        </Region>
    );
};

/** Named region `pets` of InventoryLayout - configured through the parent's `pets` prop. */
export interface InventoryLayoutPetsProps {
    clearFilterButton?: InventoryLayoutClearFilterButton3Props;
    grid?: InventoryLayoutGridProps;
    layout?: BoxLayout;
    onFilterOptions?: () => void;
    onFilterRarity?: () => void;
    previewContainer?: InventoryLayoutPreviewContainer3Props;
    tags?: string[];
    visiblePets?: boolean;
}

export const InventoryLayoutPets = ({ clearFilterButton, grid, layout, onFilterOptions, onFilterRarity, previewContainer, tags, visiblePets }: InventoryLayoutPetsProps) => {
    const [ filterValue, setFilterValue ] = useState('');

    return (
        <Region
            name="pets"
            tags={tags}
            visible={visiblePets ?? false}
            layout={{ position: 'absolute', left: 0, width: 468, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="3"
                name="options_container"
                tintColor="#cacaca"
                layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 25 }}
            >
                <Border
                    variant="0"
                    layout={{ position: 'absolute', left: 4, width: 139, top: 3, height: 20 }}
                >
                    <TextInput
                        value={filterValue}
                        onChange={setFilterValue}
                        layout={{ position: 'absolute', left: 3, width: 122, top: 2, height: 15, minWidth: 60 }}
                    />
                    <InventoryLayoutClearFilterButton3 {...clearFilterButton} />
                </Border>
                <Dropmenu
                    variant="0"
                    name="filter.options"
                    onPointerTap={onFilterOptions}
                    layout={{ position: 'absolute', left: 150, width: 119, top: 2, height: 21 }}
                />
            </Border>
            <InventoryLayoutGrid {...grid} />
            <InventoryLayoutPreviewContainer3 {...previewContainer} />
            <Dropmenu
                variant="0"
                name="filter.rarity"
                onPointerTap={onFilterRarity}
                layout={{ position: 'absolute', left: 274, width: 119, top: 2, height: 21 }}
            />
        </Region>
    );
};

/** Named region `grid` of InventoryLayout - configured through the parent's `grid` prop. */
export interface InventoryLayoutGrid2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutGrid2 = ({ layout, tags }: InventoryLayoutGrid2Props) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 194, top: 0, bottom: 5, ...layout }}
        >
            <Region
                name="grid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `preview_container` of InventoryLayout - configured through the parent's `previewContainer` prop. */
export interface InventoryLayoutPreviewContainer4Props {
    captionBotDescription?: string;
    captionBotName?: string;
    layout?: BoxLayout;
    onPlaceButton?: () => void;
    srcPreviewImage?: string;
    tags?: string[];
}

export const InventoryLayoutPreviewContainer4 = ({ captionBotDescription, captionBotName, layout, onPlaceButton, srcPreviewImage, tags }: InventoryLayoutPreviewContainer4Props) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            tags={tags}
            layout={{ position: 'absolute', right: -2, width: 190, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="bot_name"
                layout={{ position: 'absolute', left: 0, width: 67, alignSelf: 'center', marginTop: -121, marginBottom: 121, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBotName ?? 'bot name'}
                    textStyle="text-style-u-headline-small"
                />
            </Region>
            <ThemeImage
                name="preview_image"
                src={srcPreviewImage}
                layout={{ position: 'absolute', left: 43, width: 100, top: 24, height: 150 }}
            />
            <Region
                name="bot_description"
                layout={{ position: 'absolute', left: 0, width: 190, top: 174, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBotDescription ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                />
            </Region>
            <Button
                variant="3"
                name="place_button"
                onPointerTap={onPlaceButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 10, width: 158, bottom: 8, height: 28, minWidth: 158, maxWidth: 158 }}
            >
                {t('inventory.bot.placetoroom')}
            </Button>
        </Region>
    );
};

/** Named region `bots` of InventoryLayout - configured through the parent's `bots` prop. */
export interface InventoryLayoutBotsProps {
    grid?: InventoryLayoutGrid2Props;
    layout?: BoxLayout;
    previewContainer?: InventoryLayoutPreviewContainer4Props;
    tags?: string[];
    visibleBots?: boolean;
}

export const InventoryLayoutBots = ({ grid, layout, previewContainer, tags, visibleBots }: InventoryLayoutBotsProps) => {
    return (
        <Region
            name="bots"
            tags={tags}
            visible={visibleBots ?? false}
            layout={{ position: 'absolute', left: 0, width: 468, top: 0, bottom: 0, ...layout }}
        >
            <InventoryLayoutGrid2 {...grid} />
            <InventoryLayoutPreviewContainer4 {...previewContainer} />
        </Region>
    );
};

/** Named region `clear_filter_button` of InventoryLayout - configured through the parent's `clearFilterButton` prop. */
export interface InventoryLayoutClearFilterButton4Props {
    layout?: BoxLayout;
    onClearFilterButton?: () => void;
    tags?: string[];
}

export const InventoryLayoutClearFilterButton4 = ({ layout, onClearFilterButton, tags }: InventoryLayoutClearFilterButton4Props) => {
    return (
        <Region
            name="clear_filter_button"
            tags={tags}
            onPointerTap={onClearFilterButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 120, width: 20, top: 0, height: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_close.png')}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `inactive_items` of InventoryLayout - configured through the parent's `inactiveItems` prop. */
export interface InventoryLayoutInactiveItemsProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutInactiveItems = ({ layout, tags }: InventoryLayoutInactiveItemsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 140, top: 27, bottom: 91, ...layout }}
        >
            <Region
                name="inactive_items"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `item_grid_pages` of InventoryLayout - configured through the parent's `itemGridPages` prop. */
export interface InventoryLayoutItemGridPages3Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutItemGridPages3 = ({ layout, tags }: InventoryLayoutItemGridPages3Props) => {
    return (
        <Region
            name="item_grid_pages"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 328, bottom: 81, height: 10, flexDirection: 'row', gap: 2, ...layout }}
        >
            <Region layout={{ width: 8, height: 14, flexShrink: 0 }}>
                <Region
                    tags={[ 'PAGE' ]}
                    layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="0"
                        textStyle="text-style-il-small"
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `active_items` of InventoryLayout - configured through the parent's `activeItems` prop. */
export interface InventoryLayoutActiveItemsProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutActiveItems = ({ layout, tags }: InventoryLayoutActiveItemsProps) => {
    return (
        <Region
            name="active_items"
            tags={tags}
            layout={{ position: 'absolute', right: -2, width: 135, top: 58, bottom: 83, flexDirection: 'row', flexWrap: 'wrap', gap: 2, ...layout }}
        />
    );
};

/** Row template `badgeName` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutBadgeNameItemProps {
    captionBadgeName?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutBadgeNameItem = ({ captionBadgeName, layout, tags }: InventoryLayoutBadgeNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="badgeName"
            tags={tags}
            layout={{ width: 211, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionBadgeName ?? t('inventory.badges.defaultdescription')}
                textStyle="text-style-u-headline-small"
            />
        </Region>
    );
};

/** Row template `badgeDescription` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutBadgeDescriptionItemProps {
    captionBadgeDescription?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutBadgeDescriptionItem = ({ captionBadgeDescription, layout, tags }: InventoryLayoutBadgeDescriptionItemProps) => {
    return (
        <Region
            name="badgeDescription"
            tags={tags}
            visible={false}
            layout={{ width: 271, height: 4, flexShrink: 0, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionBadgeDescription ?? ''}
                textOptions={{ wordWrap: true, wordWrapWidth: 271 }}
            />
        </Region>
    );
};

/** Named region `badgeDetailsList` of InventoryLayout - configured through the parent's `badgeDetailsList` prop. */
export interface InventoryLayoutBadgeDetailsListProps {
    captionBadgeOwnerCount?: string;
    captionBadgeRarity?: string;
    captionBadgeRarityBorder?: string;
    itemsBadgeDetailsList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
    visibleBadgeRarityTag?: boolean;
}

export const InventoryLayoutBadgeDetailsList = ({ captionBadgeOwnerCount, captionBadgeRarity, captionBadgeRarityBorder, itemsBadgeDetailsList, layout, tags, visibleBadgeRarityTag }: InventoryLayoutBadgeDetailsListProps) => {
    return (
        <Region
            name="badgeDetailsList"
            tags={tags}
            layout={{ position: 'absolute', left: 63, width: 271, top: 3, height: 39, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsBadgeDetailsList ?? (
                <>
                    <InventoryLayoutBadgeNameItem />
                    <InventoryLayoutBadgeDescriptionItem />
                </>
            )}
            <Region layout={{ width: -5, height: 20, flexShrink: 0, flexDirection: 'row', gap: 5 }}>
                <Region
                    visible={visibleBadgeRarityTag ?? false}
                    layout={{ width: 92, height: 17, flexShrink: 0 }}
                >
                    <Border
                        variant="2"
                        name="badgeRarityTag"
                        tintColor="#cccccc"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            name="badgeRarityBorder"
                            tags={[ 'BLEND_SUBTRACT' ]}
                            layout={{ position: 'absolute', left: 5, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionBadgeRarityBorder ?? 'Unique badge'}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            name="badgeRarity"
                            tags={[ 'BLEND_INVERT' ]}
                            layout={{ position: 'absolute', left: 5, width: 81, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionBadgeRarity ?? 'Unique badge'}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="badgeOwnerCount"
                    visible={false}
                    layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBadgeOwnerCount ?? ''}
                        textOptions={{ fill: '#555555' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `descriptionArea` of InventoryLayout - configured through the parent's `descriptionArea` prop. */
export interface InventoryLayoutDescriptionAreaProps {
    badgeDetailsList?: InventoryLayoutBadgeDetailsListProps;
    layout?: BoxLayout;
    onWearBadgeButton?: () => void;
    tags?: string[];
}

export const InventoryLayoutDescriptionArea = ({ badgeDetailsList, layout, onWearBadgeButton, tags }: InventoryLayoutDescriptionAreaProps) => {
    const t = useTranslation();

    return (
        <Region
            name="descriptionArea"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 78, ...layout }}
        >
            <Border
                variant="3"
                name="badge_desc_bg_box"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_image"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 9, width: 50, top: 14, height: 50 }}
            />
            <InventoryLayoutBadgeDetailsList {...badgeDetailsList} />
            <Button
                variant="3"
                name="wearBadge_button"
                onPointerTap={onWearBadgeButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 7, width: 179, top: 40, height: 28 }}
            >
                {t('inventory.badges.wearbadge')}
            </Button>
        </Region>
    );
};

/** Named region `achievements_score_container` of InventoryLayout - configured through the parent's `achievementsScoreContainer` prop. */
export interface InventoryLayoutAchievementsScoreContainerProps {
    captionScoreDescriptionText?: string;
    layout?: BoxLayout;
    tags?: string[];
    visibleAchievementsScoreContainer?: boolean;
}

export const InventoryLayoutAchievementsScoreContainer = ({ captionScoreDescriptionText, layout, tags, visibleAchievementsScoreContainer }: InventoryLayoutAchievementsScoreContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="achievements_score_container"
            tags={tags}
            visible={visibleAchievementsScoreContainer ?? false}
            layout={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 24, ...layout }}
        >
            <Border
                variant="3"
                name="score_description_border"
                tintColor="#428bb2"
                layout={{ position: 'absolute', left: 0, right: 0, top: 4, height: 17, minWidth: 368 }}
            >
                <Region
                    name="score_description_text"
                    layout={{ position: 'absolute', right: 0, width: 468, alignSelf: 'center', height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionScoreDescriptionText ?? t('achievements_score_description')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `badges` of InventoryLayout - configured through the parent's `badges` prop. */
export interface InventoryLayoutBadgesProps {
    achievementsScoreContainer?: InventoryLayoutAchievementsScoreContainerProps;
    activeItems?: InventoryLayoutActiveItemsProps;
    captionMyBadgesTitle?: string;
    captionWearingTitle?: string;
    clearFilterButton?: InventoryLayoutClearFilterButton4Props;
    descriptionArea?: InventoryLayoutDescriptionAreaProps;
    inactiveItems?: InventoryLayoutInactiveItemsProps;
    itemGridPages?: InventoryLayoutItemGridPages3Props;
    layout?: BoxLayout;
    onFilterOptions?: () => void;
    onFilterRarity?: () => void;
    tags?: string[];
}

export const InventoryLayoutBadges = ({ achievementsScoreContainer, activeItems, captionMyBadgesTitle, captionWearingTitle, clearFilterButton, descriptionArea, inactiveItems, itemGridPages, layout, onFilterOptions, onFilterRarity, tags }: InventoryLayoutBadgesProps) => {
    const t = useTranslation();
    const [ filterValue, setFilterValue ] = useState('');

    return (
        <Region
            name="badges"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 468, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="3"
                name="options_container"
                tintColor="#cacaca"
                layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 25 }}
            >
                <Border
                    variant="0"
                    layout={{ position: 'absolute', left: 4, width: 139, top: 3, height: 20 }}
                >
                    <TextInput
                        value={filterValue}
                        onChange={setFilterValue}
                        layout={{ position: 'absolute', left: 3, width: 122, top: 2, height: 15, minWidth: 60 }}
                    />
                    <InventoryLayoutClearFilterButton4 {...clearFilterButton} />
                </Border>
                <Dropmenu
                    variant="0"
                    name="filter.options"
                    onPointerTap={onFilterOptions}
                    layout={{ position: 'absolute', left: 150, width: 119, top: 2, height: 21 }}
                />
            </Border>
            <Dropmenu
                variant="0"
                name="filter.rarity"
                onPointerTap={onFilterRarity}
                layout={{ position: 'absolute', left: 274, width: 119, top: 2, height: 21 }}
            />
            <InventoryLayoutInactiveItems
                tags={[ 'BADGE_ITEM_GRID' ]}
                {...inactiveItems}
            />
            <InventoryLayoutItemGridPages3 {...itemGridPages} />
            <InventoryLayoutActiveItems
                tags={[ 'ACTIVE_BADGE_ITEM_GRID' ]}
                {...activeItems}
            />
            <Region
                name="myBadgesTitle"
                visible={false}
                layout={{ position: 'absolute', left: 20, width: 285, top: -3, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionMyBadgesTitle ?? t('inventory.badges.inactivebadges')}
                    textStyle="text-style-u-headline-small"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <Region
                name="wearingTitle"
                layout={{ position: 'absolute', right: 4, width: 134, top: 32, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionWearingTitle ?? t('inventory.badges.activebadges')}
                    textStyle="text-style-u-headline-small"
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <InventoryLayoutDescriptionArea {...descriptionArea} />
            <InventoryLayoutAchievementsScoreContainer {...achievementsScoreContainer} />
        </Region>
    );
};

/** Named region `contentArea` of InventoryLayout - configured through the parent's `contentArea` prop. */
export interface InventoryLayoutContentAreaProps {
    badges?: InventoryLayoutBadgesProps;
    bots?: InventoryLayoutBotsProps;
    collectibles?: InventoryLayoutCollectiblesProps;
    furni?: InventoryLayoutFurniProps;
    layout?: BoxLayout;
    pets?: InventoryLayoutPetsProps;
    tags?: string[];
}

export const InventoryLayoutContentArea = ({ badges, bots, collectibles, furni, layout, pets, tags }: InventoryLayoutContentAreaProps) => {
    return (
        <Region
            name="contentArea"
            tags={tags}
            layout={{ position: 'absolute', left: 5, width: 468, top: 35, bottom: 5, ...layout }}
        >
            <InventoryLayoutFurni {...furni} />
            <InventoryLayoutCollectibles {...collectibles} />
            <InventoryLayoutPets {...pets} />
            <InventoryLayoutBots {...bots} />
            <InventoryLayoutBadges {...badges} />
        </Region>
    );
};

/** Named region `top_content` of InventoryLayout - configured through the parent's `topContent` prop. */
export interface InventoryLayoutTopContentProps {
    contentArea?: InventoryLayoutContentAreaProps;
    emptyContainer?: InventoryLayoutEmptyContainerProps;
    layout?: BoxLayout;
    loadingContainer?: InventoryLayoutLoadingContainerProps;
    onBadges?: () => void;
    onBots?: () => void;
    onCollectibles?: () => void;
    onFurni?: () => void;
    onPets?: () => void;
    onRentables?: () => void;
    tags?: string[];
}

export const InventoryLayoutTopContent = ({ contentArea, emptyContainer, layout, loadingContainer, onBadges, onBots, onCollectibles, onFurni, onPets, onRentables, tags }: InventoryLayoutTopContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_content"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 478, top: 0, bottom: 41, ...layout }}
        >
            <TabContext
                variant="3"
                name="tabs"
                layout={{ position: 'absolute', left: 0, width: 478, top: 0, bottom: 0 }}
            >
                <TabButton
                    variant="3"
                    name="furni"
                    onPointerTap={onFurni}
                    layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 34 }}
                >
                    {t('inventory.furni')}
                    <Region layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText text={t('inventory.furni')} />
                    </Region>
                </TabButton>
                <TabButton
                    variant="3"
                    name="collectibles"
                    onPointerTap={onCollectibles}
                    layout={{ position: 'absolute', left: 107, width: 87, top: 0, height: 34 }}
                >
                    {t('inventory.collectibles')}
                    <Region layout={{ position: 'absolute', left: 0, width: 87, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText text={t('inventory.collectibles')} />
                    </Region>
                </TabButton>
                <TabButton
                    variant="3"
                    name="rentables"
                    onPointerTap={onRentables}
                    layout={{ position: 'absolute', left: 194, width: 131, top: 0, height: 34 }}
                >
                    {t('inventory.rentables')}
                    <Region layout={{ position: 'absolute', left: 0, width: 131, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText text={t('inventory.rentables')} />
                    </Region>
                </TabButton>
                <TabButton
                    variant="3"
                    name="pets"
                    onPointerTap={onPets}
                    layout={{ position: 'absolute', left: 325, width: 155, top: 0, height: 34 }}
                >
                    {t('inventory.furni.tab.pets')}
                    <Region layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText text={t('inventory.furni.tab.pets')} />
                    </Region>
                </TabButton>
                <TabButton
                    variant="3"
                    name="badges"
                    onPointerTap={onBadges}
                    layout={{ position: 'absolute', left: 480, width: 64, top: 0, height: 34 }}
                >
                    {t('inventory.badges')}
                    <Region layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText text={t('inventory.badges')} />
                    </Region>
                </TabButton>
                <TabButton
                    variant="3"
                    name="bots"
                    onPointerTap={onBots}
                    layout={{ position: 'absolute', left: 544, width: 105, top: 0, height: 34 }}
                >
                    {t('inventory.bots')}
                    <Region layout={{ position: 'absolute', left: 0, width: 105, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText text={t('inventory.bots')} />
                    </Region>
                </TabButton>
            </TabContext>
            <InventoryLayoutEmptyContainer {...emptyContainer} />
            <InventoryLayoutLoadingContainer {...loadingContainer} />
            <InventoryLayoutContentArea {...contentArea} />
        </Region>
    );
};

/** Named region `subContentArea` of InventoryLayout - configured through the parent's `subContentArea` prop. */
export interface InventoryLayoutSubContentAreaProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const InventoryLayoutSubContentArea = ({ layout, tags }: InventoryLayoutSubContentAreaProps) => {
    return (
        <Region
            name="subContentArea"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 478, top: 301, height: 1, ...layout }}
        />
    );
};
