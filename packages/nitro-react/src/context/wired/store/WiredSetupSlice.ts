/**
 * The wired box being edited - the state `UserDefinedRoomEventsCtrl` keeps while its dialog is
 * open: the triggerable, the element that serves its code, the picked furni and the update mode
 * of the save in flight.
 *
 * Flash spreads this over the controller and the widget tree it built (`SliderSection.value` for
 * the delay, `RadioGroupPreset.selected` for the quantifier, the selector's checkbox group, the
 * quick menu's "paste into" checkbox, each `WiredInputSourcePicker`'s selection cache). Here the
 * widget state is data: the triggerable in the session is the *edited copy* - delay, quantifier,
 * filter/invert and the source types are changed on it by copy - and the element's inputs are
 * the `form` its definition made.
 *
 * What Flash never clears survives `resetRoom` on purpose: the once-per-session non-owner
 * confirmation (`§_-Z2E§`) and the dialog's last position (`§_-Sz§` / `§_-4a§`).
 */
import type { IHabboGroupEntryData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import type { WiredElementEntry, WiredElementMemory, WiredTriggerable } from '#base/wired';

import { mergeWiredElementMemory, WiredElementMemorySlice } from './WiredElementMemorySlice';
import type { WiredVariablesListener } from './WiredVariablesSlice';

/** `UserDefinedRoomEventsCtrl.UPDATE_MODE_NORMAL` - save and close. */
export const WIRED_UPDATE_MODE_NORMAL = 0;
/** `UserDefinedRoomEventsCtrl.§_-Aw§` - the quick menu's "save": the dialog stays open. */
export const WIRED_UPDATE_MODE_SAVE_WITHOUT_CLOSING = 1;
/** `UserDefinedRoomEventsCtrl.UPDATE_MODE_SAVE_INTO_OTHER` - "paste into": the form is saved onto another box of the same type. */
export const WIRED_UPDATE_MODE_SAVE_INTO_OTHER = 2;

/** `WiredInputSourcePicker.STUFF_PICKING_MODE_1` / `_2` - which pick list room clicks go to in dual picking mode. */
export const WIRED_FURNI_PICKS_1 = 1;
export const WIRED_FURNI_PICKS_2 = 2;

export interface WiredSetupSession {
    /** Counts every `prepareForUpdate`, so a view can tell a fresh edit (paste, reset, another box) from a re-render. */
    editId: number;
    /** The edited copy of what the server sent. */
    triggerable: WiredTriggerable;
    /** `§_-c1P§` - the element serving `triggerable.code`. */
    entry: WiredElementEntry;
    /** The element's inputs, made by `createForm` and only ever handed back to the same element. */
    form: unknown;
    /** `_stuffs1` / `_stuffs2`, in the order they were picked. Wall items are negative ids. */
    stuffIds1: number[];
    stuffIds2: number[];
    /** `§_-jX§` - `WIRED_FURNI_PICKS_1` or `WIRED_FURNI_PICKS_2`. */
    activeFurniPicks: number;
    /** `AdvancedSettingsWrapperPreset.expanded`. */
    advancedExpanded: boolean;
    /** `FramePreset.isCopyingIntoMode` - the quick menu's "paste into" checkbox. */
    copyIntoMode: boolean;
    /** `WiredInputSourcePicker._selectionCache`, per merged section id: the source last chosen under each source type. */
    mergedSelectionCache: Record<number, Record<number, number>>;
}

type State = {
    setup: WiredSetupSession | undefined;
    /** `_updateMode` of the save the server has not answered yet. */
    updateMode: number;
    /** `_variablesCallback` - a box waiting for the room's variables before its dialog opens. */
    pendingVariablesListener: WiredVariablesListener | undefined;
    /** `§_-Z2E§` - a non-owner confirmed once that they want to change someone else's wired. */
    nonOwnerConfirmed: boolean;
    /** `§_-Sz§` / `§_-4a§` - where the dialog was last left; `undefined` centers it. */
    setupPosition: { x: number; y: number } | undefined;
    /** How many edits have been started, the source of `WiredSetupSession.editId`. */
    setupEditCount: number;
    /**
     * The user's groups, from the last `GuildMemberships` - Flash hands the packet to the open
     * element (`onGuildMemberships`), which asked for it with `GetGuildMembershipsComposer` when
     * its edit started; here the element's view reads this list instead.
     */
    guildMemberships: IHabboGroupEntryData[];
};

type Actions = {
    /** Starts an edit; `editId` is assigned here. */
    openSetup: (session: Omit<WiredSetupSession, 'editId'>) => void;
    closeSetup: () => void;
    /** Merges a patch into the open session; ignored when nothing is open. */
    patchSetup: (patch: Partial<Omit<WiredSetupSession, 'editId'>>) => void;
    /** Merges a patch into the edited triggerable. */
    patchSetupTriggerable: (patch: Partial<WiredTriggerable>) => void;
    /** Merges a patch into the element's form, or replaces it through an updater. */
    setSetupForm: (update: object | ((form: unknown) => unknown)) => void;
    setUpdateMode: (updateMode: number) => void;
    setPendingVariablesListener: (pendingVariablesListener: WiredVariablesListener | undefined) => void;
    setNonOwnerConfirmed: (nonOwnerConfirmed: boolean) => void;
    setSetupPosition: (position: { x: number; y: number } | undefined) => void;
    setGuildMemberships: (guildMemberships: IHabboGroupEntryData[]) => void;
};

/** What `resetRoom` puts back: the confirmation, the position and the edit counter are kept. */
export const WiredSetupSliceRoomState: Pick<State, 'setup' | 'updateMode' | 'pendingVariablesListener'> = {
    setup: undefined,
    updateMode: WIRED_UPDATE_MODE_NORMAL,
    pendingVariablesListener: undefined,
};

export const WiredSetupSliceInitialState: State = {
    ...WiredSetupSliceRoomState,
    nonOwnerConfirmed: false,
    setupPosition: undefined,
    setupEditCount: 0,
    guildMemberships: [],
};

export type WiredSetupSlice = State & Actions;

/**
 * The element's `rememberOnEdit` for a form it now holds - what Flash's element fields became
 * while the widgets were edited (`WiredElementMemorySlice`).
 */
const rememberEdit = (elementMemory: Record<string, WiredElementMemory>, entry: WiredElementEntry, form: unknown): Record<string, WiredElementMemory> =>
    mergeWiredElementMemory(elementMemory, entry.definition, entry.definition.rememberOnEdit?.(form));

export const createWiredSetupSlice: StateCreator<WiredSetupSlice & WiredElementMemorySlice, [], [], WiredSetupSlice> = set => ({
    ...WiredSetupSliceInitialState,
    openSetup: session => set(x => ({
        setup: { ...session, editId: x.setupEditCount + 1 },
        setupEditCount: x.setupEditCount + 1,
        elementMemory: rememberEdit(x.elementMemory, session.entry, session.form),
    })),
    closeSetup: () => set({ setup: undefined }),
    patchSetup: patch => set((x) => {
        if (!x.setup) return x;

        const setup = { ...x.setup, ...patch };

        return { setup, elementMemory: ('form' in patch) ? rememberEdit(x.elementMemory, setup.entry, setup.form) : x.elementMemory };
    }),
    patchSetupTriggerable: patch => set(x => (x.setup ? { setup: { ...x.setup, triggerable: { ...x.setup.triggerable, ...patch } } } : x)),
    setSetupForm: update => set((x) => {
        if (!x.setup) return x;

        const form = (typeof update === 'function') ? update(x.setup.form) : { ...(x.setup.form as object), ...update };

        return { setup: { ...x.setup, form }, elementMemory: rememberEdit(x.elementMemory, x.setup.entry, form) };
    }),
    setUpdateMode: updateMode => set({ updateMode }),
    setPendingVariablesListener: pendingVariablesListener => set({ pendingVariablesListener }),
    setNonOwnerConfirmed: nonOwnerConfirmed => set({ nonOwnerConfirmed }),
    setSetupPosition: setupPosition => set({ setupPosition }),
    setGuildMemberships: guildMemberships => set({ guildMemberships }),
});
