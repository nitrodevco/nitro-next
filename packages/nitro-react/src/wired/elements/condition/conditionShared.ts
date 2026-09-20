/**
 * What several condition elements share and Flash writes out in each of them: the slider's
 * clamping (`SliderWindowControllerNew.setValue`, which every `SliderSection.value = x` in an
 * `onEditStart` goes through), the two comparison radios (`comparison.0` to `.2`, and the six
 * operator symbols of the variable and chest conditions) and the source type a merged section
 * opens on.
 */
import { resolveSourceTypeSelection } from '../../common/sourceTypeColors';
import type { WiredElementContext, WiredElementDefinition } from '../../WiredElement';
import { getMergedSourceOptions, getMergedType } from '../../WiredInputSources';

/** `SliderWindowControllerNew.setValue` - a slider takes any value, and holds it clamped to its range. */
export const clampConditionSliderValue = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/** `RadioButtonParam(0, l("comparison.0"))` ... `(2, l("comparison.2"))` - less than, equal, greater than. */
export const CONDITION_COMPARISON_IDS = [ 0, 1, 2 ];

/**
 * The operator radio of `§_-d1W§` (variable value) and `ChestHasAmount`, six columns, ids in the
 * order Flash lists them: `>` 2, `≥` 5, `=` 1, `≤` 3, `<` 0, `≠` 4.
 */
export const CONDITION_OPERATORS: readonly { id: number; label: string }[] = [
    { id: 2, label: '>' },
    { id: 5, label: '≥' },
    { id: 1, label: '=' },
    { id: 3, label: '≤' },
    { id: 0, label: '<' },
    { id: 4, label: '≠' },
];

/** `mergedSourceOptions(id)` of a condition element and its form - what its own type picker offers. */
export const conditionMergedSourceOptions = <F>(definition: WiredElementDefinition<F>, form: F, id: number, ctx: WiredElementContext): number[] =>
    getMergedSourceOptions(definition, form, id, ctx);

/**
 * `onEditInitialized`'s `getSourceTypeSelector().select(target)` on a box whose element draws its
 * own type picker: a target the selector does not offer leaves it on the first option, which
 * `initialize` clicked, and that is what the box saves. Applied to every merged section of the
 * element, through its own `setMergedType`.
 */
export const resolveConditionMergedTypes = <F>(definition: WiredElementDefinition<F>, form: F, ctx: WiredElementContext): F => {
    let next = form;

    (definition.mergedSelections ?? []).forEach((_, id) => {
        const current = getMergedType(definition, next, id);
        const resolved = resolveSourceTypeSelection(conditionMergedSourceOptions(definition, next, id, ctx), current);

        if ((resolved !== current) && definition.setMergedType) next = definition.setMergedType(next, id, resolved);
    });

    return next;
};
