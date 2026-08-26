import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `2923_chat_report_xml` (layout "chat_report", 380x491) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatReportLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onSubmitButton?: () => void;
}

export const ChatReportLayout = ({ layout, onClose, onSubmitButton }: ChatReportLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="emergency_help_request"
            name="emergency_help_request"
            params={32769}
            caption={t('help.emergency.main.title')}
            onClose={onClose}
            layout={{ width: 380, height: 491, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={131088}
                    layout={{ position: 'absolute', left: 9, width: 360, top: 8, height: 1423, flexDirection: 'column', gap: 8 }}
                >
                    <Region
                        params={16}
                        layout={{ width: 179, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.chat_report.subtitle')}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ fill: '#555555' }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.chat_report.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ width: 332, height: 350, flexShrink: 0 }}
                    >
                        <Region
                            name="room_items"
                            params={144}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            <Region
                                params={147472}
                                layout={{ width: 317, height: 24, flexShrink: 0 }}
                            >
                                <Region
                                    name="room_name"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 280, top: 8, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                />
                                <Region
                                    name="chat_items"
                                    params={149648}
                                    layout={{ position: 'absolute', left: 9, width: 307, top: 23, height: 1, flexDirection: 'column' }}
                                />
                            </Region>
                        </Region>
                    </ScrollArea>
                </Region>
                <Button
                    variant="101"
                    name="submit_button"
                    params={131281}
                    tintColor="#bbbbbb"
                    onPointerTap={onSubmitButton}
                    layout={{ position: 'absolute', left: 122, width: 135, top: 409, height: 43 }}
                >
                    {t('help.emergency.chat_report.submit.button')}
                </Button>
            </Region>
        </Frame>
    );
};
