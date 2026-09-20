/**
 * `conditions/TriggererMatches.buildInputs` - the `usertype` section (habbo 1, pet 2, bot 4) and
 * the `picktriggerer` section: any user (`anyavatar`) or a named one (`certainavatar`, with a
 * 32 character name input under the option, `wiredfurni.tooltip.avatarname` as its tooltip).
 */
import { TRIGGERER_MATCHES_ANY, TRIGGERER_MATCHES_CERTAIN, TRIGGERER_MATCHES_NAME_MAX_LENGTH, TriggererMatchesConditionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredTextInput } from '../../kit/WiredTextInput';

const USER_TYPES = [ 1, 2, 4 ];

export const TriggererMatchesView: WiredElementView<TriggererMatchesConditionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.usertype}">
            <WiredRadioGroup
                options={USER_TYPES.map(id => ({ id, label: `\${wiredfurni.params.usertype.${id}}` }))}
                selected={form.userType}
                onSelect={userType => setForm({ userType })}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.picktriggerer}">
            <WiredRadioGroup
                options={[
                    { id: TRIGGERER_MATCHES_ANY, label: '${wiredfurni.params.anyavatar}' },
                    {
                        id: TRIGGERER_MATCHES_CERTAIN,
                        label: '${wiredfurni.params.certainavatar}',
                        extraUnder: (
                            <WiredTextInput
                                value={form.name}
                                onChange={name => setForm({ name })}
                                maxCharacters={TRIGGERER_MATCHES_NAME_MAX_LENGTH}
                                tooltip="${wiredfurni.tooltip.avatarname}"
                            />
                        ),
                    },
                ]}
                selected={form.pick}
                onSelect={pick => setForm({ pick })}
            />
        </WiredSection>
    </>
);
