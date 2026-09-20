/**
 * `wired_setup.uibuilder.presets.AssetButtonPreset` - the style's `asset_button`: a 25px
 * container button around one bitmap (the movement and rotation pickers, the floor editor's
 * tools). Static width: the template's.
 *
 * `selected` shows the way `updateVisuals` does it: the volters keep a selected button in its
 * hovered face, the other styles keep it pressed. Unlike the mini button, a press on a selected
 * one still calls back (`maybeCancelEvent`).
 */
import { BackgroundLayer, Box, ContainerButton, LayoutImage, ThemeImage } from '#base/theme';
import { resolveWiredAssetName } from '#base/wired';

import { useWiredCaption } from './useWiredCaption';
import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { wiredPressedLayer } from './wiredPressedLayers';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredAssetButtonProps {
    /** The asset's short name (`move_0`, `rotate_cw`, `add`, ...), resolved per style by `resolveWiredAssetName`. */
    asset: string;
    /** A literal or `${key}`. */
    tooltip?: string;
    selected?: boolean;
    onPress: () => void;
    disabled?: boolean;
}

/** The volters' selected face: `setStateFlag(4, hovered || selected)` - the hover sheet's lighter fill. */
const VOLTER_SELECTED_TINT = '#cccccc';

export const WiredAssetButton = ({ asset, tooltip, selected = false, onPress, disabled = false }: WiredAssetButtonProps) => {
    const style = useWiredStyle();
    const caption = useWiredCaption();
    const isDisabled = useWiredDisabled(disabled);
    const template = style.templates.assetButton;
    const pressedLayer = (selected && !style.isVolter) ? wiredPressedLayer(template.variant) : undefined;

    return (
        <Box
            alpha={wiredDisabledAlpha(isDisabled)}
            layout={{ width: template.size, height: template.size, flexShrink: 0 }}
        >
            <ContainerButton
                variant={template.variant}
                tintColor={(selected && style.isVolter) ? VOLTER_SELECTED_TINT : undefined}
                disabled={isDisabled}
                tooltip={tooltip ? caption(tooltip) : undefined}
                onPointerTap={onPress}
                layout={{ position: 'relative', width: template.size, height: template.size }}
            >
                {pressedLayer && <BackgroundLayer layer={pressedLayer} />}
                <Box layout={{ position: 'absolute', left: template.assetInset, top: template.assetInset, width: template.assetSize, height: template.assetSize, justifyContent: 'center', alignItems: 'center' }}>
                    <ThemeImage src={LayoutImage(`wired/${resolveWiredAssetName(style, asset)}.png`)} />
                </Box>
            </ContainerButton>
        </Box>
    );
};
