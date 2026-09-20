/**
 * `addons/§_-L1H§.buildInputs` (both `§_-C2d§` and `§_-e1n§`) - the sorting variable's picker in
 * its section, the sort drop-down (only what that variable can be sorted by) and the
 * value-or-variable section (`setfilter`, 1 to 1000) on merged input source 0.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { getWiredInt, getWiredRoomVariables, selectVariableFilterVariable, VARIABLE_FILTER_MAX, VARIABLE_FILTER_MIN, VariableFilterAddonForm, variableFilterVariableFilter, variableReferenceSourceOptions, WiredElementView } from '#base/wired';

import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';
import { WiredVariablePicker } from '../../kit/WiredVariablePicker';

export const VariableFilterView: WiredElementView<VariableFilterAddonForm> = ({ form, setForm, triggerable, ctx }) => {
    const variables = getWiredRoomVariables(triggerable);

    return (
        <>
            <WiredSection title="${wiredfurni.params.variables.variable_selection}">
                <WiredVariablePicker
                    variables={variables}
                    state={form.picker}
                    onChange={(picker, variable) => setForm(current => selectVariableFilterVariable(current, picker, variable))}
                    filter={variableFilterVariableFilter}
                    roomId={ctx.roomId}
                />
            </WiredSection>
            <WiredSection title="${wiredfurni.params.variables.sort_by}">
                <WiredDropdown
                    options={form.sortOptions.map(id => ({ id, label: `\${wiredfurni.params.variables.sort_by.${id}}` }))}
                    selected={form.sort}
                    onSelect={sort => setForm({ sort })}
                    caption="${wiredfurni.params.variables.sort_by.caption}"
                />
            </WiredSection>
            <WiredValueOrVariableSection
                title="${wiredfurni.params.setfilter}"
                sourceTypeOptions={variableReferenceSourceOptions(ctx, getWiredInt(triggerable, 3))}
                min={VARIABLE_FILTER_MIN}
                max={VARIABLE_FILTER_MAX}
                state={form.reference}
                onChange={reference => setForm({ reference })}
                onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
                variables={variables}
                roomId={ctx.roomId}
            />
        </>
    );
};
