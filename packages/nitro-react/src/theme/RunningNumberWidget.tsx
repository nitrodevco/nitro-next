/**
 * The window manager's `running_number` widget - `com.sulake.habbo.window.widgets.RunningNumberWidget`,
 * built from its `running_number` layout: the illumina clock background under `number_field`, which
 * auto-sizes and widens the widget with it.
 *
 * `number` is where it runs to. While the number it shows is below it, the update receiver adds the
 * time since its last step over `updateFrequency` (one per `updateFrequency` ms) - never past `number`
 * - and shows it zero-padded to `digits`; it never runs down. `initialNumber` shows a number at once
 * and runs from there; without one it runs from 0, and the field keeps the layout's text until its
 * first step. `set fieldValue` writes the built field, so its `auto_size` widens the widget
 * (`reflect_horizontal_resize_to_parent`) as the digits need. `running_number:color_style` is kept by Flash but changes nothing, so it is not here.
 */
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Ticker } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { TemplateWindow } from './TemplateWindow';

export interface RunningNumberWidgetProps {
    /** `running_number:number`: the number it runs to. */
    number: number;
    /** `initialNumber`: shown at once, and run from. */
    initialNumber?: number;
    /** `running_number:digits`, 8 by default. */
    digits?: number;
    /** `running_number:update_frequency`, 50 ms by default. */
    updateFrequency?: number;
}

/** `set fieldValue`: the number as a `uint`, zero-padded to `digits`. */
const fieldValue = (value: number, digits: number) => String(Math.max(0, Math.trunc(value))).padStart(digits, '0');

export const RunningNumberWidget = ({ number, initialNumber, digits = 8, updateFrequency = 50 }: RunningNumberWidgetProps) => {
    const [ shown, setShown ] = useState<{ initial: number | undefined; value: number | undefined }>({ initial: initialNumber, value: initialNumber });
    const millis = useRef(0);

    // A new `initialNumber`: shown at once (`set initialNumber`).
    if (shown.initial !== initialNumber) setShown({ initial: initialNumber, value: initialNumber ?? shown.value });

    const displayed = shown.value ?? 0;
    const running = displayed < number;

    useEffect(() => {
        if (!running) return;

        // `update(delta)`, the window manager's update receiver.
        const update = (ticker: Ticker) => {
            millis.current += ticker.deltaMS;

            if (millis.current <= updateFrequency) return;

            const step = millis.current / updateFrequency;

            millis.current -= updateFrequency;
            setShown(previous => ({ ...previous, value: Math.min(number, (previous.value ?? 0) + step) }));
        };

        GetTicker().add(update);

        return () => {
            GetTicker().remove(update);
        };
    }, [ running, number, updateFrequency ]);

    return (
        <TemplateWindow
            id="habbo-window-manager-com/running_number_xml"
            bindings={(shown.value === undefined) ? undefined : { number_field: { caption: fieldValue(shown.value, digits), setCaptionAfterBuild: true } }}
        />
    );
};
