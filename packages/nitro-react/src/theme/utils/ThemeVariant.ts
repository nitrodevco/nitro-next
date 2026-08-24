import { ReactNode } from 'react';

import { BackgroundLayerConfig, BoxLayout, InteractionHandlers, InteractionState, InteractionStates, TextStyleKey, VariantCascadeMap } from '#base/theme';

/**
 * Per-variant escape hatch for a structural difference a variant table's plain data fields
 * (layer/overlay/tint/layout/textStyle) can't express - extra children alongside the normal
 * ones, or a different composition of them entirely. Opt-in per component: a component that
 * needs it extends its own variant type with `view?: ThemeViewOverride<TViewProps>`, where
 * `TViewProps` is whatever that component already has in scope when it renders its own default
 * JSX (resolved theme data, its own props/children) - the override gets exactly that, so it can
 * reuse as much or as little of the default composition as it needs (wrap the normal children
 * with one extra decorative node, or replace the whole tree) rather than reimplementing
 * everything from scratch. Most variants don't set this and render through the component's
 * normal JSX unchanged - it's a way to skip that JSX for the rare variant that needs to, not a
 * new field every variant table has to fill in.
 */
export type ThemeViewOverride<TViewProps> = (props: TViewProps) => ReactNode;

export type ThemeBase = {
    layout?: BoxLayout;
    tintColor?: string;
    textStyle?: TextStyleKey;
    textColor?: string;
    zIndex?: number;
};

export type ThemeVariant = {
    layer?: BackgroundLayerConfig;
    overlay?: BackgroundLayerConfig;
} & ThemeBase;

export type ThemeWithStatesVariant = {
    states?: InteractionStates<BackgroundLayerConfig>;
    overlays?: InteractionStates<BackgroundLayerConfig>;
} & ThemeBase;

export type AnyThemeVariant = ThemeVariant | ThemeWithStatesVariant;

export type ThemeVariants<T extends AnyThemeVariant> = Record<string, T>;

export type ThemeProps<T extends AnyThemeVariant> = {
    variant?: keyof ThemeVariants<T>;
    defaultVariant?: keyof ThemeVariants<T>;
} & ThemeBase;

export type ThemeOptions<T extends AnyThemeVariant = AnyThemeVariant> = {
    cascadeKey: string;
    variants: ThemeVariants<T>;
    variant?: keyof ThemeVariants<T>;
    defaultVariant?: keyof ThemeVariants<T>;
    tintColor?: string;
    textStyle?: TextStyleKey;
    textColor?: string;
    disabled?: boolean;
    selected?: boolean;
};

export type ThemeResult<T extends AnyThemeVariant = AnyThemeVariant> = {
    resolvedVariant: string;
    ownCascade: VariantCascadeMap | undefined;
    config: T;
    state: InteractionState;
    handlers: InteractionHandlers;
    resolvedLayer: BackgroundLayerConfig | undefined;
    resolvedOverlay: BackgroundLayerConfig | undefined;
    resolvedTint: string | undefined;
    resolvedTextStyle: TextStyleKey | undefined;
    resolvedTextColor: string | undefined;
};
