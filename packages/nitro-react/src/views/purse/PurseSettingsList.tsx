import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigBoolean, useTranslation, useWindowActions } from '#base/context/system';

import { ToolbarSettingsView } from '../toolbar/ToolbarSettingsView';

/**
 * The settings list the purse's settings button drops (`HabboToolbar.toggleSettingVisibility`):
 * every pick opens its window and folds the list away.
 */
export const PurseSettingsList = ({ onClose }: { onClose: () => void }) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const { showWindow } = useWindowActions();
    // `SettingsExtension`'s two optional rows: `getBoolean` defaults to false, so a hotel that
    // does not set the key does not get the row.
    const discordEnabled = useConfigBoolean('discord.enabled');
    const wordFilterEnabled = useConfigBoolean('user.custom.filter.enabled');

    const openSetting = (open: () => void) => () => {
        open();
        onClose();
    };

    return (
        <ToolbarSettingsView entries={[
            {
                key: 'sound',
                label: t('widget.memenu.settings.audio', 'Sound settings'),
                onSelect: openSetting(() => showWindow('toolbar_sound_settings')),
            },
            ...(discordEnabled
                ? [ {
                        key: 'discord',
                        label: t('widget.memenu.settings.discord', 'Discord settings'),
                        // `openDiscordSettingsWindow` is a link event, not a window of its own.
                        onSelect: openSetting(() => openClientLink(send, 'discord/settings/open')),
                    } ]
                : []),
            {
                key: 'chat',
                label: t('widget.memenu.settings.chat', 'Chat settings'),
                onSelect: openSetting(() => showWindow('toolbar_chat_settings')),
            },
            {
                key: 'other',
                label: t('widget.memenu.settings.other', 'Other settings'),
                onSelect: openSetting(() => showWindow('toolbar_other_settings')),
            },
            ...(wordFilterEnabled
                ? [ {
                        key: 'word_filter',
                        label: t('word_filter.settings.title', 'Word filter'),
                        onSelect: openSetting(() => showWindow('toolbar_word_filter')),
                    } ]
                : []),
        ]}
        />
    );
};
