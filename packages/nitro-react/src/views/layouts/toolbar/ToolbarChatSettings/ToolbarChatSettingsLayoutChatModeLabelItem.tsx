import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `chat_mode_label` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatModeLabelItemProps {
    captionChatModeLabel?: string;
    layout?: BoxLayout;
}

export const ToolbarChatSettingsLayoutChatModeLabelItem = ({ captionChatModeLabel, layout }: ToolbarChatSettingsLayoutChatModeLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chat_mode_label"
            layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionChatModeLabel ?? t('toolbar.chat.settings.mode')}
                textStyle="text-style-u-regular"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};
