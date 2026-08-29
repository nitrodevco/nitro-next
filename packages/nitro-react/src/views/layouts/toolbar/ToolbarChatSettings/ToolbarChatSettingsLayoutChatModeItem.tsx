import { BoxLayout, Dropmenu } from '#base/theme';

/** Row template `chat_mode` of ToolbarChatSettingsLayout - pass real rows through its `items…` slot. */
export interface ToolbarChatSettingsLayoutChatModeItemProps {
    layout?: BoxLayout;
    onChatMode?: () => void;
}

export const ToolbarChatSettingsLayoutChatModeItem = ({ layout, onChatMode }: ToolbarChatSettingsLayoutChatModeItemProps) => {
    return (
        <Dropmenu
            variant="0"
            name="chat_mode"
            onPointerTap={onChatMode}
            layout={{ width: 237, height: 24, flexShrink: 0, ...layout }}
        />
    );
};
