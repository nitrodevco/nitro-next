/**
 * `conditions/chests/ChestHasAmount.buildInputs`, which `§_-229§` (`ChestHasItemTypes`) inherits -
 * the `comparison_selection` section (the six operators in one row) and the
 * `chest_compare_amount` section: an amount typed (0 to 1000000) or taken from a variable, whose
 * source type selector switches merged section 0.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { CHEST_HAS_AMOUNT_MAX, chestHasAmountCondition, ChestHasAmountConditionForm, CONDITION_OPERATORS, conditionMergedSourceOptions, getWiredRoomVariables, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';

export const ChestHasAmountView: WiredElementView<ChestHasAmountConditionForm> = ({ form, setForm, triggerable, ctx }) => (
    <>
        <WiredSection title="${wiredfurni.params.comparison_selection}">
            <WiredRadioGroup
                options={[ ...CONDITION_OPERATORS ]}
                selected={form.operator}
                onSelect={operator => setForm({ operator })}
                columns={CONDITION_OPERATORS.length}
            />
        </WiredSection>
        <WiredValueOrVariableSection
            title="${wiredfurni.params.chest_compare_amount}"
            sourceTypeOptions={conditionMergedSourceOptions(chestHasAmountCondition, form, 0, ctx)}
            min={0}
            max={CHEST_HAS_AMOUNT_MAX}
            state={form.amount}
            onChange={amount => setForm({ amount })}
            onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
            variables={getWiredRoomVariables(triggerable)}
            roomId={ctx.roomId}
        />
    </>
);
