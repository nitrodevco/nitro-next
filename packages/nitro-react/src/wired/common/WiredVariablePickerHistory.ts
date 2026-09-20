/**
 * `uibuilder/presets/newvariablepicker/NewVariablePickerHelper` - the variables a user picked
 * recently, per room and per variable target, newest first and capped at 20. It feeds the
 * picker's "recent" tab and lives as long as the client does, like the helper on Flash's
 * `HabboUserDefinedRoomEvents` component. (The helper's other half, a pool of row windows, has no
 * counterpart: React owns the rows.)
 *
 * Flash records a variable in `VariablePickerPreset.finalizeSelection`, which an element calls
 * from `readVariableIdsFromForm` - so whenever the form is read: on save and on copy. Reading a
 * form is a pure function here, so the caller that reads it records the result instead:
 * `rememberPickedVariables(roomId, definition.readVariableIds(form, ctx), roomVariables)`. Ids
 * that are no variable of the room (the `n` placeholder of an unused slot) are skipped, which is
 * what not calling `finalizeSelection` for them did.
 *
 * This is a store outside React: `subscribeVariablePickerHistory` + `getVariablePickerHistory`
 * are the two halves of a `useSyncExternalStore`. Lists are replaced, never mutated, so a list
 * that was handed out stays a valid snapshot.
 */
import { IWiredVariable } from '@nitrodevco/nitro-packets';

/** `NewVariablePickerHelper.MAX_HISTORY`. */
const MAX_HISTORY = 20;

const EMPTY: readonly string[] = [];

/** roomId -> variable target -> variable ids. */
const historyByRoom = new Map<number, Map<number, readonly string[]>>();
const listeners = new Set<() => void>();

export const subscribeVariablePickerHistory = (listener: () => void): (() => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

/** `NewVariablePickerHelper.getHistory` - nothing outside a room (`roomId` 0). */
export const getVariablePickerHistory = (roomId: number, target: number): readonly string[] =>
    historyByRoom.get(roomId)?.get(target) ?? EMPTY;

/** `NewVariablePickerHelper.addToHistory` - moves the variable to the front of its target's list. */
export const addToVariablePickerHistory = (roomId: number, variable: IWiredVariable): void => {
    if (roomId === 0) return;

    let byTarget = historyByRoom.get(roomId);

    if (!byTarget) {
        byTarget = new Map();

        historyByRoom.set(roomId, byTarget);
    }

    const previous = byTarget.get(variable.variableTarget) ?? EMPTY;
    const next = [ variable.variableId, ...previous.filter(variableId => variableId !== variable.variableId) ].slice(0, MAX_HISTORY);

    byTarget.set(variable.variableTarget, next);

    for (const listener of listeners) listener();
};

/** What `finalizeSelection` did for every picker of a form, given the ids the form was read to. */
export const rememberPickedVariables = (roomId: number, variableIds: readonly string[], roomVariables: readonly IWiredVariable[] | null | undefined): void => {
    if (!roomVariables) return;

    for (const variableId of variableIds) {
        const variable = roomVariables.find(candidate => candidate.variableId === variableId);

        if (variable) addToVariablePickerHistory(roomId, variable);
    }
};
