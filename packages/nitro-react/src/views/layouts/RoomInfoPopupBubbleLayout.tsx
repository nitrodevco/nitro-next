import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `141_room_info_popup_bubble_xml` (layout "room_info_popup_bubble", 374x350) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomInfoPopupBubbleLayoutProps {
    layout?: BoxLayout;
}

export const RoomInfoPopupBubbleLayout = ({ layout }: RoomInfoPopupBubbleLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 374, height: 350, ...layout }}>
            <Bubble
                variant="7"
                params={1}
                pointer="left"
                layout={{ position: 'absolute', left: 0, width: 374, top: 0, height: 350 }}
            >
                <Region
                    name="main_content"
                    params={8388608}
                    layout={{ position: 'absolute', left: 11, width: 345, top: -21, height: 324, flexDirection: 'column', gap: 3 }}
                >
                    <Border
                        variant="2"
                        name="header"
                        params={16}
                        layout={{ width: 345, height: 125, flexShrink: 0, minHeight: 125, maxHeight: 125 }}
                    >
                        <Region
                            name="header_content"
                            params={8388624}
                            layout={{ position: 'absolute', left: 7, width: 331, top: 6, height: 112, flexDirection: 'column', gap: 7 }}
                        >
                            <Region
                                name="header_top"
                                params={16}
                                layout={{ width: 329, height: 112, flexShrink: 0, flexDirection: 'row' }}
                            >
                                <Region
                                    name="room_thumbnail_container"
                                    params={16}
                                    backgroundColor="#000000"
                                    layout={{ width: 112, height: 112, flexShrink: 0 }}
                                >
                                    <ThemeImage
                                        name="room_thumbnail"
                                        params={16}
                                        src={layoutImage('newnavigator_default_room.png')}
                                        layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
                                    />
                                    <WidgetSlot
                                        widgetType="badge_image"
                                        name="room_group_badge"
                                        params={16}
                                        options={{ 'badge_image:type': 'group', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                                        layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 48 }}
                                    />
                                </Region>
                                <Region
                                    name="room_name_desc_owner_container"
                                    params={16}
                                    layout={{ width: 219, height: 112, flexShrink: 0 }}
                                >
                                    <Region
                                        name="room_name"
                                        params={16}
                                        layout={{ position: 'absolute', left: 6, width: 214, top: 0, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text="ROOM NAME PLACEHOLDER LOREM IPSUM DOLOR SIT AMET"
                                            textStyle="text-style-u-bold"
                                            textOptions={{ wordWrap: true, wordWrapWidth: 214 }}
                                        />
                                    </Region>
                                    <Region
                                        name="room_desc"
                                        params={16}
                                        layout={{ position: 'absolute', left: 5, width: 214, top: 33, height: 80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text="ROOM DESC PLACEHOLDER LOREM IPSUM DOLOR SIT AMET"
                                            textOptions={{ wordWrap: true, wordWrapWidth: 214 }}
                                        />
                                    </Region>
                                </Region>
                            </Region>
                        </Region>
                    </Border>
                    <Region
                        name="room_group_owner_container"
                        params={16}
                        layout={{ width: 344, height: 30, flexShrink: 0 }}
                    >
                        <Region
                            name="room_group_region"
                            tooltip={t('navigator.tooltip.groupinfo.owner')}
                            params={17}
                            layout={{ position: 'absolute', left: 175, width: 170, top: 3, height: 30 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('newnavigator_icon_group.png')}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                            />
                            <Region
                                name="group_name"
                                params={16}
                                layout={{ position: 'absolute', left: 20, width: 170, top: 0, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="The Bubblers"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="room_owner_region"
                            tooltip={t('navigator.tooltip.roominfo.owner')}
                            params={17}
                            layout={{ position: 'absolute', left: 5, width: 150, top: 3, height: 30 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('friend_bar_friendlist_eye.png')}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                            />
                            <Region
                                name="owner_name"
                                params={16}
                                layout={{ position: 'absolute', left: 20, width: 130, top: -2, height: 33, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Macklebee"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="newMid"
                        params={16}
                        layout={{ width: 344, height: 80, flexShrink: 0 }}
                    >
                        <Region
                            name="mid"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 174, top: 0, height: 65 }}
                        >
                            <Region
                                name="properties"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 263, top: 0, height: 65, flexDirection: 'column' }}
                            />
                        </Region>
                        <Region
                            name="midBottom"
                            params={8388608}
                            layout={{ position: 'absolute', left: 166, width: 170, top: 0, height: 80 }}
                        >
                            <Region
                                name="midBottom_itemlist"
                                params={8388608}
                                layout={{ position: 'absolute', left: 12, width: 170, top: 0, height: 80, flexDirection: 'column' }}
                            >
                                <Region
                                    params={16}
                                    layout={{ width: 170, height: 20, flexShrink: 0 }}
                                >
                                    <Region
                                        name="favorite_region"
                                        params={17}
                                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                    >
                                        <ThemeImage
                                            name="favorite_icon"
                                            params={16}
                                            src={layoutImage('newnavigator_icon_fav_no.png')}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                        />
                                    </Region>
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 20, width: 236, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('navigator.room.popup.room.info.favorite')} />
                                    </Region>
                                </Region>
                                <Region
                                    params={16}
                                    layout={{ width: 170, height: 20, flexShrink: 0 }}
                                >
                                    <Region
                                        name="home_region"
                                        params={17}
                                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                    >
                                        <ThemeImage
                                            name="home_icon"
                                            params={16}
                                            src={layoutImage('newnavigator_icon_home_no.png')}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                        />
                                    </Region>
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 20, width: 224, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('navigator.room.popup.room.info.home')} />
                                    </Region>
                                </Region>
                                <Region
                                    name="settings_container"
                                    params={16}
                                    layout={{ width: 170, height: 20, flexShrink: 0 }}
                                >
                                    <Region
                                        name="settings_region"
                                        params={17}
                                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                    >
                                        <ThemeImage
                                            name="settings_icon"
                                            params={16}
                                            src={layoutImage('newnavigator_room_settings_icon.png')}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                        />
                                    </Region>
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 20, width: 235, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('navigator.room.popup.info.room.settings')} />
                                    </Region>
                                </Region>
                                <Region
                                    name="report_container"
                                    params={16}
                                    layout={{ width: 170, height: 20, flexShrink: 0 }}
                                >
                                    <Region
                                        name="report_region"
                                        params={17}
                                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                    >
                                        <ThemeImage
                                            name="report_icon"
                                            params={16}
                                            src={layoutImage('newnavigator_report_room.png')}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                        />
                                    </Region>
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 20, width: 202, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('navigator.room.popup.report.room')} />
                                    </Region>
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="bottom_itemlist"
                        params={8388608}
                        layout={{ width: 345, height: 80, flexShrink: 0, flexDirection: 'column' }}
                    >
                        <Region
                            name="tag_and_group_info"
                            params={16}
                            layout={{ width: 345, height: 23, flexShrink: 0 }}
                        >
                            <Region
                                name="tag_list"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 20, flexDirection: 'row', gap: 2 }}
                            />
                            <ThemeImage
                                name="group_mode_furnish"
                                params={16}
                                src={undefined}
                                layout={{ position: 'absolute', left: 318, width: 18, top: 0, height: 16 }}
                            />
                            <ThemeImage
                                name="group_mode_admin"
                                params={16}
                                src={undefined}
                                layout={{ position: 'absolute', left: 279, width: 18, top: 0, height: 16 }}
                            />
                            <ThemeImage
                                name="group_mode_size"
                                params={16}
                                src={undefined}
                                layout={{ position: 'absolute', left: 299, width: 18, top: 0, height: 16 }}
                            />
                        </Region>
                        <Border
                            variant="3"
                            name="event_info"
                            params={16}
                            tintColor="#f1a700"
                            blend={0.7}
                            layout={{ width: 331, height: 55, flexShrink: 0 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('newnavigator_event_icon.png')}
                                layout={{ position: 'absolute', left: 6, width: 42, top: 9, height: 40 }}
                            />
                            <Region
                                name="event_name"
                                params={16}
                                layout={{ position: 'absolute', left: 54, width: 275, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="EVENT NAME LOREM IPSUM DOLOR SIT AMET"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            </Region>
                            <Region
                                name="event_desc"
                                params={16}
                                layout={{ position: 'absolute', left: 54, width: 275, top: 19, height: 36, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="EVENT DESCRIPTION LOREM IPSUM DOLOR SIT AMET"
                                    textStyle="text-style-u-bold"
                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 275 }}
                                />
                            </Region>
                        </Border>
                    </Region>
                </Region>
            </Bubble>
        </Region>
    );
};
