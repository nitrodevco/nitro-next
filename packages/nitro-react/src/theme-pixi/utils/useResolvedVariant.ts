import { useCascadedVariant, VARIANT_CASCADE_CONFIG, type VariantCascadeMap } from '#base/theme';

export interface ResolvedVariant {
    resolvedVariant: string;
    ownCascade: VariantCascadeMap | undefined;
}

/**
 * The `cascadedVariant`/`resolvedVariant`/`ownCascade` boilerplate every theme-pixi component
 * repeats verbatim: read the caller's explicit `variant`, fall back to whatever a parent
 * `VariantCascadeProvider` cascaded down for this component's own cascade key, then to its own
 * `defaultVariant`/`'0'`, then look up what THIS resolved variant cascades to its own children
 * (passed to a `VariantCascadeProvider` wrapping whatever the component renders). Pulled out
 * once here so every component shares the exact same resolution order instead of each
 * reimplementing it.
 */
export const useResolvedVariant = (cascadeKey: string, variant: string | undefined, defaultVariant: string | undefined, fallback = '0'): ResolvedVariant => {
    const cascadedVariant = useCascadedVariant(cascadeKey);
    const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? fallback;
    const ownCascade = VARIANT_CASCADE_CONFIG[cascadeKey]?.[resolvedVariant];

    return { resolvedVariant, ownCascade };
};
