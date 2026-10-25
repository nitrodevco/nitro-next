/**
 * The pressed face of the container button skins the wired styles use, for buttons that stay
 * down while they are the selection. Flash does it with `InteractiveController.setStateFlag(16,
 * selected)` (`PressedButtonMiniAssetIconButtonPreset`, `AssetButtonPreset`,
 * `NewSourceTypeOption`); the theme's `selected` prop only switches art for skins that carry a
 * separate selected sheet, which none of these do, so the kit lays the skin's own pressed sheet
 * over the button instead: the `pressed` layer of the theme's `containerButton` variant of that
 * Flash `style` id.
 */
import { BackgroundLayerConfig, themeVariantOf, ThemeWithStatesVariant } from '#base/theme';

export const wiredPressedLayer = (variant: string): BackgroundLayerConfig | undefined => themeVariantOf<ThemeWithStatesVariant>('containerButton', variant)?.states?.pressed;
