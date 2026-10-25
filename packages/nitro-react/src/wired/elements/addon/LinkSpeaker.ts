/**
 * `wired_setup/addons/_-z14` (`wf_xtra_link_speaker`, code 2003 - `AddonCodes.LINK_SPEAKER`,
 * WIN63-202610201032) - WIRED Link Speaker: the stack's Links speak what they send or receive in
 * a chat bubble (style 253, `wired_link_speaker`).
 *
 * Int params: `[ message, dataframe ]` - 1 when it speaks for messages, for dataframes
 * (`_payloadTypes`, read back with `getBoolean`). The add-on always picks furni
 * (`forceFurniSelection`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean } from '../../WiredTriggerable';
import { AddonCodes } from './addonCodes';

export interface LinkSpeakerForm {
    message: boolean;
    dataframe: boolean;
}

export const linkSpeakerAddon: WiredElementDefinition<LinkSpeakerForm> = {
    holder: 'addon',
    code: AddonCodes.LINK_SPEAKER,
    createForm: triggerable => ({ message: getWiredBoolean(triggerable, 0), dataframe: getWiredBoolean(triggerable, 1) }),
    readIntParams: form => [ form.message ? 1 : 0, form.dataframe ? 1 : 0 ],
    forceFurniSelection: () => true,
};
