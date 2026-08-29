import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2951_notification_friendonline_xml` (layout "notification_friendonline", 86x58) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationFriendonlineLayoutProps {
    bitmaps?: NotificationFriendonlineLayoutBitmapsProps;
    content?: NotificationFriendonlineLayoutContentProps;
    layout?: BoxLayout;
}

export const NotificationFriendonlineLayout = ({ bitmaps, content, layout }: NotificationFriendonlineLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 86, height: 58, ...layout }}>
            <Region
                tags={[ 'border' ]}
                layout={{ position: 'absolute', left: 0, width: 86, top: 0, height: 58, minHeight: 58, maxHeight: 58 }}
            >
                <NotificationFriendonlineLayoutContent {...content} />
                <ThemeImage
                    src={layoutImage('notification_friendonline_circle_inner.png')}
                    layout={{ position: 'absolute', right: 0, width: 53, top: 3, height: 53 }}
                />
                <NotificationFriendonlineLayoutBitmaps {...bitmaps} />
                <ThemeImage
                    src={layoutImage('notification_friendonline_circle.png')}
                    layout={{ position: 'absolute', right: 0, width: 53, top: 3, height: 53 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `slide_notification_away` of NotificationFriendonlineLayout - configured through the parent's `slideNotificationAway` prop. */
export interface NotificationFriendonlineLayoutSlideNotificationAwayProps {
    layout?: BoxLayout;
    onSlideNotificationAway?: () => void;
    tags?: string[];
}

export const NotificationFriendonlineLayoutSlideNotificationAway = ({ layout, onSlideNotificationAway, tags }: NotificationFriendonlineLayoutSlideNotificationAwayProps) => {
    return (
        <Region
            name="slide_notification_away"
            tags={tags}
            onPointerTap={onSlideNotificationAway}
            cursor="pointer"
            layout={{ width: 10, height: 17, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                tags={[ 'slide_notification_away' ]}
                src={layoutImage('notification_friendonline_slide.png')}
                layout={{ position: 'absolute', left: 2, width: 6, top: 6, height: 8 }}
            />
        </Region>
    );
};

/** Named region `content` of NotificationFriendonlineLayout - configured through the parent's `content` prop. */
export interface NotificationFriendonlineLayoutContentProps {
    layout?: BoxLayout;
    slideNotificationAway?: NotificationFriendonlineLayoutSlideNotificationAwayProps;
    tags?: string[];
}

export const NotificationFriendonlineLayoutContent = ({ layout, slideNotificationAway, tags }: NotificationFriendonlineLayoutContentProps) => {
    return (
        <Region
            name="content"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 43, top: 12, height: 34, ...layout }}
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
                <NotificationFriendonlineLayoutSlideNotificationAway
                    tags={[ 'slide_notification_away' ]}
                    {...slideNotificationAway}
                />
                <Region
                    tags={[ 'notification_text' ]}
                    layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `bitmaps` of NotificationFriendonlineLayout - configured through the parent's `bitmaps` prop. */
export interface NotificationFriendonlineLayoutBitmapsProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const NotificationFriendonlineLayoutBitmaps = ({ layout, tags }: NotificationFriendonlineLayoutBitmapsProps) => {
    return (
        <Region
            name="bitmaps"
            tags={tags}
            layout={{ position: 'absolute', right: 1, width: 50, top: 4, height: 50, ...layout }}
        >
            <ThemeImage
                tags={[ 'notification_icon_static' ]}
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 50, alignSelf: 'center', height: 50 }}
            />
            <ThemeImage
                tags={[ 'notification_icon' ]}
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 50, alignSelf: 'center', height: 50 }}
            />
        </Region>
    );
};
