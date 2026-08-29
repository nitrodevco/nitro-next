import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Frame, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1278_inventory_xml` (layout "inventory", 490x342) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    topContent?: InventoryLayoutTopContentProps;
}

export const InventoryLayout = ({ layout, onClose, topContent }: InventoryLayoutProps) => {
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
            <InventoryLayoutTopContent {...topContent} />
            <Region
                name="subContentArea"
                layout={{ position: 'absolute', left: 0, width: 478, top: 301, height: 1 }}
            />
        </Frame>
    );
};

/** Row template `furni_name` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutFurniNameItemProps {
    captionFurniName?: string;
    layout?: BoxLayout;
}

export const InventoryLayoutFurniNameItem = ({ captionFurniName, layout }: InventoryLayoutFurniNameItemProps) => {
    return (
        <Region
            name="furni_name"
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
}

export const InventoryLayoutFurniDescriptionItem = ({ captionFurniDescription, layout }: InventoryLayoutFurniDescriptionItemProps) => {
    return (
        <Region
            name="furni_description"
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
}

export const InventoryLayoutFurniExtraItem = ({ captionFurniExtra, layout }: InventoryLayoutFurniExtraItemProps) => {
    return (
        <Region
            name="furni_extra"
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
}

export const InventoryLayoutSpacerItem = ({ layout }: InventoryLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 30, height: 12, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `placeinroom_btn` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutPlaceinroomBtnItemProps {
    layout?: BoxLayout;
    onPlaceinroomBtn?: () => void;
}

export const InventoryLayoutPlaceinroomBtnItem = ({ layout, onPlaceinroomBtn }: InventoryLayoutPlaceinroomBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="placeinroom_btn"
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
}

export const InventoryLayoutGotoRoomBtnItem = ({ layout, onGotoRoomBtn }: InventoryLayoutGotoRoomBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="goto_room_btn"
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
}

export const InventoryLayoutOffertotradeBtnItem = ({ layout, onOffertotradeBtn }: InventoryLayoutOffertotradeBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="offertotrade_btn"
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
}

export const InventoryLayoutSellBtnItem = ({ layout, onSellBtn }: InventoryLayoutSellBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="sell_btn"
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
}

export const InventoryLayoutUseBtnItem = ({ layout, onUseBtn }: InventoryLayoutUseBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="use_btn"
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
}

export const InventoryLayoutExtendrentBtnItem = ({ layout, onExtendrentBtn }: InventoryLayoutExtendrentBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="extendrent_btn"
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
}

export const InventoryLayoutBuyrenteditemBtnItem = ({ layout, onBuyrenteditemBtn }: InventoryLayoutBuyrenteditemBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="buyrenteditem_btn"
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
}

export const InventoryLayoutPreviewElementList = ({ itemsPreviewElementList, layout }: InventoryLayoutPreviewElementListProps) => {
    return (
        <Region
            name="preview_element_list"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 2, height: 266, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPreviewElementList ?? (
                <>
                    <InventoryLayoutFurniNameItem />
                    <InventoryLayoutFurniDescriptionItem />
                    <InventoryLayoutFurniExtraItem />
                    <InventoryLayoutSpacerItem />
                    <InventoryLayoutPlaceinroomBtnItem />
                    <InventoryLayoutGotoRoomBtnItem />
                    <InventoryLayoutOffertotradeCntItem />
                    <InventoryLayoutOffertotradeBtnItem />
                    <InventoryLayoutSellBtnItem />
                    <InventoryLayoutUseBtnItem />
                    <InventoryLayoutExtendrentBtnItem />
                    <InventoryLayoutBuyrenteditemBtnItem />
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
}

export const InventoryLayoutTradeableInfoRegionItem = ({ captionTradeableNumber, layout, onTradeableInfoRegion, srcTradeableIcon }: InventoryLayoutTradeableInfoRegionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tradeable_info_region"
            tooltip={t('inventory.furni.preview.tradeable_amount')}
            onPointerTap={onTradeableInfoRegion}
            cursor="pointer"
            layout={{ width: 52, height: 16, flexShrink: 0, ...layout }}
        >
            <Region
                name="tradeable_number"
                layout={{ position: 'absolute', left: 33, width: 4, top: 1, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTradeableNumber ?? ''}
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
}

export const InventoryLayoutRecyclableInfoRegionItem = ({ captionRecyclableNumber, layout, onRecyclableInfoRegion, srcRecyclableIcon }: InventoryLayoutRecyclableInfoRegionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="recyclable_info_region"
            tooltip={t('inventory.furni.preview.recyclable_amount')}
            onPointerTap={onRecyclableInfoRegion}
            cursor="pointer"
            layout={{ width: 52, height: 16, flexShrink: 0, ...layout }}
        >
            <Region
                name="recyclable_number"
                layout={{ position: 'absolute', left: 18, width: 4, top: 1, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionRecyclableNumber ?? ''}
            </Region>
            <ThemeImage
                name="recyclable_icon"
                src={srcRecyclableIcon ?? layoutImage('inventory_furni_no_recycle_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `preview_container` of InventoryLayout - configured through the parent's `previewContainer` prop. */
export interface InventoryLayoutPreviewContainerProps {
    itemsIconsElementList?: ReactNode;
    layout?: BoxLayout;
    onFurniPreviewRegion?: () => void;
    onNextItemButton?: () => void;
    onViewItemButton?: () => void;
    previewElementList?: InventoryLayoutPreviewElementListProps;
}

export const InventoryLayoutPreviewContainer = ({ itemsIconsElementList, layout, onFurniPreviewRegion, onNextItemButton, onViewItemButton, previewElementList }: InventoryLayoutPreviewContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            layout={{ position: 'absolute', left: 290, width: 180, top: 27, bottom: -3, ...layout }}
        >
            <Region
                name="furni_preview_region"
                onPointerTap={onFurniPreviewRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 5, right: 5, top: 0, bottom: 107, minHeight: 50 }}
            />
            <WidgetSlot
                widgetType="room_previewer"
                name="furni_preview_widget"
                layout={{ position: 'absolute', left: 5, right: 5, top: 0, bottom: 107, minHeight: 50 }}
            />
            <InventoryLayoutPreviewElementList {...previewElementList} />
            <Region
                name="icons_element_list"
                layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 34, flexDirection: 'column' }}
            >
                {itemsIconsElementList ?? (
                    <>
                        <InventoryLayoutTradeableInfoRegionItem />
                        <InventoryLayoutRecyclableInfoRegionItem />
                    </>
                )}
            </Region>
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
    captionItemsShown?: string;
    layout?: BoxLayout;
    onClearFilterButton?: () => void;
    onFilterOptions?: () => void;
    onPlacementOptions?: () => void;
    previewContainer?: InventoryLayoutPreviewContainerProps;
    visibleClearFilterButton?: boolean;
    visibleFurni?: boolean;
}

export const InventoryLayoutFurni = ({ captionItemsShown, layout, onClearFilterButton, onFilterOptions, onPlacementOptions, previewContainer, visibleClearFilterButton, visibleFurni }: InventoryLayoutFurniProps) => {
    const [ filterValue, setFilterValue ] = useState('');

    return (
        (visibleFurni ?? false) && (
            <Region
                name="furni"
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
                        {(visibleClearFilterButton ?? false) && (
                            <Region
                                name="clear_filter_button"
                                onPointerTap={onClearFilterButton}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 120, width: 20, top: 0, height: 20 }}
                            >
                                <ThemeImage
                                    src={layoutImage('icons_close.png')}
                                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                />
                            </Region>
                        )}
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
                <Region
                    name="grid_container"
                    layout={{ position: 'absolute', left: 0, width: 284, top: 27, bottom: 3 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 284, top: 0, bottom: 10 }}
                    >
                        <Region
                            name="item_grid"
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                        />
                    </ScrollArea>
                    <Region
                        name="item_grid_pages"
                        layout={{ position: 'absolute', left: 0, width: 280, bottom: 1, height: 10, flexDirection: 'row', gap: 2 }}
                    >
                        <Region layout={{ width: 8, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text="0"
                                textStyle="text-style-il-small"
                            />
                        </Region>
                    </Region>
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
                <InventoryLayoutPreviewContainer {...previewContainer} />
            </Region>
        )
    );
};

/** Row template `nft_name` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutNftNameItemProps {
    captionNftName?: string;
    layout?: BoxLayout;
}

export const InventoryLayoutNftNameItem = ({ captionNftName, layout }: InventoryLayoutNftNameItemProps) => {
    return (
        <Region
            name="nft_name"
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
}

export const InventoryLayoutNftTypeItem = ({ captionNftType, layout }: InventoryLayoutNftTypeItemProps) => {
    return (
        <Region
            name="nft_type"
            layout={{ width: 190, height: 17, flexShrink: 0, minWidth: 190, maxWidth: 190, maxHeight: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionNftType ?? 'Type: furni fdgfgdf'}
                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            />
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
}

export const InventoryLayoutOffertotradeBtnItem2 = ({ layout, onOffertotradeBtn }: InventoryLayoutOffertotradeBtnItem2Props) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="offertotrade_btn"
            onPointerTap={onOffertotradeBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 148, height: 22, flexShrink: 0, minWidth: 60, ...layout }}
        >
            {t('inventory.trading.offer')}
        </Button>
    );
};

/** Row template `tradeable_info_region` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutTradeableInfoRegionItem2Props {
    captionTradeableNumber?: string;
    layout?: BoxLayout;
    onTradeableInfoRegion?: () => void;
    srcTradeableIcon?: string;
    visibleTradeableInfoRegion?: boolean;
}

export const InventoryLayoutTradeableInfoRegionItem2 = ({ captionTradeableNumber, layout, onTradeableInfoRegion, srcTradeableIcon, visibleTradeableInfoRegion }: InventoryLayoutTradeableInfoRegionItem2Props) => {
    const t = useTranslation();

    return (
        (visibleTradeableInfoRegion ?? false) && (
            <Region
                name="tradeable_info_region"
                tooltip={t('inventory.furni.preview.tradeable_amount')}
                onPointerTap={onTradeableInfoRegion}
                cursor="pointer"
                layout={{ width: 52, height: 16, flexShrink: 0, ...layout }}
            >
                <Region
                    name="tradeable_number"
                    layout={{ position: 'absolute', left: 33, width: 4, top: 1, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionTradeableNumber ?? ''}
                </Region>
                <ThemeImage
                    name="tradeable_icon"
                    src={srcTradeableIcon ?? layoutImage('inventory_furni_no_trade_icon.png')}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 16 }}
                />
            </Region>
        )
    );
};

/** Named region `preview_container` of InventoryLayout - configured through the parent's `previewContainer` prop. */
export interface InventoryLayoutPreviewContainer2Props {
    itemsIconsElementList?: ReactNode;
    itemsNftInfo?: ReactNode;
    itemsOfferOptions?: ReactNode;
    layout?: BoxLayout;
    onNextItemButton?: () => void;
    onViewItemButton?: () => void;
    visibleNextItemButton?: boolean;
    visibleRarityItemOverlayWidget?: boolean;
    visibleUniqueLimitedItemOverlayWidget?: boolean;
    visibleViewItemButton?: boolean;
}

export const InventoryLayoutPreviewContainer2 = ({ itemsIconsElementList, itemsNftInfo, itemsOfferOptions, layout, onNextItemButton, onViewItemButton, visibleNextItemButton, visibleRarityItemOverlayWidget, visibleUniqueLimitedItemOverlayWidget, visibleViewItemButton }: InventoryLayoutPreviewContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            layout={{ position: 'absolute', left: 290, width: 180, top: 27, bottom: -3, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#d8d8d8"
                layout={{ position: 'absolute', left: 0, width: 175, top: 5, height: 188 }}
            >
                <Region
                    name="nft_info"
                    layout={{ position: 'absolute', left: 5, right: 0, top: 5, height: 35, flexDirection: 'column', gap: 1 }}
                >
                    {itemsNftInfo ?? (
                        <>
                            <InventoryLayoutNftNameItem />
                            <InventoryLayoutNftTypeItem />
                        </>
                    )}
                </Region>
                <WidgetSlot
                    widgetType="product_image"
                    name="nft_image"
                    layout={{ position: 'absolute', left: 2, width: 170, top: 45, height: 110 }}
                />
                <Region
                    name="offer_options"
                    layout={{ position: 'absolute', left: -18, right: 5, top: 160, flexDirection: 'row', gap: 10 }}
                >
                    {itemsOfferOptions ?? (
                        <>
                            <InventoryLayoutOffertotradeCntItem2 />
                            <InventoryLayoutOffertotradeBtnItem2 />
                        </>
                    )}
                </Region>
            </Border>
            <Region
                name="icons_element_list"
                layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 34, flexDirection: 'column' }}
            >
                {itemsIconsElementList ?? (
                    <InventoryLayoutTradeableInfoRegionItem2 />
                )}
            </Region>
            {(visibleRarityItemOverlayWidget ?? false) && (
                <WidgetSlot
                    widgetType="rarity_item_overlay_preview"
                    name="rarity_item_overlay_widget"
                    layout={{ position: 'absolute', right: 23, width: 36, top: 5, height: 30 }}
                />
            )}
            {(visibleUniqueLimitedItemOverlayWidget ?? false) && (
                <WidgetSlot
                    widgetType="limited_item_overlay_preview"
                    name="unique_limited_item_overlay_widget"
                    layout={{ position: 'absolute', right: 21, width: 40, top: 4, height: 40 }}
                />
            )}
            {(visibleNextItemButton ?? false) && (
                <Button
                    variant="3"
                    name="nextItemButton"
                    onPointerTap={onNextItemButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', right: 16, width: 131, top: 5, height: 23 }}
                >
                    {t('inventory.furni.next')}
                </Button>
            )}
            {(visibleViewItemButton ?? false) && (
                <Button
                    variant="3"
                    name="viewItemButton"
                    onPointerTap={onViewItemButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', right: 16, width: 131, top: 31, height: 23 }}
                >
                    {t('inventory.furni.view')}
                </Button>
            )}
        </Region>
    );
};

/** Named region `collectibles` of InventoryLayout - configured through the parent's `collectibles` prop. */
export interface InventoryLayoutCollectiblesProps {
    captionItemsShown?: string;
    layout?: BoxLayout;
    onClearFilterButton?: () => void;
    onFilterOptions?: () => void;
    previewContainer?: InventoryLayoutPreviewContainer2Props;
    visibleClearFilterButton?: boolean;
    visibleCollectibles?: boolean;
    visibleItemsShown?: boolean;
}

export const InventoryLayoutCollectibles = ({ captionItemsShown, layout, onClearFilterButton, onFilterOptions, previewContainer, visibleClearFilterButton, visibleCollectibles, visibleItemsShown }: InventoryLayoutCollectiblesProps) => {
    const [ filterValue, setFilterValue ] = useState('');

    return (
        (visibleCollectibles ?? false) && (
            <Region
                name="collectibles"
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
                        {(visibleClearFilterButton ?? false) && (
                            <Region
                                name="clear_filter_button"
                                onPointerTap={onClearFilterButton}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 120, width: 20, top: 0, height: 20 }}
                            >
                                <ThemeImage
                                    src={layoutImage('icons_close.png')}
                                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                />
                            </Region>
                        )}
                    </Border>
                    <Dropmenu
                        variant="0"
                        name="filter.options"
                        onPointerTap={onFilterOptions}
                        layout={{ position: 'absolute', left: 150, width: 119, top: 2, height: 21 }}
                    />
                </Border>
                <Region
                    name="grid_container"
                    layout={{ position: 'absolute', left: 0, width: 284, top: 27, bottom: 3 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 284, top: 0, bottom: 10 }}
                    >
                        <Region
                            name="item_grid"
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                        />
                    </ScrollArea>
                    <Region
                        name="item_grid_pages"
                        layout={{ position: 'absolute', left: 0, width: 280, bottom: 1, height: 10, flexDirection: 'row', gap: 2 }}
                    >
                        <Region layout={{ width: 8, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text="0"
                                textStyle="text-style-il-small"
                            />
                        </Region>
                    </Region>
                    {(visibleItemsShown ?? false) && (
                        <Region
                            name="items.shown"
                            layout={{ position: 'absolute', right: 1, width: 98, bottom: -3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionItemsShown ?? 'Items shown: x/y'}
                                textOptions={{ fill: '#777777' }}
                            />
                        </Region>
                    )}
                </Region>
                <InventoryLayoutPreviewContainer2 {...previewContainer} />
            </Region>
        )
    );
};

/** Named region `pets` of InventoryLayout - configured through the parent's `pets` prop. */
export interface InventoryLayoutPetsProps {
    captionPreviewDescription?: string;
    captionPreviewInfo?: string;
    captionPreviewText?: string;
    layout?: BoxLayout;
    onClearFilterButton?: () => void;
    onFilterOptions?: () => void;
    onFilterRarity?: () => void;
    onPlaceButton?: () => void;
    srcPreviewImage?: string;
    visibleClearFilterButton?: boolean;
    visiblePets?: boolean;
    visiblePreviewInfo?: boolean;
}

export const InventoryLayoutPets = ({ captionPreviewDescription, captionPreviewInfo, captionPreviewText, layout, onClearFilterButton, onFilterOptions, onFilterRarity, onPlaceButton, srcPreviewImage, visibleClearFilterButton, visiblePets, visiblePreviewInfo }: InventoryLayoutPetsProps) => {
    const t = useTranslation();
    const [ filterValue, setFilterValue ] = useState('');

    return (
        (visiblePets ?? false) && (
            <Region
                name="pets"
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
                        {(visibleClearFilterButton ?? false) && (
                            <Region
                                name="clear_filter_button"
                                onPointerTap={onClearFilterButton}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 120, width: 20, top: 0, height: 20 }}
                            >
                                <ThemeImage
                                    src={layoutImage('icons_close.png')}
                                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                />
                            </Region>
                        )}
                    </Border>
                    <Dropmenu
                        variant="0"
                        name="filter.options"
                        onPointerTap={onFilterOptions}
                        layout={{ position: 'absolute', left: 150, width: 119, top: 2, height: 21 }}
                    />
                </Border>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, width: 274, top: 27, bottom: 3 }}
                >
                    <Region
                        name="grid"
                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                    />
                </ScrollArea>
                <Region
                    name="preview_container"
                    layout={{ position: 'absolute', right: -2, width: 190, top: 0, bottom: 0, justifyContent: 'center' }}
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
                    {(visiblePreviewInfo ?? false) && (
                        <Region
                            name="preview_info"
                            layout={{ position: 'absolute', marginLeft: -13, marginRight: 13, width: 154, top: 200, bottom: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionPreviewInfo ?? '...'}
                                textOptions={{ wordWrap: true, wordWrapWidth: 154 }}
                            />
                        </Region>
                    )}
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
                <Dropmenu
                    variant="0"
                    name="filter.rarity"
                    onPointerTap={onFilterRarity}
                    layout={{ position: 'absolute', left: 274, width: 119, top: 2, height: 21 }}
                />
            </Region>
        )
    );
};

/** Row template `badgeName` of InventoryLayout - pass real rows through its `items…` slot. */
export interface InventoryLayoutBadgeNameItemProps {
    captionBadgeName?: string;
    layout?: BoxLayout;
}

export const InventoryLayoutBadgeNameItem = ({ captionBadgeName, layout }: InventoryLayoutBadgeNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="badgeName"
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
    visibleBadgeDescription?: boolean;
}

export const InventoryLayoutBadgeDescriptionItem = ({ captionBadgeDescription, layout, visibleBadgeDescription }: InventoryLayoutBadgeDescriptionItemProps) => {
    return (
        (visibleBadgeDescription ?? false) && (
            <Region
                name="badgeDescription"
                layout={{ width: 271, height: 4, flexShrink: 0, maxHeight: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionBadgeDescription ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 271 }}
                />
            </Region>
        )
    );
};

/** Named region `badgeDetailsList` of InventoryLayout - configured through the parent's `badgeDetailsList` prop. */
export interface InventoryLayoutBadgeDetailsListProps {
    captionBadgeOwnerCount?: string;
    captionBadgeRarity?: string;
    captionBadgeRarityBorder?: string;
    itemsBadgeDetailsList?: ReactNode;
    layout?: BoxLayout;
    visibleBadgeOwnerCount?: boolean;
    visibleBadgeRarityTag?: boolean;
}

export const InventoryLayoutBadgeDetailsList = ({ captionBadgeOwnerCount, captionBadgeRarity, captionBadgeRarityBorder, itemsBadgeDetailsList, layout, visibleBadgeOwnerCount, visibleBadgeRarityTag }: InventoryLayoutBadgeDetailsListProps) => {
    return (
        <Region
            name="badgeDetailsList"
            layout={{ position: 'absolute', left: 63, width: 271, top: 3, height: 39, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsBadgeDetailsList ?? (
                <>
                    <InventoryLayoutBadgeNameItem />
                    <InventoryLayoutBadgeDescriptionItem />
                </>
            )}
            <Region layout={{ width: -5, height: 20, flexShrink: 0, flexDirection: 'row', gap: 5 }}>
                {(visibleBadgeRarityTag ?? false) && (
                    <Border
                        variant="2"
                        name="badgeRarityTag"
                        tintColor="#cccccc"
                        layout={{ width: 92, height: 17, flexShrink: 0 }}
                    >
                        <Region
                            name="badgeRarityBorder"
                            layout={{ position: 'absolute', left: 5, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionBadgeRarityBorder ?? 'Unique badge'}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            name="badgeRarity"
                            layout={{ position: 'absolute', left: 5, width: 81, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionBadgeRarity ?? 'Unique badge'}
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Border>
                )}
                {(visibleBadgeOwnerCount ?? false) && (
                    <Region
                        name="badgeOwnerCount"
                        layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBadgeOwnerCount ?? ''}
                            textOptions={{ fill: '#555555' }}
                        />
                    </Region>
                )}
            </Region>
        </Region>
    );
};

/** Named region `descriptionArea` of InventoryLayout - configured through the parent's `descriptionArea` prop. */
export interface InventoryLayoutDescriptionAreaProps {
    badgeDetailsList?: InventoryLayoutBadgeDetailsListProps;
    layout?: BoxLayout;
    onWearBadgeButton?: () => void;
}

export const InventoryLayoutDescriptionArea = ({ badgeDetailsList, layout, onWearBadgeButton }: InventoryLayoutDescriptionAreaProps) => {
    const t = useTranslation();

    return (
        <Region
            name="descriptionArea"
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

/** Named region `badges` of InventoryLayout - configured through the parent's `badges` prop. */
export interface InventoryLayoutBadgesProps {
    captionMyBadgesTitle?: string;
    captionScoreDescriptionText?: string;
    captionWearingTitle?: string;
    descriptionArea?: InventoryLayoutDescriptionAreaProps;
    layout?: BoxLayout;
    onClearFilterButton?: () => void;
    onFilterOptions?: () => void;
    onFilterRarity?: () => void;
    visibleAchievementsScoreContainer?: boolean;
    visibleMyBadgesTitle?: boolean;
}

export const InventoryLayoutBadges = ({ captionMyBadgesTitle, captionScoreDescriptionText, captionWearingTitle, descriptionArea, layout, onClearFilterButton, onFilterOptions, onFilterRarity, visibleAchievementsScoreContainer, visibleMyBadgesTitle }: InventoryLayoutBadgesProps) => {
    const t = useTranslation();
    const [ filterValue, setFilterValue ] = useState('');

    return (
        <Region
            name="badges"
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
                    <Region
                        name="clear_filter_button"
                        onPointerTap={onClearFilterButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 120, width: 20, top: 0, height: 20 }}
                    >
                        <ThemeImage
                            src={layoutImage('icons_close.png')}
                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                        />
                    </Region>
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
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, right: 140, top: 27, bottom: 91 }}
            >
                <Region
                    name="inactive_items"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                />
            </ScrollArea>
            <Region
                name="item_grid_pages"
                layout={{ position: 'absolute', left: 0, width: 328, bottom: 81, height: 10, flexDirection: 'row', gap: 2 }}
            >
                <Region layout={{ width: 8, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text="0"
                        textStyle="text-style-il-small"
                    />
                </Region>
            </Region>
            <Region
                name="active_items"
                layout={{ position: 'absolute', right: -2, width: 135, top: 58, bottom: 83, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
            />
            {(visibleMyBadgesTitle ?? false) && (
                <Region
                    name="myBadgesTitle"
                    layout={{ position: 'absolute', left: 20, width: 285, top: -3, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionMyBadgesTitle ?? t('inventory.badges.inactivebadges')}
                        textStyle="text-style-u-headline-small"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            )}
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
            {(visibleAchievementsScoreContainer ?? false) && (
                <Region
                    name="achievements_score_container"
                    layout={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 24 }}
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
            )}
        </Region>
    );
};

/** Named region `contentArea` of InventoryLayout - configured through the parent's `contentArea` prop. */
export interface InventoryLayoutContentAreaProps {
    badges?: InventoryLayoutBadgesProps;
    captionBotDescription?: string;
    captionBotName?: string;
    collectibles?: InventoryLayoutCollectiblesProps;
    furni?: InventoryLayoutFurniProps;
    layout?: BoxLayout;
    onPlaceButton?: () => void;
    pets?: InventoryLayoutPetsProps;
    srcPreviewImage?: string;
    visibleBots?: boolean;
    visibleCollectibles?: boolean;
    visibleFurni?: boolean;
    visiblePets?: boolean;
}

export const InventoryLayoutContentArea = ({ badges, captionBotDescription, captionBotName, collectibles, furni, layout, onPlaceButton, pets, srcPreviewImage, visibleBots, visibleCollectibles, visibleFurni, visiblePets }: InventoryLayoutContentAreaProps) => {
    const t = useTranslation();

    return (
        <Region
            name="contentArea"
            layout={{ position: 'absolute', left: 5, width: 468, top: 35, bottom: 5, ...layout }}
        >
            {(visibleFurni ?? false) && (
                <InventoryLayoutFurni {...furni} />
            )}
            {(visibleCollectibles ?? false) && (
                <InventoryLayoutCollectibles {...collectibles} />
            )}
            {(visiblePets ?? false) && (
                <InventoryLayoutPets {...pets} />
            )}
            {(visibleBots ?? false) && (
                <Region
                    name="bots"
                    layout={{ position: 'absolute', left: 0, width: 468, top: 0, bottom: 0 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, right: 194, top: 0, bottom: 5 }}
                    >
                        <Region
                            name="grid"
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                        />
                    </ScrollArea>
                    <Region
                        name="preview_container"
                        layout={{ position: 'absolute', right: -2, width: 190, top: 0, bottom: 0 }}
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
                </Region>
            )}
            <InventoryLayoutBadges {...badges} />
        </Region>
    );
};

/** Named region `top_content` of InventoryLayout - configured through the parent's `topContent` prop. */
export interface InventoryLayoutTopContentProps {
    captionInventoryEmptyDescription?: string;
    captionInventoryEmptyTitle?: string;
    contentArea?: InventoryLayoutContentAreaProps;
    layout?: BoxLayout;
    onBadges?: () => void;
    onBots?: () => void;
    onCollectibles?: () => void;
    onFurni?: () => void;
    onOpenCatalogBtn?: () => void;
    onPets?: () => void;
    onRentables?: () => void;
    srcDownloadImage?: string;
    srcImage?: string;
    visibleEmptyContainer?: boolean;
    visibleLoadingContainer?: boolean;
}

export const InventoryLayoutTopContent = ({ captionInventoryEmptyDescription, captionInventoryEmptyTitle, contentArea, layout, onBadges, onBots, onCollectibles, onFurni, onOpenCatalogBtn, onPets, onRentables, srcDownloadImage, srcImage, visibleEmptyContainer, visibleLoadingContainer }: InventoryLayoutTopContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_content"
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
                </TabButton>
                <TabButton
                    variant="3"
                    name="collectibles"
                    onPointerTap={onCollectibles}
                    layout={{ position: 'absolute', left: 107, width: 87, top: 0, height: 34 }}
                >
                    {t('inventory.collectibles')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="rentables"
                    onPointerTap={onRentables}
                    layout={{ position: 'absolute', left: 194, width: 131, top: 0, height: 34 }}
                >
                    {t('inventory.rentables')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="pets"
                    onPointerTap={onPets}
                    layout={{ position: 'absolute', left: 325, width: 155, top: 0, height: 34 }}
                >
                    {t('inventory.furni.tab.pets')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="badges"
                    onPointerTap={onBadges}
                    layout={{ position: 'absolute', left: 480, width: 64, top: 0, height: 34 }}
                >
                    {t('inventory.badges')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="bots"
                    onPointerTap={onBots}
                    layout={{ position: 'absolute', left: 544, width: 105, top: 0, height: 34 }}
                >
                    {t('inventory.bots')}
                </TabButton>
            </TabContext>
            {(visibleEmptyContainer ?? false) && (
                <Region
                    name="empty_container"
                    layout={{ position: 'absolute', left: 0, width: 478, top: 20, bottom: 3, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="image"
                        src={srcImage ?? layoutImage('inventory_inventory_empty.png')}
                        layout={{ position: 'absolute', left: 46, width: 180, top: 42, height: 180 }}
                    />
                    <Region layout={{ position: 'absolute', left: 287, width: 176, top: 64, height: 154, flexDirection: 'column', gap: 5 }}>
                        <Region
                            name="inventory_empty_title"
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
            )}
            {(visibleLoadingContainer ?? false) && (
                <Region
                    name="loading_container"
                    layout={{ position: 'absolute', left: 6, width: 264, top: 27, bottom: 6 }}
                >
                    <ThemeImage
                        name="download_image"
                        src={srcDownloadImage ?? layoutImage('inventory_download_icon.png')}
                        layout={{ position: 'absolute', left: 0, width: 264, top: 0, height: 268 }}
                    />
                </Region>
            )}
            <InventoryLayoutContentArea {...contentArea} />
        </Region>
    );
};
