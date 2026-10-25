/**
 * `actiontypes/SendSignal` (`wf_act_send_signal`, and its `NEG_SEND_SIGNAL` twin) - sends a
 * signal to the antennas of the first furni selection, forwarding the furni and users of the
 * other selections with it.
 *
 * Int params: `[ split furni, split users ]` - flags; each sends one signal per forwarded furni /
 * user instead of one for all. Ticking one asks for confirmation first
 * (`wiredfurni.params.signal_warning.*`), and a declined confirmation leaves it unticked.
 */
import { flagsElement, type WiredElementDefinition, type WiredFlagsForm } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

/** The checkboxes' captions, in int param order (`wiredfurni.params.signal.<option>`). */
export const SEND_SIGNAL_OPTIONS = [ 'split_furni', 'split_users' ];

/** One flag per `SEND_SIGNAL_OPTIONS` entry. */
export type SendSignalActionForm = WiredFlagsForm;

export const sendSignalAction: WiredElementDefinition<SendSignalActionForm> = {
    ...flagsElement('action', ActionTypeCodes.SEND_SIGNAL, SEND_SIGNAL_OPTIONS),
    negativeCode: ActionTypeCodes.NEG_SEND_SIGNAL,
    furniSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.furni.title.signal_antenna' : 'wiredfurni.params.sources.furni.title.signal_forward'),
    userSelectionTitle: () => 'wiredfurni.params.sources.users.title.signal_forward',
};
