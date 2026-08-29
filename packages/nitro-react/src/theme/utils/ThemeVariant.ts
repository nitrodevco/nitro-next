import { ComponentType } from 'react';

import { BoxLayout } from '../Box';
import { VariantCascadeMap } from '../cascade';
import { InteractionHandlers, InteractionState, InteractionStates } from '../hooks';
import { BackgroundLayerConfig } from '../layer';
import { PointerHandlerProps } from './interaction';
import { TextStyleKey } from './textStyles';

/**
 * Metadata every element in the original Flash layout XML carries alongside its `style`
 * (which maps to `variant`) - accepted on every themed component so a layout port can keep it
 * without inventing a place for it (the Flash `tags` are not carried: the ones with behaviour
 * become real props in the generator, the rest were lookup handles). `tooltip` is the
 * `tool_tip_caption` variable (the Flash `params` bit-field is applied by the generator - anchoring,
 * auto-sizing, clipping, click targets - and not carried), `dynamicStyle` the
 * hover/press effect name (`lifted_hover`, `brightness_and_shadow_under`, ...). Only `visible`
 * has a runtime effect, and only where a component forwards it to its `Box` (see `Region`).
 */
export type ThemeLayoutMeta = {
    name?: string;
    tooltip?: string;
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

/**
 * A skin template rendered as a component's view (see variants/elements.ts, generated from the
 * client's `habbo_element_description_xml`). Each component casts it to its own view contract
 * (`FrameViewProps`, `HeaderViewProps`, ...).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ElementView = ComponentType<any>;

/** The view a variant renders through - filled in from the element description by `defineVariants`, or written by hand. */
export type ThemeViewConfig = {
    view?: ElementView;
};

export type ThemeVariant = {
    layer?: BackgroundLayerConfig;
    overlay?: BackgroundLayerConfig;
} & ThemeBase & ThemeViewConfig;

export type ThemeWithStatesVariant = {
    states?: InteractionStates<BackgroundLayerConfig>;
    overlays?: InteractionStates<BackgroundLayerConfig>;
} & ThemeBase & ThemeViewConfig;

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
    /** The resolved variant's view, if it has one (else the component renders its default). */
    view: ElementView | undefined;
};
