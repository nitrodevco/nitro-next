import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2922_chat_msg_reminder_xml` (layout "chat_msg_reminder", 270x24) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatMsgReminderLayoutProps {
    chatMsgReminder?: ChatMsgReminderLayoutChatMsgReminderProps;
    layout?: BoxLayout;
}

export const ChatMsgReminderLayout = ({ chatMsgReminder, layout }: ChatMsgReminderLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 270, height: 24, ...layout }}>
            <ChatMsgReminderLayoutChatMsgReminder {...chatMsgReminder} />
        </Region>
    );
};

/** Named region `chat_msg_reminder` of ChatMsgReminderLayout - configured through the parent's `chatMsgReminder` prop. */
export interface ChatMsgReminderLayoutChatMsgReminderProps {
    captionContent?: string;
    layout?: BoxLayout;
}

export const ChatMsgReminderLayoutChatMsgReminder = ({ captionContent, layout }: ChatMsgReminderLayoutChatMsgReminderProps) => {
    return (
        <Region
            name="chat_msg_reminder"
            layout={{ position: 'absolute', left: 0, width: 270, top: 0, height: 24, ...layout }}
        >
            <Region
                name="content"
                layout={{ position: 'absolute', left: 0, width: 270, top: 0, height: 24, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionContent ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 270, align: 'center' }}
                />
            </Region>
        </Region>
    );
};
