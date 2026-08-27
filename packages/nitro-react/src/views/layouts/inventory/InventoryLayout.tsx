import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Frame, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1278_inventory_xml` (layout "inventory", 490x342) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryLayoutProps {
    captionBadgeOwnerCount?: string;
    captionBadgeRarity?: string;
    captionBadgeRarityBorder?: string;
    captionBotDescription?: string;
    captionBotName?: string;
    captionInventoryEmptyDescription?: string;
    captionInventoryEmptyTitle?: string;
    captionItemsShown?: string;
    captionItemsShown2?: string;
    captionMyBadgesTitle?: string;
    captionPreviewDescription?: string;
    captionPreviewInfo?: string;
    captionPreviewText?: string;
    captionScoreDescriptionText?: string;
    captionWearingTitle?: string;
    itemsBadgeDetailsList?: ReactNode;
    itemsIconsElementList?: ReactNode;
    itemsIconsElementList2?: ReactNode;
    itemsNftInfo?: ReactNode;
    itemsOfferOptions?: ReactNode;
    itemsPreviewElementList?: ReactNode;
    layout?: BoxLayout;
    onBadges?: () => void;
    onBots?: () => void;
    onClearFilterButton?: () => void;
    onClearFilterButton2?: () => void;
    onClearFilterButton3?: () => void;
    onClearFilterButton4?: () => void;
    onClose?: () => void;
    onCollectibles?: () => void;
    onFilterOptions?: () => void;
    onFilterOptions2?: () => void;
    onFilterOptions3?: () => void;
    onFilterOptions4?: () => void;
    onFilterRarity?: () => void;
    onFilterRarity2?: () => void;
    onFurni?: () => void;
    onFurniPreviewRegion?: () => void;
    onNextItemButton?: () => void;
    onNextItemButton2?: () => void;
    onOpenCatalogBtn?: () => void;
    onPets?: () => void;
    onPlaceButton?: () => void;
    onPlaceButton2?: () => void;
    onPlacementOptions?: () => void;
    onRentables?: () => void;
    onViewItemButton?: () => void;
    onViewItemButton2?: () => void;
    onWearBadgeButton?: () => void;
    srcDownloadImage?: string;
    srcImage?: string;
    srcPreviewImage?: string;
    srcPreviewImage2?: string;
    visibleAchievementsScoreContainer?: boolean;
    visibleBadgeRarityTag?: boolean;
    visibleBots?: boolean;
    visibleClearFilterButton?: boolean;
    visibleClearFilterButton2?: boolean;
    visibleClearFilterButton3?: boolean;
    visibleCollectibles?: boolean;
    visibleEmptyContainer?: boolean;
    visibleFurni?: boolean;
    visibleLoadingContainer?: boolean;
    visibleNextItemButton?: boolean;
    visiblePets?: boolean;
    visibleViewItemButton?: boolean;
}

export const InventoryLayout = ({ captionBadgeOwnerCount, captionBadgeRarity, captionBadgeRarityBorder, captionBotDescription, captionBotName, captionInventoryEmptyDescription, captionInventoryEmptyTitle, captionItemsShown, captionItemsShown2, captionMyBadgesTitle, captionPreviewDescription, captionPreviewInfo, captionPreviewText, captionScoreDescriptionText, captionWearingTitle, itemsBadgeDetailsList, itemsIconsElementList, itemsIconsElementList2, itemsNftInfo, itemsOfferOptions, itemsPreviewElementList, layout, onBadges, onBots, onClearFilterButton, onClearFilterButton2, onClearFilterButton3, onClearFilterButton4, onClose, onCollectibles, onFilterOptions, onFilterOptions2, onFilterOptions3, onFilterOptions4, onFilterRarity, onFilterRarity2, onFurni, onFurniPreviewRegion, onNextItemButton, onNextItemButton2, onOpenCatalogBtn, onPets, onPlaceButton, onPlaceButton2, onPlacementOptions, onRentables, onViewItemButton, onViewItemButton2, onWearBadgeButton, srcDownloadImage, srcImage, srcPreviewImage, srcPreviewImage2, visibleAchievementsScoreContainer, visibleBadgeRarityTag, visibleBots, visibleClearFilterButton, visibleClearFilterButton2, visibleClearFilterButton3, visibleCollectibles, visibleEmptyContainer, visibleFurni, visibleLoadingContainer, visibleNextItemButton, visiblePets, visibleViewItemButton }: InventoryLayoutProps) => {
    const t = useTranslation();
    const [ filterValue, setFilterValue ] = useState('');
    const [ filterValue2, setFilterValue2 ] = useState('');
    const [ filterValue3, setFilterValue3 ] = useState('');
    const [ filterValue4, setFilterValue4 ] = useState('');

    return (
        <Frame
            variant="3"
            id="inventoryBase"
            name="inventoryBase"
            params={98305}
            caption={t('inventory.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 490, height: 342, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="top_content"
                    tags={[ 'TOP_CONTENT' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 478, top: 0, height: 301 }}
                >
                    <TabContext
                        variant="3"
                        name="tabs"
                        params={2064}
                        layout={{ position: 'absolute', left: 0, width: 478, top: 0, height: 301 }}
                    >
                        <TabButton
                            variant="3"
                            name="furni"
                            params={147473}
                            onPointerTap={onFurni}
                            layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 34 }}
                        >
                            {t('inventory.furni')}
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 107, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('inventory.furni')} />
                            </Region>
                        </TabButton>
                        <TabButton
                            variant="3"
                            name="collectibles"
                            params={147473}
                            onPointerTap={onCollectibles}
                            layout={{ position: 'absolute', left: 107, width: 87, top: 0, height: 34 }}
                        >
                            {t('inventory.collectibles')}
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 87, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('inventory.collectibles')} />
                            </Region>
                        </TabButton>
                        <TabButton
                            variant="3"
                            name="rentables"
                            params={147473}
                            onPointerTap={onRentables}
                            layout={{ position: 'absolute', left: 194, width: 131, top: 0, height: 34 }}
                        >
                            {t('inventory.rentables')}
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 131, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('inventory.rentables')} />
                            </Region>
                        </TabButton>
                        <TabButton
                            variant="3"
                            name="pets"
                            params={147473}
                            onPointerTap={onPets}
                            layout={{ position: 'absolute', left: 325, width: 155, top: 0, height: 34 }}
                        >
                            {t('inventory.furni.tab.pets')}
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('inventory.furni.tab.pets')} />
                            </Region>
                        </TabButton>
                        <TabButton
                            variant="3"
                            name="badges"
                            params={147473}
                            onPointerTap={onBadges}
                            layout={{ position: 'absolute', left: 480, width: 64, top: 0, height: 34 }}
                        >
                            {t('inventory.badges')}
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('inventory.badges')} />
                            </Region>
                        </TabButton>
                        <TabButton
                            variant="3"
                            name="bots"
                            params={147473}
                            onPointerTap={onBots}
                            layout={{ position: 'absolute', left: 544, width: 105, top: 0, height: 34 }}
                        >
                            {t('inventory.bots')}
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 105, top: 0, height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('inventory.bots')} />
                            </Region>
                        </TabButton>
                    </TabContext>
                    <Region
                        name="empty_container"
                        params={2064}
                        visible={visibleEmptyContainer ?? false}
                        layout={{ position: 'absolute', left: 0, width: 478, top: 20, height: 278 }}
                    >
                        <ThemeImage
                            name="image"
                            params={16}
                            src={srcImage ?? layoutImage('inventory_inventory_empty.png')}
                            layout={{ position: 'absolute', left: 46, width: 180, top: 42, height: 180 }}
                        />
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 287, width: 176, top: 64, height: 154, flexDirection: 'column', gap: 5 }}
                        >
                            <Region
                                name="inventory_empty_title"
                                tags={[ 'furni_description' ]}
                                params={16}
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
                                params={16}
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
                            params={918545}
                            onPointerTap={onOpenCatalogBtn}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ position: 'absolute', left: 241, width: 149, top: 225, height: 51 }}
                        >
                            {t('inventory.open.catalog')}
                        </Button>
                    </Region>
                    <Region
                        name="loading_container"
                        params={2064}
                        visible={visibleLoadingContainer ?? false}
                        layout={{ position: 'absolute', left: 6, width: 264, top: 27, height: 268 }}
                    >
                        <ThemeImage
                            name="download_image"
                            params={16}
                            src={srcDownloadImage ?? layoutImage('inventory_download_icon.png')}
                            layout={{ position: 'absolute', left: 0, width: 264, top: 0, height: 268 }}
                        />
                    </Region>
                    <Region
                        name="contentArea"
                        params={2064}
                        layout={{ position: 'absolute', left: 5, width: 468, top: 35, height: 261 }}
                    >
                        <Region
                            name="furni"
                            params={2064}
                            visible={visibleFurni ?? false}
                            layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 261 }}
                        >
                            <Border
                                variant="3"
                                name="options_container"
                                params={16}
                                tintColor="#cacaca"
                                layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 25 }}
                            >
                                <Border
                                    variant="0"
                                    params={16}
                                    layout={{ position: 'absolute', left: 4, width: 139, top: 3, height: 20 }}
                                >
                                    <TextInput
                                        value={filterValue}
                                        onChange={setFilterValue}
                                        layout={{ position: 'absolute', left: 3, width: 122, top: 2, height: 15, minWidth: 60 }}
                                    />
                                    <Region
                                        name="clear_filter_button"
                                        params={17}
                                        visible={visibleClearFilterButton ?? false}
                                        onPointerTap={onClearFilterButton}
                                        cursor="pointer"
                                        layout={{ position: 'absolute', left: 120, width: 20, top: 0, height: 20 }}
                                    >
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('icons_close.png')}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                        />
                                    </Region>
                                </Border>
                                <Dropmenu
                                    variant="0"
                                    name="filter.options"
                                    params={17}
                                    onPointerTap={onFilterOptions}
                                    layout={{ position: 'absolute', left: 150, width: 119, top: 2, height: 21 }}
                                />
                                <Dropmenu
                                    variant="0"
                                    name="placement.options"
                                    params={17}
                                    onPointerTap={onPlacementOptions}
                                    layout={{ position: 'absolute', left: 274, width: 119, top: 2, height: 21 }}
                                />
                            </Border>
                            <Region
                                name="grid_container"
                                params={2064}
                                layout={{ position: 'absolute', left: 0, width: 284, top: 27, height: 231 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 0, width: 284, top: 0, height: 221 }}
                                >
                                    <Region
                                        name="item_grid"
                                        tags={[ 'FURNI_ITEM_GRID' ]}
                                        params={2065}
                                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                                    />
                                </ScrollArea>
                                <Region
                                    name="item_grid_pages"
                                    params={1040}
                                    layout={{ position: 'absolute', left: 0, width: 280, top: 220, height: 10, flexDirection: 'row', gap: 2 }}
                                >
                                    <Region
                                        params={147473}
                                        layout={{ width: 8, height: 14, flexShrink: 0 }}
                                    >
                                        <Region
                                            tags={[ 'PAGE' ]}
                                            params={16}
                                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text="0"
                                                textStyle="text-style-il-small"
                                            />
                                        </Region>
                                    </Region>
                                </Region>
                                <Region
                                    name="items.shown"
                                    params={263184}
                                    layout={{ position: 'absolute', left: 185, width: 98, top: 217, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionItemsShown ?? 'Items shown: x/y'}
                                        textOptions={{ fill: '#777777' }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="preview_container"
                                params={2064}
                                layout={{ position: 'absolute', left: 290, width: 180, top: 27, height: 237 }}
                            >
                                <Region
                                    name="furni_preview_region"
                                    params={18577}
                                    onPointerTap={onFurniPreviewRegion}
                                    cursor="pointer"
                                    layout={{ position: 'absolute', left: 5, width: 170, top: 0, height: 130, minHeight: 50 }}
                                />
                                <WidgetSlot
                                    widgetType="room_previewer"
                                    name="furni_preview_widget"
                                    params={2192}
                                    layout={{ position: 'absolute', left: 5, width: 170, top: 0, height: 130, minHeight: 50 }}
                                />
                                <Region
                                    name="preview_element_list"
                                    params={1049728}
                                    layout={{ position: 'absolute', left: 0, width: 180, top: -31, height: 266, flexDirection: 'column', gap: 1 }}
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
                                    params={64}
                                    layout={{ position: 'absolute', left: 121, width: 36, top: 5, height: 30 }}
                                />
                                <WidgetSlot
                                    widgetType="limited_item_overlay_preview"
                                    name="unique_limited_item_overlay_widget"
                                    params={64}
                                    layout={{ position: 'absolute', left: 119, width: 40, top: 4, height: 40 }}
                                />
                                <Button
                                    variant="3"
                                    name="nextItemButton"
                                    params={393217}
                                    onPointerTap={onNextItemButton}
                                    textStyle="text-style-button-shiny-regular"
                                    layout={{ position: 'absolute', left: 33, width: 131, top: 5, height: 23 }}
                                >
                                    {t('inventory.furni.next')}
                                </Button>
                                <Button
                                    variant="3"
                                    name="viewItemButton"
                                    params={393217}
                                    onPointerTap={onViewItemButton}
                                    textStyle="text-style-button-shiny-regular"
                                    layout={{ position: 'absolute', left: 33, width: 131, top: 31, height: 23 }}
                                >
                                    {t('inventory.furni.view')}
                                </Button>
                            </Region>
                        </Region>
                        <Region
                            name="collectibles"
                            params={2064}
                            visible={visibleCollectibles ?? false}
                            layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 261 }}
                        >
                            <Border
                                variant="3"
                                name="options_container"
                                params={16}
                                tintColor="#cacaca"
                                layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 25 }}
                            >
                                <Border
                                    variant="0"
                                    params={16}
                                    layout={{ position: 'absolute', left: 4, width: 139, top: 3, height: 20 }}
                                >
                                    <TextInput
                                        value={filterValue2}
                                        onChange={setFilterValue2}
                                        layout={{ position: 'absolute', left: 3, width: 120, top: 2, height: 15, minWidth: 60 }}
                                    />
                                    <Region
                                        name="clear_filter_button"
                                        params={17}
                                        visible={visibleClearFilterButton2 ?? false}
                                        onPointerTap={onClearFilterButton2}
                                        cursor="pointer"
                                        layout={{ position: 'absolute', left: 120, width: 20, top: 0, height: 20 }}
                                    >
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('icons_close.png')}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                        />
                                    </Region>
                                </Border>
                                <Dropmenu
                                    variant="0"
                                    name="filter.options"
                                    params={17}
                                    onPointerTap={onFilterOptions2}
                                    layout={{ position: 'absolute', left: 150, width: 119, top: 2, height: 21 }}
                                />
                            </Border>
                            <Region
                                name="grid_container"
                                params={2064}
                                layout={{ position: 'absolute', left: 0, width: 284, top: 27, height: 231 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 0, width: 284, top: 0, height: 221 }}
                                >
                                    <Region
                                        name="item_grid"
                                        tags={[ 'FURNI_ITEM_GRID' ]}
                                        params={2065}
                                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                                    />
                                </ScrollArea>
                                <Region
                                    name="item_grid_pages"
                                    params={1040}
                                    layout={{ position: 'absolute', left: 0, width: 280, top: 220, height: 10, flexDirection: 'row', gap: 2 }}
                                >
                                    <Region
                                        params={147473}
                                        layout={{ width: 8, height: 14, flexShrink: 0 }}
                                    >
                                        <Region
                                            tags={[ 'PAGE' ]}
                                            params={16}
                                            layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text="0"
                                                textStyle="text-style-il-small"
                                            />
                                        </Region>
                                    </Region>
                                </Region>
                                <Region
                                    name="items.shown"
                                    params={263184}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 185, width: 98, top: 217, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionItemsShown2 ?? 'Items shown: x/y'}
                                        textOptions={{ fill: '#777777' }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="preview_container"
                                params={2064}
                                layout={{ position: 'absolute', left: 290, width: 180, top: 27, height: 237 }}
                            >
                                <Border
                                    variant="2"
                                    params={16}
                                    tintColor="#d8d8d8"
                                    layout={{ position: 'absolute', left: 0, width: 175, top: 5, height: 188 }}
                                >
                                    <Region
                                        name="nft_info"
                                        params={128}
                                        layout={{ position: 'absolute', left: 5, width: 170, top: 5, height: 35, flexDirection: 'column', gap: 1 }}
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
                                        params={16}
                                        layout={{ position: 'absolute', left: 2, width: 170, top: 45, height: 110 }}
                                    />
                                    <Region
                                        name="offer_options"
                                        params={409744}
                                        layout={{ position: 'absolute', left: -18, width: 188, top: 160, height: 28, flexDirection: 'row', gap: 10 }}
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
                                    {itemsIconsElementList2 ?? (
                                        <InventoryLayoutTradeableInfoRegionItem2 />
                                    )}
                                </Region>
                                <WidgetSlot
                                    widgetType="rarity_item_overlay_preview"
                                    name="rarity_item_overlay_widget"
                                    params={64}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 121, width: 36, top: 5, height: 30 }}
                                />
                                <WidgetSlot
                                    widgetType="limited_item_overlay_preview"
                                    name="unique_limited_item_overlay_widget"
                                    params={64}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 119, width: 40, top: 4, height: 40 }}
                                />
                                <Region
                                    visible={visibleNextItemButton ?? false}
                                    layout={{ position: 'absolute', left: 33, width: 131, top: 5, height: 23 }}
                                >
                                    <Button
                                        variant="3"
                                        name="nextItemButton"
                                        params={393217}
                                        onPointerTap={onNextItemButton2}
                                        textStyle="text-style-button-shiny-regular"
                                        layout={{ width: '100%', height: '100%' }}
                                    >
                                        {t('inventory.furni.next')}
                                    </Button>
                                </Region>
                                <Region
                                    visible={visibleViewItemButton ?? false}
                                    layout={{ position: 'absolute', left: 33, width: 131, top: 31, height: 23 }}
                                >
                                    <Button
                                        variant="3"
                                        name="viewItemButton"
                                        params={393217}
                                        onPointerTap={onViewItemButton2}
                                        textStyle="text-style-button-shiny-regular"
                                        layout={{ width: '100%', height: '100%' }}
                                    >
                                        {t('inventory.furni.view')}
                                    </Button>
                                </Region>
                            </Region>
                        </Region>
                        <Region
                            name="pets"
                            params={2064}
                            visible={visiblePets ?? false}
                            layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 261 }}
                        >
                            <Border
                                variant="3"
                                name="options_container"
                                params={16}
                                tintColor="#cacaca"
                                layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 25 }}
                            >
                                <Border
                                    variant="0"
                                    params={16}
                                    layout={{ position: 'absolute', left: 4, width: 139, top: 3, height: 20 }}
                                >
                                    <TextInput
                                        value={filterValue3}
                                        onChange={setFilterValue3}
                                        layout={{ position: 'absolute', left: 3, width: 122, top: 2, height: 15, minWidth: 60 }}
                                    />
                                    <Region
                                        name="clear_filter_button"
                                        params={17}
                                        visible={visibleClearFilterButton3 ?? false}
                                        onPointerTap={onClearFilterButton3}
                                        cursor="pointer"
                                        layout={{ position: 'absolute', left: 120, width: 20, top: 0, height: 20 }}
                                    >
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('icons_close.png')}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                        />
                                    </Region>
                                </Border>
                                <Dropmenu
                                    variant="0"
                                    name="filter.options"
                                    params={17}
                                    onPointerTap={onFilterOptions3}
                                    layout={{ position: 'absolute', left: 150, width: 119, top: 2, height: 21 }}
                                />
                            </Border>
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 0, width: 274, top: 27, height: 231 }}
                            >
                                <Region
                                    name="grid"
                                    params={2065}
                                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                                />
                            </ScrollArea>
                            <Region
                                name="preview_container"
                                params={2128}
                                layout={{ position: 'absolute', left: 280, width: 190, top: 0, height: 261 }}
                            >
                                <Region
                                    name="preview_text"
                                    params={144}
                                    layout={{ position: 'absolute', left: 0, width: 66, top: 32, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionPreviewText ?? 'PetName'}
                                        textStyle="text-style-u-headline-small"
                                    />
                                </Region>
                                <ThemeImage
                                    name="preview_image"
                                    params={17}
                                    src={srcPreviewImage}
                                    layout={{ position: 'absolute', left: 5, width: 150, top: 53, height: 152 }}
                                />
                                <Region
                                    name="preview_description"
                                    params={144}
                                    layout={{ position: 'absolute', left: 4, width: 180, top: 205, height: 17, maxWidth: 220, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionPreviewDescription ?? 'Lorem ipsumlkj lj'}
                                        textOptions={{ wordWrap: true, wordWrapWidth: 180 }}
                                    />
                                </Region>
                                <Region
                                    name="preview_info"
                                    params={788496}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 5, width: 154, top: 200, height: 29, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionPreviewInfo ?? '...'}
                                        textOptions={{ wordWrap: true, wordWrapWidth: 154 }}
                                    />
                                </Region>
                                <Button
                                    variant="3"
                                    name="place_button"
                                    params={132113}
                                    onPointerTap={onPlaceButton}
                                    textStyle="text-style-button-shiny-regular"
                                    layout={{ position: 'absolute', left: 0, width: 158, top: 229, height: 28, minWidth: 158, maxWidth: 158 }}
                                >
                                    {t('inventory.pets.placetoroom')}
                                </Button>
                            </Region>
                            <Dropmenu
                                variant="0"
                                name="filter.rarity"
                                params={17}
                                onPointerTap={onFilterRarity}
                                layout={{ position: 'absolute', left: 274, width: 119, top: 2, height: 21 }}
                            />
                        </Region>
                        <Region
                            name="bots"
                            params={2064}
                            visible={visibleBots ?? false}
                            layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 261 }}
                        >
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 0, width: 274, top: 0, height: 256 }}
                            >
                                <Region
                                    name="grid"
                                    params={2193}
                                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                                />
                            </ScrollArea>
                            <Region
                                name="preview_container"
                                params={2128}
                                layout={{ position: 'absolute', left: 280, width: 190, top: 0, height: 261 }}
                            >
                                <Region
                                    name="bot_name"
                                    params={3145744}
                                    layout={{ position: 'absolute', left: 0, width: 67, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionBotName ?? 'bot name'}
                                        textStyle="text-style-u-headline-small"
                                    />
                                </Region>
                                <ThemeImage
                                    name="preview_image"
                                    params={17}
                                    src={srcPreviewImage2}
                                    layout={{ position: 'absolute', left: 43, width: 100, top: 24, height: 150 }}
                                />
                                <Region
                                    name="bot_description"
                                    params={16}
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
                                    params={132113}
                                    onPointerTap={onPlaceButton2}
                                    textStyle="text-style-button-shiny-regular"
                                    layout={{ position: 'absolute', left: 10, width: 158, top: 225, height: 28, minWidth: 158, maxWidth: 158 }}
                                >
                                    {t('inventory.bot.placetoroom')}
                                </Button>
                            </Region>
                        </Region>
                        <Region
                            name="badges"
                            params={2064}
                            layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 261 }}
                        >
                            <Border
                                variant="3"
                                name="options_container"
                                params={16}
                                tintColor="#cacaca"
                                layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 25 }}
                            >
                                <Border
                                    variant="0"
                                    params={16}
                                    layout={{ position: 'absolute', left: 4, width: 139, top: 3, height: 20 }}
                                >
                                    <TextInput
                                        value={filterValue4}
                                        onChange={setFilterValue4}
                                        layout={{ position: 'absolute', left: 3, width: 122, top: 2, height: 15, minWidth: 60 }}
                                    />
                                    <Region
                                        name="clear_filter_button"
                                        params={17}
                                        onPointerTap={onClearFilterButton4}
                                        cursor="pointer"
                                        layout={{ position: 'absolute', left: 120, width: 20, top: 0, height: 20 }}
                                    >
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('icons_close.png')}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                        />
                                    </Region>
                                </Border>
                                <Dropmenu
                                    variant="0"
                                    name="filter.options"
                                    params={17}
                                    onPointerTap={onFilterOptions4}
                                    layout={{ position: 'absolute', left: 150, width: 119, top: 2, height: 21 }}
                                />
                            </Border>
                            <Dropmenu
                                variant="0"
                                name="filter.rarity"
                                params={17}
                                onPointerTap={onFilterRarity2}
                                layout={{ position: 'absolute', left: 274, width: 119, top: 2, height: 21 }}
                            />
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 0, width: 328, top: 27, height: 143 }}
                            >
                                <Region
                                    name="inactive_items"
                                    tags={[ 'BADGE_ITEM_GRID' ]}
                                    params={2193}
                                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                                />
                            </ScrollArea>
                            <Region
                                name="item_grid_pages"
                                params={1040}
                                layout={{ position: 'absolute', left: 0, width: 328, top: 170, height: 10, flexDirection: 'row', gap: 2 }}
                            >
                                <Region
                                    params={147473}
                                    layout={{ width: 8, height: 14, flexShrink: 0 }}
                                >
                                    <Region
                                        tags={[ 'PAGE' ]}
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text="0"
                                            textStyle="text-style-il-small"
                                        />
                                    </Region>
                                </Region>
                            </Region>
                            <Region
                                name="active_items"
                                tags={[ 'ACTIVE_BADGE_ITEM_GRID' ]}
                                params={2129}
                                layout={{ position: 'absolute', left: 335, width: 135, top: 58, height: 120, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
                            />
                            <Region
                                name="myBadgesTitle"
                                params={16}
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
                                params={80}
                                layout={{ position: 'absolute', left: 330, width: 134, top: 32, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionWearingTitle ?? t('inventory.badges.activebadges')}
                                    textStyle="text-style-u-headline-small"
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                            <Region
                                name="descriptionArea"
                                params={1168}
                                layout={{ position: 'absolute', left: 0, width: 468, top: 184, height: 78 }}
                            >
                                <Border
                                    variant="3"
                                    name="badge_desc_bg_box"
                                    params={2192}
                                    layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 78 }}
                                />
                                <WidgetSlot
                                    widgetType="badge_image"
                                    name="badge_image"
                                    params={16}
                                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                    layout={{ position: 'absolute', left: 9, width: 50, top: 14, height: 50 }}
                                />
                                <Region
                                    name="badgeDetailsList"
                                    layout={{ position: 'absolute', left: 63, width: 271, top: 3, height: 39, flexDirection: 'column', gap: 2 }}
                                >
                                    {itemsBadgeDetailsList ?? (
                                        <>
                                            <InventoryLayoutBadgeNameItem />
                                            <InventoryLayoutBadgeDescriptionItem />
                                        </>
                                    )}
                                    <Region
                                        params={16}
                                        layout={{ width: -5, height: 20, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                                    >
                                        <Region
                                            visible={visibleBadgeRarityTag ?? false}
                                            layout={{ width: 92, height: 17, flexShrink: 0 }}
                                        >
                                            <Border
                                                variant="2"
                                                name="badgeRarityTag"
                                                params={16}
                                                tintColor="#cccccc"
                                                layout={{ width: '100%', height: '100%' }}
                                            >
                                                <Region
                                                    name="badgeRarityBorder"
                                                    tags={[ 'BLEND_SUBTRACT' ]}
                                                    params={4194320}
                                                    layout={{ position: 'absolute', left: 5, width: 81, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                >
                                                    <ThemeText
                                                        text={captionBadgeRarityBorder ?? 'Unique badge'}
                                                        textOptions={{ fill: '#ffffff' }}
                                                    />
                                                </Region>
                                                <Region
                                                    name="badgeRarity"
                                                    tags={[ 'BLEND_INVERT' ]}
                                                    params={16}
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
                                            params={16}
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
                                <Button
                                    variant="3"
                                    name="wearBadge_button"
                                    params={393297}
                                    onPointerTap={onWearBadgeButton}
                                    textStyle="text-style-button-shiny-regular"
                                    layout={{ position: 'absolute', left: 282, width: 179, top: 40, height: 28 }}
                                >
                                    {t('inventory.badges.wearbadge')}
                                </Button>
                            </Region>
                            <Region
                                name="achievements_score_container"
                                params={1168}
                                visible={visibleAchievementsScoreContainer ?? false}
                                layout={{ position: 'absolute', left: 0, width: 468, top: 239, height: 24 }}
                            >
                                <Border
                                    variant="3"
                                    name="score_description_border"
                                    params={144}
                                    tintColor="#428bb2"
                                    layout={{ position: 'absolute', left: 0, width: 468, top: 4, height: 17, minWidth: 368 }}
                                >
                                    <Region
                                        name="score_description_text"
                                        params={3932240}
                                        layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={captionScoreDescriptionText ?? t('achievements_score_description')}
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </Border>
                            </Region>
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="subContentArea"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 478, top: 301, height: 1 }}
                />
            </Region>
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
            tags={[ 'furni_name' ]}
            params={786576}
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
            tags={[ 'furni_description' ]}
            params={144}
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
            tags={[ 'furni_extra' ]}
            params={144}
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
            params={16}
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
            tags={[ 'FIT:inventory.furni.placetoroom' ]}
            params={131089}
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
            tags={[ 'FIT:inventory.furni.gotoroom' ]}
            params={131089}
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
            params={131089}
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
            params={131089}
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
            params={131089}
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
            tags={[ 'FIT:inventory.furni.extendrent' ]}
            params={131089}
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
            tags={[ 'FIT:inventory.furni.buyrenteditem' ]}
            params={131089}
            onPointerTap={onBuyrenteditemBtn}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 189, height: 22, flexShrink: 0, ...layout }}
        >
            {t('inventory.furni.buyrenteditem')}
        </Button>
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
            params={131089}
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
                params={16}
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
            params={131089}
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
                params={16}
                src={srcRecyclableIcon ?? layoutImage('inventory_furni_no_recycle_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 16 }}
            />
        </Region>
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
            tags={[ 'furni_name' ]}
            params={786576}
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
            tags={[ 'furni_description' ]}
            params={144}
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
            params={393233}
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
        <Region
            name="tradeable_info_region"
            tooltip={t('inventory.furni.preview.tradeable_amount')}
            params={131089}
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
                params={16}
                src={srcTradeableIcon ?? layoutImage('inventory_furni_no_trade_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 16 }}
            />
        </Region>
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
            params={16}
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
}

export const InventoryLayoutBadgeDescriptionItem = ({ captionBadgeDescription, layout }: InventoryLayoutBadgeDescriptionItemProps) => {
    return (
        <Region
            name="badgeDescription"
            params={16}
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
