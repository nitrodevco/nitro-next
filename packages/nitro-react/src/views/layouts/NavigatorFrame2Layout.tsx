import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `138_navigator_frame_2_xml` (layout "navigator_frame_2", 578x628) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NavigatorFrame2LayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onFilterTypeDropMenu?: () => void;
    onRefreshButton?: () => void;
    onRemoveQuickLink?: () => void;
    onTopViewSelectTabButton?: () => void;
}

export const NavigatorFrame2Layout = ({ layout, onClose, onFilterTypeDropMenu, onRefreshButton, onRemoveQuickLink, onTopViewSelectTabButton }: NavigatorFrame2LayoutProps) => {
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
                    layout={{ position: 'absolute', left: -3, width: 577, top: -3, height: 578 }}
                />
                <Region
                    name="white_background"
                    params={128}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: -2, width: 576, top: -5, height: 33 }}
                />
                <Border
                    variant="2"
                    name="left_pane"
                    params={2064}
                    layout={{ position: 'absolute', left: 6, width: 141, top: 35, height: 538 }}
                >
                    <Region
                        name="left_pane_hide"
                        params={17}
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
                                visible={false}
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
                        layout={{ position: 'absolute', left: 5, width: 136, top: 25, height: 509 }}
                    >
                        <Region
                            name="quicklinks_list"
                            params={2064}
                            layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
                        >
                            <Region
                                name="quick_link"
                                tooltip={t('navigator.tooltip.open.saved.search')}
                                params={17}
                                layout={{ width: 132, height: 17, flexShrink: 0 }}
                            >
                                <Region
                                    name="quick_link_text"
                                    tags={[ 'TEMPLATE' ]}
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text="quick link ph oijasdf oaijs dfodisjf" />
                                </Region>
                                <Region
                                    visible={false}
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
                        </Region>
                    </ScrollArea>
                </Border>
                <Region
                    name="right_pane"
                    params={2192}
                    layout={{ position: 'absolute', left: 159, width: 410, top: 25, height: 548 }}
                >
                    <Border
                        variant="4"
                        name="create_room_border"
                        params={1040}
                        layout={{ position: 'absolute', left: 0, width: 189, top: 488, height: 60 }}
                    >
                        <Region
                            name="create_room"
                            tooltip={t('navigator.tooltip.create.room')}
                            params={2193}
                            layout={{ position: 'absolute', left: 2, width: 185, top: 2, height: 56 }}
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
                        layout={{ position: 'absolute', left: 205, width: 189, top: 488, height: 60 }}
                    >
                        <Region
                            name="random_room"
                            tooltip={t('navigator.tooltip.random.room')}
                            params={2193}
                            layout={{ position: 'absolute', left: 2, width: 185, top: 2, height: 56 }}
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
                        visible={false}
                        layout={{ position: 'absolute', left: 205, width: 189, top: 488, height: 60 }}
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
                                layout={{ position: 'absolute', left: 2, width: 185, top: 2, height: 56 }}
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
                        layout={{ position: 'absolute', left: 0, width: 408, top: 3, height: 36 }}
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
                                layout={{ position: 'absolute', left: 215, width: 20, top: 4, height: 20 }}
                            >
                                <ThemeImage
                                    name="search.clear.icon"
                                    params={16}
                                    src={layoutImage('common_small_pen.png')}
                                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                />
                            </Region>
                        </Border>
                        <Region
                            name="refreshButtonContainer"
                            params={16}
                            visible={false}
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
                        layout={{ position: 'absolute', left: 1, width: 407, top: 45, height: 423 }}
                    >
                        <Region
                            name="block_results"
                            tags={[ 'block_results' ]}
                            params={2192}
                            layout={{ flexDirection: 'column', gap: 5, width: '100%' }}
                        >
                            <Region
                                name="category_container"
                                tags={[ 'TEMPLATE', 'category_container' ]}
                                params={147600}
                                layout={{ width: 396, height: 200, flexShrink: 0 }}
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
                                        layout={{ position: 'absolute', left: 0, width: 396, top: 0, height: 30 }}
                                    >
                                        <Region
                                            name="category_collapse"
                                            tooltip={t('navigator.tooltip.category.collapse')}
                                            params={17}
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
                                            layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 27 }}
                                        >
                                            <Region
                                                name="category_name"
                                                params={16}
                                                layout={{ position: 'absolute', left: 20, width: 122, top: 5, height: 19, minWidth: 2, maxWidth: 270, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                            >
                                                <ThemeText
                                                    text="Category Name PH"
                                                    textOptions={{ fill: '#0f557b' }}
                                                />
                                            </Region>
                                        </Region>
                                        <Region
                                            name="category_controls_itemlist"
                                            params={262160}
                                            layout={{ position: 'absolute', left: 299, width: 83, top: 1, height: 26, flexDirection: 'row', gap: 5 }}
                                        >
                                            <Region
                                                name="category_toggle_tiles"
                                                tooltip={t('navigator.tooltip.tiles')}
                                                params={17}
                                                layout={{ width: 11, height: 18, flexShrink: 0 }}
                                            >
                                                <ThemeImage
                                                    params={16}
                                                    src={layoutImage('newnavigator_nav_view_thumbs.png')}
                                                    layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
                                                />
                                            </Region>
                                            <Region
                                                name="category_toggle_rows"
                                                tooltip={t('navigator.tooltip.rows')}
                                                params={17}
                                                layout={{ width: 11, height: 18, flexShrink: 0 }}
                                            >
                                                <ThemeImage
                                                    params={16}
                                                    src={layoutImage('newnavigator_nav_view_row.png')}
                                                    layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
                                                />
                                            </Region>
                                            <Region
                                                name="category_show_more"
                                                tooltip={t('navigator.tooltip.category.show.more')}
                                                params={17}
                                                layout={{ width: 11, height: 18, flexShrink: 0 }}
                                            >
                                                <ThemeImage
                                                    params={16}
                                                    src={layoutImage('newnavigator_button_category_show_more.png')}
                                                    layout={{ position: 'absolute', left: 0, width: 11, top: 1, height: 19 }}
                                                />
                                            </Region>
                                            <Region
                                                name="category_back"
                                                tooltip={t('navigator.back')}
                                                params={17}
                                                layout={{ width: 11, height: 18, flexShrink: 0 }}
                                            >
                                                <ThemeImage
                                                    params={16}
                                                    src={layoutImage('newnavigator_nav_view_mini.png')}
                                                    layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
                                                />
                                            </Region>
                                            <Region
                                                name="category_add_quick_link"
                                                tooltip={t('navigator.tooltip.add.saved.search')}
                                                params={17}
                                                layout={{ width: 19, height: 18, flexShrink: 0 }}
                                            >
                                                <ThemeImage
                                                    params={16}
                                                    src={layoutImage('newnavigator_button_quicklink_add.png')}
                                                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 19 }}
                                                />
                                            </Region>
                                        </Region>
                                    </Region>
                                    <Region
                                        name="category_content"
                                        params={144}
                                        layout={{ position: 'absolute', left: 4, width: 387, top: 29, height: 171, flexDirection: 'column', gap: 5 }}
                                    >
                                        <Region
                                            name="navigator_entry_tile_container"
                                            tags={[ 'TEMPLATE' ]}
                                            params={16}
                                            layout={{ width: 392, height: 146, flexShrink: 0, flexDirection: 'row', gap: 7 }}
                                        >
                                            <Border
                                                variant="10"
                                                name="navigator_entry_tile"
                                                tags={[ 'SUBTEMPLATE' ]}
                                                params={16}
                                                tintColor="#ebe9df"
                                                layout={{ width: 122, height: 146, flexShrink: 0 }}
                                            >
                                                <Region
                                                    params={16}
                                                    backgroundColor="#000000"
                                                    layout={{ position: 'absolute', left: 7, width: 108, top: 6, height: 109 }}
                                                />
                                                <ThemeImage
                                                    name="room_pic_placeholder"
                                                    params={16}
                                                    src={layoutImage('newnavigator_default_room.png')}
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
                                                    layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 146 }}
                                                />
                                                <Region
                                                    name="room_name"
                                                    params={16}
                                                    layout={{ position: 'absolute', left: 0, width: 100, top: 116, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                                >
                                                    <ThemeText
                                                        text="Room Name PH"
                                                        textStyle="text-style-u-bold"
                                                        textOptions={{ wordWrap: true, wordWrapWidth: 100 }}
                                                    />
                                                </Region>
                                                <Border
                                                    variant="3"
                                                    name="room_info_usercount_border"
                                                    params={1835024}
                                                    tintColor="#000000"
                                                    layout={{ position: 'absolute', left: 40, width: 40, top: 93, height: 18 }}
                                                >
                                                    <Region
                                                        name="usercount"
                                                        params={786448}
                                                        layout={{ position: 'absolute', left: 3, width: 31, top: 1, height: 15, flexDirection: 'row', gap: 1 }}
                                                    >
                                                        <ThemeImage
                                                            name="room_usercount_icon"
                                                            params={16}
                                                            src={layoutImage('newnavigator_icon_usercount.png')}
                                                            layout={{ width: 13, height: 14, flexShrink: 0 }}
                                                        />
                                                        <Region
                                                            name="room_usercount"
                                                            params={16}
                                                            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                        >
                                                            <ThemeText
                                                                text="99"
                                                                textStyle="text-style-u-bold"
                                                                textOptions={{ fill: '#ffffff' }}
                                                            />
                                                        </Region>
                                                    </Region>
                                                </Border>
                                                <ThemeImage
                                                    name="doormode_icon"
                                                    params={16}
                                                    src={undefined}
                                                    layout={{ position: 'absolute', left: 92, width: 16, top: 96, height: 14 }}
                                                />
                                                <Region
                                                    name="info_popup_click_region"
                                                    params={17}
                                                    layout={{ position: 'absolute', left: 98, width: 18, top: 120, height: 18 }}
                                                >
                                                    <ThemeImage
                                                        params={16}
                                                        src={layoutImage('newnavigator_button_show_room_info.png')}
                                                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                                                    />
                                                </Region>
                                            </Border>
                                        </Region>
                                        <Border
                                            variant="3"
                                            name="navigator_entry_row_container"
                                            tags={[ 'TEMPLATE' ]}
                                            params={17}
                                            layout={{ width: 383, height: 20, flexShrink: 0 }}
                                        >
                                            <Region
                                                name="room_info_container"
                                                params={144}
                                                layout={{ position: 'absolute', left: 0, width: 381, top: 1, height: 18 }}
                                            >
                                                <Border
                                                    variant="3"
                                                    name="room_info_usercount_border"
                                                    params={16}
                                                    tintColor="#000000"
                                                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 18 }}
                                                >
                                                    <Region
                                                        name="usercount"
                                                        params={786448}
                                                        layout={{ position: 'absolute', left: 3, width: 31, top: 1, height: 15, flexDirection: 'row', gap: 1 }}
                                                    >
                                                        <ThemeImage
                                                            name="room_usercount_icon"
                                                            params={16}
                                                            src={layoutImage('newnavigator_icon_usercount.png')}
                                                            layout={{ width: 13, height: 14, flexShrink: 0 }}
                                                        />
                                                        <Region
                                                            name="room_usercount"
                                                            params={16}
                                                            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                        >
                                                            <ThemeText
                                                                text="99"
                                                                textStyle="text-style-u-bold"
                                                                textOptions={{ fill: '#ffffff' }}
                                                            />
                                                        </Region>
                                                    </Region>
                                                </Border>
                                                <Region
                                                    name="room_name"
                                                    params={144}
                                                    layout={{ position: 'absolute', left: 44, width: 282, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                                >
                                                    <ThemeText text="Room Name PH" />
                                                </Region>
                                                <Region
                                                    name="info_popup_click_region"
                                                    params={262161}
                                                    layout={{ position: 'absolute', left: 359, width: 18, top: 0, height: 18 }}
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
                                                    src={undefined}
                                                    layout={{ position: 'absolute', left: 324, width: 16, top: 2, height: 16 }}
                                                />
                                                <ThemeImage
                                                    name="grouphome_icon"
                                                    params={16}
                                                    src={layoutImage('newnavigator_icon_group.png')}
                                                    layout={{ position: 'absolute', left: 341, width: 16, top: 2, height: 16 }}
                                                />
                                            </Region>
                                            <Region
                                                name="go_to_room_region"
                                                params={17}
                                                layout={{ position: 'absolute', left: 0, width: 357, top: 0, height: 20 }}
                                            />
                                        </Border>
                                    </Region>
                                </Region>
                            </Region>
                            <Region
                                name="category_container_collapsed"
                                tags={[ 'TEMPLATE', 'category_container_collapsed' ]}
                                params={16528}
                                layout={{ width: 387, height: 26, flexShrink: 0 }}
                            >
                                <Region
                                    name="category_header"
                                    tags={[ 'category_header' ]}
                                    params={144}
                                    backgroundColor="#ffffff"
                                    layout={{ position: 'absolute', left: 0, width: 387, top: 0, height: 26 }}
                                >
                                    <Region
                                        name="category_name_region"
                                        params={131089}
                                        layout={{ position: 'absolute', left: 0, width: 209, top: 0, height: 27 }}
                                    >
                                        <Region
                                            name="category_expand"
                                            tooltip={t('navigator.tooltip.category.expand')}
                                            params={17}
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
                                                text="Collapsed Category Name PH"
                                                textOptions={{ fill: '#0f557b' }}
                                            />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="category_controls_itemlist"
                                        params={262160}
                                        layout={{ position: 'absolute', left: 347, width: 36, top: 1, height: 24, flexDirection: 'row', gap: 5 }}
                                    >
                                        <Region
                                            name="category_show_more"
                                            tooltip={t('navigator.tooltip.category.show.more')}
                                            params={17}
                                            layout={{ width: 11, height: 18, flexShrink: 0 }}
                                        >
                                            <ThemeImage
                                                params={16}
                                                src={layoutImage('newnavigator_button_category_show_more.png')}
                                                layout={{ position: 'absolute', left: 0, width: 11, top: 1, height: 19 }}
                                            />
                                        </Region>
                                        <Region
                                            name="category_add_quick_link"
                                            tooltip={t('navigator.tooltip.add.saved.search')}
                                            params={17}
                                            layout={{ width: 20, height: 18, flexShrink: 0 }}
                                        >
                                            <ThemeImage
                                                params={16}
                                                src={layoutImage('newnavigator_button_quicklink_add.png')}
                                                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 19 }}
                                            />
                                        </Region>
                                    </Region>
                                </Region>
                            </Region>
                            <Region
                                name="no_results_container"
                                params={16}
                                layout={{ width: 388, height: 53, flexShrink: 0 }}
                            >
                                <Region
                                    params={3932240}
                                    layout={{ position: 'absolute', left: 51, width: 286, top: 0, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('navigator.search.returned.no.results')}
                                        textStyle="text-style-u-headline-medium"
                                    />
                                </Region>
                            </Region>
                        </Region>
                    </ScrollArea>
                    <Region
                        name="search_waiting_for_results_mask"
                        params={2176}
                        visible={false}
                        backgroundColor="#eceae0"
                        layout={{ position: 'absolute', left: 0, width: 392, top: 42, height: 429 }}
                    />
                </Region>
                <Region
                    name="temp_back"
                    tooltip={t('navigator.tooltip.left.show.hide')}
                    params={131089}
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
                    layout={{ position: 'absolute', left: -2, width: 585, top: 28, height: 1 }}
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
