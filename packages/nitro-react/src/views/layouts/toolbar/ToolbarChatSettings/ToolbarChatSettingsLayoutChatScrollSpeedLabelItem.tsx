import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `chat_scroll_speed_label` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatScrollSpeedLabelItemProps {
    captionChatScrollSpeedLabel?: string;
    layout?: BoxLayout;
}

export const ToolbarChatSettingsLayoutChatScrollSpeedLabelItem = ({ captionChatScrollSpeedLabel, layout }: ToolbarChatSettingsLayoutChatScrollSpeedLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chat_scroll_speed_label"
            layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionChatScrollSpeedLabel ?? t('toolbar.chat.settings.scroll_speed')}
                textStyle="text-style-u-regular"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};
