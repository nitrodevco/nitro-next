import { BoxLayout } from "../Box";
import { BackgroundLayerConfig } from "../layer";
import { InteractionStates, TextStyleKey } from "../utils";

export type ThemeBase = {
    tintColor?: string;
    textStyleKey?: TextStyleKey;
    textColor?: string;
    layout?: BoxLayout;
}

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