/**
 * `addons/§_-412§.buildInputs` - the executions slider (1 to 100) and the time window slider (1 to
 * 20 pulses, shown in seconds), neither with a number input.
 */
import { EXECUTION_LIMIT_MAX_EXECUTIONS, EXECUTION_LIMIT_MAX_TIME_WINDOW, ExecutionLimitAddonForm, SLIDER_CONVERTER_ECHO, SLIDER_CONVERTER_PULSES, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const ExecutionLimitView: WiredElementView<ExecutionLimitAddonForm> = ({ form, setForm }) => (
    <>
        <WiredSliderSection
            titleKey="wiredfurni.params.setexecutions"
            unitKey="amount"
            converter={SLIDER_CONVERTER_ECHO}
            min={1}
            max={EXECUTION_LIMIT_MAX_EXECUTIONS}
            step={1}
            value={form.executions}
            onChange={executions => setForm({ executions })}
            showInput={false}
        />
        <WiredSliderSection
            titleKey="wiredfurni.params.settimewindow"
            unitKey="timewindow"
            converter={SLIDER_CONVERTER_PULSES}
            min={1}
            max={EXECUTION_LIMIT_MAX_TIME_WINDOW}
            step={1}
            value={form.timeWindow}
            onChange={timeWindow => setForm({ timeWindow })}
            showInput={false}
        />
    </>
);
