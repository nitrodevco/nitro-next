/**
 * `addons/§_-e2X§` (VARIABLE_TIME_UTIL, `wf_xtra_var_time_util`) - reads a variable as a point in
 * time - its value, its creation time or its last update time - and creates calendar
 * sub-variables from it (seconds of the minute ... year), plus advanced ones counting whole
 * milliseconds ... months.
 *
 * Int params: `[ sub-variable mask, mode ]` - the calendar sub-variables are bits 1 to 10, the
 * advanced ones bits 20 to 26 of the one mask.
 *
 * The mode drop-down offers only what the stack's variables (`wiredContext.rulesetVariables`) can
 * give - all three when there are none - and always the mode the box was saved with.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';

import type { WiredSubVariableParam } from '../../common/SubVariableParam';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, type WiredTriggerable } from '../../WiredTriggerable';
import { AddonCodes } from './addonCodes';
import { readWiredDropdownSelectedId, reinitWiredDropdownSelection } from './addonShared';

/** `§_-e2X§.§_-zQ§` / `TYPE_CREATION_TIME` / `TYPE_LAST_UPDATE_TIME` - the mode ids, `time_util.mode.<id>`. */
export const TIME_UTIL_TYPE_VALUE = 0;
export const TIME_UTIL_TYPE_CREATION_TIME = 1;
export const TIME_UTIL_TYPE_LAST_UPDATE_TIME = 2;

/** The calendar sub-variables, the mask's low 16 bits. */
export const TIME_UTIL_SUB_VARIABLES: WiredSubVariableParam[] = [
    { id: 1, name: 'milliseconds_of_seconds' },
    { id: 2, name: 'seconds_of_minute' },
    { id: 3, name: 'minute_of_hour' },
    { id: 4, name: 'hour_of_day' },
    { id: 5, name: 'day_of_week' },
    { id: 6, name: 'day_of_month' },
    { id: 7, name: 'day_of_year' },
    { id: 8, name: 'week_of_year' },
    { id: 9, name: 'month_of_year' },
    { id: 10, name: 'year' },
];

/** The advanced sub-variables, the mask's high 16 bits. */
export const TIME_UTIL_ADVANCED_SUB_VARIABLES: WiredSubVariableParam[] = [
    { id: 20, name: 'millisecond' },
    { id: 21, name: 'second' },
    { id: 22, name: 'minute' },
    { id: 23, name: 'hour' },
    { id: 24, name: 'day' },
    { id: 25, name: 'week' },
    { id: 26, name: 'month' },
];

const LOW_MASK = 0xFFFF;
const HIGH_MASK = 0xFFFF0000;

/** `showValue` / `showCreationTime` / `showLastUpdateTime`: the saved mode, no variables, or a variable that has it. */
const showsMode = (variables: readonly IWiredVariable[], savedMode: number, mode: number, has: (variable: IWiredVariable) => boolean): boolean =>
    (savedMode === mode) || (variables.length === 0) || variables.some(has);

/** `onEditStart`'s drop-down options for a box. */
export const timeUtilModeOptions = (triggerable: WiredTriggerable): number[] => {
    const variables = triggerable.wiredContext.rulesetVariables?.variables ?? [];
    const savedMode = getWiredInt(triggerable, 1);
    const ids: number[] = [];

    if (showsMode(variables, savedMode, TIME_UTIL_TYPE_VALUE, variable => variable.hasValue)) ids.push(TIME_UTIL_TYPE_VALUE);
    if (showsMode(variables, savedMode, TIME_UTIL_TYPE_CREATION_TIME, variable => variable.canReadCreationTime)) ids.push(TIME_UTIL_TYPE_CREATION_TIME);
    if (showsMode(variables, savedMode, TIME_UTIL_TYPE_LAST_UPDATE_TIME, variable => variable.canReadLastUpdateTime)) ids.push(TIME_UTIL_TYPE_LAST_UPDATE_TIME);

    return ids;
};

export interface VariableTimeUtilAddonForm {
    /** `§_-22H§.mask` - the calendar sub-variables. */
    subVariables: number;
    /** `§_-n14§.mask` - the advanced sub-variables. */
    advancedSubVariables: number;
    /** The mode drop-down's selection. */
    mode: number;
}

export const variableTimeUtilAddon: WiredElementDefinition<VariableTimeUtilAddonForm> = {
    holder: 'addon',
    code: AddonCodes.VARIABLE_TIME_UTIL,
    createForm: (triggerable) => {
        const mask = getWiredInt(triggerable, 0);

        return {
            subVariables: mask & LOW_MASK,
            advancedSubVariables: mask & HIGH_MASK,
            mode: reinitWiredDropdownSelection(timeUtilModeOptions(triggerable), getWiredInt(triggerable, 1)),
        };
    },
    readIntParams: form => [ form.subVariables | form.advancedSubVariables, readWiredDropdownSelectedId(form.mode) ],
};
