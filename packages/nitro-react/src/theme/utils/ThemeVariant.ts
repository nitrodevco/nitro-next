import { BoxLayout } from '../Box';
import { VariantCascadeMap } from '../cascade';
import { InteractionHandlers, InteractionState, InteractionStates } from '../hooks';
import { BackgroundLayerConfig } from '../layer';
import { DynamicStyleName } from './dynamicStyles';
import { PointerHandlerProps } from './interaction';
import { TextStyleKey } from './textStyles';

/**
 * Metadata every element in the original Flash layout XML carries alongside its `style`
 * (which maps to `variant`) - accepted on every themed component so a layout port can keep it
 * without inventing a place for it (the Flash `tags` are not carried: the ones with behaviour
 * become real props in the generator, the rest were lookup handles). `tooltip` is the
 * `tool_tip_caption` variable (the Flash `params` bit-field is applied by the generator - anchoring,
 * auto-sizing, clipping, click targets - and not carried), `dynamicStyle` the
 * hover/press effect (see utils/dynamicStyles.ts - `Region`, `Button`, `ButtonThick` and
 * `ContainerButton` host it). `tooltip` shows through `TooltipLayer` on hover (every `useThemeVariant` component and
 * `ThemeImage`); `visible` and `dynamicStyle` apply where a component forwards them to its `Box`.
 */
export type ThemeLayoutMeta = {
    name?: string;
    tooltip?: string;
    /**
     * The window's `tool_tip_delay` in ms - how long the pointer rests before `WindowToolTipAgent`
     * shows `tooltip`; `ThemeManager`'s 500 (`TOOLTIP_DELAY_MS`) when absent.
     */
    tooltipDelay?: number;
    dynamicStyle?: DynamicStyleName;
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
    /**
     * `false` for a skin whose every entity is `colorize="false"` in the client's skin XML:
     * `BitmapSkinRenderer.draw` copies such pieces untinted, so the window's `color` has no
     * effect on it. `useThemeVariant` then drops the tint - the variant's own `tintColor` and
     * the one a call site passes alike - which is what keeps the wired dialog's
     * `_frame.color = style.frameColor` (`FramePreset`) from darkening the illumina light
     * frame the client never tints. A skin where only *some* entities are `colorize="false"`
     * is not this: those pieces are cut into their own sheet and drawn as an untinted `overlay`
     * or `plain` (see `scripts/extract-skin-assets.ts`).
     */
    colorize?: boolean;
    textStyle?: TextStyleKey;
    textColor?: string;
    zIndex?: number;
} & ThemeLayoutMeta;

export type ThemeVariant = {
    layer?: BackgroundLayerConfig;
    /**
     * The skin's `colorize="false"` pieces, cut into their own sheet by
     * `scripts/extract-skin-assets.ts` and drawn over `layer` without the window's colour - what
     * `BitmapSkinRenderer.draw` does for an entity the client copies rather than tints. A variant
     * whose untinted pieces are all it has puts them in `overlay` instead (the leaderboard
     * frames); this is for one that needs both, as the ubuntu frames do - a tinted title bar, the
     * pale body under it, and a shine over the two.
     */
    plain?: BackgroundLayerConfig;
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
    /** The layout's own `<DropShadowFilter>`; `false` says the layout has none, overriding the variant's default shadow. */
    dropShadow?: DropShadowConfig | false;
    /** The `tool_tip_caption`: shown by `TooltipLayer` after the client's delay while hovered. */
    tooltip?: string;
    /** `tool_tip_delay` in ms - 500 when absent (ThemeManager's default). */
    tooltipDelay?: number;
    disabled?: boolean;
    selected?: boolean;
    /** Track hover/press even without a pointer handler (a `dynamicStyle` host needs the state for its looks). */
    interactive?: boolean;
} & PointerHandlerProps;

export type ThemeResult<T extends AnyThemeVariant = AnyThemeVariant> = {
    resolvedVariant: string;
    ownCascade: VariantCascadeMap | undefined;
    config: T;
    state: InteractionState;
    handlers: InteractionHandlers;
    resolvedLayer: BackgroundLayerConfig | undefined;
    resolvedPlain: BackgroundLayerConfig | undefined;
    resolvedOverlay: BackgroundLayerConfig | undefined;
    resolvedShadow: DropShadowConfig | undefined;
    resolvedTint: string | undefined;
    resolvedTextStyle: TextStyleKey | undefined;
    resolvedTextColor: string | undefined;
};
