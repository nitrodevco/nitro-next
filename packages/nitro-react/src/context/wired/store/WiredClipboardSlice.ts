/**
 * The wired clipboard - `UserDefinedRoomEventsCtrl.§_-525§`, a `ClipboardWiredEntry` per box
 * type. One entry per `<holder>-<code>` key, so a copy only pastes into a box of the type it was
 * taken from. It is kept for the whole session: Flash never clears it, not even between rooms.
 */
import { StateCreator } from 'zustand';

import type { WiredHolderKey } from '#base/wired';

/** `ClipboardWiredEntry` - everything a save would send, minus the box id. */
export interface WiredClipboardEntry {
    intParams: number[];
    stringParam: string;
    variableIds: string[];
    stuffIds: number[];
    stuffIds2: number[];
    furniSourceTypes: number[];
    userSourceTypes: number[];
    /** Actions only; 0 otherwise. */
    delayInPulses: number;
    /** Conditions only; 0 otherwise. */
    quantifierCode: number;
    /** Selectors only; `false` otherwise. */
    isFilter: boolean;
    isInvert: boolean;
}

/** The clipboard key of a box type: `holder.getKey() + "-" + element.code`. */
export const wiredClipboardKey = (holder: WiredHolderKey, code: number) => `${holder}-${code}`;

type State = {
    clipboard: Record<string, WiredClipboardEntry>;
};

type Actions = {
    setClipboardEntry: (key: string, entry: WiredClipboardEntry) => void;
};

export const WiredClipboardSliceInitialState: State = {
    clipboard: {},
};

export type WiredClipboardSlice = State & Actions;

export const createWiredClipboardSlice: StateCreator<WiredClipboardSlice, [], [], WiredClipboardSlice> = set => ({
    ...WiredClipboardSliceInitialState,
    setClipboardEntry: (key, entry) => set(x => ({ clipboard: { ...x.clipboard, [key]: entry } })),
});
