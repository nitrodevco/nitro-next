/**
 * What the room's WIRED leaderboards ask of the server, and the Leaderboard add-on editor's location
 * edit - Flash `VariableLeaderboardController`'s `reconcileSubscription`, `selectVariable` and
 * `movePage`, and `beginLocationEdit` / `updateDraggedLocation` / `endLocationEdit`.
 */
import { IVariableLeaderboardContext, VariableLeaderboardReplaceSubscriptionComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { desiredLeaderboardChunks, leaderboardPageCount, VariableLeaderboardOverlay, wiredStore } from '#base/context/wired';
import { sameLeaderboardConfig, sameLeaderboardLocation, VariableLeaderboardConfig, VariableLeaderboardLocation } from '#base/wired';

/** `VariableLeaderboardOverlayState.resetQueryScope`. */
export const resetLeaderboardQueryScope = (overlay: VariableLeaderboardOverlay, selectedVariableId: string | null): VariableLeaderboardOverlay => ({ ...overlay, selectedVariableId, page: 0, direction: 0, totalCount: null, chunks: {}, subscribedChunks: [], subscribedVariableId: null });

/**
 * `reconcileSubscription`: sends the chunks the page needs when they differ from the ones
 * subscribed to, and keeps the chunks still wanted.
 */
export const reconcileLeaderboardSubscription = (send: Send, overlay: VariableLeaderboardOverlay): VariableLeaderboardOverlay => {
    const { leaderboardRoomId, leaderboardSnapshotReceived } = wiredStore.getState();

    if (!leaderboardRoomId || !leaderboardSnapshotReceived || !overlay.selectedVariableId) return overlay;

    const wanted = desiredLeaderboardChunks(overlay);

    if ((overlay.subscribedVariableId === overlay.selectedVariableId) && (wanted.join() === overlay.subscribedChunks.join())) return overlay;

    const chunks: Record<number, VariableLeaderboardOverlay['chunks'][number]> = {};

    for (const index of wanted) if (overlay.chunks[index]) chunks[index] = overlay.chunks[index];

    send(new VariableLeaderboardReplaceSubscriptionComposer({ overlayInstanceId: overlay.descriptor.overlayInstanceId, queryRevision: overlay.descriptor.queryRevision, selectedVariableId: overlay.selectedVariableId, chunkIndices: wanted }));

    return { ...overlay, chunks, subscribedChunks: wanted, subscribedVariableId: overlay.selectedVariableId };
};

/** `selectVariable`: another of the leaderboard's variables, from the first page. */
export const selectLeaderboardVariable = (send: Send, overlayInstanceId: number, variableId: string) => {
    const overlay = wiredStore.getState().leaderboards.find(existing => existing.descriptor.overlayInstanceId === overlayInstanceId);

    if (!overlay || (variableId === overlay.selectedVariableId) || !overlay.descriptor.choices.some(choice => choice.variableId === variableId)) return;

    wiredStore.getState().setLeaderboard(reconcileLeaderboardSubscription(send, resetLeaderboardQueryScope(overlay, variableId)));
};

/** `showPreviousPage` / `showNextPage` (`movePage`). */
export const moveLeaderboardPage = (send: Send, overlayInstanceId: number, delta: number) => {
    const overlay = wiredStore.getState().leaderboards.find(existing => existing.descriptor.overlayInstanceId === overlayInstanceId);

    if (!overlay || (overlay.totalCount === null)) return;

    const page = overlay.page + delta;

    if ((page < 0) || (page >= leaderboardPageCount(overlay)) || (page === overlay.page)) return;

    wiredStore.getState().setLeaderboard(reconcileLeaderboardSubscription(send, { ...overlay, page, direction: (page > overlay.page) ? 1 : -1 }));
};

/**
 * `beginLocationEdit`, then `updateEditDraft` on every change: the add-on's box and its settings.
 * A dragged location coming back through the form is the draft the store already has.
 */
export const updateLeaderboardLocationEdit = (context: IVariableLeaderboardContext, draft: VariableLeaderboardConfig) => {
    const { leaderboardLocationEdit: current, setLeaderboardLocationEdit } = wiredStore.getState();

    if (current && (current.context === context) && sameLeaderboardConfig(current.draft, draft)) return;

    setLeaderboardLocationEdit({ context, draft });
};

/** `endLocationEdit`: the editor closed. */
export const endLeaderboardLocationEdit = () => wiredStore.getState().setLeaderboardLocationEdit(null);

/** `updateDraggedLocation`: the dragged window's location becomes the draft's. */
export const dragLeaderboardLocation = (location: VariableLeaderboardLocation) => {
    const { leaderboardLocationEdit: edit, setLeaderboardLocationEdit } = wiredStore.getState();

    // Most drag steps stay on the same room pixel: nothing to tell the editor.
    if (!edit || sameLeaderboardLocation(location, edit.draft.location)) return;

    setLeaderboardLocationEdit({ ...edit, draft: { ...edit.draft, location } });
};
