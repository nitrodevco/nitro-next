import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `chat_bubble_width_label` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatBubbleWidthLabelItemProps {
    captionChatBubbleWidthLabel?: string;
    layout?: BoxLayout;
}

export const ToolbarChatSettingsLayoutChatBubbleWidthLabelItem = ({ captionChatBubbleWidthLabel, layout }: ToolbarChatSettingsLayoutChatBubbleWidthLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chat_bubble_width_label"
            layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionChatBubbleWidthLabel ?? t('toolbar.chat.settings.bubble_width')}
                textStyle="text-style-u-regular"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};
