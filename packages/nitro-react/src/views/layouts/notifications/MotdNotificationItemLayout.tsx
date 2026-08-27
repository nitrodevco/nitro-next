import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2952_motd_notification_item_xml` (layout "achievement_notification", 405x95) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MotdNotificationItemLayoutProps {
    captionMessageText?: string;
    layout?: BoxLayout;
}

export const MotdNotificationItemLayout = ({ captionMessageText, layout }: MotdNotificationItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 405, height: 95, ...layout }}>
            <Region
                name="item_container"
                params={133136}
                layout={{ position: 'absolute', left: 0, width: 405, top: 0, height: 95 }}
            >
                <Region
                    name="message_text"
                    params={133136}
                    layout={{ position: 'absolute', left: 5, width: 395, top: 5, height: 85, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMessageText ?? ''}
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 395 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
