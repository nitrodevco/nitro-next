import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2982_notifications_browser_xml` (layout "notifications_browser", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationsBrowserLayoutProps {
    captionTitle?: string;
    layout?: BoxLayout;
    notifications?: NotificationsBrowserLayoutNotificationsProps;
    separator?: NotificationsBrowserLayoutSeparatorProps;
}

export const NotificationsBrowserLayout = ({ captionTitle, layout, notifications, separator }: NotificationsBrowserLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Border
                variant="1"
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 331, justifyContent: 'center' }}
            >
                <Region
                    name="title"
                    params={3145936}
                    layout={{ position: 'absolute', width: 120, alignSelf: 'center', marginTop: -152, marginBottom: 152, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitle ?? 'Notification history'}
                        textOptions={{ fill: '#777215' }}
                    />
                </Region>
                <NotificationsBrowserLayoutSeparator {...separator} />
                <NotificationsBrowserLayoutNotifications {...notifications} />
            </Border>
        </Region>
    );
};

/** Named region `separator` of NotificationsBrowserLayout - configured through the parent's `separator` prop. */
export interface NotificationsBrowserLayoutSeparatorProps {
    layout?: BoxLayout;
}

export const NotificationsBrowserLayoutSeparator = ({ layout }: NotificationsBrowserLayoutSeparatorProps) => {
    return (
        <Region
            name="separator"
            params={16}
            backgroundColor="#2f2f2f"
            layout={{ position: 'absolute', left: 5, width: 240, top: 26, height: 1, ...layout }}
        />
    );
};

/** Named region `notifications` of NotificationsBrowserLayout - configured through the parent's `notifications` prop. */
export interface NotificationsBrowserLayoutNotificationsProps {
    layout?: BoxLayout;
}

export const NotificationsBrowserLayoutNotifications = ({ layout }: NotificationsBrowserLayoutNotificationsProps) => {
    return (
        <Region
            name="notifications"
            params={17}
            layout={{ position: 'absolute', left: 11, width: 230, top: 32, height: 290, flexDirection: 'column', ...layout }}
        />
    );
};
