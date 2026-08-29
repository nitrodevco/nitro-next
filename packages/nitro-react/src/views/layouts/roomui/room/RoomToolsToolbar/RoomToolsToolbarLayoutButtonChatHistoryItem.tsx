import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `button_chat_history` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonChatHistoryItemProps {
    captionTextChatHistory?: string;
    layout?: BoxLayout;
    onButtonChatHistory?: () => void;
    visibleTextChatHistory?: boolean;
}

export const RoomToolsToolbarLayoutButtonChatHistoryItem = ({ captionTextChatHistory, layout, onButtonChatHistory, visibleTextChatHistory }: RoomToolsToolbarLayoutButtonChatHistoryItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_chat_history"
            tooltip={t('chat.history.button.tooltip')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonChatHistory}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            {/* `container` is hidden and has no name to show it by */}
            <ThemeImage
                src={layoutImage('roomtools_chat_history.png')}
                layout={{ position: 'absolute', left: 3, width: 25, top: 0, height: 25 }}
            />
            {(visibleTextChatHistory ?? true) && (
                <Region
                    name="text_chat_history"
                    layout={{ position: 'absolute', left: 36, width: 90, top: 3, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextChatHistory ?? t('room.chathistory.button.text')}
                        textStyle="text-style-u-button-tab"
                        textOptions={{ fill: '#bbbbbb' }}
                    />
                </Region>
            )}
        </Region>
    );
};
