/**
 * The toolbar's chat settings window - `toolbar/extensions/settings/ChatSettingsView`, drawn from its
 * `toolbar_chat_settings` template (257 x 269): the three account-level FreeFlow settings
 * `HabboFreeFlowChat` keeps - chat mode, bubble width and scroll speed - each a drop menu
 * (`chat_mode`, `chat_bubble_width`, `chat_scroll_speed`) picked by index. Opened from the settings
 * list under the purse.
 *
 * Flash saves on every pick (`onDropMenuSelectionChanged` -> `saveSettings`) and again when the
 * window is disposed; because each menu writes the store as it is picked, the dispose save would
 * send nothing new and is left out. `updateChatPreferences` drops a change that alters nothing,
 * so re-picking the selected option costs no packet either - which is also what stands in for
 * Flash's `§_-Vh§` guard against the menus reporting their initial population as a pick.
 */
import { updateChatPreferences } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';

import { ToolbarSettingsWindow } from './ToolbarSettingsWindow';

export const ToolbarChatSettingsView = ({ onClose }: { onClose: () => void }) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const chatMode = useUserStore(x => x.chatMode);
    const chatBubbleWidth = useUserStore(x => x.chatBubbleWidth);
    const chatScrollSpeed = useUserStore(x => x.chatScrollSpeed);

    // `populateDropMenus`.
    const modeOptions = [
        t('navigator.roomsettings.chat.mode.free.flow'),
        t('navigator.roomsettings.chat.mode.line.by.line'),
    ];
    const bubbleWidthOptions = [
        t('navigator.roomsettings.chat.bubbles.width.wide'),
        t('navigator.roomsettings.chat.bubbles.width.normal'),
        t('navigator.roomsettings.chat.bubbles.width.thin'),
    ];
    const scrollSpeedOptions = [
        t('navigator.roomsettings.chat.speed.fast'),
        t('navigator.roomsettings.chat.speed.normal'),
        t('navigator.roomsettings.chat.speed.slow'),
    ];

    return (
        <ToolbarSettingsWindow
            windowId="toolbar_chat_settings"
            templateId="habbo-toolbar-com/toolbar_chat_settings_xml"
            bindings={{
                chat_mode: {
                    options: modeOptions,
                    selection: chatMode,
                    onSelect: selection => updateChatPreferences(send, selection, chatBubbleWidth, chatScrollSpeed),
                },
                chat_bubble_width: {
                    options: bubbleWidthOptions,
                    selection: chatBubbleWidth,
                    onSelect: selection => updateChatPreferences(send, chatMode, selection, chatScrollSpeed),
                },
                chat_scroll_speed: {
                    options: scrollSpeedOptions,
                    selection: chatScrollSpeed,
                    onSelect: selection => updateChatPreferences(send, chatMode, chatBubbleWidth, selection),
                },
                back_btn: { onPointerTap: onClose },
            }}
        />
    );
};
