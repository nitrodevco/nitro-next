/**
 * `addons/§_-H2d§.buildInputs` - the usage note, then the evaluation mode radio: all, any, none,
 * not all, and the three comparisons, each with its number input (`NumberInputParam(0, 0, 1000,
 * 35)`) continuing its row.
 */
import { CONDITION_EVALUATION_COMPARE_TYPES, CONDITION_EVALUATION_FIRST_COMPARISON, CONDITION_EVALUATION_MAX_VALUE, ConditionEvaluationAddonForm, WiredElementView } from '#base/wired';

import { WiredNumberInput } from '../../kit/WiredNumberInput';
import { WiredRadioGroup, WiredRadioOption } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredUsageInfoSection } from '../../kit/WiredUsageInfoSection';

/** The comparison inputs' width. */
const VALUE_WIDTH = 35;

const PLAIN_MODES = [ 0, 1, 2, 3 ];

export const ConditionEvaluationView: WiredElementView<ConditionEvaluationAddonForm> = ({ form, setForm }) => {
    const options: WiredRadioOption[] = [
        ...PLAIN_MODES.map(id => ({ id, label: `\${wiredfurni.params.eval_mode.${id}}` })),
        ...Array.from({ length: CONDITION_EVALUATION_COMPARE_TYPES }, (_, index) => ({
            id: CONDITION_EVALUATION_FIRST_COMPARISON + index,
            label: `\${wiredfurni.params.eval_mode.cmp.${index}}`,
            extra: (
                <WiredNumberInput
                    value={form.values[index]}
                    onChange={value => setForm(current => ({ ...current, values: current.values.map((old, i) => ((i === index) ? value : old)) }))}
                    min={0}
                    max={CONDITION_EVALUATION_MAX_VALUE}
                    width={VALUE_WIDTH}
                />
            ),
        })),
    ];

    return (
        <>
            <WiredUsageInfoSection text="${wiredfurni.params.cond_eval.note}" />
            <WiredSection title="${wiredfurni.params.eval_mode}">
                <WiredRadioGroup
                    options={options}
                    selected={form.mode}
                    onSelect={mode => setForm({ mode })}
                />
            </WiredSection>
        </>
    );
};
