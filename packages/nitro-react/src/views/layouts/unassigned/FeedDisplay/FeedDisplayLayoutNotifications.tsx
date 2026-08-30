import { Border, BoxLayout, Button, Icon, Region, ThemeText } from '#base/theme';

import { FeedDisplayLayoutPaneFeeds, FeedDisplayLayoutPaneFeedsProps } from './FeedDisplayLayoutPaneFeeds';
import { FeedDisplayLayoutPaneInfo, FeedDisplayLayoutPaneInfoProps } from './FeedDisplayLayoutPaneInfo';
import { FeedDisplayLayoutPaneSettings, FeedDisplayLayoutPaneSettingsProps } from './FeedDisplayLayoutPaneSettings';

/** Named region `notifications` of FeedDisplayLayout - configured through the parent's `notifications` prop. */
export interface FeedDisplayLayoutNotificationsProps {
    layout?: BoxLayout;
    onInfo?: () => void;
    onInfoToggle?: () => void;
    onMinimizeToggle?: () => void;
    onNotificationFeedButton?: () => void;
    onSettingsToggle?: () => void;
    onStreamFeedButton?: () => void;
    paneFeeds?: FeedDisplayLayoutPaneFeedsProps;
    paneInfo?: FeedDisplayLayoutPaneInfoProps;
    paneSettings?: FeedDisplayLayoutPaneSettingsProps;
    visiblePaneInfo?: boolean;
    visiblePaneSettings?: boolean;
}

export const FeedDisplayLayoutNotifications = ({ layout, onInfo, onInfoToggle, onMinimizeToggle, onNotificationFeedButton, onSettingsToggle, onStreamFeedButton, paneFeeds, paneInfo, paneSettings, visiblePaneInfo, visiblePaneSettings }: FeedDisplayLayoutNotificationsProps) => {
    return (
        <Region
            name="notifications"
            layout={{ position: 'absolute', right: 0, width: 300, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="1"
                name="pane_status"
                tintColor="#58544d"
                layout={{ position: 'absolute', left: 10, width: 50, top: 150, height: 100 }}
            >
                <Button
                    variant="0"
                    name="minimize_toggle"
                    onPointerTap={onMinimizeToggle}
                    layout={{ position: 'absolute', left: 1, width: 29, top: 2, height: 21 }}
                >
                    {'<>'}
                </Button>
                <Button
                    variant="0"
                    name="notification_feed_button"
                    onPointerTap={onNotificationFeedButton}
                    layout={{ position: 'absolute', left: 1, width: 37, top: 24, height: 21 }}
                >
                    _nf
                </Button>
                <Button
                    variant="0"
                    name="stream_feed_button"
                    onPointerTap={onStreamFeedButton}
                    layout={{ position: 'absolute', left: 1, width: 42, top: 45, height: 21 }}
                >
                    _str
                </Button>
            </Border>
            <Border
                variant="1"
                name="main_view"
                tintColor="#58544d"
                layout={{ position: 'absolute', left: 40, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="settings_toggle"
                    onPointerTap={onSettingsToggle}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 15, top: 5, height: 25 }}
                >
                    <ThemeText
                        text="_settings"
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff', align: 'right' }}
                        layout={{ position: 'absolute', left: 0, right: 35, top: 0, height: 18 }}
                    />
                </Region>
                <Icon
                    variant="7"
                    name="settings_drop_icon"
                    layout={{ position: 'absolute', left: 213, width: 10, top: 13, height: 10 }}
                />
                <Region
                    name="info"
                    onPointerTap={onInfo}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 12, width: 48, bottom: 15, height: 25 }}
                >
                    <Button
                        variant="3"
                        name="info_toggle"
                        onPointerTap={onInfoToggle}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        _info
                    </Button>
                </Region>
                <FeedDisplayLayoutPaneFeeds {...paneFeeds} />
                {(visiblePaneInfo ?? false) && (
                    <FeedDisplayLayoutPaneInfo {...paneInfo} />
                )}
                {(visiblePaneSettings ?? false) && (
                    <FeedDisplayLayoutPaneSettings {...paneSettings} />
                )}
            </Border>
        </Region>
    );
};
