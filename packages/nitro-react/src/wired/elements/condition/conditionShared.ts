/**
 * What several condition elements share and Flash writes out in each of them: the source types a
 * merged section's own picker offers. The comparison radio (`comparison.0` to `.2`) is the views'
 * `ComparisonSection`, the six operator symbols of the variable and chest conditions are
 * `WIRED_COMPARISON_OPERATORS` (`wired/common/operatorRadios`), and the slider's clamping
 * (`SliderWindowControllerNew.setValue`) is `clampSliderValue` in `wired/common/WiredUtil`.
 */
import type { WiredElementContext, WiredElementDefinition } from '../../WiredElement';
import { getMergedSourceOptions } from '../../WiredInputSources';

/** `mergedSourceOptions(id)` of a condition element and its form - what its own type picker offers. */
export const conditionMergedSourceOptions = <F>(definition: WiredElementDefinition<F>, form: F, id: number, ctx: WiredElementContext): number[] =>
    getMergedSourceOptions(definition, form, id, ctx);
