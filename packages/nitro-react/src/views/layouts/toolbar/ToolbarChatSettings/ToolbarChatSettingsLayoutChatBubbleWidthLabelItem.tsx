import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `chat_bubble_width_label` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatBubbleWidthLabelItemProps {
    captionChatBubbleWidthLabel?: string;
    layout?: BoxLayout;
}

export const ToolbarChatSettingsLayoutChatBubbleWidthLabelItem = ({ captionChatBubbleWidthLabel, layout }: ToolbarChatSettingsLayoutChatBubbleWidthLabelItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionChatBubbleWidthLabel ?? t('toolbar.chat.settings.bubble_width')}
            textStyle="text-style-u-regular"
            textOptions={{ fill: '#ffffff' }}
            name="chat_bubble_width_label"
            layout={{ width: 237, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
