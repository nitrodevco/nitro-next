import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `2991_notification_xml` (layout "notification", 190x66) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Notification_2991LayoutProps {
    layout?: BoxLayout;
}

export const Notification_2991Layout = ({ layout }: Notification_2991LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 190, height: 66, ...layout }}>
            <Border
                variant="1"
                tags={[ 'border' ]}
                params={131073}
                layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 66 }}
            >
                <ThemeImage
                    tags={[ 'notification_icon' ]}
                    params={3088}
                    src={undefined}
                    layout={{ position: 'absolute', left: 8, width: 50, top: '50%', marginTop: -25, height: 50 }}
                />
                <Region
                    tags={[ 'notification_text' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 66, width: 116, top: 8, height: 50, minHeight: 22, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                />
                <ThemeImage
                    tags={[ 'notification_icon_static' ]}
                    params={3088}
                    src={undefined}
                    layout={{ position: 'absolute', left: 8, width: 50, top: '50%', marginTop: -25, height: 50 }}
                />
            </Border>
        </Region>
    );
};
