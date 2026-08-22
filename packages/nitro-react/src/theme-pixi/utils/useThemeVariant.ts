import type { VariantCascadeMap } from '#base/theme';

import type { BackgroundLayerConfig } from '../layer';
import type { AnyThemeVariant, ThemeVariant, ThemeVariants, ThemeWithStatesVariant } from '../variant/ThemeVariant';
import { type InteractionHandlers, type InteractionState, resolveByState, useInteractionState } from './useInteractionState';
import { useResolvedVariant } from './useResolvedVariant';

export interface UseThemeVariantOptions<T extends AnyThemeVariant> {
    /** The same cascade key the component would otherwise pass straight to `useResolvedVariant`. */
    cascadeKey: string;
    variants: ThemeVariants<T>;
    variant: string | undefined;
    defaultVariant: string | undefined;
    /** Falls back to `'0'`, matching every existing `X_VARIANTS[resolvedVariant] ?? X_VARIANTS['0']` call site. */
    fallback?: string;
    tintColor?: string;
    textColor?: string;
    disabled?: boolean;
    /** Forwarded to `resolveByState` for the (currently button-group-only) `selected` art swap. */
    selected?: boolean;
}

export interface UseThemeVariantResult<T extends AnyThemeVariant> {
    resolvedVariant: string;
    ownCascade: VariantCascadeMap | undefined;
    config: T;
    state: InteractionState;
    handlers: InteractionHandlers;
    resolvedLayer: BackgroundLayerConfig | undefined;
    resolvedOverlay: BackgroundLayerConfig | undefined;
    resolvedTint: string | undefined;
    resolvedTextColor: string | undefined;
}

/**
 * Extracts the variant-resolution boilerplate nearly every theme-pixi component repeats
 * verbatim: look up the resolved variant's config, resolve its state-dependent (Button,
 * ButtonThick, ContainerButton, the button-group family) or static (Border, Bubble, Header,
 * Frame, TabContext, TabContent, Droplist) layer/overlay, and resolve the caller-override-vs-
 * config tint/text color. `ThemeVariant` and `ThemeWithStatesVariant` are mutually exclusive in
 * practice (a variant table is either state-swapped art or a single static layer, never both),
 * so `config` is read through a superset cast purely to pick whichever shape this particular `T`
 * actually has - the returned `config` itself keeps its real, narrower type for callers that
 * read their own extra fields (e.g. `HeaderVariant.minHeight`, `DroplistVariant.arrowTextureKey`)
 * straight off it. `useInteractionState` is called unconditionally (hooks can't be conditional),
 * but for the non-interactive components that never spread its `handlers` onto their `Box`, that
 * costs nothing beyond one unused `useState` - the caller decides whether hover/press art
 * actually applies.
 */
export const useThemeVariant = <T extends AnyThemeVariant>({
    cascadeKey, variants, variant, defaultVariant, fallback = '0', tintColor, textColor, disabled, selected,
}: UseThemeVariantOptions<T>): UseThemeVariantResult<T> => {
    const { resolvedVariant, ownCascade } = useResolvedVariant(cascadeKey, variant, defaultVariant, fallback);
    const config = variants[resolvedVariant] ?? variants[fallback];
    const { state, handlers } = useInteractionState(disabled);

    const statesConfig = config as ThemeWithStatesVariant;
    const layerConfig = config as ThemeVariant;
    const resolvedLayer = statesConfig.states ? resolveByState(statesConfig.states, state, selected) : layerConfig.layer;
    const resolvedOverlay = statesConfig.overlays ? resolveByState(statesConfig.overlays, state) : layerConfig.overlay;
    const resolvedTint = tintColor || config.tintColor;
    const resolvedTextColor = textColor ?? config.textColor;

    return { resolvedVariant, ownCascade, config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextColor };
};
