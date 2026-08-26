import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `2920_bully_report_xml` (layout "bully_report", 289x491) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BullyReportLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onSubmitButton?: () => void;
}

export const BullyReportLayout = ({ layout, onClose, onSubmitButton }: BullyReportLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="emergency_help_request"
            name="emergency_help_request"
            params={32769}
            caption={t('help.bully.title')}
            onClose={onClose}
            layout={{ width: 289, height: 491, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="user_panel"
                    params={131088}
                    layout={{ position: 'absolute', left: 9, width: 282, top: 8, height: 388, flexDirection: 'column', gap: 8 }}
                >
                    <Region
                        params={16}
                        layout={{ width: 122, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.bully.subtitle')}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ fill: '#555555' }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.bully.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ width: 270, height: 337, flexShrink: 0 }}
                    >
                        <Region
                            name="user_list"
                            params={16}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            <Border
                                variant="102"
                                params={17}
                                layout={{ width: 257, height: 43, flexShrink: 0 }}
                            >
                                <Region
                                    name="user_name"
                                    params={16}
                                    layout={{ position: 'absolute', left: 37, width: 42, top: 8, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="user123"
                                        textStyle="text-style-il-border"
                                    />
                                </Region>
                                <Region
                                    name="room_name"
                                    params={16}
                                    layout={{ position: 'absolute', left: 37, width: 218, top: 21, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('help.emergency.main.step.two.room.name')}
                                        textOptions={{ fill: '#444444' }}
                                    />
                                </Region>
                                <WidgetSlot
                                    widgetType="avatar_image"
                                    name="user_avatar"
                                    params={16}
                                    options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                                    layout={{ position: 'absolute', left: 3, width: 33, top: 4, height: 34 }}
                                />
                            </Border>
                        </Region>
                    </ScrollArea>
                </Region>
                <Button
                    variant="101"
                    name="submit_button"
                    params={131281}
                    tintColor="#bbbbbb"
                    onPointerTap={onSubmitButton}
                    layout={{ position: 'absolute', left: 76, width: 135, top: 409, height: 43 }}
                >
                    {t('help.bully.submit')}
                </Button>
            </Region>
        </Frame>
    );
};
