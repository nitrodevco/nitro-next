/**
 * `wired_setup.uibuilder.presets.SliderPreset` driven by `wired_setup.common.SliderWindowControllerNew`
 * - the style's `slider` between a left and a right `IconButtonPreset`, in a row
 * `LRContainerSpacing` apart and centred on its height, inset by `LRContainerMargin` left and
 * right and `LRContainerTopBottomPadding` above and below. The slider fills what the two buttons
 * leave; its base bitmap is stretched across it.
 *
 * The controller's rules:
 * - the knob sits at `int(referenceWidth * (value - min) / (max - min))`, `referenceWidth` being
 *   the movement area's width minus the knob's;
 * - dragging the knob moves it freely inside the movement area and reports
 *   `round(valueAt(x) / step) * step`, clamped to `[min, max]`; the knob is not snapped when it
 *   is let go - it stays where it was dropped until the value is set from outside
 *   (`setValue(v, false)` during the drag, `updateSliderPosition` otherwise);
 * - the arrows step the value by `step` and put the knob where the value is;
 * - a `step` of 0 disables both dragging and the arrows.
 *
 * Controlled: `value` in, `onChange` with every new value out.
 */
import { Container, FederatedPointerEvent } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { Box, LayoutImage, ThemeImage, useLayoutSize } from '#base/theme';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredIconButton } from './WiredIconButton';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredSliderProps {
    /** The constructor's `min` (`SliderPreset` param 4). */
    min: number;
    /** `max`. */
    max: number;
    /** `step` - 0 makes the slider inert, as in Flash. */
    step: number;
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
}

/** Where a drag left the knob, and the value it reported from there. */
interface DraggedKnob {
    x: number;
    value: number;
}

interface DragOrigin {
    pointerX: number;
    knobX: number;
    referenceWidth: number;
}

const clampValue = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/** `getSliderPosition`. */
const knobPosition = (value: number, min: number, max: number, referenceWidth: number): number =>
    ((max === min) ? 0 : Math.trunc(referenceWidth * ((value - min) / (max - min))));

export const WiredSlider = ({ min, max, step, value, onChange, disabled = false }: WiredSliderProps) => {
    const style = useWiredStyle();
    const template = style.templates.slider;
    const isDisabled = useWiredDisabled(disabled);
    const fillLayout = useWiredFillLayout();
    const [ trackNode, setTrackNode ] = useState<Container | null>(null);
    const { width: trackWidth } = useLayoutSize(trackNode);
    const [ dragged, setDragged ] = useState<DraggedKnob | null>(null);
    const dragOriginRef = useRef<DragOrigin | null>(null);
    const listenersRef = useRef<{ move: (event: PointerEvent) => void; up: () => void } | null>(null);
    const latestRef = useRef({ min, max, step, value, onChange });

    useEffect(() => {
        latestRef.current = { min, max, step, value, onChange };
    });

    const stopDragging = () => {
        const listeners = listenersRef.current;

        if (listeners) {
            window.removeEventListener('pointermove', listeners.move);
            window.removeEventListener('pointerup', listeners.up);
            listenersRef.current = null;
        }

        dragOriginRef.current = null;
    };

    useEffect(() => () => {
        const listeners = listenersRef.current;

        if (!listeners) return;

        window.removeEventListener('pointermove', listeners.move);
        window.removeEventListener('pointerup', listeners.up);
    }, []);

    const referenceWidth = Math.max(0, Math.floor(trackWidth) - template.buttonWidth);
    const knobX = (dragged && (dragged.value === value)) ? dragged.x : knobPosition(clampValue(value, min, max), min, max, referenceWidth);

    /** `moveSliderToLeft` / `moveSliderToRight`. */
    const stepBy = (direction: number) => {
        stopDragging();

        if (step === 0) return;

        setDragged(null);
        onChange(clampValue(value + (direction * step), min, max));
    };

    const onKnobPointerDown = (event: FederatedPointerEvent) => {
        if (isDisabled || (step === 0)) return;

        event.stopPropagation();
        stopDragging();

        dragOriginRef.current = { pointerX: event.clientX, knobX, referenceWidth };

        const move = (moveEvent: PointerEvent) => {
            const origin = dragOriginRef.current;

            if (!origin) return;

            const latest = latestRef.current;
            const x = Math.min(origin.referenceWidth, Math.max(0, Math.round(origin.knobX + (moveEvent.clientX - origin.pointerX))));
            const raw = (origin.referenceWidth > 0) ? (((x / origin.referenceWidth) * (latest.max - latest.min)) + latest.min) : latest.min;
            const next = clampValue(Math.round(raw / latest.step) * latest.step, latest.min, latest.max);

            setDragged({ x, value: next });

            if (next !== latest.value) latest.onChange(next);
        };

        const up = () => stopDragging();

        listenersRef.current = { move, up };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
    };

    return (
        <Box layout={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: style.LRContainerSpacing,
            paddingLeft: style.LRContainerMargin,
            paddingRight: style.LRContainerMargin,
            paddingTop: style.LRContainerTopBottomPadding,
            paddingBottom: style.LRContainerTopBottomPadding,
            flexShrink: 0,
            ...fillLayout,
        }}
        >
            <WiredIconButton
                icon="left"
                disabled={disabled}
                onPress={() => stepBy(-1)}
            />
            <Box
                ref={setTrackNode}
                alpha={wiredDisabledAlpha(isDisabled)}
                layout={{ position: 'relative', height: template.height, flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0 }}
            >
                {(trackWidth > 0) && (
                    <ThemeImage
                        src={LayoutImage(`wired/${template.baseAsset}.png`)}
                        tint={template.baseTint ?? undefined}
                        // `slider_base`: stretched across the slider, drawn at its own height (`stretched_y` false).
                        bitmap={{ stretchedY: false }}
                        eventMode="none"
                        layout={{ position: 'absolute', left: 0, top: 0, width: Math.floor(trackWidth), height: template.baseHeight }}
                    />
                )}
                <Box layout={{ position: 'absolute', left: 0, top: template.movementAreaY, right: 0, height: template.buttonHeight }}>
                    <ThemeImage
                        src={LayoutImage(`wired/${template.buttonAsset}.png`)}
                        // `slider_button`: unstretched, the window sized to its bitmap.
                        bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                        cursor={(isDisabled || (step === 0)) ? 'default' : 'pointer'}
                        onPointerDown={onKnobPointerDown}
                        layout={{ position: 'absolute', left: knobX, top: 0 }}
                    />
                </Box>
            </Box>
            <WiredIconButton
                icon="right"
                disabled={disabled}
                onPress={() => stepBy(1)}
            />
        </Box>
    );
};
