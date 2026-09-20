import { ReactNode } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { ContentArea } from './ContentArea';
import { Header } from './Header';
import { useFrameDrag, useFrameResize, useThemeVariant } from './hooks';
import { BackgroundLayer, Composite, CompositePiece, NineSlice, ShadowLayer } from './layer';
import { Scaler, ScalerDirection } from './Scaler';
import { compose, DropShadowConfig, ThemeProps, ThemeVariant, ThemeVariants } from './utils';

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

const FRAME_0_VARIANT: FrameVariant = {
    layer: NineSlice('frame-0-default-src', 13, 13, 13, 13),
    overlay: BLUE_FRAME_SHINE,
    dropShadow: { distance: 4, angle: 45, color: '#000000', alpha: 0.35, blur: 4 },
    layout: {
        minWidth: 40,
        minHeight: 40,
        paddingTop: 2,
        paddingBottom: 2,
    },
};

const FRAME_UBUNTU_VARIANT: FrameVariant = {
    layer: NineSlice('frame-3-default-src', 10, 33, 10, 10),
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
    7: {
        ...FRAME_UBUNTU_VARIANT,
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
    /** Opens the frame centered in the viewport (`window.center()`) rather than at `defaultPosition` - see `FrameDragOptions.centered`. */
    centered?: boolean;
    /** Told where the frame is after it was centered or dragged, for a caller that keeps the position itself. */
    onPositionChange?: (position: { x: number; y: number }) => void;
    onClose?: () => void;
    /** Shows the skin's menu button in the header (`IFrameWindow.menuButtonVisible`) and is called when it is pressed. */
    onMenu?: () => void;
    /**
     * Drawn over the frame art and under the header and content: what a Flash frame skin carries
     * besides its nine-slice, such as the banner of `illumina_light_frame_wired`. Its children
     * position themselves absolutely against the whole frame.
     */
    backdrop?: ReactNode;
    children?: ReactNode;
}

export const Frame = ({
    variant, defaultVariant, tooltip, layout, tintColor, textStyle, textColor, dropShadow, id, caption, resizeDirection = 'all', contentLayout,
    defaultPosition, rememberPosition = true, centered, onPositionChange, onClose, onMenu, backdrop, children,
    onPointerOver, onPointerOut, onPointerDown: onPointerDownProp, onPointerUp, onPointerUpOutside, onPointerTap,
}: FrameProps) => {
    const { frameRef, attachFrame, offset, zIndex, revealed, onPointerDown, onHeaderPointerDown } = useFrameDrag(id, { defaultPosition, remember: rememberPosition, centered, onPositionChange });
    const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedShadow, resolvedTint } = useThemeVariant({
        cascadeKey: 'frame', variants: FRAME_VARIANTS, variant, defaultVariant, tooltip, tintColor, textStyle, textColor, dropShadow, onPointerOver, onPointerOut, onPointerDown: compose(onPointerDown, onPointerDownProp), onPointerUp, onPointerUpOutside, onPointerTap,
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

    return (
        <Box
            ref={attachFrame}
            x={offset.dx}
            y={offset.dy}
            zIndex={zIndex}
            renderable={revealed}
            {...handlers}
            layout={{
                flexDirection: 'column',
                minWidth,
                minHeight,
                width: minWidth,
                height: minHeight,
                ...config.layout,
                ...layout,
                ...(size && { width: size.width, height: size.height }),
            }}
        >
            { resolvedShadow && (
                <ShadowLayer
                    {...resolvedShadow}
                    layer={resolvedLayer}
                />
            ) }
            { resolvedLayer && (
                <BackgroundLayer
                    layer={resolvedLayer}
                    tintColor={resolvedTint}
                />
            ) }
            { resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} /> }
            { backdrop }
            <VariantCascadeProvider map={ownCascade}>
                <Header
                    caption={caption}
                    tintColor={resolvedTint}
                    onClose={onClose}
                    onMenu={onMenu}
                    onPointerDown={onHeaderPointerDown}
                />
                <ContentArea layout={contentLayout}>
                    {children}
                </ContentArea>
                <Scaler
                    direction={resizeDirection}
                    onPointerDown={onScalerPointerDown}
                />
            </VariantCascadeProvider>
        </Box>
    );
};

Frame.displayName = 'Frame';
