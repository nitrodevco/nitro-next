/**
 * Flash `VariableLeaderboardController`: asks for the room's leaderboards when the room is entered,
 * applies the snapshot that answers, subscribes each leaderboard to the chunks its page needs and
 * takes in the chunks the server sends for them.
 */
import { CloseConnectionMessage, IVariableLeaderboardDescriptor, RoomEntryInfoMessage, VariableLeaderboardChunkUpdateMessage, VariableLeaderboardReplaceSubscriptionComposer, VariableLeaderboardSnapshotMessage } from '@nitrodevco/nitro-packets';

import { reconcileLeaderboardSubscription, resetLeaderboardQueryScope } from '#base/commands';
import { Send, WebSocketConnection } from '#base/context/communication';
import { leaderboardPageCount, leaderboardPageSize, VARIABLE_LEADERBOARD_MAX_OVERLAYS, wiredStore } from '#base/context/wired';
import { VARIABLE_LEADERBOARD_COLUMN_USERNAME, VARIABLE_LEADERBOARD_MAX_COLUMNS, VARIABLE_LEADERBOARD_NULL_VARIABLE_ID } from '#base/wired';

import { on, subscribeAll } from '../packetSubscriptions';

/** `VariableLeaderboardController.isDescriptorStructurallyValid`. */
const isStructurallyValid = (descriptor: IVariableLeaderboardDescriptor) => {
    const { columns, choices, defaultVariableId, pageSizeOption } = descriptor;

    if ((columns.length < 1) || (columns.length > VARIABLE_LEADERBOARD_MAX_COLUMNS) || (columns[0].type !== VARIABLE_LEADERBOARD_COLUMN_USERNAME) || (choices.length > 10) || (pageSizeOption < 0) || (pageSizeOption > 2)) return false;
    if (columns.some(column => (column.width < 0) || (column.width > 3))) return false;

    const ids = new Set<string>();

    for (const choice of choices) {
        if (!choice.variableId || ids.has(choice.variableId)) return false;

        ids.add(choice.variableId);
    }

    return (choices.length === 0) ? (defaultVariableId === VARIABLE_LEADERBOARD_NULL_VARIABLE_ID) : ids.has(defaultVariableId);
};

/** `VariableLeaderboardController.resolveSelection`: the variable still offered, else the default. */
const resolveSelection = (descriptor: IVariableLeaderboardDescriptor, selected: string | null) => {
    if (!descriptor.choices.length) return null;

    return descriptor.choices.some(choice => choice.variableId === selected) ? selected : descriptor.defaultVariableId;
};

/**
 * `refreshView`'s page size: the edited leaderboard pages by the size its editor describes, the rest
 * by their descriptor's. A size that changed starts the leaderboard over at its first page
 * (`VariableLeaderboardPagingState.entriesPerPage`) and subscribes to the chunks that page needs.
 */
const syncEntriesPerPage = (send: Send) => {
    const { leaderboards, leaderboardLocationEdit, leaderboardLocationEditId, setLeaderboardSnapshot } = wiredStore.getState();
    let changed = false;

    const next = leaderboards.map((overlay) => {
        const edited = !!leaderboardLocationEdit && (leaderboardLocationEditId === overlay.descriptor.overlayInstanceId);
        const entriesPerPage = leaderboardPageSize(edited ? leaderboardLocationEdit.draft : overlay.descriptor);

        if (entriesPerPage === overlay.entriesPerPage) return overlay;

        changed = true;

        return reconcileLeaderboardSubscription(send, { ...overlay, entriesPerPage, page: 0, direction: 0 });
    });

    if (changed) setLeaderboardSnapshot(next);
};

export const registerWiredVariableLeaderboardHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const unsubscribeStore = wiredStore.subscribe((state, previous) => {
        if ((state.leaderboardLocationEdit !== previous.leaderboardLocationEdit) || (state.leaderboards !== previous.leaderboards)) syncEntriesPerPage(send);
    });

    const unsubscribePackets = subscribeAll(subscribe, [
        // `onRoomEntryInfo`: a new room forgets the last one's leaderboards and asks for its own.
        on(RoomEntryInfoMessage, (data) => {
            const roomId = data.roomId;

            if (!roomId || (wiredStore.getState().leaderboardRoomId === roomId)) return;

            wiredStore.getState().setLeaderboardRoom(roomId);
            send(new VariableLeaderboardReplaceSubscriptionComposer({ overlayInstanceId: 0, queryRevision: 0, selectedVariableId: VARIABLE_LEADERBOARD_NULL_VARIABLE_ID, chunkIndices: [] }));
        }),

        // `onRoomConnectionClosed`.
        on(CloseConnectionMessage, () => wiredStore.getState().setLeaderboardRoom(0)),

        // `onSnapshot` + `applyDescriptor` / `applyRemoval`.
        on(VariableLeaderboardSnapshotMessage, (data) => {
            const { leaderboardRoomId, leaderboards, setLeaderboardSnapshot } = wiredStore.getState();

            if (!leaderboardRoomId || !data.valid) return;

            const named = new Set(data.descriptors.map(descriptor => descriptor.overlayInstanceId));
            const next = leaderboards.filter(overlay => named.has(overlay.descriptor.overlayInstanceId));
            const changed = new Set<number>();

            for (const descriptor of data.descriptors) {
                if (!isStructurallyValid(descriptor)) continue;

                const index = next.findIndex(overlay => overlay.descriptor.overlayInstanceId === descriptor.overlayInstanceId);

                if (index < 0) {
                    if (next.length >= VARIABLE_LEADERBOARD_MAX_OVERLAYS) continue;

                    next.push(resetLeaderboardQueryScope({ descriptor, selectedVariableId: null, entriesPerPage: leaderboardPageSize(descriptor), page: 0, direction: 0, totalCount: null, chunks: {}, subscribedChunks: [], subscribedVariableId: null }, resolveSelection(descriptor, null)));
                    changed.add(descriptor.overlayInstanceId);

                    continue;
                }

                const known = next[index];

                if (descriptor.queryRevision < known.descriptor.queryRevision) continue;

                const selection = resolveSelection(descriptor, known.selectedVariableId);

                next[index] = ((descriptor.queryRevision !== known.descriptor.queryRevision) || (selection !== known.selectedVariableId)) ? resetLeaderboardQueryScope({ ...known, descriptor }, selection) : { ...known, descriptor };

                if (next[index] !== known) changed.add(descriptor.overlayInstanceId);
            }

            setLeaderboardSnapshot(next);
            setLeaderboardSnapshot(wiredStore.getState().leaderboards.map(overlay => changed.has(overlay.descriptor.overlayInstanceId) ? reconcileLeaderboardSubscription(send, overlay) : overlay));
        }),

        // `onChunkUpdate`.
        on(VariableLeaderboardChunkUpdateMessage, (data) => {
            const { leaderboardRoomId, leaderboardSnapshotReceived, leaderboards, setLeaderboard } = wiredStore.getState();

            if (!leaderboardRoomId || !leaderboardSnapshotReceived || !data.valid) return;

            const overlay = leaderboards.find(existing => existing.descriptor.overlayInstanceId === data.overlayInstanceId);

            if (!overlay || (data.queryRevision !== overlay.descriptor.queryRevision) || (data.selectedVariableId !== overlay.selectedVariableId) || !overlay.subscribedChunks.includes(data.chunkIndex)) return;

            const updated = { ...overlay, chunks: { ...overlay.chunks, [data.chunkIndex]: data.rows }, totalCount: Math.max(0, data.totalCount) };
            const lastPage = leaderboardPageCount(updated) - 1;

            // `applyExactTotal`: a total that shrank below the page moves the page back.
            setLeaderboard(reconcileLeaderboardSubscription(send, (updated.page > lastPage) ? { ...updated, page: lastPage, direction: -1 } : updated));
        }),
    ]);

    return () => {
        unsubscribeStore();
        unsubscribePackets();
    };
};
