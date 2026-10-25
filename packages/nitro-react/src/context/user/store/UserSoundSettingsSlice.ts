/**
 * The three volumes `HabboSoundManagerFlash10` keeps - the client's own sounds ("generic"), furni
 * and Trax - as `SoundSettingsView` shows and `AccountPreferencesEventMessage` delivers them.
 *
 * Flash holds each as 0..1 and stores it as an int percentage (`storeVolumeSetting`); that is what
 * `soundSettingsCommands` sends. The sound manager (`src/sound`, Flash's `HabboSoundManagerFlash10`)
 * plays at them: `bridgeSoundManager` hands every change to its `updateVolumeSetting`, so a slider
 * dragged in the window is heard at once. The `muted` flag `updateVolumeSetting` applies over them
 * has no store field: only Flash's video offers set it, and they are not ported.
 */
import { StateCreator } from 'zustand';

/** Flash's volumes are 0..1; the wire carries whole percentages. */
export const SOUND_VOLUME_SCALE = 100;

type State = {
    /** Flash's `genericVolume`, 0..1. */
    uiVolume: number;
    furniVolume: number;
    traxVolume: number;
};

type Actions = {
    /** `updateVolumeSetting` - each already scaled to 0..1 by its caller. */
    setSoundVolumes: (uiVolume: number, furniVolume: number, traxVolume: number) => void;
};

export const UserSoundSettingsSliceInitialState: State = {
    uiVolume: 1,
    furniVolume: 1,
    traxVolume: 1,
};

export type UserSoundSettingsSlice = State & Actions;

export const createUserSoundSettingsSlice: StateCreator<UserSoundSettingsSlice, [], [], State & Actions> = set => ({
    ...UserSoundSettingsSliceInitialState,
    setSoundVolumes: (uiVolume, furniVolume, traxVolume) => set({ uiVolume, furniVolume, traxVolume }),
});
