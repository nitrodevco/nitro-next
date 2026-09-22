/**
 * `conditions/§_-eU§.buildInputs` (user performs action) - the `action_selection` dropdown
 * (`action.<code>` per `WiredUserAction`), then the `sign_selection` section (a `sign_filter`
 * checkbox with the sign dropdown, `action.sign.0` to `.17`, under it) shown only for the sign
 * action, and the `dance_selection` section (`dance_filter`, `action.dance.1` to `.4`) only for
 * dance. Picking another action resets its section (`onActionSelected`).
 */
import { ALL_WIRED_USER_ACTIONS, PERFORMING_ACTION_DANCE, PERFORMING_ACTION_DANCE_IDS, PERFORMING_ACTION_SIGN, PERFORMING_ACTION_SIGN_IDS, PerformingActionConditionForm, selectPerformingAction, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';

const ACTION_OPTIONS = ALL_WIRED_USER_ACTIONS.map(action => ({ id: action.code, label: `\${wiredfurni.params.action.${action.code}}` }));
const SIGN_OPTIONS = PERFORMING_ACTION_SIGN_IDS.map(id => ({ id, label: `\${wiredfurni.params.action.sign.${id}}` }));
const DANCE_OPTIONS = PERFORMING_ACTION_DANCE_IDS.map(id => ({ id, label: `\${wiredfurni.params.action.dance.${id}}` }));

export const PerformingActionView: WiredElementView<PerformingActionConditionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.action_selection}">
            <WiredDropdown
                options={ACTION_OPTIONS}
                selected={form.action}
                onSelect={action => setForm(current => selectPerformingAction(current, action))}
                caption="${wiredfurni.tooltip.action}"
            />
        </WiredSection>
        <WiredSection
            title="${wiredfurni.params.sign_selection}"
            visible={form.action === PERFORMING_ACTION_SIGN}
        >
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
        <WiredSection
            title="${wiredfurni.params.dance_selection}"
            visible={form.action === PERFORMING_ACTION_DANCE}
        >
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
    </>
);
