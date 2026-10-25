/**
 * The window manager's `progress_indicator` widget - `com.sulake.habbo.window.widgets.ProgressIndicatorWidget`,
 * built from its `progress_indicator` layout: a horizontal item list, 3px between its items, of
 * `size` disk bitmaps (1 to 1000), each `progress_disk_<style>_on` or `_off` at the bitmap's own size.
 * In `position` mode the disk at `position` (counted from 1) is on; in `progress` mode every disk
 * before `position` is.
 */
import { Box, BoxLayout, LayoutImage, ThemeImage } from '@nitrodevco/nitro-theme';

import { clamp } from '#base/utils';

/** `ProgressIndicatorStyle`. */
export type ProgressIndicatorStyle = 'flat' | 'etched';
/** `ProgressIndicatorMode`. */
export type ProgressIndicatorMode = 'position' | 'progress';

/** `MAXIMUM_SIZE`. */
const MAXIMUM_SIZE = 1000;
/** The `progress_indicator` item list's `spacing`. */
const SPACING = 3;

export interface ProgressIndicatorWidgetProps {
    /** `progress_indicator:size`, 1 by default. */
    size?: number;
    /** `progress_indicator:position`, 0 by default. */
    position?: number;
    /** `progress_indicator:style`, `flat` by default. */
    style?: ProgressIndicatorStyle;
    /** `progress_indicator:mode`, `position` by default. */
    mode?: ProgressIndicatorMode;
    layout?: BoxLayout;
}

export const ProgressIndicatorWidget = ({ size = 1, position = 0, style = 'flat', mode = 'position', layout }: ProgressIndicatorWidgetProps) => {
    const count = clamp(Math.trunc(size), 1, MAXIMUM_SIZE);

    return (
        <Box layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: SPACING, ...layout }}>
            {Array.from({ length: count }, (_, index) => {
                const on = (mode === 'progress') ? (index < position) : ((index + 1) === position);

                return (
                    <ThemeImage
                        key={index}
                        src={LayoutImage(`habbo-window-manager-com/progress_disk_${style}_${on ? 'on' : 'off'}.png`)}
                    />
                );
            })}
        </Box>
    );
};
