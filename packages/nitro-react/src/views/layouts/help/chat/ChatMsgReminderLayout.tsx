import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2922_chat_msg_reminder_xml` (layout "chat_msg_reminder", 270x24) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatMsgReminderLayoutProps {
    captionContent?: string;
    layout?: BoxLayout;
}

export const ChatMsgReminderLayout = ({ captionContent, layout }: ChatMsgReminderLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 270, height: 24, ...layout }}>
            <ThemeText
                text={captionContent ?? ''}
                textOptions={{ wordWrap: true, wordWrapWidth: 270, align: 'center' }}
                name="chat_msg_reminder"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
        </Region>
    );
};
