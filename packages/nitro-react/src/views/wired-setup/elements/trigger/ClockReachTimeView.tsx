/**
 * `triggerconfs/ClockReachTime.buildInputs` - the minutes slider (0 to 99), then the seconds
 * slider (0 to 59.5, in half seconds), neither with a number input.
 */
import { CLOCK_REACH_TIME_MAX_HALF_SECONDS, CLOCK_REACH_TIME_MAX_MINUTES, ClockReachTimeTriggerForm, SLIDER_CONVERTER_ECHO, SLIDER_CONVERTER_PULSES, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const ClockReachTimeView: WiredElementView<ClockReachTimeTriggerForm> = ({ form, setForm }) => (
    <>
        <WiredSliderSection
            titleKey="wiredfurni.params.clock_minutes_elapsed"
            unitKey="minutes"
            converter={SLIDER_CONVERTER_ECHO}
            min={0}
            max={CLOCK_REACH_TIME_MAX_MINUTES}
            step={1}
            value={form.minutes}
            onChange={minutes => setForm({ minutes })}
            showInput={false}
        />
        <WiredSliderSection
            titleKey="wiredfurni.params.clock_seconds_elapsed"
            unitKey="seconds"
            converter={SLIDER_CONVERTER_PULSES}
            min={0}
            max={CLOCK_REACH_TIME_MAX_HALF_SECONDS}
            step={1}
            value={form.halfSeconds}
            onChange={halfSeconds => setForm({ halfSeconds })}
            showInput={false}
        />
    </>
);
