import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2889_chat_msg_notification_xml` (layout "chat_msg_notification", 260x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatMsgNotificationLayoutProps {
    layout?: BoxLayout;
}

export const ChatMsgNotificationLayout = ({ layout }: ChatMsgNotificationLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 260, height: 50, ...layout }}>
            <Border
                variant="102"
                name="chat_msg_notification"
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 260, top: 0, height: 50 }}
            >
                <ThemeImage
                    params={16}
                    src={layoutImage('help_notification.png')}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                />
                <Region
                    name="content"
                    params={16}
                    layout={{ position: 'absolute', left: 50, width: 210, top: 10, height: 14, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                />
            </Border>
        </Region>
    );
};
