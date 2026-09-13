import { useTooltipHandlers } from '../tooltip/useTooltipHandlers';
import { AnyThemeVariant, ThemeOptions, ThemeResult, ThemeVariant, ThemeWithStatesVariant } from '../utils';
import { compose, hasAnyPointerHandler } from '../utils/interaction';
import { resolveByState, useInteractionState } from './useInteractionState';
import { useResolvedVariant } from './useResolvedVariant';

export const useThemeVariant = <T extends AnyThemeVariant>({
    cascadeKey, variants, variant, defaultVariant = '0', tintColor, textStyle, textColor, dropShadow, tooltip, disabled, selected, interactive, stopsPropagation,
    onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
}: ThemeOptions<T>): ThemeResult<T> => {
    const { resolvedVariant, ownCascade } = useResolvedVariant(cascadeKey, variant, defaultVariant);
    // The Flash skins define many more `style` ids than have art here (border style 15, button
    // style 5, ...) - a layout port passing one through verbatim must degrade to the default
    // variant's chrome, not crash on `undefined.layout`.
    const config = variants[resolvedVariant] ?? variants[defaultVariant] ?? ({} as T);
    // A tooltip rides on the same hover the state tracking uses; a component that is hovered
    // only for its tooltip keeps the arrow cursor rather than reading as clickable.
    const tooltipHandlers = useTooltipHandlers(tooltip);
    const clickable = interactive || hasAnyPointerHandler({ onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap });
    const { state, handlers: interactionHandlers } = useInteractionState({
        disabled, interactive, stopsPropagation, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        onPointerOver: compose(tooltipHandlers.onPointerOver, onPointerOver),
        onPointerOut: compose(tooltipHandlers.onPointerOut, onPointerOut),
    });
    const handlers = (tooltipHandlers.onPointerOver && !clickable) ? { ...interactionHandlers, cursor: 'default' } : interactionHandlers;

    const statesConfig = config as ThemeWithStatesVariant;
    const layerConfig = config as ThemeVariant;

    const resolvedLayer = statesConfig.states ? resolveByState(statesConfig.states, state, selected) : layerConfig.layer;
    const resolvedOverlay = statesConfig.overlays ? resolveByState(statesConfig.overlays, state, selected) : layerConfig.overlay;
    const resolvedShadow = (dropShadow === false) ? undefined : (dropShadow ?? config.dropShadow);
    const resolvedTint = tintColor ?? config.tintColor;
    const resolvedTextStyle = textStyle ?? config.textStyle;
    const resolvedTextColor = textColor ?? config.textColor;

    return { resolvedVariant, ownCascade, config, state, handlers, resolvedLayer, resolvedOverlay, resolvedShadow, resolvedTint, resolvedTextStyle, resolvedTextColor };
};
