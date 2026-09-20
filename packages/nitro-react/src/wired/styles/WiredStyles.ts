/**
 * The wired style registry - `UserDefinedRoomEventsCtrl.STYLE_DEFAULT`, `STYLE_OPTIONS`, the
 * `_wiredStyles` map and `getWiredStyleByName`, plus `WiredUIPreset.resolveAssetFullName`.
 */
import { ILLUMINA_WIRED_STYLE } from './IlluminaWiredStyle';
import { UBUNTU_WIRED_STYLE } from './UbuntuWiredStyle';
import { VOLTER_BLUE_WIRED_STYLE } from './VolterBlueWiredStyle';
import { VOLTER_GREEN_WIRED_STYLE } from './VolterGreenWiredStyle';
import { VOLTER_WIRED_STYLE } from './VolterWiredStyle';
import { VOLTER_YELLOW_WIRED_STYLE } from './VolterYellowWiredStyle';
import { WiredStyle, WiredStyleName } from './WiredStyle';

/** `UserDefinedRoomEventsCtrl.STYLE_DEFAULT`. */
export const WIRED_STYLE_DEFAULT: WiredStyleName = 'illumina';

/** `UserDefinedRoomEventsCtrl.STYLE_OPTIONS` - what the wired menu's settings tab offers, in its order. */
export const WIRED_STYLE_OPTIONS: readonly WiredStyleName[] = [ 'illumina', 'volter' ];

/** `UserDefinedRoomEventsCtrl._wiredStyles`. */
export const WIRED_STYLES: Readonly<Record<WiredStyleName, WiredStyle>> = {
    volter: VOLTER_WIRED_STYLE,
    illumina: ILLUMINA_WIRED_STYLE,
    volter_yellow: VOLTER_YELLOW_WIRED_STYLE,
    volter_blue: VOLTER_BLUE_WIRED_STYLE,
    volter_green: VOLTER_GREEN_WIRED_STYLE,
    ubuntu: UBUNTU_WIRED_STYLE,
};

/** `getWiredStyleByName` - a name no style carries (an old stored preference) gives the default style. */
export const getWiredStyleByName = (name: string | null | undefined): WiredStyle =>
    WIRED_STYLES[name as WiredStyleName] ?? WIRED_STYLES[WIRED_STYLE_DEFAULT];

/**
 * The per-style bitmaps the window manager ships (`wired_styles_<style>_<name>`), as copied to
 * `public/assets/wired`. Only illumina and volter have their own.
 */
const STYLE_ASSET_NAMES: readonly string[] = [
    'furni_picks_1', 'furni_picks_2',
    'move_0', 'move_1', 'move_2', 'move_3', 'move_4', 'move_5', 'move_6', 'move_7', 'move_diag', 'move_rnd', 'move_vrt',
    'rotate_ccw', 'rotate_cw', 'slider_obj',
];

const STYLE_ASSETS: ReadonlySet<string> = new Set([
    ...STYLE_ASSET_NAMES.map(name => `wired_styles_illumina_${name}`),
    ...STYLE_ASSET_NAMES.map(name => `wired_styles_volter_${name}`),
    'wired_styles_volter_slider_bg',
    'wired_styles_illumina_icon_source_furni', 'wired_styles_illumina_icon_source_users',
    'wired_styles_illumina_icon_source_global', 'wired_styles_illumina_icon_source_context',
]);

/**
 * `WiredUIPreset.resolveAssetFullName` - the style's own bitmap when the window manager has
 * one, otherwise the shared `wired_<name>` (`wired_add`, `wired_remove`, `wired_reference`,
 * `wired_reduce_image`, `wired_enlarge_image`). The result is the bitmap's name under
 * `assets/wired`, without the extension: `LayoutImage(`wired/${name}.png`)`.
 */
export const resolveWiredAssetName = (style: WiredStyle, name: string): string => {
    const styled = `wired_styles_${style.name}_${name}`;

    return STYLE_ASSETS.has(styled) ? styled : `wired_${name}`;
};
