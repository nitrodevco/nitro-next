import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2889_chat_msg_notification_xml` (layout "chat_msg_notification", 260x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatMsgNotificationLayoutProps {
    captionContent?: string;
    layout?: BoxLayout;
}

export const ChatMsgNotificationLayout = ({ captionContent, layout }: ChatMsgNotificationLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 260, height: 50, ...layout }}>
            <Border
                variant="102"
                name="chat_msg_notification"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    src={layoutImage('help_notification.png')}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                />
                <Region
                    name="content"
                    layout={{ position: 'absolute', right: 0, width: 210, top: 10, height: 14, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionContent ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
