/**
 * `wired_setup.uibuilder.presets.ColorPalettePreset` (WIN63-202610201032) - a grid of colour swatches,
 * at most 10 to a row, 18 px each with 3 px between them; a click on a swatch picks its colour. The
 * picked one has a white border and a black one inside it, the others a grey border
 * (`renderPalette`). Flash draws it into one bitmap; here each swatch is a `Region`. Static width: the
 * palette's.
 */
import { FederatedPointerEvent } from 'pixi.js';

import { Box, Region, toCssHexColor } from '#base/theme';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';

const COLUMNS = 10;
const SWATCH = 18;
const GAP = 3;
const PITCH = SWATCH + GAP;

export interface WiredColorPaletteProps {
    colors: readonly number[];
    /** The picked colour; one not in `colors` shows the first as picked (`set color`). */
    color: number;
    onSelect: (color: number) => void;
    visible?: boolean;
}

export const WiredColorPalette = ({ colors, color, onSelect, visible = true }: WiredColorPaletteProps) => {
    const disabled = useWiredDisabled();

    if (!visible || !colors.length) return null;

    const columns = Math.min(COLUMNS, colors.length);
    const rows = Math.ceil(colors.length / columns);
    const width = columns * SWATCH + (columns - 1) * GAP;
    const height = rows * SWATCH + (rows - 1) * GAP;
    const picked = colors.includes(color) ? color : colors[0];

    // `onPaletteClicked`: the gaps between swatches pick nothing.
    const handleTap = (event: FederatedPointerEvent) => {
        const local = event.getLocalPosition(event.currentTarget);
        const column = Math.floor(local.x / PITCH);
        const row = Math.floor(local.y / PITCH);

        if (column >= columns || row >= rows || (local.x % PITCH) >= SWATCH || (local.y % PITCH) >= SWATCH) return;

        const index = row * columns + column;

        if (index < colors.length) onSelect(colors[index]);
    };

    return (
        <Box
            eventMode={disabled ? 'none' : 'static'}
            cursor="pointer"
            alpha={wiredDisabledAlpha(disabled)}
            onPointerTap={handleTap}
            layout={{ width, height, flexShrink: 0 }}
        >
            {colors.map((swatch, index) => {
                const left = (index % columns) * PITCH;
                const top = Math.floor(index / columns) * PITCH;
                const selected = swatch === picked;
                const border = selected ? 2 : 1;

                return (
                    <Box
                        key={index}
                        eventMode="none"
                        layout={{ position: 'absolute', left, top, width: SWATCH, height: SWATCH }}
                    >
                        <Region
                            backgroundColor={selected ? '#ffffff' : '#555555'}
                            layout={{ position: 'absolute', left: 0, top: 0, width: SWATCH, height: SWATCH }}
                        />
                        {selected && (
                            <Region
                                backgroundColor="#000000"
                                layout={{ position: 'absolute', left: 1, top: 1, width: SWATCH - 2, height: SWATCH - 2 }}
                            />
                        )}
                        <Region
                            backgroundColor={toCssHexColor(swatch)}
                            layout={{ position: 'absolute', left: border, top: border, width: SWATCH - border * 2, height: SWATCH - border * 2 }}
                        />
                    </Box>
                );
            })}
        </Box>
    );
};
