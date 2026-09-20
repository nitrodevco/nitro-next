/**
 * `actiontypes/chests/§_-qN§.buildInputs` (INITIATE_TRANSACTION) - the contract mode radio, the
 * multiplier (`ValueOrVariableSection` of merged section 0, 1 to 500; retitled
 * `multiplier_selection2` for mode 2 and disabled for mode 0, as `onModeChange` does) and the
 * timeout section: a checkbox with the named seconds input (30 to 3600) under it.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { CONTRACT_MODE_MULTIPLIER_2, CONTRACT_MODE_NO_MULTIPLIER, CONTRACT_MULTIPLIER_MAX, CONTRACT_TIMEOUT_MAX, CONTRACT_TIMEOUT_MIN, getMergedSourceOptions, getWiredRoomVariables, initiateTransactionAction, InitiateTransactionActionForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../../kit/WiredCheckboxGroup';
import { WiredDisabled } from '../../../kit/WiredDisabled';
import { WiredNamedNumberInput } from '../../../kit/WiredNamedNumberInput';
import { WiredRadioGroup } from '../../../kit/WiredRadioGroup';
import { WiredSection } from '../../../kit/WiredSection';
import { WiredValueOrVariableSection } from '../../../kit/WiredValueOrVariableSection';

const MODE_OPTIONS = [ 0, 1, 2 ].map(id => ({ id, label: `\${wiredfurni.params.contract.mode.${id}}` }));

export const InitiateTransactionView: WiredElementView<InitiateTransactionActionForm> = ({ form, setForm, triggerable, ctx }) => (
    <>
        <WiredSection title="${wiredfurni.params.contract.mode}">
            <WiredRadioGroup
                options={MODE_OPTIONS}
                selected={form.mode}
                onSelect={mode => setForm({ mode })}
            />
        </WiredSection>
        <WiredDisabled disabled={form.mode === CONTRACT_MODE_NO_MULTIPLIER}>
            <WiredValueOrVariableSection
                title={(form.mode === CONTRACT_MODE_MULTIPLIER_2) ? '${wiredfurni.params.contract.multiplier_selection2}' : '${wiredfurni.params.contract.multiplier_selection}'}
                sourceTypeOptions={getMergedSourceOptions(initiateTransactionAction, form, 0, ctx)}
                min={1}
                max={CONTRACT_MULTIPLIER_MAX}
                state={form.multiplier}
                onChange={multiplier => setForm({ multiplier })}
                onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
                variables={getWiredRoomVariables(triggerable)}
                roomId={ctx.roomId}
            />
        </WiredDisabled>
        <WiredSection title="${wiredfurni.params.contract.timeout}">
            <WiredCheckboxGroup
                options={[ {
                    label: '${wiredfurni.params.contract.timeout.desc}',
                    selected: form.timeoutEnabled,
                    extraUnder: (
                        <WiredNamedNumberInput
                            name="${wiredfurni.params.contract.timeout.selection}"
                            value={form.timeout}
                            onChange={timeout => setForm({ timeout })}
                            min={CONTRACT_TIMEOUT_MIN}
                            max={CONTRACT_TIMEOUT_MAX}
                        />
                    ),
                } ]}
                onToggle={(id, timeoutEnabled) => setForm({ timeoutEnabled })}
            />
        </WiredSection>
    </>
);
