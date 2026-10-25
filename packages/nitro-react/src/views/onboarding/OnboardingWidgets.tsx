/**
 * The new user flow's own widget kit - Flash's `onBoardingHcUi` package, which draws with bitmaps
 * embedded in the client rather than the window manager's skins. The bitmaps are in the
 * `onboarding` bundle, named after the Flash classes that embed them.
 *
 * - `OnboardingText`: `LoaderUI.createTextField` - Ubuntu at a size and colour, optionally bold,
 *   italic or wrapped to a width.
 * - `OnboardingNineSlice`: `LoaderUI.createScale9GridShapeFromImage` / `NineSplitSprite.render`.
 * - `OnboardingButton`: `onBoardingHcUi.Button` and its skins - `RoundButton` (a part), `ColorButton`
 *   (a colour), `ColouredButton` (the green one) and `randomizeButton` (the dice). `refresh` picks
 *   the skin: inactive, pressed (held down over it, or selected), editing, or the rollover while
 *   hovered; the action runs on release over the button.
 * - `OnboardingRadioButton`: `onBoardingHcUi.RadioButton` in style 2 (the gender choice).
 * - `OnboardingBalloon`: `LoaderUI.createBalloon` - `NineSplitSprite.DARK_BALLOON` tinted by a colour.
 * - `OnboardingWaitIndicator`: `onBoardingHcUi.WaitIndicator` in style 2 - eight dots fading round.
 */
import { BLEND_MODES, Container as PixiContainer, Texture } from 'pixi.js';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { Box, BoxLayout, getTextureSilhouette, ThemeImage, ThemeText, toCssHexColor, useLayoutSize, useTextureFromUrl } from '#base/theme';

import { onboardingAsset } from './onboardingAsset';

/** `LoaderUI.HITCH_TEXT_BODY_COLOUR`. */
export const HITCH_TEXT_BODY_COLOUR = '#7ecaee';

interface OnboardingTextProps {
    text: string;
    size: number;
    color: string;
    bold?: boolean;
    italic?: boolean;
    /** A wrapped (`multiline`) field's width; a single line takes its text's width. */
    width?: number;
    /** `thickness` (the headers' 50). */
    thickness?: number;
    alpha?: number;
    layout?: BoxLayout;
}

/** `LoaderUI.createTextField`: the field's 2px gutter is part of its box, as in Flash. */
export const OnboardingText = ({ text, size, color, bold = false, italic = false, width, thickness, alpha, layout }: OnboardingTextProps) => (
    <ThemeText
        text={text}
        textStyle="u_regular"
        textOptions={{ fontSize: size, fill: color, ...(width ? { wordWrap: true, wordWrapWidth: width - 4 } : {}) }}
        flashFormat={{ bold, italic, kerning: false, ...(thickness !== undefined ? { thickness } : {}) }}
        verticalAlign="top"
        alpha={alpha}
        layout={{ ...(width ? { width } : {}), ...layout }}
    />
);

interface OnboardingImageProps {
    name: string;
    x?: number;
    y?: number;
    alpha?: number;
    blendMode?: BLEND_MODES;
    visible?: boolean;
}

/** A bundled bitmap at its own size. */
export const OnboardingImage = ({ name, x = 0, y = 0, alpha, blendMode, visible = true }: OnboardingImageProps) => (visible
    ? (
            <ThemeImage
                src={onboardingAsset(name)}
                alpha={alpha}
                blendMode={blendMode}
                layout={{ position: 'absolute', left: x, top: y }}
            />
        )
    : null);

interface OnboardingNineSliceProps {
    name: string;
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    tint?: number;
    layout?: BoxLayout;
}

/** A bundled bitmap stretched over a box by its 3x3 grid. */
export const OnboardingNineSlice = ({ name, left, top, right, bottom, width, height, tint = 0xffffff, layout }: OnboardingNineSliceProps) => {
    const texture = useTextureFromUrl(onboardingAsset(name));

    if (!texture) return null;

    return (
        <pixiNineSliceSprite
            texture={texture}
            leftWidth={left}
            topHeight={top}
            rightWidth={right}
            bottomHeight={bottom}
            tint={tint}
            alpha={1}
            visible
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0, width, height, ...layout }}
        />
    );
};

/** The skins one `Button` subclass draws itself with. `undefined` draws nothing in that state. */
export interface OnboardingButtonSkins {
    /** `defaultBackground`. */
    normal: ReactNode;
    /** `pressedBackground`: held down over it, or selected. */
    pressed: ReactNode;
    /** `inactiveBackground`. */
    inactive?: ReactNode;
    /** `currentlyActive`: the part being edited. */
    editing?: ReactNode;
    /** `rolloverBackground`: hovered while normal. */
    rollover?: ReactNode;
}

interface OnboardingButtonProps {
    skins: OnboardingButtonSkins;
    width: number;
    height: number;
    onPress: () => void;
    active?: boolean;
    selected?: boolean;
    editing?: boolean;
    visible?: boolean;
    layout?: BoxLayout;
    children?: ReactNode;
}

/** `Button.refresh`: 1 normal, 2 pressed, 3 inactive, 4 editing. */
export const OnboardingButton = ({ skins, width, height, onPress, active = true, selected = false, editing = false, visible = true, layout, children }: OnboardingButtonProps) => {
    const [ hover, setHover ] = useState(false);
    const [ pressed, setPressed ] = useState(false);
    // Read by the release, which can come in the same frame as the press - before a re-render.
    const pressedRef = useRef(false);
    const press = (value: boolean) => {
        pressedRef.current = value;
        setPressed(value);
    };

    if (!visible) return null;

    let state = active ? ((((pressed && hover) || selected)) ? 2 : 1) : 3;

    if (editing) state = 4;

    const skin = (state === 2)
        ? skins.pressed
        : (state === 3)
                ? (skins.inactive ?? skins.normal)
                : (state === 4)
                        ? (skins.editing ?? skins.normal)
                        : ((hover && skins.rollover) ? skins.rollover : skins.normal);

    return (
        <Box
            cursor={active ? 'pointer' : 'default'}
            layout={{ position: 'absolute', width, height, ...layout }}
            onPointerOver={() => active && setHover(true)}
            onPointerOut={() => setHover(false)}
            onPointerDown={() => active && press(true)}
            onPointerUp={() => {
                if (!pressedRef.current) return;

                press(false);
                onPress();
            }}
            onPointerUpOutside={() => press(false)}
        >
            {skin}
            {children}
        </Box>
    );
};

/** `RoundButton`'s skins: the 50x53 round grid button. */
const ROUND_BUTTON_SKINS: OnboardingButtonSkins = {
    normal: <OnboardingImage name="button_grid" />,
    pressed: <OnboardingImage name="button_grid_selected_inactive" />,
    inactive: <OnboardingImage name="button_grid" />,
    editing: <OnboardingImage name="button_grid_selected_active" />,
    rollover: <OnboardingImage name="button_grid_over" />,
};

/** `RoundButton` (50x53): a part of the grid, its thumbnail inside. */
export const OnboardingRoundButton = (props: Omit<OnboardingButtonProps, 'skins' | 'width' | 'height'>) => (
    <OnboardingButton
        {...props}
        skins={ROUND_BUTTON_SKINS}
        width={50}
        height={53}
    />
);

/** `randomizeButton`: the dice, one bitmap for every state. */
const RANDOMIZE_BUTTON_SKINS: OnboardingButtonSkins = {
    normal: <OnboardingImage name="rnd_button" />,
    pressed: <OnboardingImage name="rnd_button" />,
    rollover: <OnboardingImage name="rnd_button" />,
};

/** `randomizeButton` (50x52). */
export const OnboardingRandomizeButton = (props: Omit<OnboardingButtonProps, 'skins' | 'width' | 'height'>) => (
    <OnboardingButton
        {...props}
        skins={RANDOMIZE_BUTTON_SKINS}
        width={50}
        height={52}
    />
);

/** `ColouredButton("gfreen")`'s scale-9 grid, `Rectangle(8, 10, 6, 4)` on 24x24 skins. */
const GREEN = (name: string, width: number) => (
    <OnboardingNineSlice
        name={name}
        left={8}
        top={10}
        right={10}
        bottom={10}
        width={width}
        height={GREEN_BUTTON_HEIGHT}
    />
);

/** The green button's height (`Rectangle(.., .., 0, 40)`). */
export const GREEN_BUTTON_HEIGHT = 40;

/** `ColouredButton.padding`: the button is its caption's width and this much. */
const GREEN_BUTTON_PADDING = 64;

interface OnboardingGreenButtonProps {
    caption: string;
    onPress: () => void;
    visible?: boolean;
    layout?: BoxLayout;
}

/**
 * `ColouredButton("gfreen", caption, rect, true, ...)`: as wide as its caption plus 64, the caption
 * in Ubuntu 18 bold white, centred 2px up and left the way `Button.onAddedToStage` places it.
 */
export const OnboardingGreenButton = ({ caption, onPress, visible = true, layout }: OnboardingGreenButtonProps) => {
    const [ captionNode, setCaptionNode ] = useState<PixiContainer | null>(null);
    // The caption's field is its text and the 2px gutter either side; the button is the text and 64.
    const width = Math.max(0, Math.round(useLayoutSize(captionNode).width) - 4) + GREEN_BUTTON_PADDING;

    return (
        <OnboardingButton
            skins={{
                normal: GREEN('button_skin_green', width),
                pressed: GREEN('button_skin_green_pressed', width),
                inactive: GREEN('button_skin_green_inactive', width),
                rollover: GREEN('button_skin_green_rollover', width),
            }}
            width={width}
            height={GREEN_BUTTON_HEIGHT}
            onPress={onPress}
            visible={visible}
            layout={layout}
        >
            <Box
                layout={{ position: 'absolute', left: 0, top: 0, width, height: GREEN_BUTTON_HEIGHT, alignItems: 'center', justifyContent: 'center' }}
                pointerTransparent
            >
                <Box
                    ref={setCaptionNode}
                    layout={{ marginLeft: -4, marginTop: -4 }}
                    pointerTransparent
                >
                    <OnboardingText
                        text={caption}
                        size={18}
                        color="#ffffff"
                        bold
                    />
                </Box>
            </Box>
        </OnboardingButton>
    );
};

interface OnboardingColorButtonProps {
    rgb: number;
    selected: boolean;
    onPress: () => void;
    layout?: BoxLayout;
}

/** `ColorButton` (44x46): the round chip filled with the colour, its frame drawn over it. */
export const OnboardingColorButton = ({ rgb, selected, onPress, layout }: OnboardingColorButtonProps) => {
    const inside = useTextureFromUrl(onboardingAsset('color_round_chip_in'));
    const chip: Texture | undefined = inside && getTextureSilhouette(inside, toCssHexColor(rgb));
    const skin = (frame: string) => (
        <>
            {chip && (
                <pixiSprite
                    texture={chip}
                    eventMode="none"
                    layout={{ position: 'absolute', left: 0, top: 0, width: chip.width, height: chip.height }}
                />
            )}
            <OnboardingImage name={frame} />
        </>
    );

    return (
        <OnboardingButton
            skins={{
                normal: skin('color_chip_round_default'),
                pressed: skin('color_chip_round_selected'),
                rollover: skin('color_chip_round_press'),
            }}
            width={44}
            height={46}
            selected={selected}
            onPress={onPress}
            layout={layout}
        />
    );
};

interface OnboardingRadioButtonProps {
    caption: string;
    on: string;
    off: string;
    selected: boolean;
    /** No button of the group is selected yet: every caption is still the selected colour. */
    groupUnset?: boolean;
    onSelect: () => void;
}

/** `RadioButton` style 2 captions: `0xE7F6BA` at 0.7, the others `0x7D9A97` at 0.6 once one is chosen. */
const RADIO_ON_COLOR = '#e7f6ba';
const RADIO_OFF_COLOR = '#7d9a97';

/** `RadioButton(caption, group, 2, skinOn, skinOff, 0x7D9A97)`: the mark at 0.8, the caption 6 to its right. */
export const OnboardingRadioButton = ({ caption, on, off, selected, groupUnset = false, onSelect }: OnboardingRadioButtonProps) => {
    const lit = selected || groupUnset;

    return (
        <Box
            cursor="pointer"
            layout={{ flexDirection: 'row', alignItems: 'center', flexShrink: 0 }}
            onPointerUp={onSelect}
        >
            <ThemeImage
                src={onboardingAsset(selected ? on : off)}
                alpha={0.8}
                layout={{ marginRight: 6 }}
            />
            <OnboardingText
                text={caption}
                size={20}
                color={lit ? RADIO_ON_COLOR : RADIO_OFF_COLOR}
                bold
                italic
                alpha={lit ? 0.7 : 0.6}
            />
        </Box>
    );
};

interface OnboardingBalloonProps {
    width: number;
    height: number;
    color: number;
    /** `"none"` or `"down"`: where the point is. */
    point?: 'none' | 'down';
    /** The point's distance from the left. */
    pointX?: number;
    layout?: BoxLayout;
}

/** `LoaderUI.createBalloon`: `DARK_BALLOON` (`[5, 4, 5]` x `[11, 1, 5]`) multiplied by the colour. */
export const OnboardingBalloon = ({ width, height, color, point = 'none', pointX = 0, layout }: OnboardingBalloonProps) => (
    <Box layout={{ position: 'absolute', width, height: height + ((point === 'down') ? 10 : 0), ...layout }}>
        <OnboardingNineSlice
            name="block_dark_base"
            left={5}
            top={11}
            right={5}
            bottom={5}
            width={width}
            height={height}
            tint={color}
        />
        {(point === 'down') && (
            <ThemeImage
                src={onboardingAsset('block_dark_point_down')}
                tint={toCssHexColor(color)}
                layout={{ position: 'absolute', left: pointX, top: height }}
            />
        )}
    </Box>
);

/** `WaitIndicator`: eight 4x4 dots on a circle (8 across in style 2), each fading as the circle turns. */
const WAIT_DOTS = 8;
const WAIT_RADIUS = 8;

export const OnboardingWaitIndicator = ({ layout }: { layout?: BoxLayout }) => {
    const [ time, setTime ] = useState(0);

    useEffect(() => {
        let frame = 0;
        const tick = (now: number) => {
            setTime(now);
            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <Box layout={{ position: 'absolute', width: 0, height: 0, ...layout }}>
            {Array.from({ length: WAIT_DOTS }, (_, index) => {
                const angle = (index * Math.PI * 2) / WAIT_DOTS;
                const shade = (index / WAIT_DOTS) - (time * 0.001);

                return (
                    <pixiGraphics
                        key={index}
                        eventMode="none"
                        alpha={shade - Math.floor(shade)}
                        draw={(graphics) => {
                            graphics.clear();
                            graphics.rect(1, 0, 2, 4).rect(0, 1, 4, 2).fill(0xffffff);
                        }}
                        layout={{ position: 'absolute', left: Math.trunc(WAIT_RADIUS * Math.sin(angle)) - 3, top: Math.trunc(WAIT_RADIUS * Math.cos(angle)) - 3, width: 4, height: 4 }}
                    />
                );
            })}
        </Box>
    );
};
