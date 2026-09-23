/**
 * The Flash `bubble` window (`BubbleController`, a `FrameController` with one pointer child per
 * direction): the skin of `habbo_skin_bubble(_7)_xml` with the pointer of its `direction`.
 *
 * Two shapes, by what the caller gives:
 *
 * - with `margins` or `pointerOffset` (what a layout port passes) it is the Flash window itself:
 *   the box is the window's rect, and the body, pointer and content sit inside it exactly where
 *   `habbo_window_layout_bubble(_7)_xml` and `BubbleController.pointerOffset` put them;
 * - without either (the hand-written bubbles) it is the body alone, sized by its content, with
 *   the pointer appended outside it in flow.
 *
 * `habbo_element_description_xml` has `bubble` rows for styles 0 and 7 only - in the bundles and
 * in the decompiled client alike - while layouts also ask for 1 (`new_user_help`), 5
 * (`avatar_info_widget`, `variable_value_info_bubble`) and 100 (`chatter_configuration`,
 * `name_configuration`, `high_score_display`). Flash draws those as style 0:
 * `SkinContainer.getSkinRendererByTypeAndStyle`, `getWindowLayoutByTypeAndStyle` and
 * `getDefaultAttributesByTypeAndStyle` all fall back to the style 0 entry of the type when the
 * style has none. So does this: `useThemeVariant` takes the variant 0 skin, the window layout is
 * style 0's, and the pointers, which no style 0 bubble cascades to, keep their own style 0 art.
 * There is no style 100 art to cut. The text style still follows the id asked for
 * (`themeDefaultTextStyle`), as `ThemeManager` picks the theme from the window's own style.
 */
import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes, useState } from 'react';

import { Box, BoxLayout } from './Box';
import { BubblePointer } from './BubblePointer';
import { VariantCascadeProvider } from './cascade';
import { useLayoutSize, useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice } from './layer';
import { expandSides, ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

export type PointerDirection = 'up' | 'down' | 'left' | 'right';

export type BubbleVariant = ThemeVariant;

const POINTER_FLEX_DIRECTION: Record<PointerDirection, 'row' | 'row-reverse' | 'column' | 'column-reverse'> = {
    down: 'column',
    up: 'column-reverse',
    left: 'row-reverse',
    right: 'row',
};

const BUBBLE_VARIANTS: ThemeVariants<BubbleVariant> = {
    0: { layer: NineSlice('bubble-0-default-src', 5, 5, 5, 6), layout: { minWidth: 21, minHeight: 21 } },
    // ubuntu/habbo-style (habbo_skin_bubble_7_xml): 7px corners (8 at the bottom) inside a 6px transparent margin, so a bubble of any size keeps its rounding.
    7: { layer: NineSlice('bubble-7-default-src', 13, 13, 13, 14), layout: { minWidth: 27, minHeight: 38 } },
};

/** How a pointer follows its bubble's size on one axis: the `relative_*_scale_*` param of its template row. */
type PointerScale = 'fixed' | 'move' | 'center';

interface PointerTemplate {
    x: number;
    y: number;
    width: number;
    height: number;
    horizontal: PointerScale;
    vertical: PointerScale;
}

interface BubbleWindowLayout {
    /** The template's own size - what a `move` child keeps its distance to. */
    width: number;
    height: number;
    /** The `content_area`'s insets (`FrameController.margins`): left, top, right, bottom. */
    margins: readonly [ number, number, number, number ];
    /** Where the skin's body sits in the window - the transparent border its skin layout keeps around it: left, top, right, bottom. */
    bodyInsets: readonly [ number, number, number, number ];
    pointers: Record<PointerDirection, PointerTemplate>;
}

/**
 * `habbo_window_layout_bubble_xml` and `habbo_window_layout_bubble_7_xml`: the pointer rows
 * (params 208 = centre / fixed, 1232 = centre / move, 3088 = fixed / centre, 3152 = move /
 * centre, each with 16) and the `content_area` of each style. Style 0's sheet is the bare body,
 * which `habbo_skin_bubble_xml` lays 6px in from every edge; style 7's sheet already carries that
 * border, so it covers the whole rect.
 */
const BUBBLE_WINDOW_LAYOUTS: Record<'0' | '7', BubbleWindowLayout> = {
    0: {
        width: 21,
        height: 21,
        margins: [ 8, 8, 8, 8 ],
        bodyInsets: [ 6, 6, 6, 6 ],
        pointers: {
            up: { x: 4, y: 0, width: 13, height: 9, horizontal: 'center', vertical: 'fixed' },
            down: { x: 4, y: 12, width: 13, height: 9, horizontal: 'center', vertical: 'move' },
            left: { x: 0, y: 4, width: 8, height: 13, horizontal: 'fixed', vertical: 'center' },
            right: { x: 13, y: 4, width: 8, height: 13, horizontal: 'move', vertical: 'center' },
        },
    },
    7: {
        width: 23,
        height: 23,
        margins: [ 8, 8, 10, 10 ],
        bodyInsets: [ 0, 0, 0, 0 ],
        pointers: {
            up: { x: 4, y: -2, width: 16, height: 10, horizontal: 'center', vertical: 'fixed' },
            down: { x: 4, y: 14, width: 16, height: 11, horizontal: 'center', vertical: 'move' },
            left: { x: -2, y: 4, width: 11, height: 18, horizontal: 'fixed', vertical: 'center' },
            right: { x: 14, y: 4, width: 11, height: 18, horizontal: 'move', vertical: 'center' },
        },
    },
};

/**
 * `WindowController.updateScaleRelativeToParent` for one axis of a pointer: `move` keeps its
 * distance to the far edge, `center` is `floor(parent / 2) - floor(size / 2)` - or 0 when the
 * pointer is larger than its bubble, which param 16 on every pointer row asks for.
 *
 * Only `pointerOffset` needs this: a `move` or `fixed` axis is the same distance from one of the
 * bubble's edges whatever its size, and a `center` one is flex centring - see `pointerLayout`,
 * which places the pointer without knowing how big the bubble is.
 */
const placePointerAxis = (scale: PointerScale, position: number, size: number, parent: number, template: number): number => {
    if (scale === 'move') return position + (parent - template);

    if (scale === 'center') return (parent < size) ? 0 : (Math.floor(parent / 2) - Math.floor(size / 2));

    return position;
};

/**
 * Where the pointer sits, as insets Yoga resolves on the first pass: `fixed` is its distance to
 * the near edge, `move` its distance to the far one (`template - position - size`, which the
 * scaling keeps), and the `center` axis - the other one, on every row of both tables - is a box
 * spanning that axis with the pointer centred in it.
 *
 * Measuring the bubble to place the pointer, as Flash's own arithmetic does, means placing it
 * from a size that is 0 until something reports one; this needs no size at all. (A bubble
 * narrower than its own pointer centres it instead of Flash's flush-left, which no bubble the
 * client draws is.)
 */
const pointerLayout = (template: PointerTemplate, windowLayout: BubbleWindowLayout): BoxLayout => {
    const horizontal = (template.horizontal === 'fixed')
        ? { left: template.x }
        : (template.horizontal === 'move') ? { right: windowLayout.width - template.x - template.width } : null;
    const vertical = (template.vertical === 'fixed')
        ? { top: template.y }
        : (template.vertical === 'move') ? { bottom: windowLayout.height - template.y - template.height } : null;

    return {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        ...(horizontal ?? { left: 0, right: 0, flexDirection: 'row' }),
        ...(vertical ?? { top: 0, bottom: 0, flexDirection: 'column' }),
    };
};

export interface BubbleProps extends ThemeProps<BubbleVariant> {
    usePointer?: boolean;
    pointer?: PointerDirection;
    /** The Flash window `blend`: a bubble draws into its own graphic context, so this is the opacity of the whole bubble, children included. */
    alpha?: number;
    /**
     * The content margins - left, top, right, bottom, as `FrameController.margins` keeps them.
     * Given (or with `pointerOffset`), the bubble is the Flash window: its box is the window's
     * rect, and the children are laid out in the content box at `left, top`, sized
     * `width - left - right` x `height - top - bottom`. With `pointerOffset` alone they are the
     * style's `content_area` (8, 8, 8, 8 for style 0; 8, 8, 10, 10 for style 7).
     */
    margins?: readonly [ number, number, number, number ];
    /**
     * `BubbleController.pointerOffset`: when non-zero the pointer's left edge (up/down) is at
     * `int(width / 2 + offset)`, its top edge (left/right) at `int(height / 2 + offset)`; at 0 it
     * stays where its template row centres it.
     */
    pointerOffset?: number;
    children?: ReactNode;
}

export const Bubble: ForwardRefExoticComponent<BubbleProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BubbleProps>(
    ({ variant, defaultVariant, tooltip, layout, tintColor, textStyle, textColor, visible, usePointer = true, pointer = 'down', alpha, margins, pointerOffset, children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { resolvedVariant, ownCascade, config, handlers, resolvedLayer, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<BubbleVariant>({
            cascadeKey: 'bubble', variants: BUBBLE_VARIANTS, variant, defaultVariant, tooltip, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });
        const [ host, setHost ] = useState<PixiContainer | null>(null);
        const measured = useLayoutSize(host);

        if ((margins === undefined) && (pointerOffset === undefined)) {
            return (
                <Box
                    alpha={alpha}
                    layout={{ flexDirection: POINTER_FLEX_DIRECTION[pointer], alignItems: 'center' }}
                    {...handlers}
                >
                    <Box
                        ref={ref}
                        visible={visible}
                        layout={{ ...expandSides(config.layout), ...expandSides(layout) }}
                    >
                        <BackgroundLayer
                            layer={resolvedLayer}
                            tintColor={resolvedTint}
                        />
                        <VariantCascadeProvider map={ownCascade}>
                            {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                        </VariantCascadeProvider>
                    </Box>
                    <VariantCascadeProvider map={ownCascade}>
                        {usePointer && (
                            <BubblePointer
                                direction={pointer}
                                tintColor={resolvedTint}
                            />
                        )}
                    </VariantCascadeProvider>
                </Box>
            );
        }

        const windowLayout = BUBBLE_WINDOW_LAYOUTS[(String(resolvedVariant) === '7') ? '7' : '0'];
        const [ left, top, right, bottom ] = margins ?? windowLayout.margins;
        const [ bodyLeft, bodyTop, bodyRight, bodyBottom ] = windowLayout.bodyInsets;
        const template = windowLayout.pointers[pointer];
        let pointerPlacement = pointerLayout(template, windowLayout);

        // `pointerOffset` is the one placement measured from the bubble's own size: a size the
        // layout states is known before Yoga runs, one it works out is read back.
        if (pointerOffset) {
            const width = (typeof layout?.width === 'number') ? layout.width : measured.width;
            const height = (typeof layout?.height === 'number') ? layout.height : measured.height;
            const pointerX = ((pointer === 'up') || (pointer === 'down'))
                ? Math.trunc((width / 2) + pointerOffset)
                : placePointerAxis(template.horizontal, template.x, template.width, width, windowLayout.width);
            const pointerY = ((pointer === 'up') || (pointer === 'down'))
                ? placePointerAxis(template.vertical, template.y, template.height, height, windowLayout.height)
                : Math.trunc((height / 2) + pointerOffset);

            pointerPlacement = { position: 'absolute', left: pointerX, top: pointerY };
        }

        return (
            <Box
                ref={(node: PixiContainer | null) => {
                    setHost(node);

                    if (typeof ref === 'function') ref(node);
                    else if (ref) ref.current = node;
                }}
                visible={visible}
                alpha={alpha}
                layout={layout ?? {}}
                {...handlers}
            >
                {/*
                  * The body is placed by insets rather than by a measured width and height - a
                  * bubble whose layout states no size (the name bubble, which its text sizes) drew
                  * a 0x0 body until something reported one, leaving a bubble that was all pointer.
                  * The insets go on a plain container and the skin fills it: `@pixi/layout`
                  * defaults a leaf's size to `intrinsic`, so insets on the nine-slice itself leave
                  * it at its texture's own size - a small blob in the corner of the bubble.
                  */}
                <Box
                    // Art, like the layer it holds: it answers no press of its own.
                    pointerTransparent
                    layout={{ position: 'absolute', left: bodyLeft, top: bodyTop, right: bodyRight, bottom: bodyBottom }}
                >
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                </Box>
                <VariantCascadeProvider map={ownCascade}>
                    {usePointer && (
                        <Box
                            pointerTransparent
                            layout={pointerPlacement}
                        >
                            <BubblePointer
                                direction={pointer}
                                tintColor={resolvedTint}
                                layout={{ width: template.width, height: template.height, flexShrink: 0, marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0 }}
                            />
                        </Box>
                    )}
                    <Box layout={{ position: 'absolute', left, top, right, bottom }}>
                        {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                    </Box>
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Bubble.displayName = 'Bubble';
