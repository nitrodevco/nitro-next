import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `chat_mode_label` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatModeLabelItemProps {
    captionChatModeLabel?: string;
    layout?: BoxLayout;
}

export const ToolbarChatSettingsLayoutChatModeLabelItem = ({ captionChatModeLabel, layout }: ToolbarChatSettingsLayoutChatModeLabelItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionChatModeLabel ?? t('toolbar.chat.settings.mode')}
            textStyle="text-style-u-regular"
            textOptions={{ fill: '#ffffff' }}
            name="chat_mode_label"
            layout={{ width: 237, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
