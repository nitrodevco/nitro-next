/**
 * `addons/SelectorFilter.buildInputs` (both `§_-515§` and `§_-Fk§`) - one value-or-variable
 * section (`setfilter`, 1 to 1000) on merged input source 0, its source types offered as
 * `mergedSourceOptions(0)` for the target the box was saved with.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { getWiredInt, getWiredRoomVariables, SELECTOR_FILTER_MAX, SELECTOR_FILTER_MIN, SelectorFilterAddonForm, variableReferenceSourceOptions, WiredElementView } from '#base/wired';

import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';

export const SelectorFilterView: WiredElementView<SelectorFilterAddonForm> = ({ form, setForm, triggerable, ctx }) => (
    <WiredValueOrVariableSection
        title="${wiredfurni.params.setfilter}"
        sourceTypeOptions={variableReferenceSourceOptions(ctx, getWiredInt(triggerable, 2))}
        min={SELECTOR_FILTER_MIN}
        max={SELECTOR_FILTER_MAX}
        state={form.filter}
        onChange={filter => setForm({ filter })}
        onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
        variables={getWiredRoomVariables(triggerable)}
        roomId={ctx.roomId}
    />
);
