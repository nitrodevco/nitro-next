/**
 * What the action boxes with a `ValueOrVariableSection` behind a merged input source share
 * (`ProgressAchievement`, `ProgressRewardTrack`, `PlaceFurni`): the custom source types that
 * section offers besides furni and users (`getCustomSourcesForMergedType` returning
 * `[ GLOBAL_SOURCE, CONTEXT_SOURCE ]`), the options its selector shows
 * (`DefaultElement.mergedSourceOptions`).
 *
 * A box opens on its saved target as it is: Flash's `onEditInitialized` calls
 * `selector.select(target)`, which clicks only an option equal to it, so a target the selector does
 * not offer leaves the field - and what the box saves - unchanged. Only the picker shows its first
 * option (see `docs/wired.md`, "A source type the picker does not offer").
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { WIRED_SOURCE_FURNI, WIRED_SOURCE_USER, type WiredElementContext } from '../../WiredElement';

export { WIRED_VARIABLE_ID_NONE } from '../../common/WiredVariablePickerModel';

/** `getCustomSourcesForMergedType` of a variable reference: the global and the context variables. */
export const VARIABLE_REFERENCE_CUSTOM_SOURCES: number[] = [ Number(VariableExtraSourceTypes.GLOBAL_SOURCE), Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ];

/**
 * `DefaultElement.mergedSourceOptions` for a variable reference whose merged type is `target`:
 * furni, users, global, and context while `wired.variables.context_visible` is on or the box is
 * already set to it.
 */
export const variableReferenceSourceOptions = (ctx: WiredElementContext, target: number): number[] => {
    const options = [ WIRED_SOURCE_FURNI, WIRED_SOURCE_USER ];
    const context = Number(VariableExtraSourceTypes.CONTEXT_SOURCE);

    for (const sourceType of VARIABLE_REFERENCE_CUSTOM_SOURCES) {
        if ((sourceType === context) && !ctx.configBoolean('wired.variables.context_visible') && (target !== context)) continue;

        options.push(sourceType);
    }

    return options;
};
