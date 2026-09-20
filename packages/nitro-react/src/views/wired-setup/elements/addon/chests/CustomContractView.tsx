/**
 * `addons/chests/§_-72L§.buildInputs` - the usage warning, then the payment and the reward
 * (both collapsed): each an "enable" checkbox with, under it and with no spacing of its own, the
 * element type radio (two columns), a `sectionSpacing` gap and the amount's value-or-variable
 * section (merged input source 0 for the payment, 1 for the reward); then a splitter.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { CUSTOM_CONTRACT_AMOUNT_MAX, CUSTOM_CONTRACT_AMOUNT_MIN, CustomContractAddonForm, CustomContractPart, getWiredInt, getWiredRoomVariables, variableReferenceSourceOptions, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../../kit/WiredCheckboxGroup';
import { WiredRadioGroup } from '../../../kit/WiredRadioGroup';
import { WiredSection } from '../../../kit/WiredSection';
import { WiredSimpleList } from '../../../kit/WiredSimpleList';
import { WiredSpacer } from '../../../kit/WiredSpacer';
import { WiredSplitter } from '../../../kit/WiredSplitter';
import { useWiredStyle } from '../../../kit/WiredStyleContext';
import { WiredUsageWarningSection } from '../../../kit/WiredUsageWarningSection';
import { WiredValueOrVariableSection } from '../../../kit/WiredValueOrVariableSection';

const ELEMENT_TYPE_OPTIONS = [ 0, 1 ].map(id => ({ id, label: `\${wiredfurni.params.custom_contract.element_type_selection.${id}}` }));

export const CustomContractView: WiredElementView<CustomContractAddonForm> = ({ form, setForm, triggerable, ctx }) => {
    const style = useWiredStyle();
    const variables = getWiredRoomVariables(triggerable);

    const renderPart = (key: 'payment' | 'reward', mergedId: number, title: string, enableLabel: string) => {
        const part = form[key];
        const setPart = (patch: Partial<CustomContractPart>) => setForm(current => ({ ...current, [key]: { ...current[key], ...patch } }));

        return (
            <WiredSection
                title={title}
                collapsible
                defaultCollapsed
            >
                <WiredCheckboxGroup
                    options={[ {
                        label: enableLabel,
                        selected: part.enabled,
                        extraUnder: (
                            <WiredSimpleList spacing={0}>
                                <WiredSection title="${wiredfurni.params.custom_contract.element_type_selection}">
                                    <WiredRadioGroup
                                        options={ELEMENT_TYPE_OPTIONS}
                                        selected={part.type}
                                        onSelect={type => setPart({ type })}
                                        columns={2}
                                    />
                                </WiredSection>
                                <WiredSpacer height={style.sectionSpacing} />
                                <WiredValueOrVariableSection
                                    title="${wiredfurni.params.custom_contract.amount_selection}"
                                    sourceTypeOptions={variableReferenceSourceOptions(ctx, getWiredInt(triggerable, (mergedId * 5) + 4))}
                                    min={CUSTOM_CONTRACT_AMOUNT_MIN}
                                    max={CUSTOM_CONTRACT_AMOUNT_MAX}
                                    state={part.amount}
                                    onChange={amount => setPart({ amount })}
                                    onSourceTypeSelect={sourceType => setWiredMergedSourceType(mergedId, sourceType)}
                                    variables={variables}
                                    roomId={ctx.roomId}
                                />
                            </WiredSimpleList>
                        ),
                    } ]}
                    onToggle={(_, enabled) => setPart({ enabled })}
                />
            </WiredSection>
        );
    };

    return (
        <>
            <WiredUsageWarningSection text="${wiredfurni.params.custom_contract.usage_warning}" />
            {renderPart('payment', 0, '${wiredfurni.params.custom_contract.payment}', '${wiredfurni.params.custom_contract.enable_payment}')}
            {renderPart('reward', 1, '${wiredfurni.params.custom_contract.reward}', '${wiredfurni.params.custom_contract.enable_reward}')}
            <WiredSplitter />
        </>
    );
};
