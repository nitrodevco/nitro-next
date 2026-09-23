import { BLEND_MODES, Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { DragTargetContext } from './drag/DragTargetContext';
import { useDragTarget } from './drag/useDragTarget';
import { useDragTrigger } from './drag/useDragTrigger';
import { dynamicStyleBoxProps, DynamicStyleProvider, useDynamicStyleEffect, useHostDynamicStyleEffect } from './dynamicstyle';
import { useThemeVariant } from './hooks';
import { ColorLayer, ShadowLayer } from './layer';
import { compose, DynamicStyleRole, expandSides, ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

export type RegionVariant = ThemeVariant;

const REGION_VARIANTS: ThemeVariants<RegionVariant> = {
    0: {},
};

export interface RegionProps extends ThemeProps<RegionVariant> {
    /** The Flash `background="true"` + `color` pair: a flat fill behind the children. */
    backgroundColor?: string;
    /** The alpha byte of that colour, when it isn't `ff` - the fill is the whole ARGB value. */
    backgroundAlpha?: number;
    cursor?: string;
    /** The Flash `BLEND_<mode>` tag (`BLEND_ADD` on glow bitmaps, ...). */
    blendMode?: BLEND_MODES;
    /**
     * The Flash window `blend` of a container/text with its own graphic context: the opacity
     * of the whole subtree (a container drawing into its parent's context ignores `blend`
     * entirely - `WindowRendererItem` only applies it to a skin or an own-context fill).
     */
    alpha?: number;
    /** Greys the region out through its `dynamicStyle`'s disabled rule and stops its pointer events. */
    disabled?: boolean;
    /** A `#icon` / `#bg` tag under a `dynamicStyle` host: that host's child rule moves and tints this region. */
    dynamicRole?: DynamicStyleRole;
    /**
     * The `mouse_dragging_target` flag (32768): this region is the window a drag moves. It stays
     * where its layout puts it until a `dragTrigger` inside it (or itself) is pressed, and then
     * follows the pointer - see `useDragTarget` (`WindowMouseDragger`).
     */
    dragTarget?: boolean;
    /**
     * The `mouse_dragging_trigger` flag (257): pressing this region drags the nearest
     * `dragTarget` - itself, when it is one, else the closest enclosing one.
     */
    dragTrigger?: boolean;
    /**
     * The `bound_to_parent_rect` flag (32), read here for a `dragTarget`: a drag never takes it
     * past its parent's box (`WindowController.setRectangle`).
     */
    boundToParentRect?: boolean;
    children?: ReactNode;
}

/**
 * The themed counterpart of the Flash `container`/`region`/`background` elements: a plain
 * positioning `Box` that, unlike `Box` itself, accepts the full `ThemeProps` surface (variant
 * cascade, text style inheritance for bare string children, the layout metadata in
 * `ThemeLayoutMeta`, and the pointer handlers a `region` uses as a hit area). Ported layouts
 * reach for this wherever the XML had a structural node; hand-written views keep using `Box`.
 * It's also the one component that applies `dropShadow`, so the generator wraps any other
 * element carrying a `<DropShadowFilter>` in one of these.
 *
 * A region is also the usual `dynamicStyle` host (the toolbar's `lifted_hover` tiles, the room
 * tools' `brightness_and_shadow_under` buttons): it tracks hover/press itself, applies the
 * style's host rule to its own box (the nudge, the pressed colour transform) and hands its
 * state down so its `dynamicRole` children can apply theirs - see utils/dynamicStyles.ts.
 *
 * And it carries the generic window drag (`WindowController.update`'s `WME_DOWN` case with
 * `services/WindowMouseDragger.as`): `dragTarget` is the window that moves, `dragTrigger` the one
 * that starts it - see theme/drag.
 */
export const Region: ForwardRefExoticComponent<RegionProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, RegionProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, zIndex, visible, dropShadow, dynamicStyle, dynamicRole, backgroundColor, backgroundAlpha, cursor, blendMode, alpha, disabled, dragTarget = false, dragTrigger = false, boundToParentRect, children,
        onPointerOver, onPointerOut, onPointerDown: onPointerDownProp, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const drag = useDragTarget(dragTarget, { boundToParentRect });
        const startDrag = useDragTrigger(dragTrigger, drag.controller);
        const onPointerDown = compose(onPointerDownProp, startDrag);
        const { ownCascade, config, state, handlers, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'region', variants: REGION_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled, interactive: !!dynamicStyle,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });
        const hostEffect = useHostDynamicStyleEffect(dynamicStyle, state);
        const childEffect = useDynamicStyleEffect(dynamicRole);
        const boxProps = dynamicStyleBoxProps(hostEffect ?? childEffect, alpha);
        const setRef = (node: PixiContainer | null) => {
            drag.attach(node);

            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
        };
        const content = (
            <DynamicStyleProvider
                name={dynamicStyle}
                state={state}
            >
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </DynamicStyleProvider>
        );

        return (
            <Box
                ref={setRef}
                zIndex={zIndex}
                visible={visible}
                blendMode={blendMode}
                layout={{ ...expandSides(config.layout), ...expandSides(layout) }}
                {...boxProps}
                // A drag target's move rides on top of any dynamic style nudge.
                {...(dragTarget && { x: (boxProps.x ?? 0) + drag.offset.x, y: (boxProps.y ?? 0) + drag.offset.y })}
                {...handlers}
                cursor={cursor ?? handlers.cursor}
            >
                {dropShadow && <ShadowLayer {...dropShadow} />}
                {backgroundColor && (
                    <ColorLayer
                        color={backgroundColor}
                        alpha={backgroundAlpha}
                    />
                )}
                {dragTarget
                    ? <DragTargetContext.Provider value={drag.controller}>{content}</DragTargetContext.Provider>
                    : content}
            </Box>
        );
    },
);

Region.displayName = 'Region';
