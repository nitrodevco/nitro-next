/**
 * The room's wired variables as the client last synchronized them -
 * `WiredVariablesSynchronizer`'s cache and its request state. The state machine itself (when to
 * ask for the hash, when for the diffs, who is told) is in `commands/wiredSynchronizerCommands.ts`;
 * this slice is what it keeps between packets.
 *
 * Flash holds `null` dictionaries until the first diff arrives, and tells "never synchronized"
 * from "synchronized, no variables" by that; `variablesById` is `undefined` for the same reason.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `WiredVariablesSynchronizer.STATUS_IDLE`. */
export const WIRED_VARIABLES_STATUS_IDLE = 0;
/** `WiredVariablesSynchronizer.STATUS_AWAIT_HASH`. */
export const WIRED_VARIABLES_STATUS_AWAIT_HASH = 1;
/** `WiredVariablesSynchronizer.STATUS_AWAIT_DIFFS`. */
export const WIRED_VARIABLES_STATUS_AWAIT_DIFFS = 2;

/** A `getAllVariables` callback: called once with the sorted variables, then forgotten. */
export type WiredVariablesListener = (variables: IWiredVariable[]) => void;

type State = {
    variablesStatus: number;
    /** `§_-d2m§` - `performance.now()` of the last request or answer; -1 before the first. */
    variablesRequestedAt: number;
    allVariablesHash: number;
    /** `§_-x1o§`. */
    variablesById: Record<string, IWiredVariable> | undefined;
    /** `_variableIdToHash` - what `WiredGetAllVariablesDiffsComposer` sends back. */
    variableHashesById: Record<string, number> | undefined;
    /** `sortedCachedVariables`, kept ready so a view can select it without sorting on every render. */
    sortedVariables: IWiredVariable[];
    variablesListeners: WiredVariablesListener[];
};

type Actions = {
    setVariablesStatus: (variablesStatus: number) => void;
    setVariablesRequestedAt: (variablesRequestedAt: number) => void;
    setAllVariablesHash: (allVariablesHash: number) => void;
    /** Replaces the cache; `sortedVariables` is what the caller sorted it into. */
    setVariablesCache: (variablesById: Record<string, IWiredVariable>, variableHashesById: Record<string, number>, sortedVariables: IWiredVariable[]) => void;
    setVariablesListeners: (variablesListeners: WiredVariablesListener[]) => void;
};

export const WiredVariablesSliceInitialState: State = {
    variablesStatus: WIRED_VARIABLES_STATUS_IDLE,
    variablesRequestedAt: -1,
    allVariablesHash: 0,
    variablesById: undefined,
    variableHashesById: undefined,
    sortedVariables: [],
    variablesListeners: [],
};

export type WiredVariablesSlice = State & Actions;

export const createWiredVariablesSlice: StateCreator<WiredVariablesSlice, [], [], WiredVariablesSlice> = set => ({
    ...WiredVariablesSliceInitialState,
    setVariablesStatus: variablesStatus => set({ variablesStatus }),
    setVariablesRequestedAt: variablesRequestedAt => set({ variablesRequestedAt }),
    setAllVariablesHash: allVariablesHash => set({ allVariablesHash }),
    setVariablesCache: (variablesById, variableHashesById, sortedVariables) => set({ variablesById, variableHashesById, sortedVariables }),
    setVariablesListeners: variablesListeners => set({ variablesListeners }),
});
