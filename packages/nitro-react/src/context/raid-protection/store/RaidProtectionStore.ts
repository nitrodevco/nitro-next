/**
 * The raid protection store - the state of Flash's `navigator/raidprotection/RaidProtectionSettingsController`
 * and its one `RaidProtectionSettingsView`, a session-lifetime part of the navigator.
 *
 * - `capabilities` (`_capabilities`): the rooms the server said the user may manage
 *   (`RaidProtectionCapabilityMessage` with `canManage`). Only the live current room is ever kept.
 * - `settings` (`settings`): each room's settings as the server last sent them.
 * - `requestedRoomId` (`§_-c2N§`): the room whose settings `openFromLink` asked for; the answer for
 *   it opens the window.
 * - `savingRoomId` (`roomId`): the room a save is out for, 0 when none is; a second save waits.
 * - `confirmation` (`§_-F1d§` / `§_-W2T§` and the dialog): turning protection on asks first.
 * - `view`: what the window shows - the settings it was updated with (`uSER`) and its controls -
 *   while it is up; `saveOutstanding` (`§_-f2N§`) disables its save button.
 */
import type { IRaidProtectionSettings } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

/** What `collectDraft` reads off the window's controls. */
export type RaidProtectionDraft = Pick<IRaidProtectionSettings, 'enabled' | 'detectionSensitivity' | 'actionType' | 'banDurationSeconds' | 'guardEnabled' | 'guardDurationSeconds' | 'guardSensitivity'>;

export interface RaidProtectionView {
    /** `uSER`: the settings the window was last updated with. */
    settings: IRaidProtectionSettings;
    /** The controls, as `update` set them and the user changed them since. */
    draft: RaidProtectionDraft;
}

export interface RaidProtectionConfirmation {
    /** `§_-F1d§`: the settings to save once confirmed. */
    draft: IRaidProtectionSettings;
    /** `§_-W2T§`: the stored settings the confirmation was asked against. */
    previous: IRaidProtectionSettings;
    /** The confirm dialog's id. */
    dialogId: number;
}

type State = {
    capabilities: number[];
    settings: Record<number, IRaidProtectionSettings>;
    requestedRoomId: number;
    savingRoomId: number;
    confirmation: RaidProtectionConfirmation | undefined;
    view: RaidProtectionView | undefined;
    saveOutstanding: boolean;
};

type Actions = {
    setCapability: (roomId: number, canManage: boolean) => void;
    setSettings: (settings: IRaidProtectionSettings) => void;
    forgetRoom: (roomId: number) => void;
    setRequestedRoomId: (roomId: number) => void;
    setSavingRoomId: (roomId: number) => void;
    setConfirmation: (confirmation: RaidProtectionConfirmation | undefined) => void;
    /** `RaidProtectionSettingsView.update` and `show`: the controls put back to `settings`. */
    showView: (settings: IRaidProtectionSettings) => void;
    /** `update` on a window that is already up. */
    updateView: (settings: IRaidProtectionSettings) => void;
    /** A control changed (`onControlChanged`). */
    setDraft: (changes: Partial<RaidProtectionDraft>) => void;
    hideView: () => void;
    setSaveOutstanding: (saveOutstanding: boolean) => void;
    resetRaidProtection: () => void;
};

export type RaidProtectionStore = State & Actions;

const INITIAL: State = {
    capabilities: [],
    settings: {},
    requestedRoomId: 0,
    savingRoomId: 0,
    confirmation: undefined,
    view: undefined,
    saveOutstanding: false,
};

const draftOf = ({ enabled, detectionSensitivity, actionType, banDurationSeconds, guardEnabled, guardDurationSeconds, guardSensitivity }: IRaidProtectionSettings): RaidProtectionDraft =>
    ({ enabled, detectionSensitivity, actionType, banDurationSeconds, guardEnabled, guardDurationSeconds, guardSensitivity });

export const createRaidProtectionStore = () => createStore<RaidProtectionStore>()(set => ({
    ...INITIAL,
    setCapability: (roomId, canManage) => set(x => ({ capabilities: canManage ? [ ...x.capabilities.filter(id => id !== roomId), roomId ] : x.capabilities.filter(id => id !== roomId) })),
    setSettings: settings => set(x => ({ settings: { ...x.settings, [settings.roomId]: settings } })),
    forgetRoom: roomId => set((x) => {
        const settings = { ...x.settings };

        delete settings[roomId];

        return { capabilities: x.capabilities.filter(id => id !== roomId), settings };
    }),
    setRequestedRoomId: requestedRoomId => set({ requestedRoomId }),
    setSavingRoomId: savingRoomId => set({ savingRoomId }),
    setConfirmation: confirmation => set({ confirmation }),
    showView: settings => set({ view: { settings, draft: draftOf(settings) } }),
    updateView: settings => set(x => (x.view ? { view: { settings, draft: draftOf(settings) } } : x)),
    setDraft: changes => set(x => (x.view ? { view: { ...x.view, draft: { ...x.view.draft, ...changes } } } : x)),
    hideView: () => set({ view: undefined }),
    setSaveOutstanding: saveOutstanding => set({ saveOutstanding }),
    resetRaidProtection: () => set({ ...INITIAL }),
}));

export const raidProtectionStore = createRaidProtectionStore();
