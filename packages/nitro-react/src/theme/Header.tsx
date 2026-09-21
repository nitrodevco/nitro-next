import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { CloseButton } from './CloseButton';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, ColorLayer, NineSlice, Stretch, Tiled } from './layer';
import { ThemeText } from './ThemeText';
import { ThemeProps, ThemeVariant, ThemeVariants } from './utils';

export type HeaderVariant = ThemeVariant & {
    needsBgChip?: boolean;
    /** The skin's `header_button_menu`: its close button style and where the skin puts it, from the header's top left. */
    menuButton?: { variant: string; left: number; top: number };
    /** Where the window layout pins the title (`header_title_text`), from the header's top left, instead of centring it. */
    captionAt?: { left: number; top: number };
    /** Where the window layout pins `header_button_close`, from the header's top right, instead of centring it on the right edge. */
    closeAt?: { right: number; top: number };
};

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
    3: {
        layout: {
            position: 'relative',
            height: 33,
            marginLeft: 9,
            marginRight: 9,
        },
        textStyle: 'u_frame_title',
        textColor: '#ffffff',
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
    7: {
        layout: {
            minHeight: 33,
            paddingLeft: 8,
            paddingTop: 4,
            paddingRight: 8,
            paddingBottom: 4,
        },
        textStyle: 'u_frame_title',
        textColor: '#000000',
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
    },
};

export interface HeaderProps extends ThemeProps<HeaderVariant> {
    caption?: string;
    onClose?: () => void;
    /** Shows the skin's menu button, for the variants whose skin has one (`menuButton`). */
    onMenu?: () => void;
}

export const Header: ForwardRefExoticComponent<HeaderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, HeaderProps>(
    ({
        variant, defaultVariant, tooltip, layout, tintColor, textStyle, textColor, visible, caption, onClose, onMenu,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'header', variants: HEADER_VARIANTS, variant, defaultVariant, tooltip, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        const title = caption && (
            <ThemeText
                text={caption}
                textStyle={resolvedTextStyle}
                textOptions={{ fill: resolvedTextColor }}
            />
        );
        // A variant whose window layout pins the title / close button places them there; the rest centre the title and put the close button on the right edge.
        const titleNode = config.captionAt
            ? title && <Box layout={{ position: 'absolute', left: config.captionAt.left, top: config.captionAt.top }}>{title}</Box>
            : (
                    <Box layout={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        {title && (
                            <Box layout={{ position: 'relative', alignItems: 'center', paddingLeft: 6, paddingRight: 6, height: '100%' }}>
                                { config.needsBgChip && <ColorLayer color={resolvedTint} /> }
                                {title}
                            </Box>
                        )}
                    </Box>
                );
        const closeNode = config.closeAt
            ? <Box layout={{ position: 'absolute', right: config.closeAt.right, top: config.closeAt.top }}><CloseButton onPointerTap={onClose} /></Box>
            : (
                    <Box layout={{ position: 'absolute', right: 0, paddingLeft: 2, flexDirection: 'row', alignItems: 'center' }}>
                        { config.needsBgChip && <ColorLayer color={resolvedTint} /> }
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
                    ...config.layout,
                    ...layout,
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
