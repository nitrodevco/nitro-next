import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Row template `chat_prototype` of TopicsFlowHelpLayout - pass real rows through its `items…` slot. */
export interface TopicsFlowHelpLayoutChatPrototypeItemProps {
    captionChatText?: string;
    layout?: BoxLayout;
    onChatCheck?: () => void;
    onChatText?: () => void;
    visibleChatCheck?: boolean;
    visibleChatText?: boolean;
}

export const TopicsFlowHelpLayoutChatPrototypeItem = ({ captionChatText, layout, onChatCheck, onChatText, visibleChatCheck, visibleChatText }: TopicsFlowHelpLayoutChatPrototypeItemProps) => {
    return (
        <Region
            name="chat_prototype"
            layout={{ width: 360, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleChatCheck ?? true) && (
                <CheckBox
                    variant="3"
                    name="chat_check"
                    onPointerTap={onChatCheck}
                    layout={{ position: 'absolute', left: 2, width: 16, top: 2, height: 16 }}
                >
                    This is a chatline
                </CheckBox>
            )}
            {(visibleChatText ?? true) && (
                <Region
                    name="chat_text"
                    layout={{ position: 'absolute', left: 20, width: 336, top: 2, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    onPointerTap={onChatText}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionChatText ?? 'This is a chat line'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 336 }}
                    />
                </Region>
            )}
        </Region>
    );
};
