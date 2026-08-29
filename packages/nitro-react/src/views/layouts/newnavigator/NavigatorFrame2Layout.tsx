import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `138_navigator_frame_2_xml` (layout "navigator_frame_2", 578x628) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NavigatorFrame2LayoutProps {
    layout?: BoxLayout;
    leftPaneHide?: NavigatorFrame2LayoutLeftPaneHideProps;
    onClose?: () => void;
    onTopViewSelectTabButton?: () => void;
    quicklinksList?: NavigatorFrame2LayoutQuicklinksListProps;
    rightPane?: NavigatorFrame2LayoutRightPaneProps;
    tempBack?: NavigatorFrame2LayoutTempBackProps;
    whiteBackground?: NavigatorFrame2LayoutWhiteBackgroundProps;
}

export const NavigatorFrame2Layout = ({ layout, leftPaneHide, onClose, onTopViewSelectTabButton, quicklinksList, rightPane, tempBack, whiteBackground }: NavigatorFrame2LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('navigator.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 578, height: 628, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="3"
                    tintColor="#eceae0"
                    layout={{ position: 'absolute', left: -3, right: 4, top: -3, bottom: 53 }}
                />
                <NavigatorFrame2LayoutWhiteBackground {...whiteBackground} />
                <Border
                    variant="2"
                    name="left_pane"
                    layout={{ position: 'absolute', left: 6, width: 141, top: 35, bottom: 55 }}
                >
                    <NavigatorFrame2LayoutLeftPaneHide {...leftPaneHide} />
                    <NavigatorFrame2LayoutQuicklinksList {...quicklinksList} />
                </Border>
                <NavigatorFrame2LayoutRightPane {...rightPane} />
                <NavigatorFrame2LayoutTempBack {...tempBack} />
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
            </Region>
        </Frame>
    );
};

/** Named region `white_background` of NavigatorFrame2Layout - configured through the parent's `whiteBackground` prop. */
export interface NavigatorFrame2LayoutWhiteBackgroundProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutWhiteBackground = ({ layout, tags }: NavigatorFrame2LayoutWhiteBackgroundProps) => {
    return (
        <Region
            name="white_background"
            tags={tags}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: -2, right: 4, top: -5, height: 33, ...layout }}
        />
    );
};

/** Named region `left_hide_container` of NavigatorFrame2Layout - configured through the parent's `leftHideContainer` prop. */
export interface NavigatorFrame2LayoutLeftHideContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutLeftHideContainer = ({ layout, tags }: NavigatorFrame2LayoutLeftHideContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="left_hide_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 18, ...layout }}
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
    );
};

/** Named region `left_show_container` of NavigatorFrame2Layout - configured through the parent's `leftShowContainer` prop. */
export interface NavigatorFrame2LayoutLeftShowContainerProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleLeftShowContainer?: boolean;
}

export const NavigatorFrame2LayoutLeftShowContainer = ({ layout, tags, visibleLeftShowContainer }: NavigatorFrame2LayoutLeftShowContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="left_show_container"
            tags={tags}
            visible={visibleLeftShowContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 18, ...layout }}
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
    );
};

/** Named region `left_pane_hide` of NavigatorFrame2Layout - configured through the parent's `leftPaneHide` prop. */
export interface NavigatorFrame2LayoutLeftPaneHideProps {
    layout?: BoxLayout;
    leftHideContainer?: NavigatorFrame2LayoutLeftHideContainerProps;
    leftShowContainer?: NavigatorFrame2LayoutLeftShowContainerProps;
    onLeftPaneHide?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutLeftPaneHide = ({ layout, leftHideContainer, leftShowContainer, onLeftPaneHide, tags }: NavigatorFrame2LayoutLeftPaneHideProps) => {
    return (
        <Region
            name="left_pane_hide"
            tags={tags}
            onPointerTap={onLeftPaneHide}
            cursor="pointer"
            layout={{ position: 'absolute', left: -6, width: 149, top: 0, height: 21, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#fba800"
                layout={{ position: 'absolute', left: 6, width: 141, top: 0, height: 27 }}
            >
                <NavigatorFrame2LayoutLeftHideContainer {...leftHideContainer} />
                <NavigatorFrame2LayoutLeftShowContainer {...leftShowContainer} />
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
    tags?: string[];
    visibleRemoveQuickLink?: boolean;
}

export const NavigatorFrame2LayoutQuickLinkItem = ({ captionQuickLinkText, layout, onQuickLink, onRemoveQuickLink, tags, visibleRemoveQuickLink }: NavigatorFrame2LayoutQuickLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="quick_link"
            tags={tags}
            tooltip={t('navigator.tooltip.open.saved.search')}
            onPointerTap={onQuickLink}
            cursor="pointer"
            layout={{ width: 132, height: 17, flexShrink: 0, ...layout }}
        >
            <Region
                name="quick_link_text"
                tags={[ 'TEMPLATE' ]}
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
                    onPointerTap={onRemoveQuickLink}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <ThemeImage
                        src={layoutImage('newnavigator_icon_ql_remove.png')}
                        layout={{ position: 'absolute', left: 3, width: 10, top: 3, height: 10 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Named region `quicklinks_list` of NavigatorFrame2Layout - configured through the parent's `quicklinksList` prop. */
export interface NavigatorFrame2LayoutQuicklinksListProps {
    itemsQuicklinksList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutQuicklinksList = ({ itemsQuicklinksList, layout, tags }: NavigatorFrame2LayoutQuicklinksListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 5, width: 136, top: 25, bottom: 4, ...layout }}
        >
            <Region
                name="quicklinks_list"
                tags={tags}
                layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
            >
                {itemsQuicklinksList ?? (
                    <NavigatorFrame2LayoutQuickLinkItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `create_room` of NavigatorFrame2Layout - configured through the parent's `createRoom` prop. */
export interface NavigatorFrame2LayoutCreateRoomProps {
    layout?: BoxLayout;
    onCreateRoom?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutCreateRoom = ({ layout, onCreateRoom, tags }: NavigatorFrame2LayoutCreateRoomProps) => {
    const t = useTranslation();

    return (
        <Region
            name="create_room"
            tags={tags}
            tooltip={t('navigator.tooltip.create.room')}
            onPointerTap={onCreateRoom}
            cursor="pointer"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2, ...layout }}
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
    );
};

/** Named region `random_room` of NavigatorFrame2Layout - configured through the parent's `randomRoom` prop. */
export interface NavigatorFrame2LayoutRandomRoomProps {
    layout?: BoxLayout;
    onRandomRoom?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutRandomRoom = ({ layout, onRandomRoom, tags }: NavigatorFrame2LayoutRandomRoomProps) => {
    const t = useTranslation();

    return (
        <Region
            name="random_room"
            tags={tags}
            tooltip={t('navigator.tooltip.random.room')}
            onPointerTap={onRandomRoom}
            cursor="pointer"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2, ...layout }}
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
    );
};

/** Named region `promote_room` of NavigatorFrame2Layout - configured through the parent's `promoteRoom` prop. */
export interface NavigatorFrame2LayoutPromoteRoomProps {
    layout?: BoxLayout;
    onPromoteRoom?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutPromoteRoom = ({ layout, onPromoteRoom, tags }: NavigatorFrame2LayoutPromoteRoomProps) => {
    const t = useTranslation();

    return (
        <Region
            name="promote_room"
            tags={tags}
            tooltip={t('navigator.tooltip.promote.room')}
            onPointerTap={onPromoteRoom}
            cursor="pointer"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2, ...layout }}
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
    );
};

/** Named region `clear_search_button` of NavigatorFrame2Layout - configured through the parent's `clearSearchButton` prop. */
export interface NavigatorFrame2LayoutClearSearchButtonProps {
    layout?: BoxLayout;
    onClearSearchButton?: () => void;
    srcSearchClearIcon?: string;
    tags?: string[];
}

export const NavigatorFrame2LayoutClearSearchButton = ({ layout, onClearSearchButton, srcSearchClearIcon, tags }: NavigatorFrame2LayoutClearSearchButtonProps) => {
    return (
        <Region
            name="clear_search_button"
            tags={tags}
            onPointerTap={onClearSearchButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 215, width: 20, top: 4, height: 20, ...layout }}
        >
            <ThemeImage
                name="search.clear.icon"
                src={srcSearchClearIcon ?? layoutImage('common_small_pen.png')}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `refreshButtonContainer` of NavigatorFrame2Layout - configured through the parent's `refreshButtonContainer` prop. */
export interface NavigatorFrame2LayoutRefreshButtonContainerProps {
    layout?: BoxLayout;
    onRefreshButton?: () => void;
    tags?: string[];
    visibleRefreshButtonContainer?: boolean;
}

export const NavigatorFrame2LayoutRefreshButtonContainer = ({ layout, onRefreshButton, tags, visibleRefreshButtonContainer }: NavigatorFrame2LayoutRefreshButtonContainerProps) => {
    return (
        <Region
            name="refreshButtonContainer"
            tags={tags}
            visible={visibleRefreshButtonContainer ?? false}
            layout={{ position: 'absolute', left: 375, width: 25, top: 10, height: 25, ...layout }}
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
    );
};

/** Named region `search_tools` of NavigatorFrame2Layout - configured through the parent's `searchTools` prop. */
export interface NavigatorFrame2LayoutSearchToolsProps {
    clearSearchButton?: NavigatorFrame2LayoutClearSearchButtonProps;
    layout?: BoxLayout;
    onFilterTypeDropMenu?: () => void;
    refreshButtonContainer?: NavigatorFrame2LayoutRefreshButtonContainerProps;
    tags?: string[];
}

export const NavigatorFrame2LayoutSearchTools = ({ clearSearchButton, layout, onFilterTypeDropMenu, refreshButtonContainer, tags }: NavigatorFrame2LayoutSearchToolsProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region
            name="search_tools"
            tags={tags}
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
                <NavigatorFrame2LayoutClearSearchButton {...clearSearchButton} />
            </Border>
            <NavigatorFrame2LayoutRefreshButtonContainer {...refreshButtonContainer} />
        </Region>
    );
};

/** Named region `category_collapse` of NavigatorFrame2Layout - configured through the parent's `categoryCollapse` prop. */
export interface NavigatorFrame2LayoutCategoryCollapseProps {
    layout?: BoxLayout;
    onCategoryCollapse?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryCollapse = ({ layout, onCategoryCollapse, tags }: NavigatorFrame2LayoutCategoryCollapseProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_collapse"
            tags={tags}
            tooltip={t('navigator.tooltip.category.collapse')}
            onPointerTap={onCategoryCollapse}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, width: 11, top: 7, height: 19, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_button_category_collapse.png')}
                layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
            />
        </Region>
    );
};

/** Named region `category_name_region` of NavigatorFrame2Layout - configured through the parent's `categoryNameRegion` prop. */
export interface NavigatorFrame2LayoutCategoryNameRegionProps {
    captionCategoryName?: string;
    layout?: BoxLayout;
    onCategoryNameRegion?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryNameRegion = ({ captionCategoryName, layout, onCategoryNameRegion, tags }: NavigatorFrame2LayoutCategoryNameRegionProps) => {
    return (
        <Region
            name="category_name_region"
            tags={tags}
            onPointerTap={onCategoryNameRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 27, ...layout }}
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
    );
};

/** Row template `category_toggle_tiles` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryToggleTilesItemProps {
    layout?: BoxLayout;
    onCategoryToggleTiles?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryToggleTilesItem = ({ layout, onCategoryToggleTiles, tags }: NavigatorFrame2LayoutCategoryToggleTilesItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_toggle_tiles"
            tags={tags}
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
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryToggleRowsItem = ({ layout, onCategoryToggleRows, tags }: NavigatorFrame2LayoutCategoryToggleRowsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_toggle_rows"
            tags={tags}
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
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryShowMoreItem = ({ layout, onCategoryShowMore, tags }: NavigatorFrame2LayoutCategoryShowMoreItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_show_more"
            tags={tags}
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
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryBackItem = ({ layout, onCategoryBack, tags }: NavigatorFrame2LayoutCategoryBackItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_back"
            tags={tags}
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
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryAddQuickLinkItem = ({ layout, onCategoryAddQuickLink, tags }: NavigatorFrame2LayoutCategoryAddQuickLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_add_quick_link"
            tags={tags}
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
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryControlsItemlist = ({ itemsCategoryControlsItemlist, layout, tags }: NavigatorFrame2LayoutCategoryControlsItemlistProps) => {
    return (
        <Region
            name="category_controls_itemlist"
            tags={tags}
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
    categoryCollapse?: NavigatorFrame2LayoutCategoryCollapseProps;
    categoryControlsItemlist?: NavigatorFrame2LayoutCategoryControlsItemlistProps;
    categoryNameRegion?: NavigatorFrame2LayoutCategoryNameRegionProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryHeader = ({ categoryCollapse, categoryControlsItemlist, categoryNameRegion, layout, tags }: NavigatorFrame2LayoutCategoryHeaderProps) => {
    return (
        <Region
            name="category_header"
            tags={tags}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30, ...layout }}
        >
            <NavigatorFrame2LayoutCategoryCollapse {...categoryCollapse} />
            <NavigatorFrame2LayoutCategoryNameRegion {...categoryNameRegion} />
            <NavigatorFrame2LayoutCategoryControlsItemlist {...categoryControlsItemlist} />
        </Region>
    );
};

/** Named region `go_to_room_region` of NavigatorFrame2Layout - configured through the parent's `goToRoomRegion` prop. */
export interface NavigatorFrame2LayoutGoToRoomRegionProps {
    layout?: BoxLayout;
    onGoToRoomRegion?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutGoToRoomRegion = ({ layout, onGoToRoomRegion, tags }: NavigatorFrame2LayoutGoToRoomRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="go_to_room_region"
            tags={tags}
            tooltip={t('navigator.tooltip.go.to.room')}
            onPointerTap={onGoToRoomRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 146, ...layout }}
        />
    );
};

/** Row template `room_usercount_icon` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutRoomUsercountIconItemProps {
    layout?: BoxLayout;
    srcRoomUsercountIcon?: string;
    tags?: string[];
}

export const NavigatorFrame2LayoutRoomUsercountIconItem = ({ layout, srcRoomUsercountIcon, tags }: NavigatorFrame2LayoutRoomUsercountIconItemProps) => {
    return (
        <ThemeImage
            name="room_usercount_icon"
            tags={tags}
            src={srcRoomUsercountIcon ?? layoutImage('newnavigator_icon_usercount.png')}
            layout={{ width: 13, height: 14, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `room_usercount` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutRoomUsercountItemProps {
    captionRoomUsercount?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutRoomUsercountItem = ({ captionRoomUsercount, layout, tags }: NavigatorFrame2LayoutRoomUsercountItemProps) => {
    return (
        <Region
            name="room_usercount"
            tags={tags}
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

/** Named region `usercount` of NavigatorFrame2Layout - configured through the parent's `usercount` prop. */
export interface NavigatorFrame2LayoutUsercountProps {
    itemsUsercount?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutUsercount = ({ itemsUsercount, layout, tags }: NavigatorFrame2LayoutUsercountProps) => {
    return (
        <Region
            name="usercount"
            tags={tags}
            layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 31, top: 1, height: 15, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsUsercount ?? (
                <>
                    <NavigatorFrame2LayoutRoomUsercountIconItem />
                    <NavigatorFrame2LayoutRoomUsercountItem />
                </>
            )}
        </Region>
    );
};

/** Named region `info_popup_click_region` of NavigatorFrame2Layout - configured through the parent's `infoPopupClickRegion` prop. */
export interface NavigatorFrame2LayoutInfoPopupClickRegionProps {
    layout?: BoxLayout;
    onInfoPopupClickRegion?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutInfoPopupClickRegion = ({ layout, onInfoPopupClickRegion, tags }: NavigatorFrame2LayoutInfoPopupClickRegionProps) => {
    return (
        <Region
            name="info_popup_click_region"
            tags={tags}
            onPointerTap={onInfoPopupClickRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 98, width: 18, top: 120, height: 18, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_button_show_room_info.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
            />
        </Region>
    );
};

/** Row template `navigator_entry_tile` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNavigatorEntryTileItemProps {
    captionRoomName?: string;
    goToRoomRegion?: NavigatorFrame2LayoutGoToRoomRegionProps;
    infoPopupClickRegion?: NavigatorFrame2LayoutInfoPopupClickRegionProps;
    layout?: BoxLayout;
    srcDoormodeIcon?: string;
    srcRoomPicPlaceholder?: string;
    tags?: string[];
    usercount?: NavigatorFrame2LayoutUsercountProps;
}

export const NavigatorFrame2LayoutNavigatorEntryTileItem = ({ captionRoomName, goToRoomRegion, infoPopupClickRegion, layout, srcDoormodeIcon, srcRoomPicPlaceholder, tags, usercount }: NavigatorFrame2LayoutNavigatorEntryTileItemProps) => {
    return (
        <Border
            variant="10"
            name="navigator_entry_tile"
            tags={tags}
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
            <WidgetSlot
                widgetType="badge_image"
                name="room_group_badge"
                visible={false}
                options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 4, width: 50, top: -3, height: 61 }}
            />
            <NavigatorFrame2LayoutGoToRoomRegion {...goToRoomRegion} />
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
                <NavigatorFrame2LayoutUsercount {...usercount} />
            </Border>
            <ThemeImage
                name="doormode_icon"
                src={srcDoormodeIcon}
                layout={{ position: 'absolute', left: 92, width: 16, top: 96, height: 14 }}
            />
            <NavigatorFrame2LayoutInfoPopupClickRegion {...infoPopupClickRegion} />
        </Border>
    );
};

/** Row template `navigator_entry_tile_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNavigatorEntryTileContainerItemProps {
    itemsNavigatorEntryTileContainer?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutNavigatorEntryTileContainerItem = ({ itemsNavigatorEntryTileContainer, layout, tags }: NavigatorFrame2LayoutNavigatorEntryTileContainerItemProps) => {
    return (
        <Region
            name="navigator_entry_tile_container"
            tags={tags}
            layout={{ width: 392, height: 146, flexShrink: 0, flexDirection: 'row', gap: 7, ...layout }}
        >
            {itemsNavigatorEntryTileContainer ?? (
                <NavigatorFrame2LayoutNavigatorEntryTileItem tags={[ 'SUBTEMPLATE' ]} />
            )}
        </Region>
    );
};

/** Row template `room_usercount_icon` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutRoomUsercountIconItem2Props {
    layout?: BoxLayout;
    srcRoomUsercountIcon?: string;
    tags?: string[];
}

export const NavigatorFrame2LayoutRoomUsercountIconItem2 = ({ layout, srcRoomUsercountIcon, tags }: NavigatorFrame2LayoutRoomUsercountIconItem2Props) => {
    return (
        <ThemeImage
            name="room_usercount_icon"
            tags={tags}
            src={srcRoomUsercountIcon ?? layoutImage('newnavigator_icon_usercount.png')}
            layout={{ width: 13, height: 14, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `room_usercount` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutRoomUsercountItem2Props {
    captionRoomUsercount?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutRoomUsercountItem2 = ({ captionRoomUsercount, layout, tags }: NavigatorFrame2LayoutRoomUsercountItem2Props) => {
    return (
        <Region
            name="room_usercount"
            tags={tags}
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

/** Named region `usercount` of NavigatorFrame2Layout - configured through the parent's `usercount` prop. */
export interface NavigatorFrame2LayoutUsercount2Props {
    itemsUsercount?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutUsercount2 = ({ itemsUsercount, layout, tags }: NavigatorFrame2LayoutUsercount2Props) => {
    return (
        <Region
            name="usercount"
            tags={tags}
            layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 31, top: 1, height: 15, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsUsercount ?? (
                <>
                    <NavigatorFrame2LayoutRoomUsercountIconItem2 />
                    <NavigatorFrame2LayoutRoomUsercountItem2 />
                </>
            )}
        </Region>
    );
};

/** Named region `info_popup_click_region` of NavigatorFrame2Layout - configured through the parent's `infoPopupClickRegion` prop. */
export interface NavigatorFrame2LayoutInfoPopupClickRegion2Props {
    layout?: BoxLayout;
    onInfoPopupClickRegion?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutInfoPopupClickRegion2 = ({ layout, onInfoPopupClickRegion, tags }: NavigatorFrame2LayoutInfoPopupClickRegion2Props) => {
    return (
        <Region
            name="info_popup_click_region"
            tags={tags}
            onPointerTap={onInfoPopupClickRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 4, width: 18, top: 0, height: 18, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_button_show_room_info.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
            />
        </Region>
    );
};

/** Named region `room_info_container` of NavigatorFrame2Layout - configured through the parent's `roomInfoContainer` prop. */
export interface NavigatorFrame2LayoutRoomInfoContainerProps {
    captionRoomName?: string;
    infoPopupClickRegion?: NavigatorFrame2LayoutInfoPopupClickRegion2Props;
    layout?: BoxLayout;
    srcDoormodeIcon?: string;
    srcGrouphomeIcon?: string;
    tags?: string[];
    usercount?: NavigatorFrame2LayoutUsercount2Props;
}

export const NavigatorFrame2LayoutRoomInfoContainer = ({ captionRoomName, infoPopupClickRegion, layout, srcDoormodeIcon, srcGrouphomeIcon, tags, usercount }: NavigatorFrame2LayoutRoomInfoContainerProps) => {
    return (
        <Region
            name="room_info_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 2, top: 1, height: 18, ...layout }}
        >
            <Border
                variant="3"
                name="room_info_usercount_border"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 18, justifyContent: 'center' }}
            >
                <NavigatorFrame2LayoutUsercount2 {...usercount} />
            </Border>
            <Region
                name="room_name"
                layout={{ position: 'absolute', left: 44, right: 55, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionRoomName ?? 'Room Name PH'} />
            </Region>
            <NavigatorFrame2LayoutInfoPopupClickRegion2 {...infoPopupClickRegion} />
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

/** Named region `go_to_room_region` of NavigatorFrame2Layout - configured through the parent's `goToRoomRegion` prop. */
export interface NavigatorFrame2LayoutGoToRoomRegion2Props {
    layout?: BoxLayout;
    onGoToRoomRegion?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutGoToRoomRegion2 = ({ layout, onGoToRoomRegion, tags }: NavigatorFrame2LayoutGoToRoomRegion2Props) => {
    return (
        <Region
            name="go_to_room_region"
            tags={tags}
            onPointerTap={onGoToRoomRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 357, top: 0, height: 20, ...layout }}
        />
    );
};

/** Row template `navigator_entry_row_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNavigatorEntryRowContainerItemProps {
    goToRoomRegion?: NavigatorFrame2LayoutGoToRoomRegion2Props;
    layout?: BoxLayout;
    roomInfoContainer?: NavigatorFrame2LayoutRoomInfoContainerProps;
    tags?: string[];
}

export const NavigatorFrame2LayoutNavigatorEntryRowContainerItem = ({ goToRoomRegion, layout, roomInfoContainer, tags }: NavigatorFrame2LayoutNavigatorEntryRowContainerItemProps) => {
    return (
        <Border
            variant="3"
            name="navigator_entry_row_container"
            tags={tags}
            layout={{ width: 383, height: 20, flexShrink: 0, ...layout }}
        >
            <NavigatorFrame2LayoutRoomInfoContainer {...roomInfoContainer} />
            <NavigatorFrame2LayoutGoToRoomRegion2 {...goToRoomRegion} />
        </Border>
    );
};

/** Named region `category_content` of NavigatorFrame2Layout - configured through the parent's `categoryContent` prop. */
export interface NavigatorFrame2LayoutCategoryContentProps {
    itemsCategoryContent?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryContent = ({ itemsCategoryContent, layout, tags }: NavigatorFrame2LayoutCategoryContentProps) => {
    return (
        <Region
            name="category_content"
            tags={tags}
            layout={{ position: 'absolute', left: 4, right: 5, top: 29, height: 171, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsCategoryContent ?? (
                <>
                    <NavigatorFrame2LayoutNavigatorEntryTileContainerItem tags={[ 'TEMPLATE' ]} />
                    <NavigatorFrame2LayoutNavigatorEntryRowContainerItem tags={[ 'TEMPLATE' ]} />
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
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryContentBackground = ({ categoryContent, categoryHeader, layout, tags }: NavigatorFrame2LayoutCategoryContentBackgroundProps) => {
    return (
        <Region
            name="category_content_background"
            tags={tags}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 396, top: 0, height: 200, ...layout }}
        >
            <NavigatorFrame2LayoutCategoryHeader
                tags={[ 'category_header' ]}
                {...categoryHeader}
            />
            <NavigatorFrame2LayoutCategoryContent {...categoryContent} />
        </Region>
    );
};

/** Row template `category_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryContainerItemProps {
    categoryContentBackground?: NavigatorFrame2LayoutCategoryContentBackgroundProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryContainerItem = ({ categoryContentBackground, layout, tags }: NavigatorFrame2LayoutCategoryContainerItemProps) => {
    return (
        <Region
            name="category_container"
            tags={tags}
            layout={{ width: 396, height: 200, flexShrink: 0, ...layout }}
        >
            <NavigatorFrame2LayoutCategoryContentBackground {...categoryContentBackground} />
        </Region>
    );
};

/** Named region `category_expand` of NavigatorFrame2Layout - configured through the parent's `categoryExpand` prop. */
export interface NavigatorFrame2LayoutCategoryExpandProps {
    layout?: BoxLayout;
    onCategoryExpand?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryExpand = ({ layout, onCategoryExpand, tags }: NavigatorFrame2LayoutCategoryExpandProps) => {
    const t = useTranslation();

    return (
        <Region
            name="category_expand"
            tags={tags}
            tooltip={t('navigator.tooltip.category.expand')}
            onPointerTap={onCategoryExpand}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 18, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_button_category_expand.png')}
                layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
            />
        </Region>
    );
};

/** Named region `category_name_region` of NavigatorFrame2Layout - configured through the parent's `categoryNameRegion` prop. */
export interface NavigatorFrame2LayoutCategoryNameRegion2Props {
    captionCategoryName?: string;
    categoryExpand?: NavigatorFrame2LayoutCategoryExpandProps;
    layout?: BoxLayout;
    onCategoryNameRegion?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryNameRegion2 = ({ captionCategoryName, categoryExpand, layout, onCategoryNameRegion, tags }: NavigatorFrame2LayoutCategoryNameRegion2Props) => {
    return (
        <Region
            name="category_name_region"
            tags={tags}
            onPointerTap={onCategoryNameRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 209, top: 0, height: 27, ...layout }}
        >
            <NavigatorFrame2LayoutCategoryExpand {...categoryExpand} />
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
    );
};

/** Row template `category_show_more` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryShowMoreItem2Props {
    layout?: BoxLayout;
    onCategoryShowMore?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryShowMoreItem2 = ({ layout, onCategoryShowMore, tags }: NavigatorFrame2LayoutCategoryShowMoreItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="category_show_more"
            tags={tags}
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
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryAddQuickLinkItem2 = ({ layout, onCategoryAddQuickLink, tags }: NavigatorFrame2LayoutCategoryAddQuickLinkItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="category_add_quick_link"
            tags={tags}
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

/** Named region `category_controls_itemlist` of NavigatorFrame2Layout - configured through the parent's `categoryControlsItemlist` prop. */
export interface NavigatorFrame2LayoutCategoryControlsItemlist2Props {
    itemsCategoryControlsItemlist?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryControlsItemlist2 = ({ itemsCategoryControlsItemlist, layout, tags }: NavigatorFrame2LayoutCategoryControlsItemlist2Props) => {
    return (
        <Region
            name="category_controls_itemlist"
            tags={tags}
            layout={{ position: 'absolute', right: 4, width: 36, top: 1, height: 24, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsCategoryControlsItemlist ?? (
                <>
                    <NavigatorFrame2LayoutCategoryShowMoreItem2 />
                    <NavigatorFrame2LayoutCategoryAddQuickLinkItem2 />
                </>
            )}
        </Region>
    );
};

/** Named region `category_header` of NavigatorFrame2Layout - configured through the parent's `categoryHeader` prop. */
export interface NavigatorFrame2LayoutCategoryHeader2Props {
    categoryControlsItemlist?: NavigatorFrame2LayoutCategoryControlsItemlist2Props;
    categoryNameRegion?: NavigatorFrame2LayoutCategoryNameRegion2Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryHeader2 = ({ categoryControlsItemlist, categoryNameRegion, layout, tags }: NavigatorFrame2LayoutCategoryHeader2Props) => {
    return (
        <Region
            name="category_header"
            tags={tags}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26, ...layout }}
        >
            <NavigatorFrame2LayoutCategoryNameRegion2 {...categoryNameRegion} />
            <NavigatorFrame2LayoutCategoryControlsItemlist2 {...categoryControlsItemlist} />
        </Region>
    );
};

/** Row template `category_container_collapsed` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryContainerCollapsedItemProps {
    categoryHeader?: NavigatorFrame2LayoutCategoryHeader2Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutCategoryContainerCollapsedItem = ({ categoryHeader, layout, tags }: NavigatorFrame2LayoutCategoryContainerCollapsedItemProps) => {
    return (
        <Region
            name="category_container_collapsed"
            tags={tags}
            layout={{ width: 387, height: 26, flexShrink: 0, ...layout }}
        >
            <NavigatorFrame2LayoutCategoryHeader2
                tags={[ 'category_header' ]}
                {...categoryHeader}
            />
        </Region>
    );
};

/** Row template `no_results_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNoResultsContainerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const NavigatorFrame2LayoutNoResultsContainerItem = ({ layout, tags }: NavigatorFrame2LayoutNoResultsContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="no_results_container"
            tags={tags}
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
    tags?: string[];
}

export const NavigatorFrame2LayoutBlockResults = ({ itemsBlockResults, layout, tags }: NavigatorFrame2LayoutBlockResultsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 1, right: 2, top: 45, bottom: 80, ...layout }}
        >
            <Region
                name="block_results"
                tags={tags}
                layout={{ flexDirection: 'column', gap: 5, width: '100%' }}
            >
                {itemsBlockResults ?? (
                    <>
                        <NavigatorFrame2LayoutCategoryContainerItem tags={[ 'TEMPLATE', 'category_container' ]} />
                        <NavigatorFrame2LayoutCategoryContainerCollapsedItem tags={[ 'TEMPLATE', 'category_container_collapsed' ]} />
                        <NavigatorFrame2LayoutNoResultsContainerItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `search_waiting_for_results_mask` of NavigatorFrame2Layout - configured through the parent's `searchWaitingForResultsMask` prop. */
export interface NavigatorFrame2LayoutSearchWaitingForResultsMaskProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleSearchWaitingForResultsMask?: boolean;
}

export const NavigatorFrame2LayoutSearchWaitingForResultsMask = ({ layout, tags, visibleSearchWaitingForResultsMask }: NavigatorFrame2LayoutSearchWaitingForResultsMaskProps) => {
    return (
        <Region
            name="search_waiting_for_results_mask"
            tags={tags}
            visible={visibleSearchWaitingForResultsMask ?? false}
            backgroundColor="#eceae0"
            layout={{ position: 'absolute', left: 0, right: 18, top: 42, bottom: 77, ...layout }}
        />
    );
};

/** Named region `right_pane` of NavigatorFrame2Layout - configured through the parent's `rightPane` prop. */
export interface NavigatorFrame2LayoutRightPaneProps {
    blockResults?: NavigatorFrame2LayoutBlockResultsProps;
    createRoom?: NavigatorFrame2LayoutCreateRoomProps;
    layout?: BoxLayout;
    promoteRoom?: NavigatorFrame2LayoutPromoteRoomProps;
    randomRoom?: NavigatorFrame2LayoutRandomRoomProps;
    searchTools?: NavigatorFrame2LayoutSearchToolsProps;
    searchWaitingForResultsMask?: NavigatorFrame2LayoutSearchWaitingForResultsMaskProps;
    tags?: string[];
    visiblePromoteRoomBorder?: boolean;
}

export const NavigatorFrame2LayoutRightPane = ({ blockResults, createRoom, layout, promoteRoom, randomRoom, searchTools, searchWaitingForResultsMask, tags, visiblePromoteRoomBorder }: NavigatorFrame2LayoutRightPaneProps) => {
    return (
        <Region
            name="right_pane"
            tags={tags}
            layout={{ position: 'absolute', left: 159, right: 9, top: 25, bottom: 55, justifyContent: 'center', ...layout }}
        >
            <Border
                variant="4"
                name="create_room_border"
                layout={{ position: 'absolute', left: 0, width: 189, bottom: 0, height: 60 }}
            >
                <NavigatorFrame2LayoutCreateRoom {...createRoom} />
            </Border>
            <Border
                variant="5"
                name="random_room_border"
                layout={{ position: 'absolute', left: 205, width: 189, bottom: 0, height: 60 }}
            >
                <NavigatorFrame2LayoutRandomRoom {...randomRoom} />
            </Border>
            <Region
                visible={visiblePromoteRoomBorder ?? false}
                layout={{ position: 'absolute', left: 205, width: 189, bottom: 0, height: 60 }}
            >
                <Border
                    variant="5"
                    name="promote_room_border"
                    layout={{ width: '100%', height: '100%' }}
                >
                    <NavigatorFrame2LayoutPromoteRoom {...promoteRoom} />
                </Border>
            </Region>
            <NavigatorFrame2LayoutSearchTools {...searchTools} />
            <NavigatorFrame2LayoutBlockResults
                tags={[ 'block_results' ]}
                {...blockResults}
            />
            <NavigatorFrame2LayoutSearchWaitingForResultsMask {...searchWaitingForResultsMask} />
        </Region>
    );
};

/** Named region `temp_back` of NavigatorFrame2Layout - configured through the parent's `tempBack` prop. */
export interface NavigatorFrame2LayoutTempBackProps {
    layout?: BoxLayout;
    onTempBack?: () => void;
    tags?: string[];
}

export const NavigatorFrame2LayoutTempBack = ({ layout, onTempBack, tags }: NavigatorFrame2LayoutTempBackProps) => {
    const t = useTranslation();

    return (
        <Region
            name="temp_back"
            tags={tags}
            tooltip={t('navigator.tooltip.left.show.hide')}
            onPointerTap={onTempBack}
            cursor="pointer"
            layout={{ position: 'absolute', left: 4, width: 28, top: 2, height: 25, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_button_quicklink_add.png')}
                layout={{ position: 'absolute', left: 10, width: 18, top: 2, height: 19 }}
            />
        </Region>
    );
};
