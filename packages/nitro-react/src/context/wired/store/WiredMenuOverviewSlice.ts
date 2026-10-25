/**
 * The wired menu's variable overview tab - `WiredMenuOverviewTab`: the room's variables by
 * target (`VariableTypePicker`), the selected one's properties and texts, and the "highlight
 * holders" mode with what its `VariableHoldersHighlighter` has lit up in the room. Per-room
 * state like the rest of the menu (see `WiredMenuSlice`).
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** A user the highlighter has lit up: its value text, and whether it is a pet (drawn and bubbled the way furni are). */
export interface WiredHighlightedUser {
    value: string | null;
    isPet: boolean;
}

type State = {
    /** `VariableTypePicker.selectedType` - the target whose variables are listed; furni (0) at first. */
    overviewType: number;
    /** `_allVariables` - `null` while loading. */
    overviewVariables: IWiredVariable[] | null;
    /** The variable list's selection (`TableView.selected`), by variable id. */
    overviewSelectedId: string | null;
    /** `_highlightEnabled`. */
    overviewHighlightEnabled: boolean;
    /** `_-J24` - a `jumpToVariableByName` that came before the variables did. */
    overviewPendingJump: string | null;
    /** `_-V1u` - the variable a jump found, selected by the next list update. */
    overviewFocusId: string | null;
    /** Bumped whenever Flash calls `resetScrollingNextUpdate` on the variable list. */
    overviewListScrollKey: number;
    /** The same for the texts table (`onSelectVariable`). */
    overviewTextsScrollKey: number;
    /** `VariableHoldersHighlighter._-j1C` - lit furni (negative: wall items) and the value shown over each, `null` for none. */
    overviewHeldFurni: Record<number, string | null>;
    /** `_-c2q` - lit users by room index. */
    overviewHeldUsers: Record<number, WiredHighlightedUser>;
    /** `_-S2L` / `_-cr` - `performance.now()` of the last variables and holders requests, for the 500 ms polls. */
    overviewRequestedAt: number;
    overviewHoldersRequestedAt: number;
};

type Actions = {
    patchWiredOverview: (patch: Partial<State>) => void;
};

export const WiredMenuOverviewSliceInitialState: State = {
    overviewType: 0,
    overviewVariables: null,
    overviewSelectedId: null,
    overviewHighlightEnabled: false,
    overviewPendingJump: null,
    overviewFocusId: null,
    overviewListScrollKey: 0,
    overviewTextsScrollKey: 0,
    overviewHeldFurni: {},
    overviewHeldUsers: {},
    overviewRequestedAt: 0,
    overviewHoldersRequestedAt: 0,
};

export type WiredMenuOverviewSlice = State & Actions;

export const createWiredMenuOverviewSlice: StateCreator<WiredMenuOverviewSlice, [], [], WiredMenuOverviewSlice> = set => ({
    ...WiredMenuOverviewSliceInitialState,
    patchWiredOverview: patch => set(patch),
});
