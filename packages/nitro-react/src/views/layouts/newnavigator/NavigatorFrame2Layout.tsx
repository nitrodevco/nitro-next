import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `138_navigator_frame_2_xml` (layout "navigator_frame_2", 578x628) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NavigatorFrame2LayoutProps {
    itemsQuicklinksList?: ReactNode;
    layout?: BoxLayout;
    leftPaneHide?: NavigatorFrame2LayoutLeftPaneHideProps;
    onClose?: () => void;
    onTempBack?: () => void;
    onTopViewSelectTabButton?: () => void;
    rightPane?: NavigatorFrame2LayoutRightPaneProps;
}

export const NavigatorFrame2Layout = ({ itemsQuicklinksList, layout, leftPaneHide, onClose, onTempBack, onTopViewSelectTabButton, rightPane }: NavigatorFrame2LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('navigator.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 578, height: 628, ...layout }}
        >
            <Border
                variant="3"
                tintColor="#eceae0"
                layout={{ position: 'absolute', left: -3, right: 4, top: -3, bottom: 53 }}
            />
            <Region
                name="white_background"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: -2, right: 4, top: -5, height: 33 }}
            />
            <Border
                variant="2"
                name="left_pane"
                layout={{ position: 'absolute', left: 6, width: 141, top: 35, bottom: 55 }}
            >
                <NavigatorFrame2LayoutLeftPaneHide {...leftPaneHide} />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 5, width: 136, top: 25, bottom: 4 }}
                >
                    <Region
                        name="quicklinks_list"
                        layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
                    >
                        {itemsQuicklinksList ?? (
                            <NavigatorFrame2LayoutQuickLinkItem />
                        )}
                    </Region>
                </ScrollArea>
            </Border>
            <NavigatorFrame2LayoutRightPane {...rightPane} />
            <Region
                name="temp_back"
                tooltip={t('navigator.tooltip.left.show.hide')}
                onPointerTap={onTempBack}
                cursor="pointer"
                layout={{ position: 'absolute', left: 4, width: 28, top: 2, height: 25 }}
            >
                <ThemeImage
                    src={layoutImage('newnavigator_button_quicklink_add.png')}
                    layout={{ position: 'absolute', left: 10, width: 18, top: 2, height: 19 }}
                />
            </Region>
            <ThemeImage
                src={layoutImage('talent_task_progress_bg.png')}
                layout={{ position: 'absolute', left: -2, right: -5, top: 28, height: 1 }}
            />
            <TabContext
                variant="3"
                name="top_view_select_tab_context"
                layout={{ position: 'absolute', left: 115, width: 450, top: -1, height: 30 }}
            >
                <TabButton
                    variant="3"
                    name="top_view_select_tab_button"
                    tooltip={t('navigator.tooltip.select.tab')}
                    onPointerTap={onTopViewSelectTabButton}
                    layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 32 }}
                >
                    top view ph
                </TabButton>
            </TabContext>
        </Frame>
    );
};

/** Named region `left_pane_hide` of NavigatorFrame2Layout - configured through the parent's `leftPaneHide` prop. */
export interface NavigatorFrame2LayoutLeftPaneHideProps {
    layout?: BoxLayout;
    onLeftPaneHide?: () => void;
    visibleLeftShowContainer?: boolean;
}

export const NavigatorFrame2LayoutLeftPaneHide = ({ layout, onLeftPaneHide, visibleLeftShowContainer }: NavigatorFrame2LayoutLeftPaneHideProps) => {
    const t = useTranslation();

    return (
        <Region
            name="left_pane_hide"
            onPointerTap={onLeftPaneHide}
            cursor="pointer"
            layout={{ position: 'absolute', left: -6, width: 149, top: 0, height: 21, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#fba800"
                layout={{ position: 'absolute', left: 6, width: 141, top: 0, height: 27 }}
            >
                <Region
                    name="left_hide_container"
                    layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 18 }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_button_quicklink_add.png')}
                        layout={{ position: 'absolute', left: 3, width: 18, top: 3, height: 18 }}
                    />
                    <Region layout={{ position: 'absolute', left: 20, width: 149, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('navigator.quick.links.title')}
                            textStyle="text-style-id-heading-2"
                        />
                    </Region>
                </Region>
                {(visibleLeftShowContainer ?? false) && (
                    <Region
                        name="left_show_container"
                        layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 18 }}
                    >
                        <ThemeImage
                            src={layoutImage('newnavigator_button_quicklink_add.png')}
                            layout={{ position: 'absolute', left: 3, width: 12, top: 3, height: 12 }}
                        />
                        <Region layout={{ position: 'absolute', left: 20, width: 136, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('navigator.quick.links.title')}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                )}
            </Border>
        </Region>
    );
};

/** Row template `quick_link` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutQuickLinkItemProps {
    captionQuickLinkText?: string;
    layout?: BoxLayout;
    onQuickLink?: () => void;
    onRemoveQuickLink?: () => void;
    visibleRemoveQuickLink?: boolean;
}

export const NavigatorFrame2LayoutQuickLinkItem = ({ captionQuickLinkText, layout, onQuickLink, onRemoveQuickLink, visibleRemoveQuickLink }: NavigatorFrame2LayoutQuickLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="quick_link"
            tooltip={t('navigator.tooltip.open.saved.search')}
            onPointerTap={onQuickLink}
            cursor="pointer"
            layout={{ width: 132, height: 17, flexShrink: 0, ...layout }}
        >
            <Region
                name="quick_link_text"
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionQuickLinkText ?? 'quick link ph oijasdf oaijs dfodisjf'} />
            </Region>
            {(visibleRemoveQuickLink ?? false) && (
                <ContainerButton
                    variant="0"
                    name="remove_quick_link"
                    tooltip={t('navigator.tooltip.remove.saved.search')}
                    onPointerTap={onRemoveQuickLink}
                    layout={{ position: 'absolute', left: 115, width: 16, top: 1, height: 16 }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_icon_ql_remove.png')}
                        layout={{ position: 'absolute', left: 3, width: 10, top: 3, height: 10 }}
                    />
                </ContainerButton>
            )}
        </Region>
    );
};

/** Named region `search_tools` of NavigatorFrame2Layout - configured through the parent's `searchTools` prop. */
export interface NavigatorFrame2LayoutSearchToolsProps {
    layout?: BoxLayout;
    onClearSearchButton?: () => void;
    onFilterTypeDropMenu?: () => void;
    onRefreshButton?: () => void;
    srcSearchClearIcon?: string;
    visibleRefreshButtonContainer?: boolean;
}

export const NavigatorFrame2LayoutSearchTools = ({ layout, onClearSearchButton, onFilterTypeDropMenu, onRefreshButton, srcSearchClearIcon, visibleRefreshButtonContainer }: NavigatorFrame2LayoutSearchToolsProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region
            name="search_tools"
            layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 408, top: 3, height: 36, ...layout }}
        >
            <Dropmenu
                variant="4"
                name="filter_type_drop_menu"
                tooltip={t('navigator.tooltip.filter.type')}
                onPointerTap={onFilterTypeDropMenu}
                layout={{ position: 'absolute', left: 4, width: 116, top: 10, height: 24 }}
            />
            <Border
                variant="4"
                layout={{ position: 'absolute', left: 133, width: 235, top: 10, height: 24 }}
            >
                <TextInput
                    value={searchInputValue}
                    onChange={setSearchInputValue}
                    layout={{ position: 'absolute', left: 6, width: 235, top: 4, height: 16 }}
                />
                <Region
                    name="clear_search_button"
                    onPointerTap={onClearSearchButton}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 215, width: 20, top: 4, height: 20 }}
                >
                    <ThemeImage
                        name="search.clear.icon"
                        src={srcSearchClearIcon ?? layoutImage('common_small_pen.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
            </Border>
            {(visibleRefreshButtonContainer ?? false) && (
                <Region
                    name="refreshButtonContainer"
                    layout={{ position: 'absolute', left: 375, width: 25, top: 10, height: 25 }}
                >
                    <Button
                        variant="5"
                        name="refreshButton"
                        tintColor="#7cc561"
                        onPointerTap={onRefreshButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 23 }}
                    />
                    <ThemeImage
                        src={layoutImage('newnavigator_refresh_search_icon.png')}
                        layout={{ position: 'absolute', left: 5, width: 17, top: 5, height: 12 }}
                    />
                </Region>
            )}
        </Region>
    );
};

/** Row template `category_toggle_tiles` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryToggleTilesItemProps {
    layout?: BoxLayout;
    onCategoryToggleTiles?: () => void;
}

export const NavigatorFrame2LayoutCategoryToggleTilesItem = ({ layout, onCategoryToggleTiles }: NavigatorFrame2LayoutCategoryToggleTilesItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_toggle_tiles"
            tooltip={t('navigator.tooltip.tiles')}
            onPointerTap={onCategoryToggleTiles}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_nav_view_thumbs.png')}
                layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
            />
        </Region>
    );
};

/** Row template `category_toggle_rows` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryToggleRowsItemProps {
    layout?: BoxLayout;
    onCategoryToggleRows?: () => void;
}

export const NavigatorFrame2LayoutCategoryToggleRowsItem = ({ layout, onCategoryToggleRows }: NavigatorFrame2LayoutCategoryToggleRowsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_toggle_rows"
            tooltip={t('navigator.tooltip.rows')}
            onPointerTap={onCategoryToggleRows}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_nav_view_row.png')}
                layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
            />
        </Region>
    );
};

/** Row template `category_show_more` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryShowMoreItemProps {
    layout?: BoxLayout;
    onCategoryShowMore?: () => void;
}

export const NavigatorFrame2LayoutCategoryShowMoreItem = ({ layout, onCategoryShowMore }: NavigatorFrame2LayoutCategoryShowMoreItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_show_more"
            tooltip={t('navigator.tooltip.category.show.more')}
            onPointerTap={onCategoryShowMore}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_button_category_show_more.png')}
                layout={{ position: 'absolute', left: 0, width: 11, top: 1, height: 19 }}
            />
        </Region>
    );
};

/** Row template `category_back` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryBackItemProps {
    layout?: BoxLayout;
    onCategoryBack?: () => void;
}

export const NavigatorFrame2LayoutCategoryBackItem = ({ layout, onCategoryBack }: NavigatorFrame2LayoutCategoryBackItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_back"
            tooltip={t('navigator.back')}
            onPointerTap={onCategoryBack}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_nav_view_mini.png')}
                layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
            />
        </Region>
    );
};

/** Row template `category_add_quick_link` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryAddQuickLinkItemProps {
    layout?: BoxLayout;
    onCategoryAddQuickLink?: () => void;
}

export const NavigatorFrame2LayoutCategoryAddQuickLinkItem = ({ layout, onCategoryAddQuickLink }: NavigatorFrame2LayoutCategoryAddQuickLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_add_quick_link"
            tooltip={t('navigator.tooltip.add.saved.search')}
            onPointerTap={onCategoryAddQuickLink}
            cursor="pointer"
            layout={{ width: 19, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_button_quicklink_add.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 19 }}
            />
        </Region>
    );
};

/** Named region `category_controls_itemlist` of NavigatorFrame2Layout - configured through the parent's `categoryControlsItemlist` prop. */
export interface NavigatorFrame2LayoutCategoryControlsItemlistProps {
    itemsCategoryControlsItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutCategoryControlsItemlist = ({ itemsCategoryControlsItemlist, layout }: NavigatorFrame2LayoutCategoryControlsItemlistProps) => {
    return (
        <Region
            name="category_controls_itemlist"
            layout={{ position: 'absolute', right: 14, width: 83, top: 1, height: 26, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsCategoryControlsItemlist ?? (
                <>
                    <NavigatorFrame2LayoutCategoryToggleTilesItem />
                    <NavigatorFrame2LayoutCategoryToggleRowsItem />
                    <NavigatorFrame2LayoutCategoryShowMoreItem />
                    <NavigatorFrame2LayoutCategoryBackItem />
                    <NavigatorFrame2LayoutCategoryAddQuickLinkItem />
                </>
            )}
        </Region>
    );
};

/** Named region `category_header` of NavigatorFrame2Layout - configured through the parent's `categoryHeader` prop. */
export interface NavigatorFrame2LayoutCategoryHeaderProps {
    captionCategoryName?: string;
    categoryControlsItemlist?: NavigatorFrame2LayoutCategoryControlsItemlistProps;
    layout?: BoxLayout;
    onCategoryCollapse?: () => void;
    onCategoryNameRegion?: () => void;
}

export const NavigatorFrame2LayoutCategoryHeader = ({ captionCategoryName, categoryControlsItemlist, layout, onCategoryCollapse, onCategoryNameRegion }: NavigatorFrame2LayoutCategoryHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_header"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30, ...layout }}
        >
            <Region
                name="category_collapse"
                tooltip={t('navigator.tooltip.category.collapse')}
                onPointerTap={onCategoryCollapse}
                cursor="pointer"
                layout={{ position: 'absolute', left: 5, width: 11, top: 7, height: 19 }}
            >
                <ThemeImage
                    src={layoutImage('newnavigator_button_category_collapse.png')}
                    layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
                />
            </Region>
            <Region
                name="category_name_region"
                onPointerTap={onCategoryNameRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 27 }}
            >
                <Region
                    name="category_name"
                    layout={{ position: 'absolute', left: 20, width: 122, top: 5, height: 19, minWidth: 2, maxWidth: 270, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCategoryName ?? 'Category Name PH'}
                        textOptions={{ fill: '#0f557b' }}
                    />
                </Region>
            </Region>
            <NavigatorFrame2LayoutCategoryControlsItemlist {...categoryControlsItemlist} />
        </Region>
    );
};

/** Row template `room_usercount_icon` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutRoomUsercountIconItemProps {
    layout?: BoxLayout;
    srcRoomUsercountIcon?: string;
}

export const NavigatorFrame2LayoutRoomUsercountIconItem = ({ layout, srcRoomUsercountIcon }: NavigatorFrame2LayoutRoomUsercountIconItemProps) => {
    return (
        <ThemeImage
            name="room_usercount_icon"
            src={srcRoomUsercountIcon ?? layoutImage('newnavigator_icon_usercount.png')}
            layout={{ width: 13, height: 14, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `room_usercount` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutRoomUsercountItemProps {
    captionRoomUsercount?: string;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutRoomUsercountItem = ({ captionRoomUsercount, layout }: NavigatorFrame2LayoutRoomUsercountItemProps) => {
    return (
        <Region
            name="room_usercount"
            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRoomUsercount ?? '99'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `navigator_entry_tile` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNavigatorEntryTileItemProps {
    captionRoomName?: string;
    itemsUsercount?: ReactNode;
    layout?: BoxLayout;
    onGoToRoomRegion?: () => void;
    onInfoPopupClickRegion?: () => void;
    srcDoormodeIcon?: string;
    srcRoomPicPlaceholder?: string;
    visibleRoomGroupBadge?: boolean;
}

export const NavigatorFrame2LayoutNavigatorEntryTileItem = ({ captionRoomName, itemsUsercount, layout, onGoToRoomRegion, onInfoPopupClickRegion, srcDoormodeIcon, srcRoomPicPlaceholder, visibleRoomGroupBadge }: NavigatorFrame2LayoutNavigatorEntryTileItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="10"
            name="navigator_entry_tile"
            tintColor="#ebe9df"
            layout={{ width: 122, height: 146, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 7, width: 108, top: 6, height: 109 }}
            />
            <ThemeImage
                name="room_pic_placeholder"
                src={srcRoomPicPlaceholder ?? layoutImage('newnavigator_default_room.png')}
                layout={{ position: 'absolute', left: 8, width: 106, top: 7, height: 106 }}
            />
            {(visibleRoomGroupBadge ?? false) && (
                <WidgetSlot
                    widgetType="badge_image"
                    name="room_group_badge"
                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 4, width: 50, top: -3, height: 61 }}
                />
            )}
            <Region
                name="go_to_room_region"
                tooltip={t('navigator.tooltip.go.to.room')}
                onPointerTap={onGoToRoomRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 146 }}
            />
            <Region
                name="room_name"
                layout={{ position: 'absolute', left: 0, width: 100, top: 116, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomName ?? 'Room Name PH'}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 100 }}
                />
            </Region>
            <Border
                variant="3"
                name="room_info_usercount_border"
                tintColor="#000000"
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, bottom: 35, height: 18, justifyContent: 'center' }}
            >
                <Region
                    name="usercount"
                    layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 31, top: 1, height: 15, flexDirection: 'row', gap: 1 }}
                >
                    {itemsUsercount ?? (
                        <>
                            <NavigatorFrame2LayoutRoomUsercountIconItem />
                            <NavigatorFrame2LayoutRoomUsercountItem />
                        </>
                    )}
                </Region>
            </Border>
            <ThemeImage
                name="doormode_icon"
                src={srcDoormodeIcon}
                layout={{ position: 'absolute', left: 92, width: 16, top: 96, height: 14 }}
            />
            <Region
                name="info_popup_click_region"
                onPointerTap={onInfoPopupClickRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 98, width: 18, top: 120, height: 18 }}
            >
                <ThemeImage
                    src={layoutImage('newnavigator_button_show_room_info.png')}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                />
            </Region>
        </Border>
    );
};

/** Row template `navigator_entry_tile_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNavigatorEntryTileContainerItemProps {
    itemsNavigatorEntryTileContainer?: ReactNode;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutNavigatorEntryTileContainerItem = ({ itemsNavigatorEntryTileContainer, layout }: NavigatorFrame2LayoutNavigatorEntryTileContainerItemProps) => {
    return (
        <Region
            name="navigator_entry_tile_container"
            layout={{ width: 392, height: 146, flexShrink: 0, flexDirection: 'row', gap: 7, ...layout }}
        >
            {itemsNavigatorEntryTileContainer ?? (
                <NavigatorFrame2LayoutNavigatorEntryTileItem />
            )}
        </Region>
    );
};

/** Row template `room_usercount_icon` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutRoomUsercountIconItem2Props {
    layout?: BoxLayout;
    srcRoomUsercountIcon?: string;
}

export const NavigatorFrame2LayoutRoomUsercountIconItem2 = ({ layout, srcRoomUsercountIcon }: NavigatorFrame2LayoutRoomUsercountIconItem2Props) => {
    return (
        <ThemeImage
            name="room_usercount_icon"
            src={srcRoomUsercountIcon ?? layoutImage('newnavigator_icon_usercount.png')}
            layout={{ width: 13, height: 14, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `room_usercount` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutRoomUsercountItem2Props {
    captionRoomUsercount?: string;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutRoomUsercountItem2 = ({ captionRoomUsercount, layout }: NavigatorFrame2LayoutRoomUsercountItem2Props) => {
    return (
        <Region
            name="room_usercount"
            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRoomUsercount ?? '99'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Named region `room_info_container` of NavigatorFrame2Layout - configured through the parent's `roomInfoContainer` prop. */
export interface NavigatorFrame2LayoutRoomInfoContainerProps {
    captionRoomName?: string;
    itemsUsercount?: ReactNode;
    layout?: BoxLayout;
    onInfoPopupClickRegion?: () => void;
    srcDoormodeIcon?: string;
    srcGrouphomeIcon?: string;
}

export const NavigatorFrame2LayoutRoomInfoContainer = ({ captionRoomName, itemsUsercount, layout, onInfoPopupClickRegion, srcDoormodeIcon, srcGrouphomeIcon }: NavigatorFrame2LayoutRoomInfoContainerProps) => {
    return (
        <Region
            name="room_info_container"
            layout={{ position: 'absolute', left: 0, right: 2, top: 1, height: 18, ...layout }}
        >
            <Border
                variant="3"
                name="room_info_usercount_border"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 18, justifyContent: 'center' }}
            >
                <Region
                    name="usercount"
                    layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 31, top: 1, height: 15, flexDirection: 'row', gap: 1 }}
                >
                    {itemsUsercount ?? (
                        <>
                            <NavigatorFrame2LayoutRoomUsercountIconItem2 />
                            <NavigatorFrame2LayoutRoomUsercountItem2 />
                        </>
                    )}
                </Region>
            </Border>
            <Region
                name="room_name"
                layout={{ position: 'absolute', left: 44, right: 55, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRoomName ?? 'Room Name PH'} />
            </Region>
            <Region
                name="info_popup_click_region"
                onPointerTap={onInfoPopupClickRegion}
                cursor="pointer"
                layout={{ position: 'absolute', right: 4, width: 18, top: 0, height: 18 }}
            >
                <ThemeImage
                    src={layoutImage('newnavigator_button_show_room_info.png')}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                />
            </Region>
            <ThemeImage
                name="doormode_icon"
                src={srcDoormodeIcon}
                layout={{ position: 'absolute', left: 324, width: 16, top: 2, height: 16 }}
            />
            <ThemeImage
                name="grouphome_icon"
                src={srcGrouphomeIcon ?? layoutImage('newnavigator_icon_group.png')}
                layout={{ position: 'absolute', left: 341, width: 16, top: 2, height: 16 }}
            />
        </Region>
    );
};

/** Row template `navigator_entry_row_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNavigatorEntryRowContainerItemProps {
    layout?: BoxLayout;
    onGoToRoomRegion?: () => void;
    roomInfoContainer?: NavigatorFrame2LayoutRoomInfoContainerProps;
}

export const NavigatorFrame2LayoutNavigatorEntryRowContainerItem = ({ layout, onGoToRoomRegion, roomInfoContainer }: NavigatorFrame2LayoutNavigatorEntryRowContainerItemProps) => {
    return (
        <Border
            variant="3"
            name="navigator_entry_row_container"
            layout={{ width: 383, height: 20, flexShrink: 0, ...layout }}
        >
            <NavigatorFrame2LayoutRoomInfoContainer {...roomInfoContainer} />
            <Region
                name="go_to_room_region"
                onPointerTap={onGoToRoomRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 357, top: 0, height: 20 }}
            />
        </Border>
    );
};

/** Named region `category_content` of NavigatorFrame2Layout - configured through the parent's `categoryContent` prop. */
export interface NavigatorFrame2LayoutCategoryContentProps {
    itemsCategoryContent?: ReactNode;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutCategoryContent = ({ itemsCategoryContent, layout }: NavigatorFrame2LayoutCategoryContentProps) => {
    return (
        <Region
            name="category_content"
            layout={{ position: 'absolute', left: 4, right: 5, top: 29, height: 171, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsCategoryContent ?? (
                <>
                    <NavigatorFrame2LayoutNavigatorEntryTileContainerItem />
                    <NavigatorFrame2LayoutNavigatorEntryRowContainerItem />
                </>
            )}
        </Region>
    );
};

/** Named region `category_content_background` of NavigatorFrame2Layout - configured through the parent's `categoryContentBackground` prop. */
export interface NavigatorFrame2LayoutCategoryContentBackgroundProps {
    categoryContent?: NavigatorFrame2LayoutCategoryContentProps;
    categoryHeader?: NavigatorFrame2LayoutCategoryHeaderProps;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutCategoryContentBackground = ({ categoryContent, categoryHeader, layout }: NavigatorFrame2LayoutCategoryContentBackgroundProps) => {
    return (
        <Region
            name="category_content_background"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 396, top: 0, height: 200, ...layout }}
        >
            <NavigatorFrame2LayoutCategoryHeader {...categoryHeader} />
            <NavigatorFrame2LayoutCategoryContent {...categoryContent} />
        </Region>
    );
};

/** Row template `category_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryContainerItemProps {
    categoryContentBackground?: NavigatorFrame2LayoutCategoryContentBackgroundProps;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutCategoryContainerItem = ({ categoryContentBackground, layout }: NavigatorFrame2LayoutCategoryContainerItemProps) => {
    return (
        <Region
            name="category_container"
            layout={{ width: 396, height: 200, flexShrink: 0, ...layout }}
        >
            <NavigatorFrame2LayoutCategoryContentBackground {...categoryContentBackground} />
        </Region>
    );
};

/** Row template `category_show_more` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryShowMoreItem2Props {
    layout?: BoxLayout;
    onCategoryShowMore?: () => void;
}

export const NavigatorFrame2LayoutCategoryShowMoreItem2 = ({ layout, onCategoryShowMore }: NavigatorFrame2LayoutCategoryShowMoreItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="category_show_more"
            tooltip={t('navigator.tooltip.category.show.more')}
            onPointerTap={onCategoryShowMore}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_button_category_show_more.png')}
                layout={{ position: 'absolute', left: 0, width: 11, top: 1, height: 19 }}
            />
        </Region>
    );
};

/** Row template `category_add_quick_link` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryAddQuickLinkItem2Props {
    layout?: BoxLayout;
    onCategoryAddQuickLink?: () => void;
}

export const NavigatorFrame2LayoutCategoryAddQuickLinkItem2 = ({ layout, onCategoryAddQuickLink }: NavigatorFrame2LayoutCategoryAddQuickLinkItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="category_add_quick_link"
            tooltip={t('navigator.tooltip.add.saved.search')}
            onPointerTap={onCategoryAddQuickLink}
            cursor="pointer"
            layout={{ width: 20, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_button_quicklink_add.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 19 }}
            />
        </Region>
    );
};

/** Named region `category_header` of NavigatorFrame2Layout - configured through the parent's `categoryHeader` prop. */
export interface NavigatorFrame2LayoutCategoryHeader2Props {
    captionCategoryName?: string;
    itemsCategoryControlsItemlist?: ReactNode;
    layout?: BoxLayout;
    onCategoryExpand?: () => void;
    onCategoryNameRegion?: () => void;
}

export const NavigatorFrame2LayoutCategoryHeader2 = ({ captionCategoryName, itemsCategoryControlsItemlist, layout, onCategoryExpand, onCategoryNameRegion }: NavigatorFrame2LayoutCategoryHeader2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="category_header"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26, ...layout }}
        >
            <Region
                name="category_name_region"
                onPointerTap={onCategoryNameRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 209, top: 0, height: 27 }}
            >
                <Region
                    name="category_expand"
                    tooltip={t('navigator.tooltip.category.expand')}
                    onPointerTap={onCategoryExpand}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 18 }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_button_category_expand.png')}
                        layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
                    />
                </Region>
                <Region
                    name="category_name"
                    layout={{ position: 'absolute', left: 20, width: 189, top: 5, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCategoryName ?? 'Collapsed Category Name PH'}
                        textOptions={{ fill: '#0f557b' }}
                    />
                </Region>
            </Region>
            <Region
                name="category_controls_itemlist"
                layout={{ position: 'absolute', right: 4, width: 36, top: 1, height: 24, flexDirection: 'row', gap: 5 }}
            >
                {itemsCategoryControlsItemlist ?? (
                    <>
                        <NavigatorFrame2LayoutCategoryShowMoreItem2 />
                        <NavigatorFrame2LayoutCategoryAddQuickLinkItem2 />
                    </>
                )}
            </Region>
        </Region>
    );
};

/** Row template `category_container_collapsed` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryContainerCollapsedItemProps {
    categoryHeader?: NavigatorFrame2LayoutCategoryHeader2Props;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutCategoryContainerCollapsedItem = ({ categoryHeader, layout }: NavigatorFrame2LayoutCategoryContainerCollapsedItemProps) => {
    return (
        <Region
            name="category_container_collapsed"
            layout={{ width: 387, height: 26, flexShrink: 0, ...layout }}
        >
            <NavigatorFrame2LayoutCategoryHeader2 {...categoryHeader} />
        </Region>
    );
};

/** Row template `no_results_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNoResultsContainerItemProps {
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutNoResultsContainerItem = ({ layout }: NavigatorFrame2LayoutNoResultsContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="no_results_container"
            layout={{ width: 388, height: 53, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', right: 51, width: 286, alignSelf: 'center', marginTop: -16, marginBottom: 16, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('navigator.search.returned.no.results')}
                    textStyle="text-style-u-headline-medium"
                />
            </Region>
        </Region>
    );
};

/** Named region `block_results` of NavigatorFrame2Layout - configured through the parent's `blockResults` prop. */
export interface NavigatorFrame2LayoutBlockResultsProps {
    itemsBlockResults?: ReactNode;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutBlockResults = ({ itemsBlockResults, layout }: NavigatorFrame2LayoutBlockResultsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 1, right: 2, top: 45, bottom: 80, ...layout }}
        >
            <Region
                name="block_results"
                layout={{ flexDirection: 'column', gap: 5, width: '100%' }}
            >
                {itemsBlockResults ?? (
                    <>
                        <NavigatorFrame2LayoutCategoryContainerItem />
                        <NavigatorFrame2LayoutCategoryContainerCollapsedItem />
                        <NavigatorFrame2LayoutNoResultsContainerItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `right_pane` of NavigatorFrame2Layout - configured through the parent's `rightPane` prop. */
export interface NavigatorFrame2LayoutRightPaneProps {
    blockResults?: NavigatorFrame2LayoutBlockResultsProps;
    layout?: BoxLayout;
    onCreateRoom?: () => void;
    onPromoteRoom?: () => void;
    onRandomRoom?: () => void;
    searchTools?: NavigatorFrame2LayoutSearchToolsProps;
    visiblePromoteRoomBorder?: boolean;
    visibleSearchWaitingForResultsMask?: boolean;
}

export const NavigatorFrame2LayoutRightPane = ({ blockResults, layout, onCreateRoom, onPromoteRoom, onRandomRoom, searchTools, visiblePromoteRoomBorder, visibleSearchWaitingForResultsMask }: NavigatorFrame2LayoutRightPaneProps) => {
    const t = useTranslation();

    return (
        <Region
            name="right_pane"
            layout={{ position: 'absolute', left: 159, right: 9, top: 25, bottom: 55, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="4"
                name="create_room_border"
                layout={{ position: 'absolute', left: 0, width: 189, bottom: 0, height: 60 }}
            >
                <Region
                    name="create_room"
                    tooltip={t('navigator.tooltip.create.room')}
                    onPointerTap={onCreateRoom}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_create_room.png')}
                        layout={{ position: 'absolute', left: 0, width: 186, top: 0, height: 59 }}
                    />
                    <Region layout={{ position: 'absolute', left: 60, width: 125, top: 22, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('navigator.create.room')}
                            textStyle="text-style-id-heading-2"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
            </Border>
            <Border
                variant="5"
                name="random_room_border"
                layout={{ position: 'absolute', left: 205, width: 189, bottom: 0, height: 60 }}
            >
                <Region
                    name="random_room"
                    tooltip={t('navigator.tooltip.random.room')}
                    onPointerTap={onRandomRoom}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_random_room.png')}
                        layout={{ position: 'absolute', left: 0, width: 186, top: 0, height: 59 }}
                    />
                    <Region layout={{ position: 'absolute', left: 60, width: 125, top: 22, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('navigator.random.room')}
                            textStyle="text-style-id-heading-2"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
            </Border>
            {(visiblePromoteRoomBorder ?? false) && (
                <Border
                    variant="5"
                    name="promote_room_border"
                    layout={{ position: 'absolute', left: 205, width: 189, bottom: 0, height: 60 }}
                >
                    <Region
                        name="promote_room"
                        tooltip={t('navigator.tooltip.promote.room')}
                        onPointerTap={onPromoteRoom}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                    >
                        <ThemeImage
                            src={layoutImage('newnavigator_promote_room.png')}
                            layout={{ position: 'absolute', left: 0, width: 186, top: 0, height: 59 }}
                        />
                        <Region layout={{ position: 'absolute', left: 60, width: 125, top: 22, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <ThemeText
                                text={t('navigator.promote.room')}
                                textStyle="text-style-id-heading-2"
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                    </Region>
                </Border>
            )}
            <NavigatorFrame2LayoutSearchTools {...searchTools} />
            <NavigatorFrame2LayoutBlockResults {...blockResults} />
            {(visibleSearchWaitingForResultsMask ?? false) && (
                <Region
                    name="search_waiting_for_results_mask"
                    backgroundColor="#eceae0"
                    layout={{ position: 'absolute', left: 0, right: 18, top: 42, bottom: 77 }}
                />
            )}
        </Region>
    );
};
