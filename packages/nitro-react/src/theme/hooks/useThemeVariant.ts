import { useTooltipHandlers } from '../tooltip/useTooltipHandlers';
import { AnyThemeVariant, themeDefaultTextStyle, ThemeOptions, ThemeResult, ThemeVariant, ThemeWithStatesVariant } from '../utils';
import { compose } from '../utils/interaction';
import { resolveByState, useInteractionState } from './useInteractionState';
import { useResolvedVariant } from './useResolvedVariant';

export const useThemeVariant = <T extends AnyThemeVariant>({
    cascadeKey, variants, variant, defaultVariant = '0', tintColor, textStyle, textColor, dropShadow, tooltip, tooltipDelay, disabled, selected, interactive, stopsPropagation,
    onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
}: ThemeOptions<T>): ThemeResult<T> => {
    const { resolvedVariant, ownCascade } = useResolvedVariant(cascadeKey, variant, defaultVariant);
    // The Flash skins define many more `style` ids than have art here (border style 15, button
    // style 5, ...) - a layout port passing one through verbatim must degrade to the default
    // variant's chrome, not crash on `undefined.layout`.
    const config = variants[resolvedVariant] ?? variants[defaultVariant] ?? ({} as T);
    // A tooltip rides on the same hover the state tracking uses; because `useInteractionState`
    // reads the cursor off the click handlers alone, a component hovered only for its tooltip
    // keeps the arrow rather than reading as clickable.
    const tooltipHandlers = useTooltipHandlers(tooltip, tooltipDelay);
    const { state, handlers } = useInteractionState({
        disabled, interactive, stopsPropagation, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        onPointerOver: compose(tooltipHandlers.onPointerOver, onPointerOver),
        onPointerOut: compose(tooltipHandlers.onPointerOut, onPointerOut),
    });

    const statesConfig = config as ThemeWithStatesVariant;
    const layerConfig = config as ThemeVariant;

    const resolvedLayer = statesConfig.states ? resolveByState(statesConfig.states, state, selected) : layerConfig.layer;
    const resolvedOverlay = statesConfig.overlays ? resolveByState(statesConfig.overlays, state, selected) : layerConfig.overlay;
    // The skin's untintable pieces, which no state swaps: one sheet, drawn over the tinted layer.
    const resolvedPlain = layerConfig.plain;
    const resolvedShadow = (dropShadow === false) ? undefined : (dropShadow ?? config.dropShadow);
    // `colorize: false` is a skin the client never tints at all (see `ThemeBase.colorize`), so
    // neither the variant's own tint nor the one a call site passes reaches its art.
    const resolvedTint = (config.colorize === false) ? undefined : (tintColor ?? config.tintColor);
    // A variant that names no style of its own is not `regular`: the window's `style` id picks a
    // theme, and `ThemeManager`'s three real themes default `text_style` differently. Without
    // this an Ubuntu frame (style 4, 10001-10007) and every illumina one (100-299) drew Volter 9.
    const resolvedTextStyle = textStyle ?? config.textStyle ?? themeDefaultTextStyle(resolvedVariant);
    const resolvedTextColor = textColor ?? config.textColor;

    return { resolvedVariant, ownCascade, config, state, handlers, resolvedLayer, resolvedPlain, resolvedOverlay, resolvedShadow, resolvedTint, resolvedTextStyle, resolvedTextColor };
};
