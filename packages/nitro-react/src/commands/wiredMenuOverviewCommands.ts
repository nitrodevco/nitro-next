/**
 * The wired menu's variable overview tab - `WiredMenuOverviewTab` and the room side of its
 * `VariableHoldersHighlighter`. The tab lists the room's variables of the picked target, polls the
 * synchronizer every 500 ms while viewed, and in "highlight holders" mode asks for the selected
 * variable's holders every 500 ms and lights them up, with the value over each (the bubbles are
 * drawn by `WiredVariableHolderBubbles` from what is recorded here). The state is
 * `WiredMenuOverviewSlice`.
 *
 * `jumpToWiredVariableByName` is the `wiredmenu/open/variable_overview/<name>` link, which the
 * setup dialog of a variable box raises to show its variable here.
 */
import { RoomObjectCategoryEnum, RoomObjectUserType } from '@nitrodevco/nitro-api';
import type { IVariableInfoAndHolders, IWiredVariable } from '@nitrodevco/nitro-packets';
import { isWiredVariablePersisted, VariableType, WiredDeleteAllVariableHoldersComposer, WiredGetAllVariableHoldersComposer, WiredGetVariableOwnersPageComposer, WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { getRoom, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { getWiredHasWritePermission, WIRED_MENU_TAB_OVERVIEW, WIRED_VARIABLE_MANAGEMENT_PAGE_SIZE, WiredHighlightedUser, WiredStore, wiredStore } from '#base/context/wired';
import { variableValueWithString } from '#base/wired';

import { getAllWiredVariables } from './wiredSynchronizerCommands';

type Send = WebSocketConnection['send'];

/** `WiredMenuOverviewTab.POLL_MS`. */
const POLL_MS = 500;
/** `MAX_HIGHLIGHTS` / `MAX_HIGHLIGHTS_WITH_VALUE` - more holders than this and the highlight is refused. */
const MAX_HIGHLIGHTS = 1000;
const MAX_HIGHLIGHTS_WITH_VALUE = 400;

const patch: WiredStore['patchWiredOverview'] = changes => wiredStore.getState().patchWiredOverview(changes);

const isViewing = (): boolean => {
    const { menuViewing, menuActiveTab } = wiredStore.getState();

    return menuViewing && (menuActiveTab === WIRED_MENU_TAB_OVERVIEW);
};

/** `getSelectedVariable`. */
export const getSelectedWiredOverviewVariable = (state: Pick<WiredStore, 'overviewVariables' | 'overviewSelectedId'> = wiredStore.getState()): IWiredVariable | undefined =>
    (state.overviewSelectedId === null) ? undefined : state.overviewVariables?.find(variable => variable.variableId === state.overviewSelectedId);

/** `canHighlightCurrentVariable` - the holders of a created furni or user variable. */
export const canHighlightWiredVariable = (variable: IWiredVariable | undefined): boolean =>
    !!variable && (Number(variable.variableType) !== Number(VariableType.INTERNAL)) && ((Number(variable.variableTarget) === Number(WiredVariableTarget.User)) || (Number(variable.variableTarget) === Number(WiredVariableTarget.Furni)));

/** `canManageCurrentVariable` - a permanent user variable, whose holders the management windows list. */
export const canManageWiredVariable = (variable: IWiredVariable | undefined): boolean =>
    !!variable && (Number(variable.variableTarget) === Number(WiredVariableTarget.User)) && isWiredVariablePersisted(variable.availabilityType);

/** `canDeleteCurrentVariable` - a permanent furni or user variable made by a variable box, for someone who may modify wired. */
export const canDeleteWiredVariable = (variable: IWiredVariable | undefined, hasWritePermission: boolean): boolean =>
    hasWritePermission && !!variable && variable.canCreateAndDelete && isWiredVariablePersisted(variable.availabilityType)
    && ((Number(variable.variableTarget) === Number(WiredVariableTarget.Furni)) || (Number(variable.variableTarget) === Number(WiredVariableTarget.User)))
    && (Number(variable.variableType) === Number(VariableType.UNKNOWN_0));

/* ------------------------------------------------------------------ highlighter */

const furniCategory = (furniId: number) => ((furniId < 0) ? RoomObjectCategoryEnum.Wall : RoomObjectCategoryEnum.Floor);

/** `VariableHoldersHighlighter.highlightObject` - a furni that is not in the room is skipped. */
const highlightFurni = (held: Record<number, string | null>, furniId: number, value: string | null) => {
    if ((furniId in held) && (held[furniId] === value)) return;

    const room = getRoom();

    if (!room?.getRoomObject(Math.abs(furniId), furniCategory(furniId))) return;

    if (!(furniId in held)) room.objectHighLighter.highlightVariableHolderFurni(furniId);

    held[furniId] = value;
};

/** `VariableHoldersHighlighter.highlightUser` - pets get the furni look and bubble. */
const highlightUser = (held: Record<number, WiredHighlightedUser>, roomIndex: number, value: string | null) => {
    if ((roomIndex in held) && (held[roomIndex].value === value)) return;

    const userData = roomStore.getState().usersByRoomObjectId[roomIndex];
    const room = getRoom();

    if (!userData || !room?.getRoomObject(roomIndex, RoomObjectCategoryEnum.Unit)) return;

    if (!(roomIndex in held)) room.objectHighLighter.highlightVariableHolderUser(roomIndex);

    held[roomIndex] = { value, isPet: (Number(userData.userType) === Number(RoomObjectUserType.Pet)) };
};

/** `VariableHoldersHighlighter.removeRemovedHolders` - everything lit that is not in the two sets goes dark. */
const removeRemovedHolders = (held: { furni: Record<number, string | null>; users: Record<number, WiredHighlightedUser> }, keepFurni: Set<number>, keepUsers: Set<number>) => {
    const highLighter = getRoom()?.objectHighLighter;

    for (const key of Object.keys(held.furni)) {
        const furniId = Number(key);

        if (keepFurni.has(furniId)) continue;

        highLighter?.unhighlightVariableHolderFurni(furniId);
        delete held.furni[furniId];
    }

    for (const key of Object.keys(held.users)) {
        const roomIndex = Number(key);

        if (keepUsers.has(roomIndex)) continue;

        highLighter?.unhighlightVariableHolderUser(roomIndex);
        delete held.users[roomIndex];
    }
};

/** `VariableHoldersHighlighter.clear`. */
const clearHighlighter = () => {
    const { overviewHeldFurni, overviewHeldUsers } = wiredStore.getState();
    const held = { furni: { ...overviewHeldFurni }, users: { ...overviewHeldUsers } };

    removeRemovedHolders(held, new Set(), new Set());
    patch({ overviewHeldFurni: held.furni, overviewHeldUsers: held.users });
};

/* ------------------------------------------------------------------ the tab */

/** `requestHolders`. */
const requestHolders = (send: Send) => {
    const selectedId = wiredStore.getState().overviewSelectedId;

    patch({ overviewHoldersRequestedAt: performance.now() });

    if (selectedId !== null) send(new WiredGetAllVariableHoldersComposer({ variableId: selectedId }));
};

/** `onSelectVariable` - the selection changed, by a click or because the list changed under it. */
const onSelectVariable = (send: Send) => {
    patch({ overviewTextsScrollKey: wiredStore.getState().overviewTextsScrollKey + 1 });

    if (!wiredStore.getState().overviewHighlightEnabled) return;

    clearHighlighter();

    if (canHighlightWiredVariable(getSelectedWiredOverviewVariable())) requestHolders(send);
};

/** `getVariableByNameOrPrefix` - the exact name, or else the first variable under it (`name.`). */
const getVariableByNameOrPrefix = (variables: IWiredVariable[], name: string): IWiredVariable | undefined => {
    let prefixed: IWiredVariable | undefined = undefined;

    for (const variable of variables) {
        if (variable.isInvisible) continue;
        if (variable.variableName === name) return variable;
        if (!prefixed && (variable.variableName.indexOf(`${name}.`) === 0)) prefixed = variable;
    }

    return prefixed;
};

/** `findFocusVariable` - switches the type picker to the variable's target and marks it for selection. */
const findFocusVariable = (name: string) => {
    const variable = getVariableByNameOrPrefix(wiredStore.getState().overviewVariables ?? [], name);

    if (!variable) return;

    patch({ overviewType: Number(variable.variableTarget), overviewFocusId: variable.variableId });
};

/**
 * `updateVariableList` - the list keeps its selection while the variable is still listed; a
 * focused variable (a jump) wins, and an empty or lost selection falls to the first row.
 */
const updateVariableList = (send: Send) => {
    const { overviewVariables, overviewType, overviewSelectedId, overviewFocusId } = wiredStore.getState();
    const rows = (overviewVariables ?? []).filter(variable => !variable.isInvisible && (Number(variable.variableTarget) === overviewType));
    const has = (variableId: string | null) => (variableId !== null) && rows.some(variable => variable.variableId === variableId);

    let selectedId: string | null = has(overviewSelectedId) ? overviewSelectedId : null;

    if (has(overviewFocusId)) selectedId = overviewFocusId;
    else if (selectedId === null) selectedId = rows[0]?.variableId ?? null;

    patch({ overviewSelectedId: selectedId, overviewFocusId: null });

    if (selectedId !== overviewSelectedId) onSelectVariable(send);
};

/** `initializeInterface` - a jump waiting for the variables is carried out first. */
const initializeInterface = (send: Send) => {
    const pendingJump = wiredStore.getState().overviewPendingJump;

    if (pendingJump !== null) {
        findFocusVariable(pendingJump);
        patch({ overviewPendingJump: null });
    }

    updateVariableList(send);
};

/** `requestData` - the synchronizer's list, fresh. */
const requestData = (send: Send) => {
    patch({ overviewRequestedAt: performance.now() });

    getAllWiredVariables(send, variables => onOverviewVariables(send, variables));
};

/** `onAllVariables`. */
const onOverviewVariables = (send: Send, variables: IWiredVariable[]) => {
    patch({ overviewVariables: variables });

    initializeInterface(send);
};

/** `WiredMenuOverviewTab.startViewing`. */
export const startViewingWiredOverview = (send: Send) => {
    patch({ overviewVariables: null });

    requestData(send);
};

/** `WiredMenuOverviewTab.stopViewing` - the holders go dark, but "highlight" stays on for when the tab is back. */
export const stopViewingWiredOverview = () => {
    if (wiredStore.getState().overviewHighlightEnabled) clearHighlighter();
};

/** `WiredMenuOverviewTab.update`. */
export const pollWiredOverview = (send: Send) => {
    const { overviewRequestedAt, overviewHoldersRequestedAt, overviewHighlightEnabled } = wiredStore.getState();
    const now = performance.now();

    if (overviewRequestedAt < (now - POLL_MS)) requestData(send);

    if (canHighlightWiredVariable(getSelectedWiredOverviewVariable()) && overviewHighlightEnabled && (overviewHoldersRequestedAt < (now - POLL_MS))) requestHolders(send);
};

/** `stopHighlight`. */
const stopHighlight = () => {
    patch({ overviewHighlightEnabled: false });
    clearHighlighter();
};

/**
 * `onAllVariableHolders` - only while highlighting and viewed, and only for the selected variable.
 * Too many holders are refused with a notification, and the highlight is switched off.
 */
export const onWiredAllVariableHolders = ({ variable, holders }: IVariableInfoAndHolders) => {
    const { overviewHighlightEnabled, overviewSelectedId, overviewHeldFurni, overviewHeldUsers } = wiredStore.getState();

    if (!overviewHighlightEnabled || !isViewing() || (variable.variableId !== overviewSelectedId)) return;

    if ((!variable.hasValue && (holders.length > MAX_HIGHLIGHTS)) || (variable.hasValue && (holders.length > MAX_HIGHLIGHTS_WITH_VALUE))) {
        notificationStore.getState().addNotification('${wiredmenu.variable_overview.highlight.error.too_many}', 'info', 'icon_wired_notification_png');
        stopHighlight();

        return;
    }

    const held = { furni: { ...overviewHeldFurni }, users: { ...overviewHeldUsers } };
    const keepFurni = new Set<number>();
    const keepUsers = new Set<number>();

    for (const holder of holders) {
        const value = variable.hasValue ? variableValueWithString(variable, holder.value) : null;

        if (Number(variable.variableTarget) === Number(WiredVariableTarget.Furni)) {
            highlightFurni(held.furni, holder.objectId, value);
            keepFurni.add(holder.objectId);
        } else if (Number(variable.variableTarget) === Number(WiredVariableTarget.User)) {
            highlightUser(held.users, holder.objectId, value);
            keepUsers.add(holder.objectId);
        }
    }

    removeRemovedHolders(held, keepFurni, keepUsers);
    patch({ overviewHeldFurni: held.furni, overviewHeldUsers: held.users });
};

/** `onSelectVariableType` - a click on the type picker; the list starts from the top. */
export const selectWiredOverviewType = (send: Send, sourceType: number) => {
    const { overviewType, overviewListScrollKey } = wiredStore.getState();

    if (overviewType === sourceType) return;

    patch({ overviewType: sourceType, overviewListScrollKey: overviewListScrollKey + 1 });
    initializeInterface(send);
};

/** A press on a row of the variable list (`TableView.trySelect` -> `onSelectVariable`). */
export const selectWiredOverviewVariable = (send: Send, variableId: string | null) => {
    if (wiredStore.getState().overviewSelectedId === variableId) return;

    patch({ overviewSelectedId: variableId });
    onSelectVariable(send);
};

/** `onHighlightClick`. */
export const toggleWiredOverviewHighlight = (send: Send) => {
    if (wiredStore.getState().overviewHighlightEnabled) {
        stopHighlight();

        return;
    }

    patch({ overviewHighlightEnabled: true });
    requestHolders(send);
};

/** `onManageClick` - the holders of a permanent user variable, in the variable management window. */
export const manageWiredOverviewVariable = (send: Send) => {
    const variable = getSelectedWiredOverviewVariable();

    if (!variable || !canManageWiredVariable(variable)) return;

    send(new WiredGetVariableOwnersPageComposer({ variableId: variable.variableId, page: 1, pageSize: WIRED_VARIABLE_MANAGEMENT_PAGE_SIZE, sortType: 0, userTypeFilter: -1 }));
};

/**
 * `onDeleteClick` - after a confirmation, the variable is taken from everything that holds it.
 * The gate is asked again once confirmed, since the selection or the permissions may have moved.
 * Flash paints the confirmation's title bar red (`titleBarColor`); the system dialogs have one look.
 */
export const deleteWiredOverviewVariableHolders = (send: Send) => {
    if (!canDeleteWiredVariable(getSelectedWiredOverviewVariable(), getWiredHasWritePermission())) return;

    const { showConfirm, interpolate } = systemStore.getState();

    showConfirm(interpolate('${wiredmenu.variable_overview.delete_all.title}'), interpolate('${wiredmenu.variable_overview.delete_all.desc}'), () => {
        const variable = getSelectedWiredOverviewVariable();

        if (!variable || !canDeleteWiredVariable(variable, getWiredHasWritePermission())) return;

        stopHighlight();

        send(new WiredDeleteAllVariableHoldersComposer({ variableId: variable.variableId }));
    });
};

/** `jumpToVariableByName` - now if the variables are in, otherwise once they are. */
export const jumpToWiredVariableByName = (send: Send, name: string) => {
    if (wiredStore.getState().overviewVariables === null) {
        patch({ overviewPendingJump: name });

        return;
    }

    findFocusVariable(name);
    initializeInterface(send);
};
