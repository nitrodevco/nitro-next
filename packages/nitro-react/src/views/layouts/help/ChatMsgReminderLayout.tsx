import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2922_chat_msg_reminder_xml` (layout "chat_msg_reminder", 270x24) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatMsgReminderLayoutProps {
    captionContent?: string;
    layout?: BoxLayout;
}

export const ChatMsgReminderLayout = ({ captionContent, layout }: ChatMsgReminderLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 270, height: 24, ...layout }}>
            <Region
                name="chat_msg_reminder"
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 270, top: 0, height: 24 }}
            >
                <Region
                    name="content"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 270, top: 0, height: 24, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionContent ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 270, align: 'center' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
