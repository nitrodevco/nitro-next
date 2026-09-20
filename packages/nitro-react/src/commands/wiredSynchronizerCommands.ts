/**
 * `WiredVariablesSynchronizer` - keeps the room's wired variables cached on the client without
 * re-sending them every time a dialog needs the list. The server has one hash over all variables
 * and one per variable: the client asks for the big hash, and only when that differs from what it
 * has does it send its own `(variable id, hash)` list and get back what was removed, added or
 * changed.
 *
 * The cache and the request state live in `WiredVariablesSlice`; the two packet listeners in
 * `handlers/wired/registerWiredVariablesHandlers.ts` call `onWiredAllVariablesHash` and
 * `onWiredAllVariablesDiffs` below. Flash clears all of it on `REE_DISPOSED` - `resetRoom` here.
 */
import type { IWiredVariable, WiredAllVariablesDiffsMessageType } from '@nitrodevco/nitro-packets';
import { WiredGetAllVariablesDiffsComposer, WiredGetAllVariablesHashComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { WIRED_VARIABLES_STATUS_AWAIT_DIFFS, WIRED_VARIABLES_STATUS_AWAIT_HASH, WIRED_VARIABLES_STATUS_IDLE, wiredStore, WiredVariablesListener } from '#base/context/wired';
import { sortVariables } from '#base/wired';

type Send = WebSocketConnection['send'];

/** `REQUEST_OFFSET` - an answer younger than this is served from the cache without asking again. */
const REQUEST_OFFSET_MS = 800;
/** `INVALIDATE_REQUEST_OFFSET` - a request the server has not answered for this long is given up on. */
const INVALIDATE_REQUEST_OFFSET_MS = 4000;

const addListener = (listener: WiredVariablesListener) => {
    const { variablesListeners, setVariablesListeners } = wiredStore.getState();

    if (!variablesListeners.includes(listener)) setVariablesListeners([ ...variablesListeners, listener ]);
};

/** `updateListeners` - every waiting callback gets the sorted list once, then the list of callbacks is emptied. */
const updateListeners = () => {
    const { variablesListeners, sortedVariables, setVariablesListeners } = wiredStore.getState();

    setVariablesListeners([]);

    for (const listener of variablesListeners) listener(sortedVariables);
};

/** `WiredVariablesSynchronizer.removeListener`. */
export const removeWiredVariablesListener = (listener: WiredVariablesListener) => {
    const { variablesListeners, setVariablesListeners } = wiredStore.getState();

    if (variablesListeners.includes(listener)) setVariablesListeners(variablesListeners.filter(x => x !== listener));
};

/** `WiredVariablesSynchronizer.getCachedVariableById`. */
export const getCachedWiredVariableById = (variableId: string): IWiredVariable | undefined => wiredStore.getState().variablesById?.[variableId];

/** `onAllVariablesHash` - the room's hash, from the server or from a triggerable that carried it. */
export const onWiredAllVariablesHash = (send: Send, allVariablesHash: number) => {
    const state = wiredStore.getState();

    if (state.variablesStatus !== WIRED_VARIABLES_STATUS_AWAIT_HASH) return;

    state.setVariablesRequestedAt(performance.now());

    if (allVariablesHash === state.allVariablesHash) {
        updateListeners();
        state.setVariablesStatus(WIRED_VARIABLES_STATUS_IDLE);

        return;
    }

    state.setAllVariablesHash(allVariablesHash);
    state.setVariablesStatus(WIRED_VARIABLES_STATUS_AWAIT_DIFFS);

    send(new WiredGetAllVariablesDiffsComposer({ variableIdToHash: new Map(Object.entries(state.variableHashesById ?? {})) }));
};

/** `onAllVariablesDiffEvent` - one chunk of the difference; the listeners are told after the last. */
export const onWiredAllVariablesDiffs = (data: WiredAllVariablesDiffsMessageType) => {
    const state = wiredStore.getState();

    if (state.variablesStatus !== WIRED_VARIABLES_STATUS_AWAIT_DIFFS) return;

    state.setVariablesRequestedAt(performance.now());
    state.setAllVariablesHash(data.allVariablesHash);

    const variablesById = { ...state.variablesById };
    const variableHashesById = { ...state.variableHashesById };

    for (const variableId of data.removedVariables) {
        delete variablesById[variableId];
        delete variableHashesById[variableId];
    }

    for (const [ variable, hash ] of data.addedOrUpdated) {
        variablesById[variable.variableId] = variable;
        variableHashesById[variable.variableId] = hash;
    }

    state.setVariablesCache(variablesById, variableHashesById, sortVariables(Object.values(variablesById)));

    if (!data.isLastChunk) return;

    updateListeners();
    wiredStore.getState().setVariablesStatus(WIRED_VARIABLES_STATUS_IDLE);
};

/**
 * `WiredVariablesSynchronizer.getAllVariables`. Returns `true` when `listener` was answered
 * from the cache on the spot, `false` when it will be called once the server has answered.
 *
 * - `forceRefresh` `false` is content with whatever is cached, however old.
 * - `knownHash` is the room's hash when the caller already has it (a triggerable carries it in
 *   `wiredContext.roomVariablesList.hash`), which saves the hash round trip.
 */
export const getAllWiredVariables = (send: Send, listener: WiredVariablesListener, forceRefresh: boolean = true, knownHash: number = 0): boolean => {
    const now = performance.now();

    let state = wiredStore.getState();

    if ((state.variablesStatus !== WIRED_VARIABLES_STATUS_IDLE) && (state.variablesRequestedAt < (now - INVALIDATE_REQUEST_OFFSET_MS))) {
        state.setVariablesStatus(WIRED_VARIABLES_STATUS_IDLE);

        state = wiredStore.getState();
    }

    if (state.variablesStatus !== WIRED_VARIABLES_STATUS_IDLE) {
        addListener(listener);

        return false;
    }

    if ((state.variablesRequestedAt > (now - REQUEST_OFFSET_MS)) || (!forceRefresh && state.variablesById)) {
        listener(state.sortedVariables);

        return true;
    }

    state.setVariablesRequestedAt(now);
    state.setVariablesStatus(WIRED_VARIABLES_STATUS_AWAIT_HASH);

    addListener(listener);

    if (knownHash !== 0) onWiredAllVariablesHash(send, knownHash);
    else send(new WiredGetAllVariablesHashComposer({}));

    return false;
};

/** `getAllVariables` as a promise, for callers that have nothing to cancel. */
export const requestAllWiredVariables = (send: Send, forceRefresh: boolean = true, knownHash: number = 0): Promise<IWiredVariable[]> =>
    new Promise(resolve => getAllWiredVariables(send, resolve, forceRefresh, knownHash));
