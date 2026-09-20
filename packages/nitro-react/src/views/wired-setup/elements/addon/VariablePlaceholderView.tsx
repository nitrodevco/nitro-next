/**
 * `addons/§_-L2e§.buildInputs` - the placeholder's name (`$` prefix), the variable (merged input
 * source 0, its source type selector in the section header), the display mode (value or text) and
 * the placeholder type, whose "show all" is unavailable for a global or context variable.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { changeVariablePlaceholderVariable, getWiredInt, getWiredRoomVariables, isVariablePlaceholderMultipleDisabled, VariablePlaceholderAddonForm, variablePlaceholderFilter, variableReferenceSourceOptions, WiredElementView } from '#base/wired';

import { WiredChooseVariableSection } from '../../kit/WiredChooseVariableSection';
import { WiredPlaceholderNameSection } from '../../kit/WiredPlaceholderNameSection';
import { WiredPlaceholderTypeSection } from '../../kit/WiredPlaceholderTypeSection';
import { WiredVariablePlaceholderModeSection } from '../../kit/WiredVariablePlaceholderModeSection';

export const VariablePlaceholderView: WiredElementView<VariablePlaceholderAddonForm> = ({ form, setForm, triggerable, ctx }) => (
    <>
        <WiredPlaceholderNameSection
            title="${wiredfurni.params.texts.placeholder_name}"
            prefix="$"
            value={form.name}
            onChange={name => setForm({ name })}
        />
        <WiredChooseVariableSection
            sourceTypeOptions={variableReferenceSourceOptions(ctx, getWiredInt(triggerable, 1))}
            onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
            filter={variablePlaceholderFilter}
            state={form.picker}
            onChange={(picker, variable) => setForm(current => changeVariablePlaceholderVariable({ ...current, picker }, variable))}
            variables={getWiredRoomVariables(triggerable)}
            roomId={ctx.roomId}
        />
        <WiredVariablePlaceholderModeSection
            title="${wiredfurni.params.texts.variable_display_type}"
            textMode={form.textMode}
            onChange={textMode => setForm({ textMode })}
            textModeDisabled={form.textModeDisabled}
        />
        <WiredPlaceholderTypeSection
            showMultiple={form.showMultiple}
            delimiter={form.delimiter}
            onChange={(showMultiple, delimiter) => setForm({ showMultiple, delimiter })}
            multipleDisabled={isVariablePlaceholderMultipleDisabled(form.picker.target)}
        />
    </>
);
