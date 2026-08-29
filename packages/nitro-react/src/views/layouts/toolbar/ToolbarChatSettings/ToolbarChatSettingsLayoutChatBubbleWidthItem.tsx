import { BoxLayout, Dropmenu } from '#base/theme';

/** Row template `chat_bubble_width` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatBubbleWidthItemProps {
    layout?: BoxLayout;
    onChatBubbleWidth?: () => void;
}

export const ToolbarChatSettingsLayoutChatBubbleWidthItem = ({ layout, onChatBubbleWidth }: ToolbarChatSettingsLayoutChatBubbleWidthItemProps) => {
    return (
        <Dropmenu
            variant="0"
            name="chat_bubble_width"
            onPointerTap={onChatBubbleWidth}
            layout={{ width: 237, height: 24, flexShrink: 0, ...layout }}
        />
    );
};
