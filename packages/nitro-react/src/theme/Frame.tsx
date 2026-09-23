import { Container as PixiContainer } from 'pixi.js';
import { ReactNode, useContext, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { ContentArea } from './ContentArea';
import { Header } from './Header';
import { ChildBounds, ReflectResizeContext, useChildBounds, useFrameDrag, useFrameResize, useReflectResizeHost, useThemeVariant } from './hooks';
import { BackgroundLayer, Composite, CompositePiece, NineSlice, ShadowLayer } from './layer';
import { Scaler, ScalerDirection } from './Scaler';
import { compose, DropShadowConfig, expandSides, getWindowLayer, subscribeWindowLayer, ThemeProps, ThemeVariant, ThemeVariants, WindowPlacedContext } from './utils';

export type FrameVariant = ThemeVariant;

const BLUE_FRAME_SHINE = Composite([
    CompositePiece('frame-0-default-shine-top-left-src', 1, 1, undefined, undefined, 7, 7),
    CompositePiece('frame-0-default-shine-top-center-src', 2, 8, 8, undefined, undefined, 1),
    CompositePiece('frame-0-default-shine-top-right-src', 1, undefined, 1, undefined, 7, 7),
    CompositePiece('frame-0-default-shine-top-center-src', 8, 2, undefined, 8, 1),
    CompositePiece('frame-0-default-shine-top-center-src', 8, undefined, 2, 7, 1),
    CompositePiece('frame-0-default-shine-bottom-left-src', undefined, 1, undefined, 1, 7, 7),
    CompositePiece('frame-0-default-shine-top-center-src', undefined, 8, 7, 2, undefined, 1),
    CompositePiece('frame-0-default-shine-bottom-right-src', undefined, undefined, 1, 1, 6, 6),
]);

const FRAME_3_SHINE = NineSlice('frame-3-default-shine-src', 10, 33, 10, 10);

/**
 * `habbo_window_layout_frame`, the 40x40 template styles 0, 1 and 2 share. It insets nothing of
 * its own: `titlebar` sits at (6, 6) - which is the header variant's own margin - and
 * `_FRAME_SCALER` at (25, 25) 15x15, flush with the frame's bottom right corner. A frame padding
 * here is in front of both, and the 2px one this carried put the title bar, and the resize
 * corner, two pixels in from where the client draws them.
 */
const FRAME_0_VARIANT: FrameVariant = {
    layer: NineSlice('frame-0-default-src', 13, 13, 13, 13),
    overlay: BLUE_FRAME_SHINE,
    dropShadow: { distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 },
    layout: {
        minWidth: 40,
        minHeight: 40,
    },
};

/**
 * `habbo_skin_frame_3`: only `top_left` and `top_right` take the window's colour, and the six
 * `center_*` / `bottom_*` pieces - the pale body down the sides and across the bottom - are
 * `colorize="false"`, so they are cut into their own sheet and drawn untinted over the title bar.
 * Without them every ubuntu window drew a title bar and nothing else.
 */
const FRAME_UBUNTU_VARIANT: FrameVariant = {
    layer: NineSlice('frame-3-default-src', 10, 33, 10, 10),
    plain: NineSlice('frame-3-default-plain-src', 10, 33, 10, 10),
    overlay: FRAME_3_SHINE,
    dropShadow: { distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 },
    layout: {
        minWidth: 64,
        minHeight: 64,
    },
};

/**
 * `illumina_light_skin_frame` (the art of border style 101), `top` pixels down from the frame's
 * edge - 0 for the plain frame, 40 for the modal one, whose layout puts the panel under a band
 * that carries the title.
 */
const illuminaLightFrame = (top: number) => Composite([
    CompositePiece('border-101-default-top-left-src', top, 0, undefined, undefined, 4, 4),
    CompositePiece('border-101-default-top-center-src', top, 4, 4, undefined, undefined, 4),
    CompositePiece('border-101-default-top-right-src', top, undefined, 0, undefined, 4, 4),
    CompositePiece('border-101-default-center-left-src', top + 4, 0, undefined, 7, 1),
    CompositePiece('border-101-default-center-center-src', top + 4, 1, 1, 7),
    CompositePiece('border-101-default-center-left-src', top + 4, undefined, 0, 7, 1),
    CompositePiece('border-101-default-bottom-left-src', undefined, 0, undefined, 0, 4, 7),
    CompositePiece('border-101-default-bottom-center-src', undefined, 4, 4, 0, undefined, 7),
    CompositePiece('border-101-default-bottom-right-src', undefined, undefined, 0, 0, 4, 7),
]);

/**
 * A leaderboard frame: one 193x130 sheet per style, cut 96/87/96/42 (`frame_leaderboard`). Its
 * six `bottom_*` / `center_*` entities - the pale panel the list sits on - are `colorize="false"`,
 * so they are cut into the `-plain` sheet of the same size and metrics and drawn untinted over
 * the colorizing border.
 */
const leaderboardFrame = (style: number): FrameVariant => ({
    layer: NineSlice(`frame-${style}-default-src`, 96, 87, 96, 42),
    overlay: NineSlice(`frame-${style}-default-plain-src`, 96, 87, 96, 42),
    layout: {
        minWidth: 193,
        minHeight: 130,
    },
});

/**
 * `Frame` variants - the `type="frame"` rows of `habbo_element_description_xml`, keyed by their
 * `style`; the minimum size is the size of the window layout the row names.
 */
const FRAME_VARIANTS: ThemeVariants<FrameVariant> = {
    // blue
    0: {
        ...FRAME_0_VARIANT,
        tintColor: '#418db0',
    },
    // black
    1: {
        ...FRAME_0_VARIANT,
        tintColor: '#4c4c4c',
    },
    // yellow
    2: {
        ...FRAME_0_VARIANT,
        tintColor: '#fac200',
    },
    // ubuntu
    3: {
        ...FRAME_UBUNTU_VARIANT,
        tintColor: '#418db0',
    },
    4: {
        ...FRAME_UBUNTU_VARIANT,
        tintColor: '#67a3bf',
    },
    /*
     * `habbo_skin_frame_7` - the same nine pieces cut from its own 64x73 template, not style 3's,
     * and with no shine: its layout has none, where style 3's is drawn over the title bar.
     */
    7: {
        layer: NineSlice('frame-7-default-src', 10, 33, 10, 10),
        plain: NineSlice('frame-7-default-plain-src', 10, 33, 10, 10),
        dropShadow: { distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 },
        layout: {
            minWidth: 64,
            minHeight: 73,
        },
    },
    // `illumina_light_skin_frame` - every one of its nine entities is `colorize="false"`, so the
    // window's own `color` never reaches the art. `FramePreset` still sets it
    // (`_frame.color = style.frameColor`), and honouring that here multiplied the light panel by
    // the wired dialog's own #e2e2e2 and made the whole window a shade darker than Flash's.
    100: {
        layer: illuminaLightFrame(0),
        colorize: false,
        layout: {
            minWidth: 50,
            minHeight: 50,
        },
    },
    // illumina modal: `renderer="null"`, its layout draws the light frame 40px down under a title band
    101: {
        layer: illuminaLightFrame(40),
        colorize: false,
        dropShadow: { distance: 0, angle: 0, color: '#000000', alpha: 0.75, blur: 80 },
        layout: {
            minWidth: 50,
            minHeight: 80,
        },
    },
    // illumina "wired" - the light frame art with the wired window layout
    102: {
        layer: illuminaLightFrame(0),
        colorize: false,
        layout: {
            minWidth: 50,
            minHeight: 50,
        },
    },
    // illumina purple - `illumina_purple_skin_frame`, every entity `colorize="false"`
    103: {
        layer: NineSlice('frame-103-default-src', 4, 4, 4, 7),
        colorize: false,
        layout: {
            minWidth: 50,
            minHeight: 50,
        },
    },
    // illumina dark - `illumina_dark_skin_frame`, every entity `colorize="false"`
    200: {
        layer: NineSlice('frame-200-default-src', 4, 4, 4, 5),
        colorize: false,
        layout: {
            minWidth: 50,
            minHeight: 50,
        },
    },
    // leaderboards: total badges, achievement level, rare, very rare, mythical, legendary, unique, uncommon
    10000: leaderboardFrame(10000),
    10001: leaderboardFrame(10001),
    10002: leaderboardFrame(10002),
    10003: leaderboardFrame(10003),
    10004: leaderboardFrame(10004),
    10005: leaderboardFrame(10005),
    10006: leaderboardFrame(10006),
    10007: leaderboardFrame(10007),
};

export interface FrameProps extends Omit<ThemeProps<FrameVariant>, 'dropShadow'> {
    id?: string;
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
 * and the stated size until the bounds are known; any other axis the layout states is that size
 * plus what the content's reflecting children have grown by.
 */
const frameAxisSize = (fit: boolean, hasMargins: boolean, bound: number | undefined, margins: number, stated: unknown, reflected: number): number | 'auto' | undefined => {
    if (fit) {
        if (!hasMargins) return 'auto';

        if (bound !== undefined) return bound + margins;
    }

    return (typeof stated === 'number') ? (stated + reflected) : undefined;
};

export const Frame = ({
    variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, dropShadow, id, caption, resizeDirection = 'all', contentLayout, margins,
    defaultPosition, rememberPosition = true, draggable = true, centered, onPositionChange, onClose, onMenu, helpPage, onHelp, backdrop, fitContent, children,
    onPointerOver, onPointerOut, onPointerDown: onPointerDownProp, onPointerUp, onPointerUpOutside, onPointerTap,
}: FrameProps) => {
    const { frameRef, attachFrame, offset, zIndex, revealed, onPointerDown, onHeaderPointerDown } = useFrameDrag(id, { defaultPosition, remember: rememberPosition, centered, onPositionChange });
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
    const placed = useContext(WindowPlacedContext);
    const windowLayer = useSyncExternalStore(subscribeWindowLayer, getWindowLayer);
    const hostRef = useRef<PixiContainer>(null);
    const { ownCascade, config, handlers, resolvedLayer, resolvedPlain, resolvedOverlay, resolvedShadow, resolvedTint } = useThemeVariant({
        cascadeKey: 'frame', variants: FRAME_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, dropShadow, onPointerOver, onPointerOut, onPointerDown: compose(onPointerDown, onPointerDownProp), onPointerUp, onPointerUpOutside, onPointerTap,
    });
    const minWidth = layout?.minWidth ?? config.layout?.minWidth ?? 20;
    const minHeight = layout?.minHeight ?? config.layout?.minHeight ?? 20;
    const maxWidth = layout?.maxWidth ?? config.layout?.maxWidth;
    const maxHeight = layout?.maxHeight ?? config.layout?.maxHeight;
    const { size, onScalerPointerDown } = useFrameResize(
        id,
        frameRef,
        resizeDirection,
        { width: minWidth as number, height: minHeight as number },
        { width: typeof maxWidth === 'number' ? maxWidth : undefined, height: typeof maxHeight === 'number' ? maxHeight : undefined },
    );
    const [ contentNode, setContentNode ] = useState<PixiContainer | null>(null);
    const contentBounds = useChildBounds(fitContent ? contentNode : null);
    // What the content's `ReflectResize` children have grown by - the `_CONTENT` container
    // reflects it on to the frame, so a frame whose layout states its size grows by as much.
    const { delta: reflected, registry: reflectRegistry } = useReflectResizeHost();
    const fitWidth = (fitContent === true) || (fitContent === 'width');
    const fitHeight = (fitContent === true) || (fitContent === 'height');
    const width = frameAxisSize(fitWidth, !!margins, contentBounds?.right, (margins?.[0] ?? 0) + (margins?.[2] ?? 0), layout?.width, reflected.width);
    const height = frameAxisSize(fitHeight, !!margins, contentBounds?.bottom, (margins?.[1] ?? 0) + (margins?.[3] ?? 0), layout?.height, reflected.height);
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
                { resolvedShadow && (
                    <ShadowLayer
                        {...resolvedShadow}
                        layer={resolvedLayer}
                        plain={resolvedPlain}
                    />
                ) }
                { resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                ) }
                {/* The skin's `colorize="false"` pieces, over the tinted art and under the shine. */}
                { resolvedPlain && <BackgroundLayer layer={resolvedPlain} /> }
                { resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} /> }
                { backdrop }
                <VariantCascadeProvider map={ownCascade}>
                    <ReflectResizeContext.Provider value={reflectRegistry}>
                        <Header
                            caption={caption}
                            tintColor={resolvedTint}
                            onClose={onClose}
                            onMenu={onMenu}
                            helpPage={helpPage}
                            onHelp={onHelp}
                            onPointerDown={draggable ? onHeaderPointerDown : undefined}
                        />
                        <ContentArea
                            ref={setContentNode}
                            // Its children are cropped by the frame, not by this box: the margins are
                            // how far past its own edges they may reach on each side. See `ContentArea`.
                            clipOutset={margins}
                            layout={margins ? { ...contentLayout, ...marginsLayout(margins, fitWidth, fitHeight, contentBounds) } : contentLayout}
                        >
                            {children}
                        </ContentArea>
                        <Scaler
                            // `_FRAME_SCALER` is tagged `_COLORIZE` in every frame's window layout, so
                            // the corner takes the window's own colour as the header does.
                            tintColor={resolvedTint}
                            direction={resizeDirection}
                            onPointerDown={onScalerPointerDown}
                        />
                    </ReflectResizeContext.Provider>
                </VariantCascadeProvider>
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
