/**
 * The pressed face of the container button skins the wired styles use, for buttons that stay
 * down while they are the selection. Flash does it with `InteractiveController.setStateFlag(16,
 * selected)` (`PressedButtonMiniAssetIconButtonPreset`, `AssetButtonPreset`,
 * `NewSourceTypeOption`); the theme's `selected` prop only switches art for skins that carry a
 * separate selected sheet, which none of these do, so the kit lays the skin's own pressed sheet
 * over the button instead. Keyed by the Flash `style` id of `container_button`.
 */
import { BackgroundLayerConfig, NineSlice } from '#base/theme';

const PRESSED_LAYERS: Record<string, BackgroundLayerConfig> = {
    0: NineSlice('button-0-pressed-src', 3, 3, 3, 3),
    1: NineSlice('button-1-pressed-src', 3, 3, 3, 3),
    2: NineSlice('button-2-pressed-src', 3, 3, 3, 3),
    3: NineSlice('buttonthick-3-pressed-src', 5, 5, 5, 5),
    7: NineSlice('button-3-pressed-src', 5, 5, 5, 5),
    102: NineSlice('button-102-pressed-src', 6, 8, 4, 8),
    104: NineSlice('containerbutton-104-pressed-src', 4, 4, 0, 4),
    105: NineSlice('containerbutton-105-pressed-src', 0, 4, 4, 4),
    106: NineSlice('containerbutton-106-pressed-src', 0, 4, 0, 4),
};

export const wiredPressedLayer = (variant: string): BackgroundLayerConfig | undefined => PRESSED_LAYERS[variant];
