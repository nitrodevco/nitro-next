import { Border, BoxLayout, Button, ContainerButton, Icon, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `2968_feed_display_xml` (layout "feed_display", 300x510) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FeedDisplayLayoutProps {
    layout?: BoxLayout;
    onInfoOk?: () => void;
    onInfoToggle?: () => void;
    onMinimizeToggle?: () => void;
    onNotificationFeedButton?: () => void;
    onStreamFeedButton?: () => void;
}

export const FeedDisplayLayout = ({ layout, onInfoOk, onInfoToggle, onMinimizeToggle, onNotificationFeedButton, onStreamFeedButton }: FeedDisplayLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 300, height: 510, ...layout }}>
            <Region
                name="notifications"
                params={2112}
                layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 510 }}
            >
                <Border
                    variant="1"
                    name="pane_status"
                    params={32785}
                    tintColor="#58544d"
                    layout={{ position: 'absolute', left: 10, width: 50, top: 150, height: 100 }}
                >
                    <Button
                        variant="0"
                        name="minimize_toggle"
                        params={131089}
                        onPointerTap={onMinimizeToggle}
                        layout={{ position: 'absolute', left: 1, width: 29, top: 2, height: 21 }}
                    >
                        {'<>'}
                    </Button>
                    <Button
                        variant="0"
                        name="notification_feed_button"
                        params={131089}
                        onPointerTap={onNotificationFeedButton}
                        layout={{ position: 'absolute', left: 1, width: 37, top: 24, height: 21 }}
                    >
                        _nf
                    </Button>
                    <Button
                        variant="0"
                        name="stream_feed_button"
                        params={131089}
                        onPointerTap={onStreamFeedButton}
                        layout={{ position: 'absolute', left: 1, width: 42, top: 45, height: 21 }}
                    >
                        _str
                    </Button>
                </Border>
                <Border
                    variant="1"
                    name="main_view"
                    params={34961}
                    tintColor="#58544d"
                    layout={{ position: 'absolute', left: 40, width: 260, top: 0, height: 510 }}
                >
                    <Region
                        name="settings_toggle"
                        params={145}
                        layout={{ position: 'absolute', left: 0, width: 245, top: 5, height: 25 }}
                    >
                        <Region
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 210, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text="_settings"
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#ffffff', align: 'right' }}
                            />
                        </Region>
                    </Region>
                    <Icon
                        variant="7"
                        name="settings_drop_icon"
                        params={16}
                        layout={{ position: 'absolute', left: 213, width: 10, top: 13, height: 10 }}
                    />
                    <Region
                        name="info"
                        params={1197137}
                        layout={{ position: 'absolute', left: 200, width: 48, top: 470, height: 25 }}
                    >
                        <Button
                            variant="3"
                            name="info_toggle"
                            params={131089}
                            onPointerTap={onInfoToggle}
                            layout={{ position: 'absolute', left: 0, width: 48, top: 0, height: 25 }}
                        >
                            _info
                        </Button>
                    </Region>
                    <Region
                        name="pane_feeds"
                        params={2192}
                        layout={{ position: 'absolute', left: 0, width: 260, top: 25, height: 435 }}
                    >
                        <Region
                            name="pane_notifications"
                            params={2192}
                            layout={{ position: 'absolute', left: 0, width: 260, top: 0, height: 435 }}
                        >
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 6, width: 235, top: 0, height: 435 }}
                            >
                                <Region
                                    name="list"
                                    params={2192}
                                    layout={{ flexDirection: 'column', width: '100%' }}
                                >
                                    <Region
                                        name="list_urgent"
                                        params={8536208}
                                        layout={{ width: 230, height: 0, flexShrink: 0, flexDirection: 'column', gap: 1 }}
                                    />
                                    <Region
                                        name="list_actions"
                                        params={8536208}
                                        layout={{ width: 230, height: 0, flexShrink: 0, flexDirection: 'column', gap: 1 }}
                                    />
                                    <Region
                                        name="list_persistent"
                                        params={8536208}
                                        layout={{ width: 230, height: 0, flexShrink: 0, flexDirection: 'column', gap: 1 }}
                                    />
                                    <Region
                                        name="list_notifications"
                                        params={8536208}
                                        layout={{ width: 230, height: 0, flexShrink: 0, flexDirection: 'column', gap: 1 }}
                                    />
                                </Region>
                            </ScrollArea>
                        </Region>
                        <Region
                            name="pane_stream"
                            params={2192}
                            layout={{ position: 'absolute', left: 0, width: 260, top: 0, height: 435 }}
                        >
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 6, width: 235, top: 0, height: 435 }}
                            >
                                <Region
                                    name="list"
                                    params={2192}
                                    layout={{ flexDirection: 'column', width: '100%' }}
                                />
                            </ScrollArea>
                        </Region>
                    </Region>
                    <Region
                        name="pane_info"
                        params={2192}
                        visible={false}
                        layout={{ position: 'absolute', left: 40, width: 220, top: 25, height: 475 }}
                    >
                        <Border
                            variant="0"
                            name="page_welcome_texts"
                            params={2192}
                            layout={{ position: 'absolute', left: 5, width: 215, top: 0, height: 470 }}
                        >
                            <Region
                                name="welcome_list"
                                params={133264}
                                layout={{ position: 'absolute', left: 0, width: 215, top: 10, height: 448, flexDirection: 'column' }}
                            >
                                <Region
                                    name="title"
                                    params={12583056}
                                    layout={{ width: 200, height: 29, flexShrink: 0, minWidth: 260, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="_into_title"
                                        textStyle="text-style-u-bold"
                                        textOptions={{ fill: '#999999', wordWrap: true, wordWrapWidth: 200 }}
                                    />
                                </Region>
                                <Region
                                    name="space_ingress"
                                    params={8519825}
                                    layout={{ width: 194, height: 20, flexShrink: 0, minHeight: 20, maxHeight: 20 }}
                                />
                                <Region
                                    name="ingress"
                                    params={8388752}
                                    layout={{ width: 200, height: 21, flexShrink: 0, minWidth: 220, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="_info_ingress"
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#222222', wordWrap: true, wordWrapWidth: 200 }}
                                    />
                                </Region>
                                <Region
                                    name="space_description"
                                    params={8519825}
                                    layout={{ width: 200, height: 20, flexShrink: 0, minHeight: 20, maxHeight: 20 }}
                                />
                                <Region
                                    name="description"
                                    params={16}
                                    layout={{ width: 99, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="_info_description"
                                        textStyle="text-style-u-regular"
                                        textOptions={{ fill: '#222222', wordWrap: true, wordWrapWidth: 99 }}
                                    />
                                </Region>
                                <Region
                                    name="space_ok"
                                    params={16}
                                    layout={{ width: 200, height: 30, flexShrink: 0 }}
                                />
                                <ContainerButton
                                    variant="3"
                                    name="info_ok"
                                    params={131281}
                                    tintColor="#00aa00"
                                    onPointerTap={onInfoOk}
                                    layout={{ width: 150, height: 36, flexShrink: 0, minWidth: 150, maxWidth: 150 }}
                                >
                                    <Region
                                        name="feed_info_ok_text"
                                        params={12585104}
                                        layout={{ position: 'absolute', left: 0, width: 150, top: 4, height: 24, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text="_info_ok"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                        />
                                    </Region>
                                </ContainerButton>
                            </Region>
                        </Border>
                    </Region>
                    <Region
                        name="pane_settings"
                        params={2192}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 260, top: 25, height: 483 }}
                    >
                        <Border
                            variant="3"
                            name="modal_overlay"
                            params={2192}
                            tintColor="#000000"
                            blend={0.6}
                            layout={{ position: 'absolute', left: 0, width: 260, top: 0, height: 485 }}
                        />
                        <Border
                            variant="3"
                            name="item_list_border"
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 260, top: 0, height: 220 }}
                        />
                        <Region
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 260, top: 0, height: 252, flexDirection: 'column' }}
                        >
                            <Region
                                name="settings_all"
                                tags={[ 'FRIENDS', 'ME', 'HOTEL' ]}
                                params={144}
                                layout={{ width: 260, height: 50, flexShrink: 0 }}
                            >
                                <Region
                                    params={144}
                                    layout={{ position: 'absolute', left: 30, width: 210, top: 15, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="_show_all"
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                                <Icon
                                    variant="8"
                                    name="selected"
                                    tags={[ 'selected' ]}
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 15, top: 15, height: 15 }}
                                />
                            </Region>
                            <Region
                                name="settings_friends"
                                tags={[ 'FRIENDS' ]}
                                params={144}
                                layout={{ width: 260, height: 50, flexShrink: 0 }}
                            >
                                <Region
                                    params={144}
                                    layout={{ position: 'absolute', left: 30, width: 210, top: 15, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="_show_friends"
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                                <Icon
                                    variant="8"
                                    name="selected"
                                    tags={[ 'selected' ]}
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 15, top: 15, height: 15 }}
                                />
                            </Region>
                            <Region
                                name="settings_me"
                                tags={[ 'ME' ]}
                                params={144}
                                layout={{ width: 260, height: 50, flexShrink: 0 }}
                            >
                                <Region
                                    params={144}
                                    layout={{ position: 'absolute', left: 30, width: 210, top: 15, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="_show_me"
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                                <Icon
                                    variant="8"
                                    name="selected"
                                    tags={[ 'selected' ]}
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 15, top: 15, height: 15 }}
                                />
                            </Region>
                            <Region
                                name="settings_hotel"
                                tags={[ 'HOTEL' ]}
                                params={144}
                                layout={{ width: 260, height: 50, flexShrink: 0 }}
                            >
                                <Region
                                    params={144}
                                    layout={{ position: 'absolute', left: 30, width: 210, top: 15, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="_show_hotel"
                                        textStyle="text-style-u-regular"
                                    />
                                </Region>
                                <Icon
                                    variant="8"
                                    name="selected"
                                    tags={[ 'selected' ]}
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 15, top: 15, height: 15 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
