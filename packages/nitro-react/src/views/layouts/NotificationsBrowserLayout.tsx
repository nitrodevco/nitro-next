import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2982_notifications_browser_xml` (layout "notifications_browser", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationsBrowserLayoutProps {
    layout?: BoxLayout;
}

export const NotificationsBrowserLayout = ({ layout }: NotificationsBrowserLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Border
                variant="1"
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 331 }}
            >
                <Region
                    name="title"
                    params={3145936}
                    layout={{ position: 'absolute', left: 65, width: 120, top: 7, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="Notification history"
                        textOptions={{ fill: '#777215' }}
                    />
                </Region>
                <Region
                    name="separator"
                    params={16}
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 5, width: 240, top: 26, height: 1 }}
                />
                <Region
                    name="notifications"
                    params={17}
                    layout={{ position: 'absolute', left: 11, width: 230, top: 32, height: 290, flexDirection: 'column' }}
                />
            </Border>
        </Region>
    );
};
