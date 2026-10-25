/**
 * `addons/variablefx/presets/VariableFxAdvancedRangePreset` - the folded "advanced range" section
 * (`SectionParam.COLLAPSED`): the override min and override max rows, `genericVerticalSpacing`
 * apart, each taking the range's end from a variable instead. Hidden for the categories without a
 * range. The rows are re-read from the state when the box's source type changes
 * (`refreshForSourceType`, done by `setVariableFxSourceType`).
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';

import { VARIABLE_FX_OVERRIDE_MAX, VARIABLE_FX_OVERRIDE_MIN, VariableFxOverrideRow } from '#base/wired';

import { WiredSection } from '../../../../kit/WiredSection';
import { WiredSimpleList } from '../../../../kit/WiredSimpleList';
import { useWiredStyle } from '../../../../kit/WiredStyleContext';
import { VariableFxVariableOverrideRow } from './VariableFxVariableOverrideRow';

export interface VariableFxAdvancedRangeProps {
    /** `visible = VariableFxEditorMetadata.categoryUsesValueRange(categoryId)` - hidden, the section keeps its place in the frame's list. */
    visible: boolean;
    overrideMin: VariableFxOverrideRow;
    overrideMax: VariableFxOverrideRow;
    sourceType: number;
    variables: readonly IWiredVariable[] | undefined;
    roomId: number;
    onRowChange: (kind: number, row: VariableFxOverrideRow) => void;
}

export const VariableFxAdvancedRange = ({ visible, overrideMin, overrideMax, sourceType, variables, roomId, onRowChange }: VariableFxAdvancedRangeProps) => {
    const style = useWiredStyle();

    return (
        <WiredSection
            keepsFirstSplitter
            title="${wiredfurni.params.variablefx.advanced.range}"
            visible={visible}
            collapsible
            defaultCollapsed
        >
            <WiredSimpleList spacing={style.genericVerticalSpacing}>
                <VariableFxVariableOverrideRow
                    label="${wiredfurni.params.variablefx.advanced.override_min}"
                    row={overrideMin}
                    sourceType={sourceType}
                    variables={variables}
                    roomId={roomId}
                    onChange={row => onRowChange(VARIABLE_FX_OVERRIDE_MIN, row)}
                />
                <VariableFxVariableOverrideRow
                    label="${wiredfurni.params.variablefx.advanced.override_max}"
                    row={overrideMax}
                    sourceType={sourceType}
                    variables={variables}
                    roomId={roomId}
                    onChange={row => onRowChange(VARIABLE_FX_OVERRIDE_MAX, row)}
                />
            </WiredSimpleList>
        </WiredSection>
    );
};
