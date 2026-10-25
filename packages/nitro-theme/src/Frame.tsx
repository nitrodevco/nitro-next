import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { ReactNode, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { ContentArea } from './ContentArea';
import { DragTargetContext, DragTargetController } from './drag/DragTargetContext';
import { reachedUnclaimed } from './drag/useDragTrigger';
import { Header } from './Header';
import { ChildBounds, useChildBounds, useFrameDrag, useFrameResize, useThemeVariant } from './hooks';
import { useThemeConfigValue } from './host';
import { BackgroundLayer, ShadowLayer } from './layer';
import { Scaler, ScalerDirection } from './Scaler';
import { DropShadowConfig, expandSides, FRAME_OVERRIDES_KEY, frameOverrideOf, getWindowLayer, isFramelessVariant, subscribeWindowLayer, ThemeProps, ThemeVariant, WindowPlacedContext } from './utils';

export type FrameVariant = ThemeVariant;

export interface FrameProps extends Omit<ThemeProps<FrameVariant>, 'dropShadow'> {
    id?: string;
    /**
     * The window's name in its layout (a template's root frame): with `id`, what a hotel's
     * `frame.overrides` entry names the frame by (`frameOverrideOf`).
     */
    name?: string;
    caption?: string;
    resizeDirection?: ScalerDirection;
    contentLayout?: BoxLayout;
    /**
     * The frame's content margins - left, top, right, bottom, as `FrameController.margins` keeps
     * them: the content area sits at exactly those insets from the frame's edges, the way the
     * layout's `_CONTENT` container does, so children placed by a Flash layout land on its pixels.
     * A layout port passes them (its style's window layout, under any `margin_*` vars of its own);
     * without them the content follows the header in the variant's own padding.
     */
    margins?: readonly [ number, number, number, number ];
    /**
     * The window's shadow. A Flash frame only has one when its layout gives it a
     * `<DropShadowFilter>` (about half of them do, always `distance 4, alpha 0.35, blur 4`) -
     * a layout port passes that filter, or `false` for a layout without one; a hand-written
     * frame gets the variant's default.
     */
    dropShadow?: DropShadowConfig | false;
    /**
     * Where the window opens, in screen pixels. Prefer this over `top`/`left` in `layout`: the
     * drag offset is what is remembered, and it is applied on top of the layout position.
     */
    defaultPosition?: { x: number; y: number };
    /**
     * Whether this window reopens where it was last dragged to. On by default, for the windows
     * a user arranges to taste; pass `false` for a dialog that should come up in the same place
     * every time.
     */
    rememberPosition?: boolean;
    /**
     * Whether this window reopens at the size its scaler was last left at. On by default; pass
     * `false` for a window whose size is kept elsewhere - the navigator's comes from the server's
     * preferences, and a stored one would win over them.
     */
    rememberSize?: boolean;
    /**
     * Whether the header drags the window. Flash drags a window only when its params carry
     * `mouse_dragging_target` (`WINDOW_PARAM_MOUSE_DRAGGING_TARGET`, 32768) and the
     * frame skin's header is the `mouse_dragging_trigger` - a layout frame without that flag
     * (`nest_breeding_success`, `params="1"`) stays where it opened. On by default; a layout port
     * passes `false` for a frame whose `params` lack 32768.
     */
    draggable?: boolean;
    /** Opens the frame centered in the viewport (`window.center()`) rather than at `defaultPosition` - see `FrameDragOptions.centered`. */
    centered?: boolean;
    /** Told where the frame is after it was centered or dragged, for a caller that keeps the position itself. */
    onPositionChange?: (position: { x: number; y: number }) => void;
    onClose?: () => void;
    /**
     * The size the user has given it with its scaler - or `null` while it has its layout's - as it
     * changes, and once on mount with a size kept from before: for code that lays its content out
     * by the frame's size (a window template's `TemplateView`).
     */
    onResize?: (size: { width: number; height: number } | null) => void;
    /** The header's close button; false where Flash disposes `header_button_close`. */
    closeButtonVisible?: boolean;
    /** The header close button's style, where the window code sets one. */
    closeButtonVariant?: string;
    /** Shows the skin's menu button in the header (`IFrameWindow.menuButtonVisible`) and is called when it is pressed. */
    onMenu?: () => void;
    /**
     * `FrameController.helpPage` (the layout's `help_page` var): a page other than '' shows the
     * header's help button, where the frame style's header layout has one, and a click on it
     * calls `onHelp` with the page - Flash's `helpButtonAction`, which the window manager points
     * at `openHelpPage`.
     */
    helpPage?: string;
    onHelp?: (page: string) => void;
    /**
     * Drawn over the frame art and under the header and content: what a Flash frame skin carries
     * besides its nine-slice, such as the banner of `illumina_light_frame_wired`. Its children
     * position themselves absolutely against the whole frame.
     */
    backdrop?: ReactNode;
    /**
     * `FrameController.resizeToFitContent`: the frame takes the size of its content - the largest
     * `x + width` / `y + height` of the content's visible children
     * (`WindowController.resizeToAccommodateChildren`) - plus `margins`, which the `_CONTENT`
     * container's `reflect_resize_to_parent` hands on to the frame. `'width'` or `'height'` fits
     * one axis and leaves the other at `layout`'s. The frame's `minWidth`/`maxWidth`/`minHeight`/
     * `maxHeight` (its `WindowRectLimits`) still clamp it. Without `margins` the content is in
     * flow, so the frame is simply left to Yoga's own size on that axis. Until the children are
     * laid out, and while none is visible, the layout's size stands, as Flash leaves it.
     */
    fitContent?: boolean | 'width' | 'height';
    /**
     * Not Flash's: panes of the window drawn beside it, placed against its top left and not cropped by
     * it - a second `Frame` (a navigation pane) that moves, raises and closes with this one. A press
     * on a pane's header drags this window, as a nested frame's header does. Drawn behind the frame's
     * art unless `panesInFront`.
     */
    panes?: ReactNode;
    panesInFront?: boolean;
    children?: ReactNode;
}

/**
 * `margins` as an absolute content box: no flow, none of the variant's padding.
 *
 * A fitted axis drops its trailing inset and takes the content's measured size instead. Pinned to
 * both edges, the content's size comes from the frame's and the frame's from the content's, and
 * Yoga sizes a flow child against its parent's definite main size: in a content box collapsed to
 * the frame's minimum, such a child measures 0 and so never grows the frame back. An absolutely
 * positioned child measures its own content either way, which is why only some of them deadlocked.
 */
const marginsLayout = (
    [ left, top, right, bottom ]: readonly [ number, number, number, number ],
    fitWidth: boolean,
    fitHeight: boolean,
    bounds: ChildBounds | null,
): BoxLayout => ({
    position: 'absolute', left, top,
    ...(fitWidth ? (bounds && { width: bounds.right }) : { right }),
    ...(fitHeight ? (bounds && { height: bounds.bottom }) : { bottom }),
    // Every side of both, by name: the variant places the content with its own margins, and a
    // shorthand `margin: 0` beside a `marginLeft` the variant set is two styles, not an override.
    flex: undefined, padding: 0, paddingLeft: 0, paddingTop: 0, paddingRight: 0, paddingBottom: 0,
    margin: 0, marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0,
});

/**
 * One axis of the frame's size, or `undefined` to leave `layout`'s. A fitted axis is the content's
 * bounds plus the margins (`resizeToFitContent`) - or Yoga's own size when the content is in flow,
 * and the stated size until the bounds are known; any other axis is the size the layout states.
 */
const frameAxisSize = (fit: boolean, hasMargins: boolean, bound: number | undefined, margins: number, stated: unknown): number | 'auto' | undefined => {
    if (fit) {
        if (!hasMargins) return 'auto';

        if (bound !== undefined) return bound + margins;
    }

    return (typeof stated === 'number') ? stated : undefined;
};

/**
 * Flash's `FrameController` (`frame`): a window - its skin and drop shadow, the header with its
 * caption and buttons, the `_CONTENT` area at the frame's margins, and the scaler - placed on the
 * window desktop, dragged by its header (`useFrameDrag`), resized by its scaler (`useFrameResize`)
 * and kept unrendered until its size and position have settled (`useRevealWhenSettled`). Give it an
 * explicit `layout.height` (or `fitContent`): its size is otherwise its variant's or its minimum, and the content is
 * clipped to it.
 */
export const Frame = ({
    variant: codeVariant, defaultVariant, tooltip, tooltipDelay, layout, tintColor: codeTintColor, textStyle, textColor, dropShadow, id, name, caption, resizeDirection = 'all', contentLayout, margins,
    defaultPosition, rememberPosition = true, rememberSize = true, draggable = true, centered, onPositionChange, onClose, onResize, closeButtonVisible, closeButtonVariant, onMenu, helpPage, onHelp, backdrop, fitContent, panes, panesInFront, children,
    onPointerOver, onPointerOut, onPointerDown: onPointerDownProp, onPointerUp, onPointerUpOutside, onPointerTap,
}: FrameProps) => {
    const { frameRef, attachFrame, offset, zIndex, revealed, onHeaderPointerDown, startDrag } = useFrameDrag(id, { defaultPosition, remember: rememberPosition, centered, onPositionChange });
    /*
     * The window a frame that is no drag target itself is dragged with: `WindowController.update`
     * walks up from a `mouse_dragging_trigger` (a frame skin's header) to the first ancestor with the
     * target flag, so a nested frame's header - a pane's - drags the window it is in.
     */
    const outerTarget = useContext(DragTargetContext);
    // What this frame hands what it holds: the target their triggers drag.
    const ownTarget = useMemo<DragTargetController | null>(() => (draggable ? { begin: startDrag } : null), [ draggable, startDrag ]);
    const heldTarget = ownTarget ?? outerTarget;
    /*
     * A window belongs on the window desktop, whoever built it - `buildFromXML(xml, 1)`. A frame
     * mounted outside the layer (every room widget's dialog is mounted over the room canvas) has
     * its container moved in after mount and handed back before React unmounts it, the way
     * `ModalDialog` and `FloatingPopup` move theirs; React only ever talks to the container
     * itself, never to where it sits in the display list. Left where it is mounted, its z-index
     * sorts against nothing and it can neither be raised past another window nor pushed behind
     * one. A frame already on a desktop - every window of the client's own, and a frame nested
     * inside one - stays exactly where it is rendered.
     */
    // A theme's style for this window (`frame.overrides`), over what its code passes.
    const override = frameOverrideOf(useThemeConfigValue<unknown>(FRAME_OVERRIDES_KEY), id, name);
    const variant = override?.variant ?? codeVariant;
    const frameless = isFramelessVariant(variant);
    const tintColor = override?.color ?? codeTintColor;
    const placed = useContext(WindowPlacedContext);
    const windowLayer = useSyncExternalStore(subscribeWindowLayer, getWindowLayer);
    const hostRef = useRef<PixiContainer>(null);
    // A frameless window has no header: a press its content leaves unclaimed drags it.
    const onFramelessPointerDown = (event: FederatedPointerEvent) => {
        onPointerDownProp?.(event);

        if (reachedUnclaimed(event)) startDrag(event);
    };
    const headerPointerDown = draggable
        ? onHeaderPointerDown
        : ((placed && outerTarget)
                ? (event: FederatedPointerEvent) => {
                        if ((event.button === 0) && (event.target === event.currentTarget)) outerTarget.begin(event);
                    }
                : undefined);
    const { ownCascade, config, handlers, resolvedLayer, resolvedPlain, resolvedOverlay, resolvedShadow, resolvedTint } = useThemeVariant<FrameVariant>({
        cascadeKey: 'frame', variant: frameless ? undefined : variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, dropShadow, interactive: true, onPointerOver, onPointerOut, onPointerDown: (frameless && draggable) ? onFramelessPointerDown : onPointerDownProp, onPointerUp, onPointerUpOutside, onPointerTap,
    });
    const minWidth = layout?.minWidth ?? config.layout?.minWidth ?? 20;
    const minHeight = layout?.minHeight ?? config.layout?.minHeight ?? 20;
    const maxWidth = layout?.maxWidth ?? config.layout?.maxWidth;
    const maxHeight = layout?.maxHeight ?? config.layout?.maxHeight;
    const { size, onScalerPointerDown } = useFrameResize(
        rememberSize ? id : undefined,
        frameRef,
        resizeDirection,
        { width: minWidth as number, height: minHeight as number },
        { width: typeof maxWidth === 'number' ? maxWidth : undefined, height: typeof maxHeight === 'number' ? maxHeight : undefined },
    );
    const [ contentNode, setContentNode ] = useState<PixiContainer | null>(null);

    useEffect(() => {
        onResize?.(size);
    }, [ size, onResize ]);
    const contentBounds = useChildBounds(fitContent ? contentNode : null);
    const fitWidth = (fitContent === true) || (fitContent === 'width');
    const fitHeight = (fitContent === true) || (fitContent === 'height');
    const width = frameAxisSize(fitWidth, !!margins, contentBounds?.right, (margins?.[0] ?? 0) + (margins?.[2] ?? 0), layout?.width);
    const height = frameAxisSize(fitHeight, !!margins, contentBounds?.bottom, (margins?.[1] ?? 0) + (margins?.[3] ?? 0), layout?.height);
    const sizeLayout: BoxLayout = {
        ...((width !== undefined) && { width }),
        ...((height !== undefined) && { height }),
    };

    useLayoutEffect(() => {
        const host = hostRef.current;
        const frame = frameRef.current;

        if (placed || !windowLayer || !host || !frame) return;

        windowLayer.addChild(frame);

        return () => {
            if (!host.destroyed && !frame.destroyed) host.addChild(frame);
        };
    }, [ placed, windowLayer, frameRef ]);

    const frame = (
        <WindowPlacedContext.Provider value={true}>
            <Box
                ref={attachFrame}
                x={offset.dx}
                y={offset.dy}
                zIndex={zIndex}
                renderable={revealed}
                /*
                 * Pixi prunes the children of a box whose hit area misses the pointer: a frame that holds
                 * what lies past its own rectangle (a frameless one's content, its panes) has none, and is
                 * hit through what it holds - a framed one through the filler below.
                 */
                pointerTransparent={frameless || !!panes}
                {...handlers}
                layout={{
                    // A window sits on its desktop at its own rectangle, never in a sibling's flow -
                    // in flow, every window that opens beside it would push it along.
                    position: 'absolute',
                    flexDirection: 'column',
                    minWidth,
                    minHeight,
                    width: minWidth,
                    height: minHeight,
                    ...expandSides(config.layout),
                    ...expandSides(layout),
                    ...sizeLayout,
                    ...(size && { width: size.width, height: size.height }),
                }}
            >
                { panes && !frameless && <Box layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} /> }
                { panes && (
                    <Box
                        pointerTransparent
                        zIndex={panesInFront ? 30 : undefined}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0 }}
                    >
                        <DragTargetContext.Provider value={heldTarget}>
                            {panes}
                        </DragTargetContext.Provider>
                    </Box>
                ) }
                { !frameless && resolvedShadow && (
                    <ShadowLayer
                        {...resolvedShadow}
                        layer={resolvedLayer}
                        plain={resolvedPlain}
                    />
                ) }
                { !frameless && resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                ) }
                {/* The skin's `colorize="false"` pieces, over the tinted art and under the shine. */}
                { !frameless && resolvedPlain && <BackgroundLayer layer={resolvedPlain} /> }
                { !frameless && resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} /> }
                { backdrop }
                { frameless
                    ? (
                            // No header, no scaler, and no crop: what it holds is the window.
                            <Box
                                ref={setContentNode}
                                pointerTransparent
                                zIndex={20}
                                layout={margins ? { ...contentLayout, ...marginsLayout(margins, fitWidth, fitHeight, contentBounds) } : { flex: 1, flexDirection: 'column', ...contentLayout }}
                            >
                                <DragTargetContext.Provider value={heldTarget}>
                                    {children}
                                </DragTargetContext.Provider>
                            </Box>
                        )
                    : (
                            <VariantCascadeProvider map={ownCascade}>
                                <Header
                                    caption={caption}
                                    tintColor={resolvedTint}
                                    onClose={onClose}
                                    closeButtonVisible={closeButtonVisible}
                                    closeVariant={closeButtonVariant}
                                    onMenu={onMenu}
                                    helpPage={helpPage}
                                    onHelp={onHelp}
                                    onPointerDown={headerPointerDown}
                                />
                                <ContentArea
                                    ref={setContentNode}
                                    // Its children are cropped by the frame, not by this box: the margins are
                                    // how far past its own edges they may reach on each side. See `ContentArea`.
                                    clipOutset={margins}
                                    layout={margins ? { ...contentLayout, ...marginsLayout(margins, fitWidth, fitHeight, contentBounds) } : contentLayout}
                                >
                                    <DragTargetContext.Provider value={heldTarget}>
                                        {children}
                                    </DragTargetContext.Provider>
                                </ContentArea>
                                <Scaler
                                    // `_FRAME_SCALER` is tagged `_COLORIZE` in every frame's window layout, so
                                    // the corner takes the window's own colour as the header does.
                                    tintColor={resolvedTint}
                                    direction={resizeDirection}
                                    onPointerDown={onScalerPointerDown}
                                />
                            </VariantCascadeProvider>
                        ) }
            </Box>
        </WindowPlacedContext.Provider>
    );

    if (placed) return frame;

    return (
        <Box
            ref={hostRef}
            // Only ever a mount point: the frame is moved out of here into the window layer, and
            // handed back before React unmounts it.
            layout={{ position: 'absolute', left: 0, top: 0, width: 0, height: 0 }}
        >
            {frame}
        </Box>
    );
};

Frame.displayName = 'Frame';
