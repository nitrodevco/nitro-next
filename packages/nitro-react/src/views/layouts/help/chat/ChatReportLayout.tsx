import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `2923_chat_report_xml` (layout "chat_report", 380x491) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatReportLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onSubmitButton?: () => void;
    roomItems?: ChatReportLayoutRoomItemsProps;
}

export const ChatReportLayout = ({ layout, onClose, onSubmitButton, roomItems }: ChatReportLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="emergency_help_request"
            name="emergency_help_request"
            caption={t('help.emergency.main.title')}
            onClose={onClose}
            layout={{ width: 380, height: 491, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region layout={{ position: 'absolute', left: 9, minWidth: 360, top: 8, minHeight: 1423, flexDirection: 'column', gap: 8 }}>
                    <Region layout={{ width: 179, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('help.emergency.chat_report.subtitle')}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ fill: '#555555' }}
                        />
                    </Region>
                    <Region layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('help.emergency.chat_report.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <ChatReportLayoutRoomItems {...roomItems} />
                </Region>
                <Button
                    variant="101"
                    name="submit_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onSubmitButton}
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 135, top: 409, height: 43 }}
                >
                    {t('help.emergency.chat_report.submit.button')}
                </Button>
            </Region>
        </Frame>
    );
};

/** Named region `chat_items` of ChatReportLayout - configured through the parent's `chatItems` prop. */
export interface ChatReportLayoutChatItemsProps {
    layout?: BoxLayout;
}

export const ChatReportLayoutChatItems = ({ layout }: ChatReportLayoutChatItemsProps) => {
    return (
        <Region
            name="chat_items"
            layout={{ position: 'absolute', left: 9, right: 1, top: 23, bottom: 0, flexDirection: 'column', ...layout }}
        />
    );
};

/** Named region `room_items` of ChatReportLayout - configured through the parent's `roomItems` prop. */
export interface ChatReportLayoutRoomItemsProps {
    captionRoomName?: string;
    chatItems?: ChatReportLayoutChatItemsProps;
    layout?: BoxLayout;
}

export const ChatReportLayoutRoomItems = ({ captionRoomName, chatItems, layout }: ChatReportLayoutRoomItemsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 332, height: 350, flexShrink: 0, ...layout }}
        >
            <Region
                name="room_items"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                <Region layout={{ width: 317, height: 24, flexShrink: 0 }}>
                    <Region
                        name="room_name"
                        layout={{ position: 'absolute', left: 0, width: 280, top: 8, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRoomName ?? ''}
                            textStyle="text-style-il-border"
                        />
                    </Region>
                    <ChatReportLayoutChatItems {...chatItems} />
                </Region>
            </Region>
        </ScrollArea>
    );
};
