import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { CloseButton } from './CloseButton';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, ColorLayer } from './layer';
import { ThemeText } from './ThemeText';
import { expandSides, ThemeProps, ThemeVariant } from './utils';

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

export interface HeaderProps extends ThemeProps<HeaderVariant> {
    caption?: string;
    onClose?: () => void;
    /** `header_button_close` exists: a dialog that disposes it (`SimpleAlertDialog`) passes false. */
    closeButtonVisible?: boolean;
    /** The close button's style where the window code changes it from the skin's. */
    closeVariant?: string;
    /** Shows the skin's menu button, for the variants whose skin has one (`menuButton`). */
    onMenu?: () => void;
    /**
     * `FrameController.helpPage`: a page other than '' shows the layout's `header_button_help`
     * (for the variants that have one, `helpButton`), and a click on it hands the page to
     * `onHelp` - `helpButtonProcedure`, whose callback the window manager sets to `openHelpPage`.
     */
    helpPage?: string;
    onHelp?: (page: string) => void;
    /**
     * Whether the help button shows, over `helpPage`: a header of its own, a captioned container's
     * (`camera_interface_xml`), has no `FrameController` to hide its layout's `header_button_help`,
     * so it shows unless its window's code hides it.
     */
    helpButtonVisible?: boolean;
}

export const Header: ForwardRefExoticComponent<HeaderProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, HeaderProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, caption, onClose, closeButtonVisible = true, closeVariant, onMenu, helpPage, onHelp, helpButtonVisible,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<HeaderVariant>({
            cascadeKey: 'header', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor,
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
        // `header_title_text`'s vertical place - see `captionTop` - and its own `margins`, which
        // both `habbo_window_layout_header` and `_3` give as 8 either side. `@pixi/layout` defaults
        // `flexDirection` to `row`, so the vertical placement is `alignItems`.
        const captionPlacement: BoxLayout = {
            ...(config.captionTop !== undefined
                ? { alignItems: 'flex-start', paddingTop: config.captionTop }
                : { alignItems: 'center' }),
            paddingLeft: 8,
            paddingRight: 8,
        };
        const titleNode = config.captionAt
            ? title && <Box layout={{ position: 'absolute', left: config.captionAt.left, top: config.captionAt.top }}>{title}</Box>
            : title && (config.needsBgChip
                ? (
                        // A `background="true"` label's chip is the caption's own box - the text and
                        // its margins - so the caption keeps a box of its own, centred in the header.
                        <Box layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' }}>
                            <Box layout={{ position: 'relative', height: '100%', justifyContent: 'center', ...captionPlacement }}>
                                <ColorLayer color={resolvedTint} />
                                {title}
                            </Box>
                        </Box>
                    )
                : (
                        // Centred across the header inside equal margins: the same place as a
                        // caption box centred in the header, with no box of its own.
                        <Box layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', ...captionPlacement }}>
                            {title}
                        </Box>
                    ));
        // `helpPage`'s setter: the help button is visible while there is a page. The item list it
        // shares with the close button keeps its right edge (`on_resize_align_right`), so the help
        // button sits `spacing` left of the close button.
        const helpNode = (config.helpButton && (helpButtonVisible ?? !!helpPage)) && (
            <CloseButton
                variant={config.helpButton}
                onPointerTap={() => onHelp?.(helpPage ?? '')}
                layout={{ marginRight: CONTROLS_SPACING }}
            />
        );
        // The `_CONTROLS` item list: at the variant's pinned place, or on the right edge at the
        // list's own `y` (see `controlsTop`) - a header layout with no item list leaves that out,
        // and the buttons centre in the header. A variant with a close button and nothing else to
        // list places the close button there itself - by the variant, not by whether a help page
        // is set now, so the button is not swapped for another node while the header is mounted.
        const controlsAt: BoxLayout = config.closeAt
            ? { position: 'absolute', right: config.closeAt.right, top: config.closeAt.top }
            : { position: 'absolute', right: 0, ...(config.controlsTop !== undefined && { top: config.controlsTop }) };
        const listed = !!config.helpButton || (!config.closeAt && !!config.needsBgChip);
        const closeNode = listed
            ? (
                    <Box layout={{ ...controlsAt, flexDirection: 'row', ...(!config.closeAt && { paddingLeft: 2, alignItems: 'center' }) }}>
                        { !config.closeAt && config.needsBgChip && <ColorLayer color={resolvedTint} /> }
                        {helpNode}
                        {closeButtonVisible && (
                            <CloseButton
                                variant={closeVariant}
                                onPointerTap={onClose}
                            />
                        )}
                    </Box>
                )
            : closeButtonVisible && (
                <CloseButton
                    variant={closeVariant}
                    onPointerTap={onClose}
                    layout={controlsAt}
                />
            );

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...expandSides(config.layout),
                    ...expandSides(layout),
                }}
                {...handlers}
            >
                <BackgroundLayer
                    layer={resolvedLayer}
                    tintColor={resolvedTint}
                />
                <BackgroundLayer layer={resolvedOverlay} />
                <VariantCascadeProvider map={ownCascade}>
                    {titleNode}
                    {onMenu && config.menuButton && (
                        <CloseButton
                            variant={config.menuButton.variant}
                            onPointerTap={onMenu}
                            layout={{ position: 'absolute', left: config.menuButton.left, top: config.menuButton.top }}
                        />
                    )}
                    {closeNode}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Header.displayName = 'Header';
