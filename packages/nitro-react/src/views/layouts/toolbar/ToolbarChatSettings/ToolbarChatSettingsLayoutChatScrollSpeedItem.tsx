import { BoxLayout, Dropmenu } from '#base/theme';

/** Row template `chat_scroll_speed` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatScrollSpeedItemProps {
    layout?: BoxLayout;
    onChatScrollSpeed?: () => void;
}

export const ToolbarChatSettingsLayoutChatScrollSpeedItem = ({ layout, onChatScrollSpeed }: ToolbarChatSettingsLayoutChatScrollSpeedItemProps) => {
    return (
        <Dropmenu
            variant="0"
            name="chat_scroll_speed"
            onPointerTap={onChatScrollSpeed}
            layout={{ width: 237, height: 24, flexShrink: 0, ...layout }}
        />
    );
};
