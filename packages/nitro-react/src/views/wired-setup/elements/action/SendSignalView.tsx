/**
 * `actiontypes/SendSignal.buildInputs` - the split furni / split users checkboxes in the
 * `signal.send_options` section.
 *
 * `onChangeCheckbox`: ticking one asks `signal_warning.title` / `.desc` first, and anything but OK
 * unticks it again. The confirm dialog here reports only an OK, so the box is ticked when the
 * confirmation is accepted rather than unticked when it is not - the same end state. Unticking
 * asks nothing.
 */
import { useWindowActions } from '#base/context/system';
import { SEND_SIGNAL_OPTIONS, SendSignalActionForm, setWiredFlag, WiredElementView } from '#base/wired';

import { FlagsSection } from '../shared/FlagsSection';

const LABELS = SEND_SIGNAL_OPTIONS.map(option => `\${wiredfurni.params.signal.${option}}`);

export const SendSignalView: WiredElementView<SendSignalActionForm> = ({ form, setForm, ctx }) => {
    const { showConfirm } = useWindowActions();

    const onToggle = (id: number, selected: boolean) => {
        if (!selected) {
            setForm(current => setWiredFlag(current, id, false));

            return;
        }

        showConfirm(
            ctx.localize('wiredfurni.params.signal_warning.title'),
            ctx.localize('wiredfurni.params.signal_warning.desc'),
            () => setForm(current => setWiredFlag(current, id, true)),
        );
    };

    return (
        <FlagsSection
            title="${wiredfurni.params.signal.send_options}"
            labels={LABELS}
            flags={form.flags}
            onToggle={onToggle}
        />
    );
};
