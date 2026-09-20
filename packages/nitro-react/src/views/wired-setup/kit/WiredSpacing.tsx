/**
 * `wired_setup.uibuilder.presets.SpacingPreset` - a fixed gap inside a list: `vertical` makes it
 * `size` high (in a column), otherwise `size` wide (in a row). It has a static width, so it
 * never takes a share of a row.
 */
import { Box } from '#base/theme';

export interface WiredSpacingProps {
    /** `SpacingPreset`'s first argument: `true` sets the height, `false` the width. */
    vertical: boolean;
    size: number;
}

export const WiredSpacing = ({ vertical, size }: WiredSpacingProps) => (
    <Box layout={vertical ? { width: 0, height: size, flexShrink: 0 } : { width: size, height: 0, flexShrink: 0 }} />
);
