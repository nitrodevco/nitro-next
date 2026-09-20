/**
 * The wired menu's inspection tab - `WiredMenuInspectionTab`: what is being inspected (a furni,
 * a user or the room's globals, picked with the `VariableTypePicker`), the fetch state machine
 * around `WiredGetVariablesForObject`, the variable values table's selection and the "add
 * variable" bubble. Per-room state like the rest of the menu (see `WiredMenuSlice`).
 */
import type { IWiredObjectInspectionData, IWiredVariable } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `WiredMenuInspectionTab.STATE_NOTHING` - nothing inspected. */
export const WIRED_INSPECTION_STATE_NOTHING = 0;
/** `STATE_FETCHING_HOLDING_VARIABLES` - `WiredGetVariablesForObject` is out. */
export const WIRED_INSPECTION_STATE_FETCHING = 1;
/** `STATE_AWAITING_VARIABLES` - the values are in, the variables they belong to are being synchronized. */
export const WIRED_INSPECTION_STATE_AWAITING_VARIABLES = 2;
/** `STATE_DISPLAYING`. */
export const WIRED_INSPECTION_STATE_DISPLAYING = 3;

/**
 * What `VariableHolderPreviewer` shows: nothing, the instruction for the selected type, the
 * global placeholder, or the inspected furni (by object id, negative for a wall item) or user (by
 * room index). It is only changed where Flash calls `updatePreviewUI`, so a fetch in flight
 * keeps the previous object on screen.
 */
export type WiredInspectionPreview
    = | { kind: 'none' }
        | { kind: 'furni_instructions' }
        | { kind: 'user_instructions' }
        | { kind: 'global' }
        | { kind: 'furni'; objectId: number }
        | { kind: 'user'; userIndex: number };

/** One row of the variable values table - `VariableValueTableObject` without its display flags. */
export interface WiredVariableValueRow {
    variable: IWiredVariable;
    value: number;
}

type State = {
    /** `VariableTypePicker.selectedType` - furni (0), user (1) or global (-10); the picker starts on furni. */
    inspectionType: number;
    /** `pin_checkbox`: a selection in the room no longer replaces what is inspected. */
    inspectionPinned: boolean;
    /** `_-P1n`. */
    inspectionState: number;
    /** `_-52l`. */
    inspectionData: IWiredObjectInspectionData | null;
    /** `_-Q16` - the room's variables by id, as the synchronizer last delivered them. */
    inspectionVariablesById: Record<string, IWiredVariable>;
    /** The table's rows as `updateTableUI` last set them: cleared with nothing inspected, left alone while a fetch is out. */
    inspectionRows: WiredVariableValueRow[];
    /** `_highlightChanges` of the rows: the table shows the same object it showed last, so a changed value flashes. */
    inspectionHighlightChanges: boolean;
    /** `_-h1y` / `_-lx` - the source type and object the table last showed. */
    inspectionShownType: number;
    inspectionShownObjectId: number;
    /** The selected row's variable id (`TableView.selected`). */
    inspectionSelectedId: string | null;
    /** `_-P2M` - the index of a row being deleted, so the row that takes its place is selected when it goes. */
    inspectionDeleteIndex: number;
    /** `_highlightingForFurni` - the furni whose wired boxes "highlight wireds" lit up; -1 for none. */
    inspectionHighlightingFor: number;
    /** The box ids that are lit up, `VariableHoldersHighlighter._-j1C`'s keys for this tab. */
    inspectionHighlightedWireds: number[];
    /** `create_var_bubble.visible`. */
    inspectionCreateBubble: boolean;
    /** The variables the bubble's picker offers, from `initializeCreateVariableBubble`. */
    inspectionCreateVariables: IWiredVariable[];
    /** `_-S2L` - `performance.now()` of the last request, for the 500 ms poll. */
    inspectionRequestedAt: number;
    inspectionPreview: WiredInspectionPreview;
};

type Actions = {
    patchWiredInspection: (patch: Partial<State>) => void;
};

export const WiredMenuInspectionSliceInitialState: State = {
    inspectionType: 0,
    inspectionPinned: false,
    inspectionState: WIRED_INSPECTION_STATE_NOTHING,
    inspectionData: null,
    inspectionVariablesById: {},
    inspectionRows: [],
    inspectionHighlightChanges: false,
    inspectionShownType: -1,
    inspectionShownObjectId: 0,
    inspectionSelectedId: null,
    inspectionDeleteIndex: -1,
    inspectionHighlightingFor: -1,
    inspectionHighlightedWireds: [],
    inspectionCreateBubble: false,
    inspectionCreateVariables: [],
    inspectionRequestedAt: 0,
    inspectionPreview: { kind: 'furni_instructions' },
};

export type WiredMenuInspectionSlice = State & Actions;

export const createWiredMenuInspectionSlice: StateCreator<WiredMenuInspectionSlice, [], [], WiredMenuInspectionSlice> = set => ({
    ...WiredMenuInspectionSliceInitialState,
    patchWiredInspection: patch => set(patch),
});
