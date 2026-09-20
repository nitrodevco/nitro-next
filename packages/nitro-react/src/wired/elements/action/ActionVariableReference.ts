/**
 * What the action boxes with a `ValueOrVariableSection` behind a merged input source share
 * (`ProgressAchievement`, `ProgressRewardTrack`, `PlaceFurni`): the custom source types that
 * section offers besides furni and users (`getCustomSourcesForMergedType` returning
 * `[ GLOBAL_SOURCE, CONTEXT_SOURCE ]`), the options its selector shows
 * (`DefaultElement.mergedSourceOptions`), and the target a box opens on.
 *
 * Flash's `onEditInitialized` calls `selector.select(target)`, which clicks the option whose id is
 * the target; a target the selector does not offer leaves the selector on the first option, which
 * `initialize` clicked - and that click is what `target` reads afterwards. `createForm` stores
 * that resolved target.
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { resolveSourceTypeSelection } from '../../common/sourceTypeColors';
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_USER, type WiredElementContext } from '../../WiredElement';

/** `WiredVariable.§_-i8§` - the variable id a box sends for "no variable" where Flash names it explicitly. */
export const WIRED_VARIABLE_ID_NONE = 'n';

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

/** The target a variable reference opens on - see the docblock. */
export const resolveVariableReferenceTarget = (ctx: WiredElementContext, target: number): number =>
    resolveSourceTypeSelection(variableReferenceSourceOptions(ctx, target), target);
