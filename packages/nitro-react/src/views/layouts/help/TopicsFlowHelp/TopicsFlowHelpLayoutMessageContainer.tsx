import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Named region `message_container` of TopicsFlowHelpLayout - configured through the parent's `messageContainer` prop. */
export interface TopicsFlowHelpLayoutMessageContainerProps {
    captionMessageContainerDescription?: string;
    captionMessagePhaseTitle?: string;
    captionUnlawfulMessageConfirmLabel?: string;
    helpMessage?: ReactNode;
    helpMessageEmail?: ReactNode;
    helpMessageName?: ReactNode;
    layout?: BoxLayout;
    onUnlawfulMessageConfirm?: () => void;
    visibleMessageContainer?: boolean;
}

export const TopicsFlowHelpLayoutMessageContainer = ({ captionMessageContainerDescription, captionMessagePhaseTitle, captionUnlawfulMessageConfirmLabel, helpMessage, helpMessageEmail, helpMessageName, layout, onUnlawfulMessageConfirm, visibleMessageContainer }: TopicsFlowHelpLayoutMessageContainerProps) => {
    const t = useTranslation();

    return (
        (visibleMessageContainer ?? false) && (
            <Region
                name="message_container"
                layout={{ position: 'absolute', left: 0, width: 445, top: 100, height: 330, ...layout }}
            >
                <Region
                    name="message_phase_title"
                    layout={{ position: 'absolute', left: 30, width: 278, top: 20, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMessagePhaseTitle ?? t('help.emergency.main.step.one.title')}
                        textStyle="text-style-u-headline-medium"
                    />
                </Region>
                <Region
                    name="message_container_description"
                    layout={{ position: 'absolute', left: 30, width: 380, top: 50, height: 57, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMessageContainerDescription ?? t('help.emergency.main.step.one.description')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="illumina_input"
                    name="help_message"
                    options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${help.emergency.main.step.one.entry.instruction}', 'illumina_input:multiline': 'true' }}
                    layout={{ position: 'absolute', left: 30, width: 390, top: 100, height: 120 }}
                >
                    {helpMessage}
                </WidgetSlot>
                <Region
                    name="unlawful_message_content"
                    layout={{ position: 'absolute', left: 30, width: 390, top: 230, height: 100 }}
                >
                    <WidgetSlot
                        widgetType="illumina_input"
                        name="help_message_name"
                        options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${connection.login.name}' }}
                        layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 29 }}
                    >
                        {helpMessageName}
                    </WidgetSlot>
                    <WidgetSlot
                        widgetType="illumina_input"
                        name="help_message_email"
                        options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${connection.login.email}' }}
                        layout={{ position: 'absolute', left: 200, width: 188, top: 0, height: 29 }}
                    >
                        {helpMessageEmail}
                    </WidgetSlot>
                    <CheckBox
                        variant="3"
                        name="unlawful_message_confirm"
                        onPointerTap={onUnlawfulMessageConfirm}
                        layout={{ position: 'absolute', left: 0, width: 30, top: 40, height: 30 }}
                    />
                    <Region
                        name="unlawful_message_confirm_label"
                        layout={{ position: 'absolute', left: 20, width: 370, top: 40, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionUnlawfulMessageConfirmLabel ?? t('help.cfh.unlawful_activity.confirm_label')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 370 }}
                        />
                    </Region>
                </Region>
            </Region>
        )
    );
};
