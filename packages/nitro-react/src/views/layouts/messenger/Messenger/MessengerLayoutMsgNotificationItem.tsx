import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `msg_notification` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutMsgNotificationItemProps {
    captionContent?: string;
    layout?: BoxLayout;
    visibleContent?: boolean;
}

export const MessengerLayoutMsgNotificationItem = ({ captionContent, layout, visibleContent }: MessengerLayoutMsgNotificationItemProps) => {
    return (
        <Border
            variant="105"
            name="msg_notification"
            layout={{ width: 255, height: 50, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('messenger_caution.png')}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            />
            {(visibleContent ?? true) && (
                <Region
                    name="content"
                    layout={{ position: 'absolute', left: 50, width: 205, alignSelf: 'center', height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionContent ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 205 }}
                    />
                </Region>
            )}
        </Border>
    );
};
