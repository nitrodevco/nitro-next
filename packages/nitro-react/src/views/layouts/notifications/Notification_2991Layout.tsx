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
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    src={undefined}
                    layout={{ position: 'absolute', left: 8, width: 50, alignSelf: 'center', height: 50 }}
                />
                <Region layout={{ position: 'absolute', left: 66, width: 116, top: 8, height: 50, minHeight: 22, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }} />
                <ThemeImage
                    src={undefined}
                    layout={{ position: 'absolute', left: 8, width: 50, alignSelf: 'center', height: 50 }}
                />
            </Border>
        </Region>
    );
};
