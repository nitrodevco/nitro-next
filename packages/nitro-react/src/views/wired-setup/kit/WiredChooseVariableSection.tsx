/**
 * `uibuilder/presets/sections/ChooseVariableSection` - a section around one variable picker,
 * titled `variables.variable_selection` unless the box names it, with a source type selector in
 * its header when the box passes source type options.
 *
 * Controlled: `state` is the picker's `WiredVariablePickerState` in the form
 * (`createVariablePickerState` is `init`; `state.target` is the `target` getter) and `onChange`
 * is the picker's selection callback - Flash's `param4`, through which the boxes derive other
 * fields from the chosen variable (the placeholder addon names the placeholder after it and
 * disables the text mode for a variable without a text connector). `filter` is `param3`.
 *
 * The selector's `sourceType` setter: for a merged section (Flash's `mergedId` other than -1)
 * the view passes `onSourceTypeSelect={type => setWiredMergedSourceType(mergedId, type)}`, and the
 * definition's `setMergedType` retargets the picker (`setPickerTarget`). Without
 * `onSourceTypeSelect` the section retargets the picker itself - `target = type`, what Flash does
 * for `mergedId` -1; either way the retargeted picker selects what that target had before, and
 * Flash reports that selection through the callback - so an element whose callback derives
 * fields does the same derivation in its `setMergedType`. `readVariableIds` returns
 * `state.variableId` (`finalizeSelection`).
 */
import { IWiredVariable } from '@nitrodevco/nitro-packets';

import { getPickerSelectedVariable, setPickerTarget, WiredVariableFilter, WiredVariablePickerState } from '#base/wired';

import { WiredSection } from './WiredSection';
import { WiredVariablePicker } from './WiredVariablePicker';

export interface WiredChooseVariableSectionProps {
    /** `param5` - a literal or `${key}`. Default `${wiredfurni.params.variables.variable_selection}`. */
    title?: string;
    /** `param2` - the header selector's source types; none, no selector. */
    sourceTypeOptions?: readonly number[] | null;
    /** A merged section's `setMergedSourceType` - see the docblock. */
    onSourceTypeSelect?: (sourceType: number) => void;
    filter?: WiredVariableFilter;
    state: WiredVariablePickerState;
    onChange: (state: WiredVariablePickerState, variable: IWiredVariable | null) => void;
    /** `wiredContext.roomVariablesList.variables` (`getWiredRoomVariables`). */
    variables: readonly IWiredVariable[] | null | undefined;
    roomId: number;
}

export const WiredChooseVariableSection = ({ title = '${wiredfurni.params.variables.variable_selection}', sourceTypeOptions, onSourceTypeSelect, filter, state, onChange, variables, roomId }: WiredChooseVariableSectionProps) => {
    const selectSourceType = onSourceTypeSelect ?? ((sourceType: number) => {
        const next = setPickerTarget(state, sourceType);

        onChange(next, getPickerSelectedVariable(variables, next));
    });

    return (
        <WiredSection
            title={title}
            sourceTypeSelector={sourceTypeOptions ? { options: sourceTypeOptions, selected: state.target, onSelect: selectSourceType } : undefined}
        >
            <WiredVariablePicker
                variables={variables}
                state={state}
                onChange={onChange}
                filter={filter}
                roomId={roomId}
            />
        </WiredSection>
    );
};
