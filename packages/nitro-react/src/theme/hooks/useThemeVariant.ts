import { AnyThemeVariant, ThemeOptions, ThemeResult, ThemeVariant, ThemeWithStatesVariant } from '../utils';
import { resolveByState, useInteractionState } from './useInteractionState';
import { useResolvedVariant } from './useResolvedVariant';

export const useThemeVariant = <T extends AnyThemeVariant>({
    cascadeKey, variants, variant, defaultVariant = '0', tintColor, textStyle, textColor, disabled, selected, stopsPropagation,
    onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
}: ThemeOptions<T>): ThemeResult<T> => {
    const { resolvedVariant, ownCascade } = useResolvedVariant(cascadeKey, variant, defaultVariant);
    // The Flash skins define many more `style` ids than have art here (border style 15, button
    // style 5, ...) - a layout port passing one through verbatim must degrade to the default
    // variant's chrome, not crash on `undefined.layout`.
    const config = variants[resolvedVariant] ?? variants[defaultVariant] ?? ({} as T);
    const { state, handlers } = useInteractionState({
        disabled, stopsPropagation, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    });

    const statesConfig = config as ThemeWithStatesVariant;
    const layerConfig = config as ThemeVariant;

    const resolvedLayer = statesConfig.states ? resolveByState(statesConfig.states, state, selected) : layerConfig.layer;
    const resolvedOverlay = statesConfig.overlays ? resolveByState(statesConfig.overlays, state, selected) : layerConfig.overlay;
    const resolvedTint = tintColor ?? config.tintColor;
    const resolvedTextStyle = textStyle ?? config.textStyle;
    const resolvedTextColor = textColor ?? config.textColor;

    return { resolvedVariant, ownCascade, config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor };
};
