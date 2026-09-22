import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Button, CheckBox, ContainerButton, Frame, Icon, Region, TextInput, ThemeText } from '#base/theme';

/** `CustomStackHeightWidget.SLIDER_RANGE`: the slider spans 0 to 10 tiles. */
const SLIDER_RANGE = 10;
/** `slider` is 206 wide and its button `SLIDER_BUTTON_WIDTH` 20, so the button travels 186px. */
const SLIDER_WIDTH = 206;
const SLIDER_BUTTON_WIDTH = 20;
const SLIDER_TRAVEL = SLIDER_WIDTH - SLIDER_BUTTON_WIDTH;
/** `SLIDER_LIVE_UPDATE_INTERVAL_MS`: while the button is dragged the height goes out at most this often. */
const SLIDER_LIVE_UPDATE_INTERVAL_MS = 30;
/** The nudge the move buttons make here - see the docblock. */
const STEP = 0.1;
/** The frame's `height_max` (a walk tile, with `walktile_container`) and `height_min` (any other furni). */
const WALK_HEIGHT = 210;
const STACK_HEIGHT = 185;

export interface FurnitureStackHeightViewProps {
    height: number;
    multiWalkMode: boolean;
    /** A walk-magic tile: Flash's walk variant, with the multi walk toggle and the `widget.custom.walk.*` texts. */
    isWalkTile: boolean;
    onApply: (height: number, multiWalkMode: boolean) => void;
    /** Hands the tile back to normal stacking, the layout's "place on top". */
    onAboveStack: () => void;
    onClose: () => void;
}

/** `currentHeightValue`: the input's number, or 0 when it is not one. */
const parseHeight = (value: string) => {
    const height = parseFloat(value);

    return Number.isNaN(height) ? 0 : height;
};

const clampSliderX = (x: number) => Math.max(0, Math.min(SLIDER_TRAVEL, x));

/** `updateHeightSelection`: the button's place along the slider, in hundredths of a tile. */
const heightAtSliderX = (x: number) => Math.trunc((clampSliderX(x) / SLIDER_TRAVEL) * SLIDER_RANGE * 100) / 100;

/** `updateSlider`: where the button sits for a height, capped at the slider's end. */
const sliderXForHeight = (height: number) => Math.trunc(SLIDER_TRAVEL * Math.min(height / SLIDER_RANGE, 1));

/**
 * The stacking helper, on the `custom_stack_height` layout (320x210) that
 * `CustomStackHeightWidget.createWindow` builds and centres. `open` makes it the walk or the
 * stack variant: a walk tile keeps `walktile_container` and the frame's `height_max`, anything
 * else hides it and drops to `height_min`, and the caption and `height_text` are
 * `widget.custom.walk|stack.height.title|text`. Heights go out in hundredths of a tile, so 1.5
 * tiles is 150 on the wire.
 *
 * The slider is `windowProcedure`'s: pressing the track puts the button at the pointer and sends
 * that height; dragging the button (`WE_RELOCATED`) writes the height into the input and sends it
 * live, at most every 30ms, and once more on release. Enter in the input sends what is typed;
 * leaving it with an unsent edit puts the furni's height back (`onInputHeightUnfocus`).
 *
 * `button_move_up` / `button_move_down` send `SetAdjacentCustomStackingHeightComposer` in Flash,
 * letting the server pick the next stacking height; that composer is not in the port's packets,
 * so here they nudge the height by 0.1 and send it. The button's double click (whole tiles) is
 * not ported.
 */
export const FurnitureStackHeightView = ({ height, multiWalkMode, isWalkTile, onApply, onAboveStack, onClose }: FurnitureStackHeightViewProps) => {
    const [ draft, setDraft ] = useState<string>(height.toString());
    const [ edited, setEdited ] = useState<boolean>(false);
    const [ lastHeight, setLastHeight ] = useState<number>(height);
    const [ multiWalk, setMultiWalk ] = useState<boolean>(multiWalkMode);
    const [ dragX, setDragX ] = useState<number | null>(null);
    const t = useTranslation();
    const trackRef = useRef<PixiContainer | null>(null);
    const stopDragRef = useRef<(() => void) | null>(null);

    useEffect(() => () => stopDragRef.current?.(), []);

    // The server's own height wins whenever it changes under us, unless the height is being dragged or typed (`canApplyLiveHeight`).
    if ((height !== lastHeight) && (dragX === null) && !edited) {
        setLastHeight(height);
        setDraft(height.toString());
    }

    const send = (value: number) => onApply(value, multiWalk);

    const setAltitude = (value: number) => {
        setEdited(false);
        setDraft(value.toString());
        send(value);
    };

    const onTrackTap = (event: FederatedPointerEvent) => {
        if (event.target !== event.currentTarget || !trackRef.current) return;

        const value = heightAtSliderX(event.getLocalPosition(trackRef.current).x);

        setEdited(false);
        setDraft(value.toString());
        send(value);
    };

    const onButtonDown = (event: FederatedPointerEvent) => {
        if (event.button !== 0) return;

        stopDragRef.current?.();

        const startX = sliderXForHeight(parseHeight(draft));
        const startClientX = event.clientX;
        let lastSent = -SLIDER_LIVE_UPDATE_INTERVAL_MS;
        let latest = parseHeight(draft);

        setEdited(false);
        setDragX(startX);

        const move = (moveEvent: PointerEvent) => {
            const x = clampSliderX(startX + (moveEvent.clientX - startClientX));

            latest = heightAtSliderX(x);
            setDragX(x);
            setDraft(latest.toString());

            if ((moveEvent.timeStamp - lastSent) >= SLIDER_LIVE_UPDATE_INTERVAL_MS) {
                lastSent = moveEvent.timeStamp;
                send(latest);
            }
        };

        const stop = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            stopDragRef.current = null;
        };

        const up = () => {
            stop();
            setDragX(null);
            send(latest);
        };

        stopDragRef.current = stop;
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
    };

    const sliderX = dragX ?? sliderXForHeight(parseHeight(draft));

    return (
        <Frame
            variant="100"
            caption={t(isWalkTile ? 'widget.custom.walk.height.title' : 'widget.custom.stack.height.title')}
            dropShadow={{ angle: 0, alpha: 0.35, blur: 20 }}
            onClose={onClose}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 1, 30, 1, 1 ]}
            layout={{ width: 320, height: isWalkTile ? WALK_HEIGHT : STACK_HEIGHT }}
        >
            <Button
                variant="102"
                onPointerTap={onAboveStack}
                layout={{ position: 'absolute', left: 12, top: 110, height: 29 }}
            >
                {t('furniture.above.stack')}
            </Button>
            <Button
                variant="102"
                onPointerTap={() => setAltitude(0)}
                layout={{ position: 'absolute', right: 10, top: 110, height: 29 }}
            >
                {t('furniture.floor.level')}
            </Button>
            <Border
                ref={trackRef}
                variant="105"
                onPointerTap={onTrackTap}
                layout={{ position: 'absolute', left: 35, top: 68, width: SLIDER_WIDTH, height: 30 }}
            >
                <ContainerButton
                    variant="102"
                    onPointerDown={onButtonDown}
                    layout={{ position: 'absolute', left: sliderX, top: 0, width: SLIDER_BUTTON_WIDTH, height: 30 }}
                />
            </Border>
            <ThemeText
                text={t(isWalkTile ? 'widget.custom.walk.height.text' : 'widget.custom.stack.height.text')}
                textStyle="il_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 290 }}
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, top: 5, width: 294, height: 59 }}
            />
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 250, top: 68, width: 58, height: 30 }}
            >
                <TextInput
                    value={draft}
                    onChange={(value) => {
                        setEdited(true);
                        setDraft(value);
                    }}
                    onEnter={() => setAltitude(parseHeight(draft))}
                    onFocusChange={(focused) => {
                        if (focused || !edited) return;

                        setEdited(false);
                        setDraft(height.toString());
                    }}
                    textStyle="il_regular"
                    flashPlacement
                    restrict="0123456789."
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    layout={{ position: 'absolute', left: 7, top: 7, width: 45, height: 20 }}
                />
            </Border>
            {isWalkTile && (
                <Region layout={{ position: 'absolute', left: 0, top: 149, width: 318, height: 24 }}>
                    <CheckBox
                        variant="102"
                        selected={multiWalk}
                        onPointerTap={() => {
                            setMultiWalk(!multiWalk);
                            onApply(parseHeight(draft), !multiWalk);
                        }}
                        layout={{ position: 'absolute', left: 13, top: 3, width: 17, height: 16 }}
                    />
                    <ThemeText
                        text={t('widget.custom.multiwalk_mode.text')}
                        textStyle="il_regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 278 }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 31, top: 2, width: 282, height: 19 }}
                    />
                </Region>
            )}
            <ContainerButton
                variant="102"
                tooltip={t('widget.custom.height.move_down')}
                dynamicStyle="button"
                onPointerTap={() => setAltitude(Math.max(0, Math.round((parseHeight(draft) - STEP) * 100) / 100))}
                layout={{ position: 'absolute', left: 9, top: 84, width: 19, height: 20 }}
            >
                <Icon
                    variant="0"
                    tintColor="#7f7f7f"
                    dynamicRole="icon"
                    layout={{ position: 'absolute', left: 5, top: 5, width: 12, height: 12 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="102"
                tooltip={t('widget.custom.height.move_up')}
                dynamicStyle="button"
                onPointerTap={() => setAltitude(Math.round((parseHeight(draft) + STEP) * 100) / 100)}
                layout={{ position: 'absolute', left: 9, top: 62, width: 19, height: 20 }}
            >
                <Icon
                    variant="1"
                    tintColor="#7f7f7f"
                    dynamicRole="icon"
                    layout={{ position: 'absolute', left: 5, top: 4, width: 12, height: 12 }}
                />
            </ContainerButton>
        </Frame>
    );
};
