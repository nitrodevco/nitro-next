/**
 * The toolbar's chat settings window - `toolbar/extensions/settings/ChatSettingsView` on the
 * `toolbar_chat_settings` layout (257 x 269): the three account-level FreeFlow settings
 * `HabboFreeFlowChat` keeps - chat mode, bubble width and scroll speed - each a label over a
 * style 0 drop menu, picked by index. Opened from the settings list under the purse, placed as
 * Flash places it: at the top of the desktop, 200 pixels from its right edge.
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
import { Border, Box, Button, Dropmenu, Region, ThemeText, useWindowActivation } from '#base/theme';

/** `toolbar_chat_settings` - the window and the itemlist its rows sit in (`spacing` 4). */
const WINDOW_WIDTH = 257;
const WINDOW_HEIGHT = 269;
const LIST_WIDTH = 237;
/** `SettingsExtension.openChatSettingsWindow`: `desktop.width - window.width - 200`. */
const RIGHT_MARGIN = 200;

interface SettingRowProps {
    label: string;
    options: string[];
    /** The index the menu shows - each of the three is its own enum, which is its index. */
    selection: number;
    onSelect: (selection: number) => void;
}

/** A label of 237 x 17 over its 237 x 24 drop menu, as `populateTexts` / `populateDropMenus` fill them. */
const SettingRow = ({ label, options, selection, onSelect }: SettingRowProps) => (
    <>
        <ThemeText
            text={label}
            textStyle="u_regular"
            textOptions={{ fill: '#ffffff' }}
            clip
            verticalAlign="top"
            layout={{ width: LIST_WIDTH, height: 17, flexShrink: 0 }}
        />
        <Dropmenu
            variant="0"
            caption={options[selection] ?? ''}
            options={options.map((option, index) => ({
                key: index,
                label: option,
                selected: index === selection,
                onSelect: () => onSelect(index),
            }))}
            layout={{ width: LIST_WIDTH, height: 24, flexShrink: 0 }}
        />
    </>
);

export const ToolbarChatSettingsView = ({ onClose }: { onClose: () => void }) => {
    const t = useTranslation();
    const { zIndex, onPointerDown } = useWindowActivation('toolbar_chat_settings');
    const { send } = useWebSocketContext();
    const chatMode = useUserStore(x => x.chatMode);
    const chatBubbleWidth = useUserStore(x => x.chatBubbleWidth);
    const chatScrollSpeed = useUserStore(x => x.chatScrollSpeed);

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
        <Region
            interactive
            zIndex={zIndex}
            onPointerDown={onPointerDown}
            layout={{ position: 'absolute', top: 0, right: RIGHT_MARGIN, width: WINDOW_WIDTH + 1, height: WINDOW_HEIGHT + 1 }}
        >
            <Border
                variant="6"
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 1, top: 1, width: WINDOW_WIDTH, height: WINDOW_HEIGHT }}
            >
                <ThemeText
                    text={t('toolbar.chat.settings.title')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 56, top: 5, width: 144, height: 17 }}
                />
                <Region
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 10, top: 24, width: LIST_WIDTH, height: 1 }}
                />
                <ThemeText
                    text={t('toolbar.chat.settings.info')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: LIST_WIDTH }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, top: 33, width: LIST_WIDTH, height: 32 }}
                />
                <Box layout={{ position: 'absolute', left: 10, top: 70, width: LIST_WIDTH, flexDirection: 'column', gap: 4 }}>
                    <SettingRow
                        label={t('toolbar.chat.settings.mode')}
                        options={modeOptions}
                        selection={chatMode}
                        onSelect={selection => updateChatPreferences(send, selection, chatBubbleWidth, chatScrollSpeed)}
                    />
                    <SettingRow
                        label={t('toolbar.chat.settings.bubble_width')}
                        options={bubbleWidthOptions}
                        selection={chatBubbleWidth}
                        onSelect={selection => updateChatPreferences(send, chatMode, selection, chatScrollSpeed)}
                    />
                    <SettingRow
                        label={t('toolbar.chat.settings.scroll_speed')}
                        options={scrollSpeedOptions}
                        selection={chatScrollSpeed}
                        onSelect={selection => updateChatPreferences(send, chatMode, chatBubbleWidth, selection)}
                    />
                </Box>
                <Button
                    variant="3"
                    textStyle="button_shiny_regular"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', left: 10, top: 229, width: 60, height: 28 }}
                >
                    {t('widget.memenu.back')}
                </Button>
            </Border>
        </Region>
    );
};
