import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { CloseButton } from './CloseButton';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, ColorLayer, NineSlice, Stretch, Tiled } from './layer';
import { ThemeText } from './ThemeText';
import { expandSides, ThemeProps, ThemeVariant, ThemeVariants } from './utils';

export type HeaderVariant = ThemeVariant & {
    needsBgChip?: boolean;
    /** The skin's `header_button_menu`: its close button style and where the skin puts it, from the header's top left. */
    menuButton?: { variant: string; left: number; top: number };
    /** Where the window layout pins the title (`header_title_text`), from the header's top left, instead of centring it. */
    captionAt?: { left: number; top: number };
    /**
     * How far below the header's top the caption sits: `header_title_text`'s own `y` plus its
     * `margins.top`. The client does not centre the title vertically - `relative_vertical_scale_fixed`
     * holds the label at its layout's `y`, and `TextController` draws the text at `margins.top`
     * inside it. A rendered text is a `TextField`'s whole bitmap, gutter included, so its top edge
     * is the field's top and these are the layout's numbers as written: 1 for
     * `habbo_window_layout_header` (`y="0"` + 1), 3 for `_3` and `_7` (`y="2"` + 1).
     *
     * Left out, the caption centres in the header, which is what the variants whose layout has no
     * title `y` to read keep doing.
     */
    captionTop?: number;
    /**
     * How far below the header's top the `_CONTROLS` item list sits - its `y`, which is 0 in
     * `habbo_window_layout_header` and 2 in `_3` and `_7`. A layout with no item list at all
     * (the leaderboard and illumina dark headers) leaves it out, and the buttons centre in the
     * header instead.
     */
    controlsTop?: number;
    /** Where the window layout pins `header_button_close`, from the header's top right, instead of centring it on the right edge. */
    closeAt?: { right: number; top: number };
    /**
     * The close button style of the layout's `header_button_help`, for the window layouts that
     * have one (`habbo_window_layout_header_3` and `_7`: style 4, left of the close button in
     * the `_CONTROLS` item list, whose `spacing` is 5).
     */
    helpButton?: string;
};

/** `spacing` of the header layouts' `_CONTROLS` item list. */
const CONTROLS_SPACING = 5;

const HEADER_0_VARIANT: HeaderVariant = {
    layer: Tiled('header-0-default-src'),
    overlay: Tiled('header-0-default-shine-src'),
    layout: {
        minHeight: 15,
        margin: 6,
        padding: 0,
    },
    textStyle: 'frame_title',
    needsBgChip: true,
    // `habbo_window_layout_header` (and `_black`, which style 1 uses): the title label at `y="0"`
    // with `margins.top` of 1, and the `_CONTROLS` item list at `y="0"`.
    captionTop: 1,
    controlsTop: 0,
    menuButton: { variant: '5', left: 1, top: 0 },
};

/** `habbo_window_layout_header_leaderboard`, which every leaderboard style (10000-10007) shares. */
const HEADER_LEADERBOARD: HeaderVariant = {
    layout: {
        minHeight: 40,
        paddingLeft: 8,
        paddingRight: 8,
    },
    textStyle: 'u_frame_title',
    textColor: '#ffffff',
    // `habbo_window_layout_header_leaderboard` puts its label at `y="6"` with `margins.top` 1, and
    // has no `_CONTROLS` item list at all - so the buttons keep their centring.
    captionTop: 7,
};

/**
 * `Header` variants - the `type="header"` rows of `habbo_element_description_xml`, keyed by their
 * `style`. 100, 101 and 103 have no row: the illumina frames draw their title bar from the
 * frame's own window layout (`illumina_light_frame`, `_modal`, `illumina_purple_frame`), and the
 * frame of that style cascades to the header of the same number to carry it.
 */
const HEADER_VARIANTS: ThemeVariants<HeaderVariant> = {
    0: {
        ...HEADER_0_VARIANT,
        tintColor: '#418db0',
        textStyle: 'frame_title',
        textColor: '#ffffff',
    },
    1: {
        ...HEADER_0_VARIANT,
        tintColor: '#4c4c4c',
        textStyle: 'frame_title',
        textColor: '#ffffff',
    },
    2: {
        ...HEADER_0_VARIANT,
        tintColor: '#fac200',
        textStyle: 'frame_title',
        textColor: '#ffffff',
    },
    /*
     * `habbo_window_layout_frame_3` puts `titlebar` at (6, 6) 50 wide in a 64 wide template - 6 in
     * from the left, 8 from the right - and 27 tall, so it ends at 33 where the frame's tinted top
     * slice does. Its own layout (`habbo_window_layout_header_3`) then fixes `header_title_text`
     * at `y="2"`, 15 tall, centred across the bar.
     */
    3: {
        layout: {
            position: 'relative',
            marginTop: 6,
            marginLeft: 6,
            marginRight: 8,
            height: 27,
        },
        textStyle: 'u_frame_title',
        textColor: '#ffffff',
        captionTop: 3,
        controlsTop: 2,
        helpButton: '4',
    },
    4: {
        layer: Stretch('header-3-default-src'),
        layout: {
            minHeight: 20,
            paddingLeft: 8,
            paddingTop: 1,
            paddingRight: 8,
            paddingBottom: 1,
        },
        textStyle: 'u_frame_title',
        textColor: '#ffffff',
    },
    // `habbo_window_layout_frame_7` places its `titlebar` exactly as `_3` does, and its own layout
    // fixes the title at the same `y="2"`, 15 tall.
    7: {
        layout: {
            position: 'relative',
            marginTop: 6,
            marginLeft: 6,
            marginRight: 8,
            height: 27,
        },
        textStyle: 'u_frame_title',
        textColor: '#000000',
        captionTop: 3,
        controlsTop: 2,
        helpButton: '4',
    },
    /*
     * illumina light (`illumina_light_frame`, and `illumina_light_frame_wired` for frame 102): a
     * 30px title bar whose layout pins `header_title_text` at (8, 11) with `auto_size="left"`,
     * `header_button_close` at (22, 9) of the 50px layout - 8px from the right - and, in the
     * wired layout, `header_button_menu` (close button 101) at (8, 9).
     */
    100: {
        layout: {
            minHeight: 30,
            padding: 0,
        },
        textStyle: 'il_frame_title',
        textColor: '#000000',
        captionAt: { left: 8, top: 11 },
        menuButton: { variant: '101', left: 8, top: 9 },
        closeAt: { right: 8, top: 9 },
    },
    // illumina purple - `illumina_purple_frame` pins the same geometry as the light frame, with a white title
    103: {
        layout: {
            minHeight: 30,
            padding: 0,
        },
        textStyle: 'il_frame_title_white',
        captionAt: { left: 8, top: 11 },
        closeAt: { right: 8, top: 9 },
    },
    /*
     * illumina modal (`illumina_light_frame_modal`, a frame with no skin of its own): a 40px band
     * above the panel carries the title in `il_frame_modal_title`, then a 30px title bar with the
     * close button at (22, 49) of the 50px layout, i.e. 8px from the right.
     */
    101: {
        layout: {
            height: 70,
            padding: 0,
        },
        textStyle: 'il_frame_modal_title',
        captionAt: { left: 8, top: 0 },
        closeAt: { right: 8, top: 49 },
    },
    // leaderboard frames - the title sits in the frame art's own 87px top band
    10000: HEADER_LEADERBOARD,
    10001: HEADER_LEADERBOARD,
    10002: HEADER_LEADERBOARD,
    10003: HEADER_LEADERBOARD,
    10004: HEADER_LEADERBOARD,
    10005: HEADER_LEADERBOARD,
    10006: HEADER_LEADERBOARD,
    10007: HEADER_LEADERBOARD,
    // illumina dark - `illumina_dark_skin_header`, every entity `colorize="false"`
    200: {
        layer: NineSlice('border-200-default-src', 3, 3, 3, 3),
        colorize: false,
        layout: {
            minHeight: 30,
            padding: 0,
        },
        textStyle: 'id_frame_title',
        textColor: '#ffffff',
        // `illumina_dark_header`: the label at `y="2"` with `margins.top` of 2, and no
        // `_CONTROLS` item list - so the close button keeps its centring.
        captionTop: 4,
    },
};

export interface HeaderProps extends ThemeProps<HeaderVariant> {
    caption?: string;
    onClose?: () => void;
    /** Shows the skin's menu button, for the variants whose skin has one (`menuButton`). */
    onMenu?: () => void;
    /**
     * `FrameController.helpPage`: a page other than '' shows the layout's `header_button_help`
     * (for the variants that have one, `helpButton`), and a click on it hands the page to
     * `onHelp` - `helpButtonProcedure`, whose callback the window manager sets to `openHelpPage`.
     */
    helpPage?: string;
    onHelp?: (page: string) => void;
}

export const Header: ForwardRefExoticComponent<HeaderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, HeaderProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, caption, onClose, onMenu, helpPage, onHelp,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'header', variants: HEADER_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        const title = caption && (
            <ThemeText
                text={caption}
                textStyle={resolvedTextStyle}
                textOptions={{ fill: resolvedTextColor }}
            />
        );
        /*
         * A variant whose window layout pins the title / close button places them there; the rest
         * centre the title and put the close button on the right edge.
         *
         * `WindowController.updateScaleRelativeToParent`: a `relative_horizontal_scale_center`
         * child sits at `floor(parentWidth / 2) - floor(ownWidth / 2)` of its parent - so
         * `header_title_text` is centred across the whole header, and the close, help and menu
         * buttons are siblings at their own rectangles, never something the title is laid out
         * around. The title is out of flow here for that reason: in flow it shares the row with
         * whatever else the header carries, and a control that joined it would push the caption
         * off the header's centre.
         */
        const titleNode = config.captionAt
            ? title && <Box layout={{ position: 'absolute', left: config.captionAt.left, top: config.captionAt.top }}>{title}</Box>
            : (
                    <Box layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' }}>
                        {title && (
                            <Box layout={{
                                position: 'relative',
                                height: '100%',
                                // `@pixi/layout` defaults `flexDirection` to `row`, so the caption's
                                // vertical placement is `alignItems` - `justifyContent` is across
                                // the box, and setting the offset on that one left the caption
                                // centred inside a box the padding had merely shortened.
                                justifyContent: 'center',
                                // At the variant's own offset down the header where its layout has
                                // been read, and centred in the header where it has not - see
                                // `captionTop`. Either way the box spans the header, so a
                                // `background="true"` label's chip is the full title bar.
                                ...(config.captionTop !== undefined
                                    ? { alignItems: 'flex-start', paddingTop: config.captionTop }
                                    : { alignItems: 'center' }),
                                // `header_title_text`'s own `margins`, which both
                                // `habbo_window_layout_header` and `_3` give as 8 either side.
                                paddingLeft: 8,
                                paddingRight: 8,
                            }}
                            >
                                { config.needsBgChip && <ColorLayer color={resolvedTint} /> }
                                {title}
                            </Box>
                        )}
                    </Box>
                );
        // `helpPage`'s setter: the help button is visible while there is a page. The item list it
        // shares with the close button keeps its right edge (`on_resize_align_right`), so the help
        // button sits `spacing` left of the close button.
        const helpNode = (config.helpButton && helpPage) && (
            <CloseButton
                variant={config.helpButton}
                onPointerTap={() => onHelp?.(helpPage)}
                layout={{ marginRight: CONTROLS_SPACING }}
            />
        );
        const closeNode = config.closeAt
            ? (
                    <Box layout={{ position: 'absolute', right: config.closeAt.right, top: config.closeAt.top, flexDirection: 'row' }}>
                        {helpNode}
                        <CloseButton onPointerTap={onClose} />
                    </Box>
                )
            : (
                    <Box layout={{
                        position: 'absolute',
                        right: 0,
                        // The `_CONTROLS` item list's own `y` - see `controlsTop`. A header layout
                        // with no item list leaves it out, and the buttons centre in the header.
                        ...(config.controlsTop !== undefined && { top: config.controlsTop }),
                        paddingLeft: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    >
                        { config.needsBgChip && <ColorLayer color={resolvedTint} /> }
                        {helpNode}
                        <CloseButton onPointerTap={onClose} />
                    </Box>
                );

        return (
            <Box
                ref={ref}
                visible={visible}
                {...handlers}
                layout={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...expandSides(config.layout),
                    ...expandSides(layout),
                }}
                {...handlers}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>
                    {titleNode}
                    {onMenu && config.menuButton && (
                        <Box layout={{ position: 'absolute', left: config.menuButton.left, top: config.menuButton.top }}>
                            <CloseButton
                                variant={config.menuButton.variant}
                                onPointerTap={onMenu}
                            />
                        </Box>
                    )}
                    {closeNode}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Header.displayName = 'Header';
