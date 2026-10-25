/**
 * The room's WIRED leaderboard panels (WIN63-202610131318 `VariableLeaderboardController`'s views):
 * each published leaderboard (`VariableLeaderboardSnapshot`) is drawn over the room - not opened by
 * using its add-on - in a room-scaled window anchored above the location its add-on names.
 *
 * - `synchronizeViews` / `refreshView`: the panel shows the page of the selected variable, "Loading..."
 *   while a chunk the page needs has not come, "No entries" with no variable or no entry
 *   (`getBodyState`), and the pager.
 * - `projectView`: the panel's bottom centre sits on its location (`VariableLeaderboardLocationProjector`),
 *   redone on every room frame.
 * - `update`: the times in the rows are told again every 30 s (`refreshRelativeTimes`).
 * - `applyLocationEditVisuals`: while an add-on's editor sets one leaderboard's location, every
 *   other one is faded to 0.35.
 * - The location edit (`beginLocationEdit` / `updateEditDraft` / `endLocationEdit`): the edited
 *   leaderboard is drawn from the editor's config (`VariableLeaderboardView.setEditDraft` - its
 *   title, description, columns, sorting, page size and display names) at the config's location;
 *   a box never saved gets a dummy leaderboard instead (`synchronizeDraftView` /
 *   `initializeDraftView`: `createDraftDescriptor`, "No entries", page 1 / 1). Either can be
 *   dragged (`setLocationEditState` -> `draggable`); each drag step's window position becomes a
 *   location (`updateDraggedWindowPosition`: `getScreenAnchor` + `unproject`) that goes to the
 *   editor (`updateDraggedLocation`).
 */
import { IRoom } from '@nitrodevco/nitro-api';
import { IVariableLeaderboardChoice, IVariableLeaderboardDescriptor } from '@nitrodevco/nitro-packets';
import { memo, useCallback, useState } from 'react';

import { dragLeaderboardLocation, moveLeaderboardPage, openProfile, selectLeaderboardVariable } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useRoom } from '#base/context/room';
import { leaderboardPageCount, leaderboardPageRows, leaderboardPageSize, useWiredStore, VariableLeaderboardLocationEdit, VariableLeaderboardOverlay } from '#base/context/wired';
import { useClock } from '#base/hooks';
import { VariableLeaderboardBodyState, VariableLeaderboardView } from '#base/views/room-widgets/variable-leaderboard/VariableLeaderboardView';
import { suggestLeaderboardDisplayName, VARIABLE_LEADERBOARD_NULL_VARIABLE_ID, VariableLeaderboardLocation } from '#base/wired';

import { ScaledRoomOverlay } from '../../overlay';
import { placeLeaderboardWindow, unprojectLeaderboardWindow } from './VariableLeaderboardLocationProjector';

/** `VariableLeaderboardController.update`: how often the rows' relative times are told again. */
const RELATIVE_TIME_REFRESH_MS = 30000;

/** `VariableLeaderboardView.setLocationEditState`: a leaderboard faded while another one's location is edited. */
const LOCATION_EDIT_BLEND = 0.35;

/** `projectView` / `projectDraftView`: the window's bottom centre on the location. Nowhere without a canvas. */
const placeAt = (room: IRoom, location: VariableLeaderboardLocation) => (width: number, height: number) => placeLeaderboardWindow(room, location, width, height);

/**
 * `VariableLeaderboardView.effectiveChoiceName` while an edit runs: the display name typed in the
 * editor, else the suggestion for the variable's technical name, else the published name.
 */
const effectiveChoiceName = (choice: IVariableLeaderboardChoice, edit: VariableLeaderboardLocationEdit): string => {
    const override = edit.draft.displayOverrides[choice.variableId];

    if (override !== undefined) return override;

    const technicalName = edit.context.choices.find(candidate => (candidate.variableId === choice.variableId))?.technicalName;

    return (technicalName !== undefined) ? suggestLeaderboardDisplayName(technicalName) : choice.displayName;
};

/** `VariableLeaderboardView.applyPresentation` with an edit draft: the published leaderboard as the editor describes it. */
const withEditDraft = (descriptor: IVariableLeaderboardDescriptor, edit: VariableLeaderboardLocationEdit): IVariableLeaderboardDescriptor => ({
    ...descriptor,
    title: edit.draft.title,
    description: edit.draft.description,
    ...edit.draft.location,
    sortMode: edit.draft.sortMode,
    columns: edit.draft.columns.map(column => ({ ...column })),
    choices: descriptor.choices.map(choice => ({ variableId: choice.variableId, displayName: effectiveChoiceName(choice, edit) })),
    pageSizeOption: edit.draft.pageSizeOption,
});

/** `createDraftDescriptor`: the dummy leaderboard of a box never saved - its stacked variables, the first one shown. */
const createDraftDescriptor = (edit: VariableLeaderboardLocationEdit): IVariableLeaderboardDescriptor => {
    const choices = edit.context.choices.map(choice => ({ variableId: choice.variableId, displayName: effectiveChoiceName({ variableId: choice.variableId, displayName: '' }, edit) }));

    return withEditDraft({ overlayInstanceId: 0, queryRevision: 0, title: '', description: '', tileX: 0, tileY: 0, offsetX: 0, altitude: 0, sortMode: 0, columns: [], choices, defaultVariableId: choices.length ? choices[0].variableId : VARIABLE_LEADERBOARD_NULL_VARIABLE_ID, pageSizeOption: 0 }, edit);
};

/** `updateDraggedWindowPosition` -> `updateDraggedLocation`: the dragged window's location becomes the draft's. */
const onLeaderboardDragged = (room: IRoom) => (x: number, y: number, width: number, height: number) => {
    const location = unprojectLeaderboardWindow(room, x, y, width, height);

    if (location) dragLeaderboardLocation(location);
};

/** `getBodyState`: no variable or no entry, a chunk the page needs still to come, or the rows. */
const bodyStateOf = (overlay: VariableLeaderboardOverlay, rows: unknown[] | null): VariableLeaderboardBodyState => {
    if (!overlay.selectedVariableId || (overlay.totalCount === 0)) return 2;

    return rows ? 1 : 0;
};

interface LeaderboardPanelProps {
    room: IRoom;
    overlay: VariableLeaderboardOverlay;
    /** The edit, for the leaderboard whose location is being edited only. */
    edit: VariableLeaderboardLocationEdit | null;
    faded: boolean;
    now: number;
    dropdownOpen: boolean;
    hoveredChoice: string | null;
    setDropdown: (overlayInstanceId: number, open: boolean) => void;
    setHoveredChoice: (choice: { overlayInstanceId: number; variableId: string } | null) => void;
}

/** One published leaderboard - redrawn only when its own state changes, not another's. */
const LeaderboardPanel = memo(({ room, overlay, edit, faded, now, dropdownOpen, hoveredChoice, setDropdown, setHoveredChoice }: LeaderboardPanelProps) => {
    const { send } = useWebSocketContext();
    const id = overlay.descriptor.overlayInstanceId;
    const descriptor = edit ? withEditDraft(overlay.descriptor, edit) : overlay.descriptor;
    const shown = edit ? { ...overlay, descriptor } : overlay;
    const rows = leaderboardPageRows(shown);
    const totalKnown = (overlay.totalCount !== null) && (overlay.totalCount > 0);
    const pageCount = leaderboardPageCount(shown);

    return (
        <ScaledRoomOverlay
            place={placeAt(room, descriptor)}
            alpha={faded ? LOCATION_EDIT_BLEND : 1}
            draggable={!!edit}
            onDragged={onLeaderboardDragged(room)}
        >
            <VariableLeaderboardView
                descriptor={descriptor}
                selectedVariableId={overlay.selectedVariableId}
                bodyState={bodyStateOf(shown, rows)}
                rows={(rows ?? []).slice(0, leaderboardPageSize(descriptor))}
                page={overlay.page}
                pageCount={pageCount}
                canPrevious={totalKnown && (overlay.page > 0)}
                canNext={totalKnown && ((overlay.page + 1) < pageCount)}
                now={now}
                dropdownOpen={dropdownOpen}
                hoveredChoice={hoveredChoice}
                onToggleChoices={() => setDropdown(id, !dropdownOpen)}
                onHoverChoice={variableId => setHoveredChoice(variableId ? { overlayInstanceId: id, variableId } : null)}
                onSelectChoice={(variableId) => {
                    selectLeaderboardVariable(send, id, variableId);
                    setDropdown(id, false);
                }}
                onPrevious={() => moveLeaderboardPage(send, id, -1)}
                onNext={() => moveLeaderboardPage(send, id, 1)}
                onProfile={userId => openProfile(send, userId)}
            />
        </ScaledRoomOverlay>
    );
});

/** `synchronizeDraftView`: the dummy leaderboard of a box never saved, while it is edited. */
const DraftLeaderboardPanel = memo(({ room, edit, now }: { room: IRoom; edit: VariableLeaderboardLocationEdit; now: number }) => {
    const descriptor = createDraftDescriptor(edit);

    return (
        <ScaledRoomOverlay
            place={placeAt(room, descriptor)}
            draggable
            onDragged={onLeaderboardDragged(room)}
        >
            <VariableLeaderboardView
                descriptor={descriptor}
                selectedVariableId={descriptor.choices.length ? descriptor.defaultVariableId : null}
                bodyState={2}
                rows={[]}
                now={now}
            />
        </ScaledRoomOverlay>
    );
});

export const VariableLeaderboardWidget = () => {
    const room = useRoom();
    const leaderboards = useWiredStore(x => x.leaderboards);
    const locationEditId = useWiredStore(x => x.leaderboardLocationEditId);
    const locationEdit = useWiredStore(x => x.leaderboardLocationEdit);
    // `choice_dropdown`'s `visible`, by leaderboard, and the choice row under the pointer.
    const [ openDropdowns, setOpenDropdowns ] = useState<ReadonlySet<number>>(new Set());
    const [ hoveredChoice, setHoveredChoice ] = useState<{ overlayInstanceId: number; variableId: string } | null>(null);
    const now = useClock('epoch', RELATIVE_TIME_REFRESH_MS, leaderboards.length > 0);

    const setDropdown = useCallback((overlayInstanceId: number, open: boolean) => setOpenDropdowns((current) => {
        const next = new Set(current);

        if (open) next.add(overlayInstanceId);
        else next.delete(overlayInstanceId);

        return next;
    }), []);

    if (!room) return null;

    return (
        <>
            {leaderboards.map((overlay) => {
                const id = overlay.descriptor.overlayInstanceId;

                return (
                    <LeaderboardPanel
                        key={id}
                        room={room}
                        overlay={overlay}
                        edit={(locationEdit && (locationEditId === id)) ? locationEdit : null}
                        faded={(locationEditId !== null) && (locationEditId !== id)}
                        now={now}
                        dropdownOpen={openDropdowns.has(id)}
                        hoveredChoice={(hoveredChoice?.overlayInstanceId === id) ? hoveredChoice.variableId : null}
                        setDropdown={setDropdown}
                        setHoveredChoice={setHoveredChoice}
                    />
                );
            })}
            {locationEdit && (locationEditId === 0)
                && (
                    <DraftLeaderboardPanel
                        key="draft"
                        room={room}
                        edit={locationEdit}
                        now={now}
                    />
                )}
        </>
    );
};
