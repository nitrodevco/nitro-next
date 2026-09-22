/**
 * The settings list the purse's settings button drops down - `toolbar/extensions/SettingsExtension`
 * on the `settings` layout (192 wide; a `setting_category` row of 120 x 17 per entry, 7 pixels in,
 * 3 apart, the panel 7 pixels taller than its last row). Picking an entry opens its window and
 * folds the list away (`toggleSettingVisibility`).
 *
 * Flash lists sound, Discord (with `discord.enabled`), chat, other and the word filter (with
 * `user.custom.filter.enabled`). Only "other" has a window in this client
 * (`ToolbarOtherSettingsView`); the sound, chat and word filter windows and the Discord link are
 * not ported, so their rows are left out rather than shown doing nothing.
 */
import { Border, Box, Region, ThemeText } from '#base/theme';

/** `SettingsExtension.PADDING` / `SPACING` and the `setting_category` row. */
const PADDING = 7;
const SPACING = 3;
const ROW_WIDTH = 120;
const ROW_HEIGHT = 17;
const PANEL_WIDTH = 192;
/** `extension_grid`'s `spacing`: the gap under every extension in the column. */
const GRID_SPACING = 2;

export interface ToolbarSettingsEntry {
    key: string;
    /** Already localized - `getLocalization(key, default)`. */
    label: string;
    onSelect: () => void;
}

export const ToolbarSettingsView = ({ entries }: { entries: ToolbarSettingsEntry[] }) => {
    const height = (PADDING * 2) + (entries.length * ROW_HEIGHT) + (Math.max(0, entries.length - 1) * SPACING);

    return (
        <Region layout={{ position: 'relative', width: PANEL_WIDTH, height, flexShrink: 0, marginBottom: GRID_SPACING }}>
            <Border
                variant="6"
                tintColor="#55534e"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Border
                variant="3"
                tintColor="#201e19"
                blend={0.8}
                layout={{ position: 'absolute', left: 3, width: PANEL_WIDTH - 6, top: 3, bottom: 4 }}
            />
            <Box layout={{ position: 'absolute', left: PADDING, top: PADDING, flexDirection: 'column', gap: SPACING }}>
                {entries.map(entry => (
                    <Region
                        key={entry.key}
                        cursor="pointer"
                        onPointerTap={entry.onSelect}
                        layout={{ width: ROW_WIDTH, height: ROW_HEIGHT }}
                    >
                        <ThemeText
                            text={entry.label}
                            textStyle="u_regular"
                            textOptions={{ fill: '#ffffff' }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, top: 0, height: ROW_HEIGHT }}
                        />
                    </Region>
                ))}
            </Box>
        </Region>
    );
};
