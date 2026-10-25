/** App-wide profile data, filled by the profile packet handler. */
import { createStore } from 'zustand';

import { createProfileSlice, ProfileSlice } from './ProfileSlice';

/** The profile and its follow-up responses, shared by `ExtendedProfileWindowCtrl`'s packet flow. */
export type ProfileStore = ProfileSlice;

export const profileStore = createStore<ProfileStore>()((...args) => ({
    ...createProfileSlice(...args),
}));
