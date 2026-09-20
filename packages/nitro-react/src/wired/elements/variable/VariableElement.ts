/**
 * What every variable box shares - Flash's `variables.§_-RF§` interface (`initialVariableName`,
 * `variableType()`) and `§_-D1J§`, the base class all nine variable elements extend.
 *
 * `initialVariableName` is the name the box was saved with (its string param, or the part before
 * the tab); `UserDefinedRoomEventsCtrl` shows the header's "view in menu" button when it is not
 * empty and opens `wiredmenu/open/variable_overview/<name>` with it. `variableType()` is the
 * target (`WiredVariableTarget`) of the variable the box creates; Flash declares it on the
 * interface and nothing in the client reads it, so it is kept here as data on the definition.
 *
 * `VariableNameSection.variableName` (the getter) returns its text with spaces as underscores and
 * in lower case, so the name is normalised when it is read (`readVariableName`), not when it is
 * set - Flash's `initialVariableName` setter writes the raw string param into the field.
 */
import { WiredVariableAvailability } from '@nitrodevco/nitro-packets';

import { normalizeWiredVariableName } from '../../common/WiredVariableSections';
import type { WiredElementDefinition } from '../../WiredElement';

/** `§_-D1J§` + `§_-RF§`. */
export interface WiredVariableElementDefinition<F> extends WiredElementDefinition<F> {
    holder: 'variable';
    initialVariableName: (form: F) => string;
    /** `§_-RF§.variableType()` - the created variable's `WiredVariableTarget`. */
    variableType: (form: F) => number;
}

/** The fields `§_-D1J§` keeps: the name the box was opened with and the name section's text. */
export interface WiredVariableElementForm {
    /** `_initialVariableName`. */
    initialVariableName: string;
    /** `variableNameSection`'s text, as typed. */
    name: string;
}

/** `§_-D1J§.isVariableStored` - availability 11 (`§_-d12§`) or 10 (`§_-1p§`): the value outlives the room. */
export const isWiredVariableStored = (availability: number): boolean =>
    (availability === Number(WiredVariableAvailability.Shared)) || (availability === Number(WiredVariableAvailability.Persistent));

/** `set initialVariableName(name)` - the base fields of a box opened with `name`. */
export const createVariableElementForm = (name: string): WiredVariableElementForm => ({
    initialVariableName: name,
    name: name,
});

/** `VariableNameSection.variableName` (the getter). */
export const readVariableName = (form: WiredVariableElementForm): string => normalizeWiredVariableName(form.name);

/** `§_-Q22§` / `§_-m1q§` / `§_-34§`.`STRING_PARAM_SPLITTER` - the name and the box's second text share the string param. */
export const VARIABLE_STRING_PARAM_SPLITTER = '\t';

/** `stringParam.split(STRING_PARAM_SPLITTER)` - `[ name, text ]`, each `''` when missing. */
export const splitVariableStringParam = (stringParam: string): [ string, string ] => {
    const parts = stringParam.split(VARIABLE_STRING_PARAM_SPLITTER);

    return [ (parts.length > 0) ? parts[0] : '', (parts.length > 1) ? parts[1] : '' ];
};
