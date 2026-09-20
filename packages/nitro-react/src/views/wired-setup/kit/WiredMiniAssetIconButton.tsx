/**
 * `wired_setup.uibuilder.presets.MiniAssetIconButtonPreset` and its two faces, picked by the
 * style as `PresetManager.createMiniAssetIconButtonPreset` does: the volters'
 * `VolterMiniAssetIconButtonPreset` (a flat coloured region between two end caps) and
 * `PressedButtonMiniAssetIconButtonPreset` for the rest (a container button that stays pressed,
 * tinted, while selected). It is the pair of "furni picks" toggles of the input source sections.
 *
 * The highlight colour belongs to the asset: `furni_picks_1` is the yellow pick, `furni_picks_2`
 * the blue one; Flash throws for any other asset and so nothing else is mapped. A press on the
 * selected button does nothing (`iconClicked`).
 */
import { useState } from 'react';

import { BackgroundLayer, Box, ContainerButton, LayoutImage, Region, ThemeImage } from '#base/theme';
import { lightenColor, resolveWiredAssetName, uintToHexColor } from '#base/wired';

import { useWiredCaption } from './useWiredCaption';
import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { wiredPressedLayer } from './wiredPressedLayers';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredMiniAssetIconButtonProps {
    /** The asset's short name - `furni_picks_1` or `furni_picks_2`. */
    asset: string;
    /** A literal or `${key}`. */
    tooltip?: string;
    selected?: boolean;
    onPress: () => void;
    disabled?: boolean;
}

/** `COLOR_YELLOW_CLICKED` / `COLOR_BLUE_CLICKED`, and the volter face's `COLOR_*_HOVERED`. */
const ASSET_COLORS: Record<string, { selected: number; hovered: number }> = {
    furni_picks_1: { selected: 0x6A6E31, hovered: 0x545727 },
    furni_picks_2: { selected: 0x434980, hovered: 0x333861 },
};

/** `VolterMiniAssetIconButtonPreset.COLOR_INACTIVE`. */
const VOLTER_INACTIVE = 0x222222;

export const WiredMiniAssetIconButton = ({ asset, tooltip, selected = false, onPress, disabled = false }: WiredMiniAssetIconButtonProps) => {
    const style = useWiredStyle();
    const caption = useWiredCaption();
    const isDisabled = useWiredDisabled(disabled);
    const [ hovered, setHovered ] = useState(false);
    const template = style.templates.miniButton;
    const colors = ASSET_COLORS[asset] ?? ASSET_COLORS.furni_picks_1;
    const src = LayoutImage(`wired/${resolveWiredAssetName(style, asset)}.png`);
    const press = () => {
        if (!selected) onPress();
    };

    if (template.kind === 'flat') {
        // `updateUI`: hovered wins over selected, and the two end caps take the same colour.
        const fill = uintToHexColor(hovered ? colors.hovered : (selected ? colors.selected : VOLTER_INACTIVE));
        const innerHeight = template.height - 2;

        return (
            <Box
                alpha={wiredDisabledAlpha(isDisabled)}
                layout={{ position: 'relative', width: template.width, height: template.height, flexShrink: 0 }}
            >
                <Region
                    backgroundColor={template.borderColor}
                    layout={{ position: 'absolute', left: 0, top: 2, width: 1, height: innerHeight - 2 }}
                />
                <Region
                    backgroundColor={template.borderColor}
                    layout={{ position: 'absolute', left: 1, top: 1, width: 1, height: innerHeight }}
                />
                <Region
                    backgroundColor={fill}
                    layout={{ position: 'absolute', left: 1, top: 2, width: 1, height: innerHeight - 2 }}
                />
                <Region
                    backgroundColor={template.borderColor}
                    layout={{ position: 'absolute', left: 2, top: 0, width: template.iconWidth, height: template.height }}
                />
                <Region
                    backgroundColor={fill}
                    cursor="pointer"
                    disabled={isDisabled}
                    tooltip={tooltip ? caption(tooltip) : undefined}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onPointerTap={press}
                    layout={{ position: 'absolute', left: 2, top: 1, width: template.iconWidth, height: template.iconHeight, justifyContent: 'center', alignItems: 'center' }}
                >
                    <ThemeImage src={src} />
                </Region>
                <Region
                    backgroundColor={template.borderColor}
                    layout={{ position: 'absolute', left: template.width - 2, top: 1, width: 1, height: innerHeight }}
                />
                <Region
                    backgroundColor={fill}
                    layout={{ position: 'absolute', left: template.width - 2, top: 2, width: 1, height: innerHeight - 2 }}
                />
                <Region
                    backgroundColor={template.borderColor}
                    layout={{ position: 'absolute', left: template.width - 1, top: 2, width: 1, height: innerHeight - 2 }}
                />
            </Box>
        );
    }

    // `PressedButtonMiniAssetIconButtonPreset.updateUI`: untinted at rest, otherwise the asset's colour lightened by 1.38 (1.6 while only hovered).
    const tint = (hovered || selected) ? uintToHexColor(lightenColor(colors.selected, (hovered && !selected) ? 1.6 : 1.38)) : undefined;
    const pressedLayer = selected ? wiredPressedLayer(template.variant) : undefined;

    return (
        <Box
            alpha={wiredDisabledAlpha(isDisabled)}
            layout={{ width: template.size, height: template.size, flexShrink: 0 }}
        >
            <ContainerButton
                variant={template.variant}
                tintColor={tint}
                disabled={isDisabled}
                tooltip={tooltip ? caption(tooltip) : undefined}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onPointerTap={press}
                layout={{ position: 'relative', width: template.size, height: template.size }}
            >
                {pressedLayer && (
                    <BackgroundLayer
                        layer={pressedLayer}
                        tintColor={tint}
                    />
                )}
                <Box layout={{ position: 'absolute', left: template.iconX, top: template.iconY, width: template.iconWidth, height: template.iconHeight, justifyContent: 'center', alignItems: 'center' }}>
                    <ThemeImage src={src} />
                </Box>
            </ContainerButton>
        </Box>
    );
};
