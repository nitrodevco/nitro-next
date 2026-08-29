import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeText, WidgetSlot } from '#base/theme';

import { EmergencyHelpRequestLayout_121Item } from './EmergencyHelpRequestLayout_121Item';
import { EmergencyHelpRequestLayout_122Item } from './EmergencyHelpRequestLayout_122Item';
import { EmergencyHelpRequestLayout_123Item } from './EmergencyHelpRequestLayout_123Item';
import { EmergencyHelpRequestLayout_124Item } from './EmergencyHelpRequestLayout_124Item';
import { EmergencyHelpRequestLayoutRoomDescriptionItem } from './EmergencyHelpRequestLayoutRoomDescriptionItem';
import { EmergencyHelpRequestLayoutRoomNameItem } from './EmergencyHelpRequestLayoutRoomNameItem';
import { EmergencyHelpRequestLayoutRoomPanelTitleItem } from './EmergencyHelpRequestLayoutRoomPanelTitleItem';
import { EmergencyHelpRequestLayoutRoomReportInfoItem } from './EmergencyHelpRequestLayoutRoomReportInfoItem';
import { EmergencyHelpRequestLayoutUserPanel, EmergencyHelpRequestLayoutUserPanelProps } from './EmergencyHelpRequestLayoutUserPanel';

/** Generated from `2927_emergency_help_request_xml` (layout "emergency_help_request", 593x491) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EmergencyHelpRequestLayoutProps {
    captionUrgentHelpLink?: string;
    helpMessage?: ReactNode;
    itemsRoomPanel?: ReactNode;
    itemsTopicSelector?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onSubmitButton?: () => void;
    onSubmitButton2?: () => void;
    onUrgentHelpLink?: () => void;
    separator?: ReactNode;
    userPanel?: EmergencyHelpRequestLayoutUserPanelProps;
    visibleUrgentHelpLink?: boolean;
    visibleUserPanel?: boolean;
}

export const EmergencyHelpRequestLayout = ({ captionUrgentHelpLink, helpMessage, itemsRoomPanel, itemsTopicSelector, layout, onClose, onSubmitButton, onSubmitButton2, onUrgentHelpLink, separator, userPanel, visibleUrgentHelpLink, visibleUserPanel }: EmergencyHelpRequestLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="emergency_help_request"
            name="emergency_help_request"
            caption={t('help.emergency.main.title')}
            onClose={onClose}
            layout={{ width: 593, height: 491, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 9, minWidth: 280, top: 8, minHeight: 563, flexDirection: 'column', gap: 8 }}>
                <Region layout={{ width: 236, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.emergency.main.step.one.title')}
                        textStyle="text-style-il-heading-1"
                        textOptions={{ fill: '#555555' }}
                    />
                </Region>
                <Region layout={{ width: 280, height: 16, flexShrink: 0, minWidth: 280, maxWidth: 280, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.emergency.main.step.one.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 280 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="illumina_input"
                    name="help_message"
                    options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${help.emergency.main.step.one.entry.instruction}', 'illumina_input:multiline': 'true', 'illumina_input:max_chars': '700' }}
                    layout={{ width: 279, height: 94, flexShrink: 0 }}
                >
                    {helpMessage}
                </WidgetSlot>
                <Region
                    name="topic_selector"
                    layout={{ flexShrink: 0, flexDirection: 'column', gap: 5 }}
                >
                    {itemsTopicSelector ?? (
                        <>
                            <EmergencyHelpRequestLayout_121Item />
                            <EmergencyHelpRequestLayout_122Item />
                            <EmergencyHelpRequestLayout_124Item />
                            <EmergencyHelpRequestLayout_123Item />
                        </>
                    )}
                </Region>
            </Region>
            {(visibleUserPanel ?? false) && (
                <EmergencyHelpRequestLayoutUserPanel {...userPanel} />
            )}
            <Region
                name="room_panel"
                layout={{ position: 'absolute', left: 309, minWidth: 282, top: 8, minHeight: 378, flexDirection: 'column', gap: 8 }}
            >
                {itemsRoomPanel ?? (
                    <>
                        <EmergencyHelpRequestLayoutRoomPanelTitleItem />
                        <EmergencyHelpRequestLayoutRoomReportInfoItem />
                        <EmergencyHelpRequestLayoutRoomNameItem />
                        <EmergencyHelpRequestLayoutRoomDescriptionItem />
                    </>
                )}
            </Region>
            <Border
                variant="104"
                name="submit_box_wide"
                tintColor="#ca0c07"
                layout={{ position: 'absolute', left: 9, width: 573, top: 387, height: 58 }}
            >
                <Region layout={{ position: 'absolute', left: 17, width: 397, top: 13, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('help.emergency.main.submit.description')}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
                {/* `link` is hidden and has no name to show it by */}
                <Button
                    variant="100"
                    name="submit_button"
                    onPointerTap={onSubmitButton}
                    layout={{ position: 'absolute', right: 3, width: 225, top: 4, height: 48 }}
                >
                    {t('help.emergency.main.submit.button')}
                </Button>
            </Border>
            <Border
                variant="104"
                name="submit_box_narrow"
                tintColor="#ca0c07"
                layout={{ position: 'absolute', left: 9, width: 280, top: 336, height: 108, justifyContent: 'center' }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 250, top: 10, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <ThemeText
                        text={t('guide.help.request.emergency.help.title')}
                        textStyle="text-style-il-regular-white"
                        textOptions={{ wordWrap: true, wordWrapWidth: 250, align: 'center' }}
                    />
                </Region>
                {(visibleUrgentHelpLink ?? false) && (
                    <Region
                        name="urgent_help_link"
                        layout={{ position: 'absolute', left: 10, width: 250, top: 41, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPointerTap={onUrgentHelpLink}
                        cursor="pointer"
                    >
                        <ThemeText
                            text={captionUrgentHelpLink ?? t('guide.help.request.emergency.help.link')}
                            textStyle="text-style-il-regular-white"
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                )}
                <Button
                    variant="101"
                    name="submit_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onSubmitButton2}
                    layout={{ position: 'absolute', width: 264, top: 59, height: 48, minHeight: 48, maxHeight: 48 }}
                >
                    {t('guide.help.request.user.create.input.button')}
                </Button>
            </Border>
            <WidgetSlot
                widgetType="separator"
                name="separator"
                options={{ 'separator:vertical': 'true' }}
                layout={{ position: 'absolute', left: 296, width: 8, top: 40, height: 336 }}
            >
                {separator}
            </WidgetSlot>
        </Frame>
    );
};
