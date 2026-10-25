/**
 * `triggerconfs/VariableUpdate.buildInputs` - the selection mode (WIN63-202610121624: one
 * variable, or the variable boxes picked as furni, which greys the variable section out), the
 * variable (furni, user or global, picked in the
 * section header; only variables that can intercept changes), the created / changed / deleted
 * options with the "changed" sub-options under the second, and the folded change origins, two of
 * them with an info text under them; the options are folded too since WIN63-202610121624
 * (`SectionParam.COLLAPSED`). Options the variable does not allow are disabled
 * (`onChangeVariable`), their checks kept. The mode section comes first because the editor builds
 * it first (inference: the decompiled `addElements` call was lost).
 */
import { getWiredRoomVariables, isCheckboxMaskBitSet, setCheckboxMaskBit, VARIABLE_UPDATE_CHANGE_IDS, VARIABLE_UPDATE_ORIGIN_IDS, VARIABLE_UPDATE_ORIGIN_INFO_IDS, VARIABLE_UPDATE_PICKED_VARIABLE_BOXES_MODE, VARIABLE_UPDATE_SINGLE_VARIABLE_MODE, VARIABLE_UPDATE_SOURCE_TYPES, variableUpdateFilter, variableUpdateOptionDisabled, variableUpdateOriginDisabled, VariableUpdateTriggerForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredChooseVariableSection } from '../../kit/WiredChooseVariableSection';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { useWiredStyle } from '../../kit/WiredStyleContext';
import { WiredText } from '../../kit/WiredText';

export const VariableUpdateView: WiredElementView<VariableUpdateTriggerForm> = ({ form, setForm, triggerable, ctx }) => {
    const style = useWiredStyle();
    const optionDisabled = variableUpdateOptionDisabled(form.variable);
    const originDisabled = variableUpdateOriginDisabled(form.variable);

    const changeGroup = (
        <WiredCheckboxGroup
            options={VARIABLE_UPDATE_CHANGE_IDS.map(id => ({ id, label: `\${wiredfurni.params.variables.trigger_options.1.${id}}`, selected: isCheckboxMaskBitSet(form.changeMask, id) }))}
            onToggle={(id, selected) => setForm(current => ({ ...current, changeMask: setCheckboxMaskBit(current.changeMask, id, selected) }))}
        />
    );

    return (
        <>
            <WiredSection title="${wiredfurni.params.variables.trigger_mode}">
                <WiredRadioGroup
                    options={[
                        { id: VARIABLE_UPDATE_SINGLE_VARIABLE_MODE, label: '${wiredfurni.params.variables.trigger_mode.0}' },
                        { id: VARIABLE_UPDATE_PICKED_VARIABLE_BOXES_MODE, label: '${wiredfurni.params.variables.trigger_mode.1}' },
                    ]}
                    selected={form.mode}
                    onSelect={mode => setForm({ mode })}
                />
            </WiredSection>
            <WiredChooseVariableSection
                disabled={form.mode === VARIABLE_UPDATE_PICKED_VARIABLE_BOXES_MODE}
                sourceTypeOptions={VARIABLE_UPDATE_SOURCE_TYPES}
                filter={variableUpdateFilter}
                state={form.picker}
                onChange={(picker, variable) => setForm({ picker, variable })}
                variables={getWiredRoomVariables(triggerable)}
                roomId={ctx.roomId}
            />
            <WiredSection
                title="${wiredfurni.params.variables.trigger_options}"
                collapsible
                defaultCollapsed
            >
                <WiredCheckboxGroup
                    options={form.options.map((selected, id) => ({
                        id,
                        label: `\${wiredfurni.params.variables.trigger_options.${id}}`,
                        selected,
                        disabled: optionDisabled[id],
                        extraUnder: (id === 1) ? changeGroup : undefined,
                    }))}
                    onToggle={(id, selected) => setForm(current => ({ ...current, options: current.options.with(id, selected) }))}
                />
            </WiredSection>
            <WiredSection
                title="${wiredfurni.params.variables.trigger_origin}"
                collapsible
                defaultCollapsed
            >
                <WiredCheckboxGroup
                    options={VARIABLE_UPDATE_ORIGIN_IDS.map(id => ({
                        id,
                        label: `\${wiredfurni.params.variables.trigger_origin.${id}}`,
                        selected: isCheckboxMaskBitSet(form.originMask, id),
                        disabled: originDisabled[id],
                        extraUnder: VARIABLE_UPDATE_ORIGIN_INFO_IDS.includes(id)
                            ? (
                                    <WiredText
                                        text={`\${wiredfurni.params.variables.trigger_origin.${id}.info}`}
                                        color={style.softTextColor}
                                    />
                                )
                            : undefined,
                    }))}
                    onToggle={(id, selected) => setForm(current => ({ ...current, originMask: setCheckboxMaskBit(current.originMask, id, selected) }))}
                />
            </WiredSection>
        </>
    );
};
