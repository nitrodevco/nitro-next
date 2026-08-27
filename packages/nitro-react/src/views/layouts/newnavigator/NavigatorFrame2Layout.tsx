import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `138_navigator_frame_2_xml` (layout "navigator_frame_2", 578x628) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NavigatorFrame2LayoutProps {
    itemsBlockResults?: ReactNode;
    itemsQuicklinksList?: ReactNode;
    layout?: BoxLayout;
    onClearSearchButton?: () => void;
    onClose?: () => void;
    onCreateRoom?: () => void;
    onFilterTypeDropMenu?: () => void;
    onLeftPaneHide?: () => void;
    onPromoteRoom?: () => void;
    onRandomRoom?: () => void;
    onRefreshButton?: () => void;
    onTempBack?: () => void;
    onTopViewSelectTabButton?: () => void;
    srcSearchClearIcon?: string;
    visibleLeftShowContainer?: boolean;
    visiblePromoteRoomBorder?: boolean;
    visibleRefreshButtonContainer?: boolean;
    visibleSearchWaitingForResultsMask?: boolean;
}

export const NavigatorFrame2Layout = ({ itemsBlockResults, itemsQuicklinksList, layout, onClearSearchButton, onClose, onCreateRoom, onFilterTypeDropMenu, onLeftPaneHide, onPromoteRoom, onRandomRoom, onRefreshButton, onTempBack, onTopViewSelectTabButton, srcSearchClearIcon, visibleLeftShowContainer, visiblePromoteRoomBorder, visibleRefreshButtonContainer, visibleSearchWaitingForResultsMask }: NavigatorFrame2LayoutProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            params={98305}
            caption={t('navigator.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 578, height: 628, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="3"
                    params={2192}
                    tintColor="#eceae0"
                    layout={{ position: 'absolute', left: -3, right: 4, top: -3, bottom: 53 }}
                />
                <Region
                    name="white_background"
                    params={128}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: -2, right: 4, top: -5, height: 33 }}
                />
                <Border
                    variant="2"
                    name="left_pane"
                    params={2064}
                    layout={{ position: 'absolute', left: 6, width: 141, top: 35, bottom: 55 }}
                >
                    <Region
                        name="left_pane_hide"
                        params={17}
                        onPointerTap={onLeftPaneHide}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: -6, width: 149, top: 0, height: 21 }}
                    >
                        <Border
                            variant="2"
                            params={16}
                            tintColor="#fba800"
                            layout={{ position: 'absolute', left: 6, width: 141, top: 0, height: 27 }}
                        >
                            <Region
                                name="left_hide_container"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 18 }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('newnavigator_button_quicklink_add.png')}
                                    layout={{ position: 'absolute', left: 3, width: 18, top: 3, height: 18 }}
                                />
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 149, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.quick.links.title')}
                                        textStyle="text-style-id-heading-2"
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="left_show_container"
                                params={16}
                                visible={visibleLeftShowContainer ?? false}
                                layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 18 }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('newnavigator_button_quicklink_add.png')}
                                    layout={{ position: 'absolute', left: 3, width: 12, top: 3, height: 12 }}
                                />
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 136, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.quick.links.title')}
                                        textStyle="text-style-u-bold"
                                        textOptions={{ fill: '#ffffff' }}
                                    />
                                </Region>
                            </Region>
                        </Border>
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 5, width: 136, top: 25, bottom: 4 }}
                    >
                        <Region
                            name="quicklinks_list"
                            params={2064}
                            layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
                        >
                            {itemsQuicklinksList ?? (
                                <NavigatorFrame2LayoutQuickLinkItem />
                            )}
                        </Region>
                    </ScrollArea>
                </Border>
                <Region
                    name="right_pane"
                    params={2192}
                    layout={{ position: 'absolute', left: 159, right: 9, top: 25, bottom: 55, justifyContent: 'center' }}
                >
                    <Border
                        variant="4"
                        name="create_room_border"
                        params={1040}
                        layout={{ position: 'absolute', left: 0, width: 189, bottom: 0, height: 60 }}
                    >
                        <Region
                            name="create_room"
                            tooltip={t('navigator.tooltip.create.room')}
                            params={2193}
                            onPointerTap={onCreateRoom}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('newnavigator_create_room.png')}
                                layout={{ position: 'absolute', left: 0, width: 186, top: 0, height: 59 }}
                            />
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 60, width: 125, top: 22, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
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
                        params={1040}
                        layout={{ position: 'absolute', left: 205, width: 189, bottom: 0, height: 60 }}
                    >
                        <Region
                            name="random_room"
                            tooltip={t('navigator.tooltip.random.room')}
                            params={2193}
                            onPointerTap={onRandomRoom}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('newnavigator_random_room.png')}
                                layout={{ position: 'absolute', left: 0, width: 186, top: 0, height: 59 }}
                            />
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 60, width: 125, top: 22, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('navigator.random.room')}
                                    textStyle="text-style-id-heading-2"
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                        </Region>
                    </Border>
                    <Region
                        visible={visiblePromoteRoomBorder ?? false}
                        layout={{ position: 'absolute', left: 205, width: 189, bottom: 0, height: 60 }}
                    >
                        <Border
                            variant="5"
                            name="promote_room_border"
                            params={1040}
                            layout={{ width: '100%', height: '100%' }}
                        >
                            <Region
                                name="promote_room"
                                tooltip={t('navigator.tooltip.promote.room')}
                                params={2193}
                                onPointerTap={onPromoteRoom}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                            >
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('newnavigator_promote_room.png')}
                                    layout={{ position: 'absolute', left: 0, width: 186, top: 0, height: 59 }}
                                />
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 60, width: 125, top: 22, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('navigator.promote.room')}
                                        textStyle="text-style-id-heading-2"
                                        textOptions={{ align: 'center' }}
                                    />
                                </Region>
                            </Region>
                        </Border>
                    </Region>
                    <Region
                        name="search_tools"
                        params={786448}
                        layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 408, top: 3, height: 36 }}
                    >
                        <Dropmenu
                            variant="4"
                            name="filter_type_drop_menu"
                            tooltip={t('navigator.tooltip.filter.type')}
                            params={17}
                            onPointerTap={onFilterTypeDropMenu}
                            layout={{ position: 'absolute', left: 4, width: 116, top: 10, height: 24 }}
                        />
                        <Border
                            variant="4"
                            params={16}
                            layout={{ position: 'absolute', left: 133, width: 235, top: 10, height: 24 }}
                        >
                            <TextInput
                                value={searchInputValue}
                                onChange={setSearchInputValue}
                                layout={{ position: 'absolute', left: 6, width: 235, top: 4, height: 16 }}
                            />
                            <Region
                                name="clear_search_button"
                                params={17}
                                onPointerTap={onClearSearchButton}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 215, width: 20, top: 4, height: 20 }}
                            >
                                <ThemeImage
                                    name="search.clear.icon"
                                    params={16}
                                    src={srcSearchClearIcon ?? layoutImage('common_small_pen.png')}
                                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                />
                            </Region>
                        </Border>
                        <Region
                            name="refreshButtonContainer"
                            params={16}
                            visible={visibleRefreshButtonContainer ?? false}
                            layout={{ position: 'absolute', left: 375, width: 25, top: 10, height: 25 }}
                        >
                            <Button
                                variant="5"
                                name="refreshButton"
                                params={131089}
                                tintColor="#7cc561"
                                onPointerTap={onRefreshButton}
                                textStyle="text-style-button-shiny-regular"
                                layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 23 }}
                            />
                            <ThemeImage
                                params={16}
                                src={layoutImage('newnavigator_refresh_search_icon.png')}
                                layout={{ position: 'absolute', left: 5, width: 17, top: 5, height: 12 }}
                            />
                        </Region>
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 1, right: 2, top: 45, bottom: 80 }}
                    >
                        <Region
                            name="block_results"
                            tags={[ 'block_results' ]}
                            params={2192}
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
                    <Region
                        name="search_waiting_for_results_mask"
                        params={2176}
                        visible={visibleSearchWaitingForResultsMask ?? false}
                        backgroundColor="#eceae0"
                        layout={{ position: 'absolute', left: 0, right: 18, top: 42, bottom: 77 }}
                    />
                </Region>
                <Region
                    name="temp_back"
                    tooltip={t('navigator.tooltip.left.show.hide')}
                    params={131089}
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
                    params={144}
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
                        params={17}
                        onPointerTap={onTopViewSelectTabButton}
                        layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 32 }}
                    >
                        top view ph
                    </TabButton>
                </TabContext>
            </Region>
        </Frame>
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
            params={17}
            onPointerTap={onQuickLink}
            cursor="pointer"
            layout={{ width: 132, height: 17, flexShrink: 0, ...layout }}
        >
            <Region
                name="quick_link_text"
                tags={[ 'TEMPLATE' ]}
                params={16}
                layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionQuickLinkText ?? 'quick link ph oijasdf oaijs dfodisjf'} />
            </Region>
            <Region
                visible={visibleRemoveQuickLink ?? false}
                layout={{ position: 'absolute', left: 115, width: 16, top: 1, height: 16 }}
            >
                <ContainerButton
                    variant="0"
                    name="remove_quick_link"
                    tooltip={t('navigator.tooltip.remove.saved.search')}
                    params={17}
                    onPointerTap={onRemoveQuickLink}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('newnavigator_icon_ql_remove.png')}
                        layout={{ position: 'absolute', left: 3, width: 10, top: 3, height: 10 }}
                    />
                </ContainerButton>
            </Region>
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
            params={17}
            onPointerTap={onCategoryToggleTiles}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
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
            params={17}
            onPointerTap={onCategoryToggleRows}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
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
            params={17}
            onPointerTap={onCategoryShowMore}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
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
            params={17}
            onPointerTap={onCategoryBack}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
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
            params={17}
            onPointerTap={onCategoryAddQuickLink}
            cursor="pointer"
            layout={{ width: 19, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('newnavigator_button_quicklink_add.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 19 }}
            />
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
            params={16}
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
            params={16}
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
}

export const NavigatorFrame2LayoutNavigatorEntryTileItem = ({ captionRoomName, itemsUsercount, layout, onGoToRoomRegion, onInfoPopupClickRegion, srcDoormodeIcon, srcRoomPicPlaceholder }: NavigatorFrame2LayoutNavigatorEntryTileItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="10"
            name="navigator_entry_tile"
            tags={[ 'SUBTEMPLATE' ]}
            params={16}
            tintColor="#ebe9df"
            layout={{ width: 122, height: 146, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 7, width: 108, top: 6, height: 109 }}
            />
            <ThemeImage
                name="room_pic_placeholder"
                params={16}
                src={srcRoomPicPlaceholder ?? layoutImage('newnavigator_default_room.png')}
                layout={{ position: 'absolute', left: 8, width: 106, top: 7, height: 106 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="room_group_badge"
                params={16}
                visible={false}
                options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 4, width: 50, top: -3, height: 61 }}
            />
            <Region
                name="go_to_room_region"
                tooltip={t('navigator.tooltip.go.to.room')}
                params={17}
                onPointerTap={onGoToRoomRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 146 }}
            />
            <Region
                name="room_name"
                params={16}
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
                params={1835024}
                tintColor="#000000"
                layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 40, bottom: 35, height: 18, justifyContent: 'center' }}
            >
                <Region
                    name="usercount"
                    params={786448}
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
                params={16}
                src={srcDoormodeIcon}
                layout={{ position: 'absolute', left: 92, width: 16, top: 96, height: 14 }}
            />
            <Region
                name="info_popup_click_region"
                params={17}
                onPointerTap={onInfoPopupClickRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 98, width: 18, top: 120, height: 18 }}
            >
                <ThemeImage
                    params={16}
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
            tags={[ 'TEMPLATE' ]}
            params={16}
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
            params={16}
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
            params={16}
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

/** Row template `navigator_entry_row_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNavigatorEntryRowContainerItemProps {
    captionRoomName?: string;
    itemsUsercount?: ReactNode;
    layout?: BoxLayout;
    onGoToRoomRegion?: () => void;
    onInfoPopupClickRegion?: () => void;
    srcDoormodeIcon?: string;
    srcGrouphomeIcon?: string;
}

export const NavigatorFrame2LayoutNavigatorEntryRowContainerItem = ({ captionRoomName, itemsUsercount, layout, onGoToRoomRegion, onInfoPopupClickRegion, srcDoormodeIcon, srcGrouphomeIcon }: NavigatorFrame2LayoutNavigatorEntryRowContainerItemProps) => {
    return (
        <Border
            variant="3"
            name="navigator_entry_row_container"
            tags={[ 'TEMPLATE' ]}
            params={17}
            layout={{ width: 383, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                name="room_info_container"
                params={144}
                layout={{ position: 'absolute', left: 0, right: 2, top: 1, height: 18 }}
            >
                <Border
                    variant="3"
                    name="room_info_usercount_border"
                    params={16}
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 18, justifyContent: 'center' }}
                >
                    <Region
                        name="usercount"
                        params={786448}
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
                    params={144}
                    layout={{ position: 'absolute', left: 44, right: 55, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionRoomName ?? 'Room Name PH'} />
                </Region>
                <Region
                    name="info_popup_click_region"
                    params={262161}
                    onPointerTap={onInfoPopupClickRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 4, width: 18, top: 0, height: 18 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('newnavigator_button_show_room_info.png')}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                    />
                </Region>
                <ThemeImage
                    name="doormode_icon"
                    params={16}
                    src={srcDoormodeIcon}
                    layout={{ position: 'absolute', left: 324, width: 16, top: 2, height: 16 }}
                />
                <ThemeImage
                    name="grouphome_icon"
                    params={16}
                    src={srcGrouphomeIcon ?? layoutImage('newnavigator_icon_group.png')}
                    layout={{ position: 'absolute', left: 341, width: 16, top: 2, height: 16 }}
                />
            </Region>
            <Region
                name="go_to_room_region"
                params={17}
                onPointerTap={onGoToRoomRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 357, top: 0, height: 20 }}
            />
        </Border>
    );
};

/** Row template `category_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryContainerItemProps {
    captionCategoryName?: string;
    itemsCategoryContent?: ReactNode;
    itemsCategoryControlsItemlist?: ReactNode;
    layout?: BoxLayout;
    onCategoryCollapse?: () => void;
    onCategoryNameRegion?: () => void;
}

export const NavigatorFrame2LayoutCategoryContainerItem = ({ captionCategoryName, itemsCategoryContent, itemsCategoryControlsItemlist, layout, onCategoryCollapse, onCategoryNameRegion }: NavigatorFrame2LayoutCategoryContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_container"
            tags={[ 'TEMPLATE', 'category_container' ]}
            params={147600}
            layout={{ width: 396, height: 200, flexShrink: 0, ...layout }}
        >
            <Region
                name="category_content_background"
                params={147472}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 396, top: 0, height: 200 }}
            >
                <Region
                    name="category_header"
                    tags={[ 'category_header' ]}
                    params={144}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
                >
                    <Region
                        name="category_collapse"
                        tooltip={t('navigator.tooltip.category.collapse')}
                        params={17}
                        onPointerTap={onCategoryCollapse}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 5, width: 11, top: 7, height: 19 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('newnavigator_button_category_collapse.png')}
                            layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
                        />
                    </Region>
                    <Region
                        name="category_name_region"
                        params={131089}
                        onPointerTap={onCategoryNameRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 27 }}
                    >
                        <Region
                            name="category_name"
                            params={16}
                            layout={{ position: 'absolute', left: 20, width: 122, top: 5, height: 19, minWidth: 2, maxWidth: 270, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCategoryName ?? 'Category Name PH'}
                                textOptions={{ fill: '#0f557b' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="category_controls_itemlist"
                        params={262160}
                        layout={{ position: 'absolute', right: 14, width: 83, top: 1, height: 26, flexDirection: 'row', gap: 5 }}
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
                </Region>
                <Region
                    name="category_content"
                    params={144}
                    layout={{ position: 'absolute', left: 4, right: 5, top: 29, height: 171, flexDirection: 'column', gap: 5 }}
                >
                    {itemsCategoryContent ?? (
                        <>
                            <NavigatorFrame2LayoutNavigatorEntryTileContainerItem />
                            <NavigatorFrame2LayoutNavigatorEntryRowContainerItem />
                        </>
                    )}
                </Region>
            </Region>
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
            params={17}
            onPointerTap={onCategoryShowMore}
            cursor="pointer"
            layout={{ width: 11, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
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
            params={17}
            onPointerTap={onCategoryAddQuickLink}
            cursor="pointer"
            layout={{ width: 20, height: 18, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('newnavigator_button_quicklink_add.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 19 }}
            />
        </Region>
    );
};

/** Row template `category_container_collapsed` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryContainerCollapsedItemProps {
    captionCategoryName?: string;
    itemsCategoryControlsItemlist?: ReactNode;
    layout?: BoxLayout;
    onCategoryExpand?: () => void;
    onCategoryNameRegion?: () => void;
}

export const NavigatorFrame2LayoutCategoryContainerCollapsedItem = ({ captionCategoryName, itemsCategoryControlsItemlist, layout, onCategoryExpand, onCategoryNameRegion }: NavigatorFrame2LayoutCategoryContainerCollapsedItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_container_collapsed"
            tags={[ 'TEMPLATE', 'category_container_collapsed' ]}
            params={16528}
            layout={{ width: 387, height: 26, flexShrink: 0, ...layout }}
        >
            <Region
                name="category_header"
                tags={[ 'category_header' ]}
                params={144}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26 }}
            >
                <Region
                    name="category_name_region"
                    params={131089}
                    onPointerTap={onCategoryNameRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 209, top: 0, height: 27 }}
                >
                    <Region
                        name="category_expand"
                        tooltip={t('navigator.tooltip.category.expand')}
                        params={17}
                        onPointerTap={onCategoryExpand}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 18 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('newnavigator_button_category_expand.png')}
                            layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
                        />
                    </Region>
                    <Region
                        name="category_name"
                        params={16}
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
                    params={262160}
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
            params={16}
            layout={{ width: 388, height: 53, flexShrink: 0, ...layout }}
        >
            <Region
                params={3932240}
                layout={{ position: 'absolute', right: 51, width: 286, alignSelf: 'center', marginTop: -16, marginBottom: 16, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('navigator.search.returned.no.results')}
                    textStyle="text-style-u-headline-medium"
                />
            </Region>
        </Region>
    );
};
