import { BoxLayout } from '../Box';
import { VariantCascadeMap } from '../cascade';
import { InteractionHandlers, InteractionState, InteractionStates } from '../hooks';
import { BackgroundLayerConfig } from '../layer';
import { PointerHandlerProps } from './interaction';
import { TextStyleKey } from './textStyles';

/**
 * Metadata every element in the original Flash layout XML carries alongside its `style`
 * (which maps to `variant`) - accepted on every themed component so a layout port can keep it
 * without inventing a place for it. None of it is interpreted yet: `tags` drive Flash-side
 * lookups/recoloring (`RECOLORABLE_*`, `_INTERNAL`, `#icon`, ...), `tooltip` is the
 * `tool_tip_caption` variable, `params` is the raw `WindowParam` bit-field, `dynamicStyle` the
 * hover/press effect name (`lifted_hover`, `brightness_and_shadow_under`, ...). Only `visible`
 * has a runtime effect, and only where a component forwards it to its `Box` (see `Region`).
 */
export type ThemeLayoutMeta = {
    name?: string;
    tags?: string[];
    tooltip?: string;
    params?: number;
    dynamicStyle?: string;
    visible?: boolean;
    dropShadow?: DropShadowConfig;
};

/** A layout's `<filters><DropShadowFilter .../></filters>` - Flash's own field names/units. */
export type DropShadowConfig = {
    distance?: number;
    /** Degrees, Flash convention (45 = down-right). */
    angle?: number;
    color?: string;
    alpha?: number;
    blur?: number;
};

export type ThemeBase = {
    layout?: BoxLayout;
    tintColor?: string;
    textStyle?: TextStyleKey;
    textColor?: string;
    zIndex?: number;
} & ThemeLayoutMeta;

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
} & ThemeBase & PointerHandlerProps;

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
} & PointerHandlerProps;

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
