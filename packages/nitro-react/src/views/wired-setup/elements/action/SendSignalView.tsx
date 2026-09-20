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
import { SEND_SIGNAL_OPTIONS, SendSignalActionForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredSection } from '../../kit/WiredSection';

const setOption = (form: SendSignalActionForm, id: number, selected: boolean): SendSignalActionForm =>
    ({ ...form, options: form.options.map((value, index) => ((index === id) ? selected : value)) });

export const SendSignalView: WiredElementView<SendSignalActionForm> = ({ form, setForm, ctx }) => {
    const { showConfirm } = useWindowActions();

    const onToggle = (id: number, selected: boolean) => {
        if (!selected) {
            setForm(current => setOption(current, id, false));

            return;
        }

        showConfirm(
            ctx.localize('wiredfurni.params.signal_warning.title'),
            ctx.localize('wiredfurni.params.signal_warning.desc'),
            () => setForm(current => setOption(current, id, true)),
        );
    };

    return (
        <WiredSection title="${wiredfurni.params.signal.send_options}">
            <WiredCheckboxGroup
                options={SEND_SIGNAL_OPTIONS.map((option, index) => ({ label: `\${wiredfurni.params.signal.${option}}`, selected: form.options[index] }))}
                onToggle={onToggle}
            />
        </WiredSection>
    );
};
