/**
 * What each wired element remembers between edits - the instance fields a Flash element sets and
 * `onEditStart` does not reset: `ActorHasHandItem.§_-ss§` / `§_-l1M§`'s hand item list (grown by
 * every code a box or the capture button brought in), `BotChangeFigure._figureString`,
 * `§_-02a§.§_-V1A§` (the time zone `readStringParamFromForm` last returned),
 * `InNeighborhood._preferBigMode` and the group elements' `§_-7g§` (when they last asked for the
 * user's groups).
 *
 * Flash has one element instance per box type for the whole client session (`ActionTypes`,
 * `ConditionTypes`, ... are built once), so this state outlives rooms: it is not part of
 * `resetRoom`. It goes when the elements' inputs are rebuilt - `clearCache`, which
 * `setPreferredWiredStyleByName` runs on a style change - since `buildInputs` re-creates the
 * lists and the element's fields with them.
 *
 * Definitions write it through `rememberOnEdit` (after `createForm` and every form change - the
 * core runs it in `openSetup` / `setSetupForm` / `patchSetup`) and `rememberOnRead` (whenever the
 * form is read for a save or a copy, where Flash's `read*FromForm` set it), and read it back
 * through `WiredElementContext.elementMemory`.
 */
import { StateCreator } from 'zustand';

import type { WiredElementDefinition, WiredElementMemory, WiredHolderKey } from '#base/wired';

/** An element instance's key: `holder.getKey() + "-" + element.code`, the element that serves both a code and its `negativeCode`. */
export const wiredElementMemoryKey = (holder: WiredHolderKey, code: number) => `${holder}-${code}`;

const EMPTY_MEMORY: WiredElementMemory = {};

/** The memory of one element instance - `{}` for one that has remembered nothing yet. */
export const getWiredElementMemory = (elementMemory: Readonly<Record<string, WiredElementMemory>>, holder: WiredHolderKey, code: number): WiredElementMemory =>
    elementMemory[wiredElementMemoryKey(holder, code)] ?? EMPTY_MEMORY;

/** `elementMemory` with `patch` merged into `definition`'s entry; the same object when there is nothing to merge. */
export const mergeWiredElementMemory = (elementMemory: Readonly<Record<string, WiredElementMemory>>, definition: Pick<WiredElementDefinition<unknown>, 'holder' | 'code'>, patch: WiredElementMemory | null | undefined): Record<string, WiredElementMemory> => {
    if (!patch) return elementMemory;

    const key = wiredElementMemoryKey(definition.holder, definition.code);

    return { ...elementMemory, [key]: { ...(elementMemory[key] ?? EMPTY_MEMORY), ...patch } };
};

type State = {
    /** By `wiredElementMemoryKey`. */
    elementMemory: Record<string, WiredElementMemory>;
};

type Actions = {
    /** Merges `patch` into the memory of `definition`'s element instance. */
    rememberWiredElement: (definition: Pick<WiredElementDefinition<unknown>, 'holder' | 'code'>, patch: WiredElementMemory | null | undefined) => void;
    /** `clearCache` - every element's inputs are rebuilt. */
    clearWiredElementMemory: () => void;
};

export const WiredElementMemorySliceInitialState: State = {
    elementMemory: {},
};

export type WiredElementMemorySlice = State & Actions;

export const createWiredElementMemorySlice: StateCreator<WiredElementMemorySlice, [], [], WiredElementMemorySlice> = set => ({
    ...WiredElementMemorySliceInitialState,
    rememberWiredElement: (definition, patch) => set(x => (patch ? { elementMemory: mergeWiredElementMemory(x.elementMemory, definition, patch) } : x)),
    clearWiredElementMemory: () => set({ elementMemory: {} }),
});
