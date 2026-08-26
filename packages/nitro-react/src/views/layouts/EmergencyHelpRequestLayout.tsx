import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, RadioButton, Region, ScrollArea, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `2927_emergency_help_request_xml` (layout "emergency_help_request", 593x491) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EmergencyHelpRequestLayoutProps {
    layout?: BoxLayout;
    on_121?: () => void;
    on_122?: () => void;
    on_123?: () => void;
    on_124?: () => void;
    onClose?: () => void;
    onLink?: () => void;
    onSubmitButton?: () => void;
    onSubmitButton2?: () => void;
    onUrgentHelpLink?: () => void;
}

export const EmergencyHelpRequestLayout = ({ layout, on_121, on_122, on_123, on_124, onClose, onLink, onSubmitButton, onSubmitButton2, onUrgentHelpLink }: EmergencyHelpRequestLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="emergency_help_request"
            name="emergency_help_request"
            params={32769}
            caption={t('help.emergency.main.title')}
            onClose={onClose}
            layout={{ width: 593, height: 491, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={131088}
                    layout={{ position: 'absolute', left: 9, width: 280, top: 8, height: 563, flexDirection: 'column', gap: 8 }}
                >
                    <Region
                        params={16}
                        layout={{ width: 236, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.main.step.one.title')}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ fill: '#555555' }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 280, height: 16, flexShrink: 0, minWidth: 280, maxWidth: 280, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.main.step.one.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 280 }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="illumina_input"
                        name="help_message"
                        params={16}
                        options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${help.emergency.main.step.one.entry.instruction}', 'illumina_input:multiline': 'true', 'illumina_input:max_chars': '700' }}
                        layout={{ width: 279, height: 94, flexShrink: 0 }}
                    />
                    <Region
                        name="topic_selector"
                        params={147473}
                        layout={{ width: 270, height: 79, flexShrink: 0, flexDirection: 'column', gap: 5 }}
                    >
                        <RadioButton
                            variant="100"
                            name="121"
                            params={147473}
                            onPointerTap={on_121}
                            layout={{ width: 270, height: 16, flexShrink: 0, minHeight: 0, maxHeight: 100 }}
                        >
                            {t('help.emergency.main.step.one.topic.121')}
                        </RadioButton>
                        <RadioButton
                            variant="100"
                            name="122"
                            params={147473}
                            onPointerTap={on_122}
                            layout={{ width: 270, height: 16, flexShrink: 0, minHeight: 0, maxHeight: 100 }}
                        >
                            {t('help.emergency.main.step.one.topic.122')}
                        </RadioButton>
                        <RadioButton
                            variant="100"
                            name="124"
                            params={147473}
                            onPointerTap={on_124}
                            layout={{ width: 270, height: 16, flexShrink: 0, minHeight: 0, maxHeight: 100 }}
                        >
                            {t('help.emergency.main.step.one.topic.124')}
                        </RadioButton>
                        <RadioButton
                            variant="100"
                            name="123"
                            params={147473}
                            onPointerTap={on_123}
                            layout={{ width: 270, height: 16, flexShrink: 0, minHeight: 0, maxHeight: 100 }}
                        >
                            {t('help.emergency.main.step.one.topic.123')}
                        </RadioButton>
                    </Region>
                </Region>
                <Region
                    name="user_panel"
                    params={131088}
                    visible={false}
                    layout={{ position: 'absolute', left: 309, width: 282, top: 8, height: 378, flexDirection: 'column', gap: 8 }}
                >
                    <Region
                        params={16}
                        layout={{ width: 237, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.main.step.two.title')}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ fill: '#555555' }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.main.step.two.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ width: 282, height: 307, flexShrink: 0 }}
                    >
                        <Region
                            name="user_list"
                            params={16}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            <Border
                                variant="102"
                                params={17}
                                layout={{ width: 262, height: 43, flexShrink: 0 }}
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
                                    options={{ 'avatar_image:scale': 'sh', 'avatar_image:only_head': 'true' }}
                                    layout={{ position: 'absolute', left: 3, width: 45, top: -11, height: 72 }}
                                />
                            </Border>
                        </Region>
                    </ScrollArea>
                </Region>
                <Region
                    name="room_panel"
                    params={131088}
                    layout={{ position: 'absolute', left: 309, width: 282, top: 8, height: 378, flexDirection: 'column', gap: 8 }}
                >
                    <Region
                        name="room_panel_title"
                        params={16}
                        layout={{ width: 227, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.main.report.room')}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ fill: '#555555' }}
                        />
                    </Region>
                    <Region
                        name="room_report_info"
                        params={16400}
                        layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.main.report.room.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Region
                        name="room_name"
                        params={16}
                        layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="room name"
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Region
                        name="room_description"
                        params={16}
                        layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="room description"
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                </Region>
                <Border
                    variant="104"
                    name="submit_box_wide"
                    params={16}
                    tintColor="#ca0c07"
                    layout={{ position: 'absolute', left: 9, width: 573, top: 387, height: 58 }}
                >
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 17, width: 397, top: 13, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.main.submit.description')}
                            textStyle="text-style-il-regular-white"
                        />
                    </Region>
                    <Region
                        params={1}
                        visible={false}
                        layout={{ position: 'absolute', left: 17, width: 397, top: 28, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        onPointerTap={onLink}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={t('help.emergency.main.submit.explanation')}
                            textStyle="text-style-il-regular-white"
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="submit_button"
                        params={393233}
                        onPointerTap={onSubmitButton}
                        layout={{ position: 'absolute', left: 345, width: 225, top: 4, height: 48 }}
                    >
                        {t('help.emergency.main.submit.button')}
                    </Button>
                </Border>
                <Border
                    variant="104"
                    name="submit_box_narrow"
                    params={16}
                    tintColor="#ca0c07"
                    layout={{ position: 'absolute', left: 9, width: 280, top: 336, height: 108 }}
                >
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 250, top: 10, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('guide.help.request.emergency.help.title')}
                            textStyle="text-style-il-regular-white"
                            textOptions={{ wordWrap: true, wordWrapWidth: 250, align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="urgent_help_link"
                        params={33}
                        visible={false}
                        layout={{ position: 'absolute', left: 10, width: 250, top: 41, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPointerTap={onUrgentHelpLink}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={t('guide.help.request.emergency.help.link')}
                            textStyle="text-style-il-regular-white"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                    <Button
                        variant="101"
                        name="submit_button"
                        params={147665}
                        tintColor="#bbbbbb"
                        onPointerTap={onSubmitButton2}
                        layout={{ position: 'absolute', left: 8, width: 264, top: 59, height: 48, minHeight: 48, maxHeight: 48 }}
                    >
                        {t('guide.help.request.user.create.input.button')}
                    </Button>
                </Border>
                <WidgetSlot
                    widgetType="separator"
                    name="separator"
                    params={16}
                    options={{ 'separator:vertical': 'true' }}
                    layout={{ position: 'absolute', left: 296, width: 8, top: 40, height: 336 }}
                />
            </Region>
        </Frame>
    );
};
