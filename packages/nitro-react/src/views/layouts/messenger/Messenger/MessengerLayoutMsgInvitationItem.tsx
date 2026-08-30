import { Border, BoxLayout, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `msg_invitation` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutMsgInvitationItemProps {
    captionContent?: string;
    layout?: BoxLayout;
    visibleContent?: boolean;
}

export const MessengerLayoutMsgInvitationItem = ({ captionContent, layout, visibleContent }: MessengerLayoutMsgInvitationItemProps) => {
    return (
        <Border
            variant="105"
            name="msg_invitation"
            tintColor="#d1efde"
            layout={{ width: 255, height: 50, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('messenger_notification_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            />
            {(visibleContent ?? true) && (
                <ThemeText
                    text={captionContent ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 205 }}
                    name="content"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 50, width: 205, alignSelf: 'center', height: 20 }}
                />
            )}
        </Border>
    );
};
