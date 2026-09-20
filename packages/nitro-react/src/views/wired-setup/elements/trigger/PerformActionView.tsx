/**
 * `triggerconfs/PerformAction.buildInputs` (and the identical `selectors/§_-O21§.buildInputs`) -
 * the action dropdown, then, only for the sign or the dance action, a section whose checkbox
 * narrows it to one sign (0 to 17) or one dance (1 to 4) chosen in the dropdown under it.
 * Picking another action clears that filter (`onActionSelected` -> `updateExtraSections()`).
 */
import { ALL_WIRED_USER_ACTIONS, applyPerformActionExtra, PERFORM_ACTION_DANCE_CODE, PERFORM_ACTION_DANCE_IDS, PERFORM_ACTION_SIGN_CODE, PERFORM_ACTION_SIGN_IDS, PerformActionForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';

const ACTION_OPTIONS = ALL_WIRED_USER_ACTIONS.map(action => ({ id: action.code, label: `\${wiredfurni.params.action.${action.code}}` }));
const SIGN_OPTIONS = PERFORM_ACTION_SIGN_IDS.map(id => ({ id, label: `\${wiredfurni.params.action.sign.${id}}` }));
const DANCE_OPTIONS = PERFORM_ACTION_DANCE_IDS.map(id => ({ id, label: `\${wiredfurni.params.action.dance.${id}}` }));

export const PerformActionView: WiredElementView<PerformActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.action_selection}">
            <WiredDropdown
                options={ACTION_OPTIONS}
                selected={form.action}
                onSelect={action => setForm(current => applyPerformActionExtra({ ...current, action }))}
                caption="${wiredfurni.tooltip.action}"
            />
        </WiredSection>
        {(form.action === PERFORM_ACTION_SIGN_CODE) && (
            <WiredSection title="${wiredfurni.params.sign_selection}">
                <WiredCheckboxGroup
                    options={[ {
                        id: 0,
                        label: '${wiredfurni.params.sign_filter}',
                        selected: form.signFilter,
                        extraUnder: (
                            <WiredDropdown
                                options={SIGN_OPTIONS}
                                selected={form.sign}
                                onSelect={sign => setForm({ sign })}
                                caption="${wiredfurni.tooltip.sign}"
                            />
                        ),
                    } ]}
                    onToggle={(_, signFilter) => setForm({ signFilter })}
                />
            </WiredSection>
        )}
        {(form.action === PERFORM_ACTION_DANCE_CODE) && (
            <WiredSection title="${wiredfurni.params.dance_selection}">
                <WiredCheckboxGroup
                    options={[ {
                        id: 0,
                        label: '${wiredfurni.params.dance_filter}',
                        selected: form.danceFilter,
                        extraUnder: (
                            <WiredDropdown
                                options={DANCE_OPTIONS}
                                selected={form.dance}
                                onSelect={dance => setForm({ dance })}
                                caption="${wiredfurni.tooltip.dance}"
                            />
                        ),
                    } ]}
                    onToggle={(_, danceFilter) => setForm({ danceFilter })}
                />
            </WiredSection>
        )}
    </>
);
