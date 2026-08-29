import { ReactNode } from 'react';

import { Border, BoxLayout, Button, ContainerButton, Icon, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `2968_feed_display_xml` (layout "feed_display", 300x510) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FeedDisplayLayoutProps {
    layout?: BoxLayout;
    notifications?: FeedDisplayLayoutNotificationsProps;
}

export const FeedDisplayLayout = ({ layout, notifications }: FeedDisplayLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 300, height: 510, ...layout }}>
            <FeedDisplayLayoutNotifications {...notifications} />
        </Region>
    );
};

/** Named region `settings_toggle` of FeedDisplayLayout - configured through the parent's `settingsToggle` prop. */
export interface FeedDisplayLayoutSettingsToggleProps {
    layout?: BoxLayout;
    onSettingsToggle?: () => void;
}

export const FeedDisplayLayoutSettingsToggle = ({ layout, onSettingsToggle }: FeedDisplayLayoutSettingsToggleProps) => {
    return (
        <Region
            name="settings_toggle"
            params={145}
            onPointerTap={onSettingsToggle}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 15, top: 5, height: 25, ...layout }}
        >
            <Region
                params={144}
                layout={{ position: 'absolute', left: 0, right: 35, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text="_settings"
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff', align: 'right' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `info` of FeedDisplayLayout - configured through the parent's `info` prop. */
export interface FeedDisplayLayoutInfoProps {
    layout?: BoxLayout;
    onInfo?: () => void;
    onInfoToggle?: () => void;
}

export const FeedDisplayLayoutInfo = ({ layout, onInfo, onInfoToggle }: FeedDisplayLayoutInfoProps) => {
    return (
        <Region
            name="info"
            params={1197137}
            onPointerTap={onInfo}
            cursor="pointer"
            layout={{ position: 'absolute', right: 12, width: 48, bottom: 15, height: 25, ...layout }}
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
    );
};

/** Row template `list_urgent` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutListUrgentItemProps {
    layout?: BoxLayout;
}

export const FeedDisplayLayoutListUrgentItem = ({ layout }: FeedDisplayLayoutListUrgentItemProps) => {
    return (
        <Region
            name="list_urgent"
            params={8536208}
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 1, ...layout }}
        />
    );
};

/** Row template `list_actions` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutListActionsItemProps {
    layout?: BoxLayout;
}

export const FeedDisplayLayoutListActionsItem = ({ layout }: FeedDisplayLayoutListActionsItemProps) => {
    return (
        <Region
            name="list_actions"
            params={8536208}
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 1, ...layout }}
        />
    );
};

/** Row template `list_persistent` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutListPersistentItemProps {
    layout?: BoxLayout;
}

export const FeedDisplayLayoutListPersistentItem = ({ layout }: FeedDisplayLayoutListPersistentItemProps) => {
    return (
        <Region
            name="list_persistent"
            params={8536208}
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 1, ...layout }}
        />
    );
};

/** Row template `list_notifications` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutListNotificationsItemProps {
    layout?: BoxLayout;
}

export const FeedDisplayLayoutListNotificationsItem = ({ layout }: FeedDisplayLayoutListNotificationsItemProps) => {
    return (
        <Region
            name="list_notifications"
            params={8536208}
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 1, ...layout }}
        />
    );
};

/** Named region `list` of FeedDisplayLayout - configured through the parent's `list` prop. */
export interface FeedDisplayLayoutListProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutList = ({ itemsList, layout }: FeedDisplayLayoutListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 6, right: 19, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="list"
                params={2192}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsList ?? (
                    <>
                        <FeedDisplayLayoutListUrgentItem />
                        <FeedDisplayLayoutListActionsItem />
                        <FeedDisplayLayoutListPersistentItem />
                        <FeedDisplayLayoutListNotificationsItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `pane_notifications` of FeedDisplayLayout - configured through the parent's `paneNotifications` prop. */
export interface FeedDisplayLayoutPaneNotificationsProps {
    layout?: BoxLayout;
    list?: FeedDisplayLayoutListProps;
}

export const FeedDisplayLayoutPaneNotifications = ({ layout, list }: FeedDisplayLayoutPaneNotificationsProps) => {
    return (
        <Region
            name="pane_notifications"
            params={2192}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <FeedDisplayLayoutList {...list} />
            {/* <scrollbar_vertical> for list - rendered by that list's ScrollArea */}
        </Region>
    );
};

/** Named region `list` of FeedDisplayLayout - configured through the parent's `list` prop. */
export interface FeedDisplayLayoutList2Props {
    layout?: BoxLayout;
}

export const FeedDisplayLayoutList2 = ({ layout }: FeedDisplayLayoutList2Props) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 6, right: 19, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="list"
                params={2192}
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `pane_stream` of FeedDisplayLayout - configured through the parent's `paneStream` prop. */
export interface FeedDisplayLayoutPaneStreamProps {
    layout?: BoxLayout;
    list?: FeedDisplayLayoutList2Props;
}

export const FeedDisplayLayoutPaneStream = ({ layout, list }: FeedDisplayLayoutPaneStreamProps) => {
    return (
        <Region
            name="pane_stream"
            params={2192}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <FeedDisplayLayoutList2 {...list} />
            {/* <scrollbar_vertical> for list - rendered by that list's ScrollArea */}
        </Region>
    );
};

/** Named region `pane_feeds` of FeedDisplayLayout - configured through the parent's `paneFeeds` prop. */
export interface FeedDisplayLayoutPaneFeedsProps {
    layout?: BoxLayout;
    paneNotifications?: FeedDisplayLayoutPaneNotificationsProps;
    paneStream?: FeedDisplayLayoutPaneStreamProps;
}

export const FeedDisplayLayoutPaneFeeds = ({ layout, paneNotifications, paneStream }: FeedDisplayLayoutPaneFeedsProps) => {
    return (
        <Region
            name="pane_feeds"
            params={2192}
            layout={{ position: 'absolute', left: 0, right: 0, top: 25, bottom: 50, ...layout }}
        >
            <FeedDisplayLayoutPaneNotifications {...paneNotifications} />
            <FeedDisplayLayoutPaneStream {...paneStream} />
        </Region>
    );
};

/** Row template `title` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutTitleItem = ({ captionTitle, layout }: FeedDisplayLayoutTitleItemProps) => {
    return (
        <Region
            name="title"
            params={12583056}
            layout={{ flexShrink: 0, minWidth: 260, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? '_into_title'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#999999', wordWrap: true }}
            />
        </Region>
    );
};

/** Row template `space_ingress` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutSpaceIngressItemProps {
    layout?: BoxLayout;
    onSpaceIngress?: () => void;
}

export const FeedDisplayLayoutSpaceIngressItem = ({ layout, onSpaceIngress }: FeedDisplayLayoutSpaceIngressItemProps) => {
    return (
        <Region
            name="space_ingress"
            params={8519825}
            onPointerTap={onSpaceIngress}
            cursor="pointer"
            layout={{ width: 194, height: 20, flexShrink: 0, minHeight: 20, maxHeight: 20, ...layout }}
        />
    );
};

/** Row template `ingress` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutIngressItemProps {
    captionIngress?: string;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutIngressItem = ({ captionIngress, layout }: FeedDisplayLayoutIngressItemProps) => {
    return (
        <Region
            name="ingress"
            params={8388752}
            layout={{ width: 200, flexShrink: 0, minWidth: 220, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionIngress ?? '_info_ingress'}
                textStyle="text-style-u-regular"
                textOptions={{ fill: '#222222', wordWrap: true, wordWrapWidth: 200 }}
            />
        </Region>
    );
};

/** Row template `space_description` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutSpaceDescriptionItemProps {
    layout?: BoxLayout;
    onSpaceDescription?: () => void;
}

export const FeedDisplayLayoutSpaceDescriptionItem = ({ layout, onSpaceDescription }: FeedDisplayLayoutSpaceDescriptionItemProps) => {
    return (
        <Region
            name="space_description"
            params={8519825}
            onPointerTap={onSpaceDescription}
            cursor="pointer"
            layout={{ width: 200, height: 20, flexShrink: 0, minHeight: 20, maxHeight: 20, ...layout }}
        />
    );
};

/** Row template `description` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutDescriptionItemProps {
    captionDescription?: string;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutDescriptionItem = ({ captionDescription, layout }: FeedDisplayLayoutDescriptionItemProps) => {
    return (
        <Region
            name="description"
            params={16}
            layout={{ width: 99, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDescription ?? '_info_description'}
                textStyle="text-style-u-regular"
                textOptions={{ fill: '#222222', wordWrap: true, wordWrapWidth: 99 }}
            />
        </Region>
    );
};

/** Row template `space_ok` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutSpaceOkItemProps {
    layout?: BoxLayout;
}

export const FeedDisplayLayoutSpaceOkItem = ({ layout }: FeedDisplayLayoutSpaceOkItemProps) => {
    return (
        <Region
            name="space_ok"
            params={16}
            layout={{ width: 200, height: 30, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `info_ok` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutInfoOkItemProps {
    captionFeedInfoOkText?: string;
    layout?: BoxLayout;
    onInfoOk?: () => void;
}

export const FeedDisplayLayoutInfoOkItem = ({ captionFeedInfoOkText, layout, onInfoOk }: FeedDisplayLayoutInfoOkItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="info_ok"
            params={131281}
            tintColor="#00aa00"
            onPointerTap={onInfoOk}
            layout={{ width: 150, height: 36, flexShrink: 0, minWidth: 150, maxWidth: 150, ...layout }}
        >
            <Region
                name="feed_info_ok_text"
                params={12585104}
                layout={{ position: 'absolute', left: 0, top: 4, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionFeedInfoOkText ?? '_info_ok'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </ContainerButton>
    );
};

/** Named region `welcome_list` of FeedDisplayLayout - configured through the parent's `welcomeList` prop. */
export interface FeedDisplayLayoutWelcomeListProps {
    itemsWelcomeList?: ReactNode;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutWelcomeList = ({ itemsWelcomeList, layout }: FeedDisplayLayoutWelcomeListProps) => {
    return (
        <Region
            name="welcome_list"
            params={133264}
            layout={{ position: 'absolute', left: 0, right: 0, top: 10, bottom: 12, flexDirection: 'column', ...layout }}
        >
            {itemsWelcomeList ?? (
                <>
                    <FeedDisplayLayoutTitleItem />
                    <FeedDisplayLayoutSpaceIngressItem />
                    <FeedDisplayLayoutIngressItem />
                    <FeedDisplayLayoutSpaceDescriptionItem />
                    <FeedDisplayLayoutDescriptionItem />
                    <FeedDisplayLayoutSpaceOkItem />
                    <FeedDisplayLayoutInfoOkItem />
                </>
            )}
        </Region>
    );
};

/** Named region `pane_info` of FeedDisplayLayout - configured through the parent's `paneInfo` prop. */
export interface FeedDisplayLayoutPaneInfoProps {
    layout?: BoxLayout;
    visiblePaneInfo?: boolean;
    welcomeList?: FeedDisplayLayoutWelcomeListProps;
}

export const FeedDisplayLayoutPaneInfo = ({ layout, visiblePaneInfo, welcomeList }: FeedDisplayLayoutPaneInfoProps) => {
    return (
        <Region
            name="pane_info"
            params={2192}
            visible={visiblePaneInfo ?? false}
            layout={{ position: 'absolute', left: 40, right: 0, top: 25, bottom: 10, ...layout }}
        >
            <Border
                variant="0"
                name="page_welcome_texts"
                params={2192}
                layout={{ position: 'absolute', left: 5, right: 0, top: 0, bottom: 5 }}
            >
                <FeedDisplayLayoutWelcomeList {...welcomeList} />
            </Border>
        </Region>
    );
};

/** Named region `settings_all` of FeedDisplayLayout - configured through the parent's `settingsAll` prop. */
export interface FeedDisplayLayoutSettingsAllProps {
    layout?: BoxLayout;
}

export const FeedDisplayLayoutSettingsAll = ({ layout }: FeedDisplayLayoutSettingsAllProps) => {
    return (
        <Region
            name="settings_all"
            tags={[ 'FRIENDS', 'ME', 'HOTEL' ]}
            params={144}
            layout={{ width: 260, height: 50, flexShrink: 0, ...layout }}
        >
            <Region
                params={144}
                layout={{ position: 'absolute', left: 30, right: 20, top: 15, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
    );
};

/** Named region `settings_friends` of FeedDisplayLayout - configured through the parent's `settingsFriends` prop. */
export interface FeedDisplayLayoutSettingsFriendsProps {
    layout?: BoxLayout;
}

export const FeedDisplayLayoutSettingsFriends = ({ layout }: FeedDisplayLayoutSettingsFriendsProps) => {
    return (
        <Region
            name="settings_friends"
            tags={[ 'FRIENDS' ]}
            params={144}
            layout={{ width: 260, height: 50, flexShrink: 0, ...layout }}
        >
            <Region
                params={144}
                layout={{ position: 'absolute', left: 30, right: 20, top: 15, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
    );
};

/** Named region `settings_me` of FeedDisplayLayout - configured through the parent's `settingsMe` prop. */
export interface FeedDisplayLayoutSettingsMeProps {
    layout?: BoxLayout;
}

export const FeedDisplayLayoutSettingsMe = ({ layout }: FeedDisplayLayoutSettingsMeProps) => {
    return (
        <Region
            name="settings_me"
            tags={[ 'ME' ]}
            params={144}
            layout={{ width: 260, height: 50, flexShrink: 0, ...layout }}
        >
            <Region
                params={144}
                layout={{ position: 'absolute', left: 30, right: 20, top: 15, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
    );
};

/** Named region `settings_hotel` of FeedDisplayLayout - configured through the parent's `settingsHotel` prop. */
export interface FeedDisplayLayoutSettingsHotelProps {
    layout?: BoxLayout;
}

export const FeedDisplayLayoutSettingsHotel = ({ layout }: FeedDisplayLayoutSettingsHotelProps) => {
    return (
        <Region
            name="settings_hotel"
            tags={[ 'HOTEL' ]}
            params={144}
            layout={{ width: 260, height: 50, flexShrink: 0, ...layout }}
        >
            <Region
                params={144}
                layout={{ position: 'absolute', left: 30, right: 20, top: 15, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
    );
};

/** Named region `pane_settings` of FeedDisplayLayout - configured through the parent's `paneSettings` prop. */
export interface FeedDisplayLayoutPaneSettingsProps {
    layout?: BoxLayout;
    settingsAll?: FeedDisplayLayoutSettingsAllProps;
    settingsFriends?: FeedDisplayLayoutSettingsFriendsProps;
    settingsHotel?: FeedDisplayLayoutSettingsHotelProps;
    settingsMe?: FeedDisplayLayoutSettingsMeProps;
    visiblePaneSettings?: boolean;
}

export const FeedDisplayLayoutPaneSettings = ({ layout, settingsAll, settingsFriends, settingsHotel, settingsMe, visiblePaneSettings }: FeedDisplayLayoutPaneSettingsProps) => {
    return (
        <Region
            name="pane_settings"
            params={2192}
            visible={visiblePaneSettings ?? false}
            layout={{ position: 'absolute', left: 0, right: 0, top: 25, bottom: 2, ...layout }}
        >
            <Border
                variant="3"
                name="modal_overlay"
                params={2192}
                tintColor="#000000"
                blend={0.6}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: -2 }}
            />
            <Border
                variant="3"
                name="item_list_border"
                params={144}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 220 }}
            />
            <Region
                params={144}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 252, flexDirection: 'column' }}
            >
                <FeedDisplayLayoutSettingsAll {...settingsAll} />
                <FeedDisplayLayoutSettingsFriends {...settingsFriends} />
                <FeedDisplayLayoutSettingsMe {...settingsMe} />
                <FeedDisplayLayoutSettingsHotel {...settingsHotel} />
            </Region>
        </Region>
    );
};

/** Named region `notifications` of FeedDisplayLayout - configured through the parent's `notifications` prop. */
export interface FeedDisplayLayoutNotificationsProps {
    info?: FeedDisplayLayoutInfoProps;
    layout?: BoxLayout;
    onMinimizeToggle?: () => void;
    onNotificationFeedButton?: () => void;
    onStreamFeedButton?: () => void;
    paneFeeds?: FeedDisplayLayoutPaneFeedsProps;
    paneInfo?: FeedDisplayLayoutPaneInfoProps;
    paneSettings?: FeedDisplayLayoutPaneSettingsProps;
    settingsToggle?: FeedDisplayLayoutSettingsToggleProps;
}

export const FeedDisplayLayoutNotifications = ({ info, layout, onMinimizeToggle, onNotificationFeedButton, onStreamFeedButton, paneFeeds, paneInfo, paneSettings, settingsToggle }: FeedDisplayLayoutNotificationsProps) => {
    return (
        <Region
            name="notifications"
            params={2112}
            layout={{ position: 'absolute', right: 0, width: 300, top: 0, bottom: 0, ...layout }}
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
                layout={{ position: 'absolute', left: 40, right: 0, top: 0, bottom: 0 }}
            >
                <FeedDisplayLayoutSettingsToggle {...settingsToggle} />
                <Icon
                    variant="7"
                    name="settings_drop_icon"
                    params={16}
                    layout={{ position: 'absolute', left: 213, width: 10, top: 13, height: 10 }}
                />
                <FeedDisplayLayoutInfo {...info} />
                <FeedDisplayLayoutPaneFeeds {...paneFeeds} />
                <FeedDisplayLayoutPaneInfo {...paneInfo} />
                <FeedDisplayLayoutPaneSettings {...paneSettings} />
            </Border>
        </Region>
    );
};
