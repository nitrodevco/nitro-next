/**
 * `actiontypes/SendSignal` (`wf_act_send_signal`, and its `NEG_SEND_SIGNAL` twin) - sends a
 * signal to the antennas of the first furni selection, forwarding the furni and users of the
 * other selections with it.
 *
 * Int params: `[ split furni, split users ]` - flags; each sends one signal per forwarded furni /
 * user instead of one for all. Ticking one asks for confirmation first
 * (`wiredfurni.params.signal_warning.*`), and a declined confirmation leaves it unticked.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** The checkboxes' captions, in int param order (`wiredfurni.params.signal.<option>`). */
export const SEND_SIGNAL_OPTIONS = [ 'split_furni', 'split_users' ];

export interface SendSignalActionForm {
    /** One flag per `SEND_SIGNAL_OPTIONS` entry. */
    options: boolean[];
}

export const sendSignalAction: WiredElementDefinition<SendSignalActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.SEND_SIGNAL,
    negativeCode: ActionTypeCodes.NEG_SEND_SIGNAL,
    createForm: triggerable => ({ options: SEND_SIGNAL_OPTIONS.map((_, index) => getWiredBoolean(triggerable, index)) }),
    // Flash puts the two Booleans in the int array; the packet writes them as 1 / 0.
    readIntParams: form => form.options.map(selected => (selected ? 1 : 0)),
    furniSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.furni.title.signal_antenna' : 'wiredfurni.params.sources.furni.title.signal_forward'),
    userSelectionTitle: () => 'wiredfurni.params.sources.users.title.signal_forward',
};
