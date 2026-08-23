import { AnyThemeVariant, ThemeOptions, ThemeResult, ThemeVariant, ThemeWithStatesVariant } from '#base/theme-core';

import { resolveByState, useInteractionState } from './useInteractionState';
import { useResolvedVariant } from './useResolvedVariant';

export const useThemeVariant = <T extends AnyThemeVariant>({
    cascadeKey, variants, variant, defaultVariant = '0', tintColor, textStyle, textColor, disabled, selected,
}: ThemeOptions<T>): ThemeResult<T> => {
    const { resolvedVariant, ownCascade } = useResolvedVariant(cascadeKey, variant, defaultVariant);
    const config = variants[resolvedVariant];
    const { state, handlers } = useInteractionState(disabled);

    const statesConfig = config as ThemeWithStatesVariant;
    const layerConfig = config as ThemeVariant;

    const resolvedLayer = statesConfig.states ? resolveByState(statesConfig.states, state, selected) : layerConfig.layer;
    const resolvedOverlay = statesConfig.overlays ? resolveByState(statesConfig.overlays, state, selected) : layerConfig.overlay;
    const resolvedTint = tintColor ?? config.tintColor;
    const resolvedTextStyle = textStyle ?? config.textStyle;
    const resolvedTextColor = textColor ?? config.textColor;

    return { resolvedVariant, ownCascade, config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor };
};
