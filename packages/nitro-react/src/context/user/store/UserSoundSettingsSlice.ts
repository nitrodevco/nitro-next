/**
 * The three volumes `HabboSoundManagerFlash10` keeps - the client's own sounds ("generic"), furni
 * and Trax - as `SoundSettingsView` shows and `AccountPreferencesEventMessage` delivers them.
 *
 * Flash holds each as 0..1 and stores it as an int percentage (`storeVolumeSetting`); that is what
 * `soundSettingsCommands` sends. There is no audio engine in this client yet - nothing loads or
 * plays a sound - so these are the account's remembered settings and nothing reads them to set a
 * gain. When a sound manager is ported it reads them here, which is where Flash's own volume
 * getters read from; the `muted` flag `updateVolumeSetting` applies over them has no store field
 * for the same reason, because nothing would honour it.
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
