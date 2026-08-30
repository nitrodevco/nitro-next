import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `2923_chat_report_xml` (layout "chat_report", 380x491) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatReportLayoutProps {
    captionRoomName?: string;
    itemsChatItems?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onSubmitButton?: () => void;
}

export const ChatReportLayout = ({ captionRoomName, itemsChatItems, layout, onClose, onSubmitButton }: ChatReportLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="emergency_help_request"
            name="emergency_help_request"
            caption={t('help.emergency.main.title')}
            onClose={onClose}
            layout={{ width: 380, height: 491, minWidth: 380, minHeight: 491, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region layout={{ position: 'absolute', left: 9, minWidth: 360, top: 8, minHeight: 1423, flexDirection: 'column', gap: 8 }}>
                    <ThemeText
                        text={t('help.emergency.chat_report.subtitle')}
                        textStyle="text-style-il-heading-1"
                        textOptions={{ fill: '#555555' }}
                        layout={{ width: 179, height: 19, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={t('help.emergency.chat_report.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        verticalAlign="top"
                        layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270 }}
                    />
                    <ScrollArea
                        orientation="vertical"
                        layout={{ width: 332, height: 350, flexShrink: 0 }}
                    >
                        <Region
                            name="room_items"
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            <Region layout={{ width: 317, height: 24, flexShrink: 0 }}>
                                <ThemeText
                                    text={captionRoomName ?? ''}
                                    textStyle="text-style-il-border"
                                    name="room_name"
                                    layout={{ position: 'absolute', left: 0, width: 280, top: 8, height: 15 }}
                                />
                                <Region
                                    name="chat_items"
                                    layout={{ position: 'absolute', left: 9, right: 1, top: 23, bottom: 0, flexDirection: 'column' }}
                                >
                                    {itemsChatItems}
                                </Region>
                            </Region>
                        </Region>
                    </ScrollArea>
                </Region>
                <Button
                    variant="101"
                    name="submit_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onSubmitButton}
                    layout={{ position: 'absolute', marginLeft: 5.5, marginRight: -5.5, width: 135, top: 409, height: 43 }}
                >
                    {t('help.emergency.chat_report.submit.button')}
                </Button>
            </Region>
        </Frame>
    );
};
