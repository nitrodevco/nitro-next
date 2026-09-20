/**
 * `triggerconfs/§_-8z§.buildInputs` - what is said (a 1000 character field, disabled while the
 * match type is "all messages", `onTriggerTypeChange`), the match type radio and the options:
 * hide the message (id 1) and owner only (id 0).
 */
import { AVATAR_SAYS_MATCH_ALL, AvatarSaysSomethingTriggerForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredTextInput } from '../../kit/WiredTextInput';

/** `TextInputParam("", 1000, ...)`. */
const TEXT_MAX_CHARACTERS = 1000;

export const AvatarSaysSomethingView: WiredElementView<AvatarSaysSomethingTriggerForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.whatissaid}">
            <WiredTextInput
                value={form.text}
                onChange={text => setForm({ text })}
                maxCharacters={TEXT_MAX_CHARACTERS}
                tooltip="${wiredfurni.tooltip.chatinput}"
                disabled={form.matchType === AVATAR_SAYS_MATCH_ALL}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.chattriggertype}">
            <WiredRadioGroup
                options={[
                    { id: 0, label: '${wiredfurni.params.chatcontains}' },
                    { id: 1, label: '${wiredfurni.params.exactmatch}' },
                    { id: 2, label: '${wiredfurni.params.allmatch}' },
                ]}
                selected={form.matchType}
                onSelect={matchType => setForm({ matchType })}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.select_options}">
            <WiredCheckboxGroup
                options={[
                    { id: 1, label: '${wiredfurni.params.chat.hide}', selected: form.hideMessage },
                    { id: 0, label: '${wiredfurni.params.chat.onlyowner}', selected: form.ownerOnly },
                ]}
                onToggle={(id, selected) => setForm((id === 1) ? { hideMessage: selected } : { ownerOnly: selected })}
            />
        </WiredSection>
    </>
);
