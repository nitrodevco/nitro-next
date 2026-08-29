import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2951_notification_friendonline_xml` (layout "notification_friendonline", 86x58) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationFriendonlineLayoutProps {
    layout?: BoxLayout;
    onSlideNotificationAway?: () => void;
}

export const NotificationFriendonlineLayout = ({ layout, onSlideNotificationAway }: NotificationFriendonlineLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 86, height: 58, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minHeight: 58, maxHeight: 58 }}>
                <Region
                    name="content"
                    layout={{ position: 'absolute', left: 0, width: 43, top: 12, height: 34 }}
                >
                    <ThemeImage
                        src={layoutImage('notification_friendonline_left.png')}
                        layout={{ position: 'absolute', left: 0, width: 7, top: 0, height: 34 }}
                    />
                    <ThemeImage
                        src={layoutImage('notification_friendonline_middle.png')}
                        layout={{ position: 'absolute', left: 7, right: -4, top: 0, height: 34 }}
                    />
                    <Region layout={{ position: 'absolute', left: 8, width: 19, top: 7, height: 17, flexDirection: 'row', gap: 5 }}>
                        <Region
                            name="slide_notification_away"
                            onPointerTap={onSlideNotificationAway}
                            cursor="pointer"
                            layout={{ width: 10, height: 17, flexShrink: 0 }}
                        >
                            <ThemeImage
                                src={layoutImage('notification_friendonline_slide.png')}
                                layout={{ position: 'absolute', left: 2, width: 6, top: 6, height: 8 }}
                            />
                        </Region>
                        <Region layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} />
                    </Region>
                </Region>
                <ThemeImage
                    src={layoutImage('notification_friendonline_circle_inner.png')}
                    layout={{ position: 'absolute', right: 0, width: 53, top: 3, height: 53 }}
                />
                <Region
                    name="bitmaps"
                    layout={{ position: 'absolute', right: 1, width: 50, top: 4, height: 50 }}
                >
                    <ThemeImage
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 50, alignSelf: 'center', height: 50 }}
                    />
                    <ThemeImage
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 50, alignSelf: 'center', height: 50 }}
                    />
                </Region>
                <ThemeImage
                    src={layoutImage('notification_friendonline_circle.png')}
                    layout={{ position: 'absolute', right: 0, width: 53, top: 3, height: 53 }}
                />
            </Region>
        </Region>
    );
};
