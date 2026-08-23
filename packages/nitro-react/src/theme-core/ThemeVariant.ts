import { VariantCascadeMap } from '#base/theme-core';
import { BackgroundLayerConfig, BoxLayout, InteractionHandlers, InteractionState, InteractionStates, TextStyleKey } from '#base/theme-pixi';

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
