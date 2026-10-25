/**
 * The settings list the purse's settings button drops down - `toolbar/extensions/SettingsExtension`,
 * drawn from its `settings` template with a `setting_category` window added per entry (`addButton`):
 * each at x 7, the first at y 7 and every next one 3 below the last, the panel ending 7 below the
 * last row. Picking an entry opens its window and folds the list away (`toggleSettingVisibility`).
 *
 * Flash lists sound, Discord (with `discord.enabled`), chat, other and the word filter (with
 * `user.custom.filter.enabled`); `PurseSettingsList` builds all five. Discord is the one row that opens no
 * window of its own - `openDiscordSettingsWindow` raises the `discord/settings/open` link event.
 */
import { Box, TemplateItem, TemplateWindow, useTemplate } from '#base/theme';

/** `SettingsExtension.PADDING` / `SPACING`. */
const PADDING = 7;
const SPACING = 3;
/** `setting_category`'s height. */
const ROW_HEIGHT = 17;
/** `extension_grid`'s `spacing`: the gap under every extension in the column. */
const GRID_SPACING = 2;

export interface ToolbarSettingsEntry {
    key: string;
    /** Already localized - `getLocalization(key, default)`. */
    label: string;
    onSelect: () => void;
}

export const ToolbarSettingsView = ({ entries }: { entries: ToolbarSettingsEntry[] }) => {
    const category = useTemplate('habbo-toolbar-com/setting_category_xml');

    if (!category) return null;

    // `addButton`: the window as tall as its last row's bottom and the padding.
    const height = (PADDING * 2) + (entries.length * ROW_HEIGHT) + (Math.max(0, entries.length - 1) * SPACING);
    const rows: TemplateItem[] = entries.map((entry, index) => ({
        key: entry.key,
        from: category,
        bindings: {
            '': { onPointerTap: entry.onSelect },
            button_label: { caption: entry.label },
        },
        arrange: ({ root }) => {
            root()?.setX(PADDING);
            root()?.setY(PADDING + (index * (ROW_HEIGHT + SPACING)));
        },
    }));

    return (
        <Box layout={{ position: 'relative', flexShrink: 0, marginBottom: GRID_SPACING }}>
            <TemplateWindow
                id="habbo-toolbar-com/settings_xml"
                height={height}
                bindings={{ '': { added: rows } }}
            />
        </Box>
    );
};
