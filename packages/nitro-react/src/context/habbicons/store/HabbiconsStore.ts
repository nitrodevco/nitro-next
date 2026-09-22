/**
 * The habbicons store - `catalog/habbicons/HabbiconController`, the session-lifetime component
 * `HabboCatalog` attaches (`IIDHabbiconController`), with the assets of
 * `habbicons/assets/HabbiconAssetManager` and the hub window's lasting state. An app-wide
 * singleton: the controller exists for the whole session, whether its windows are up or not,
 * and the catalogue, the room and the messenger all read from it.
 */
import { createStore } from 'zustand';

import { createHabbiconAssetsSlice, HabbiconAssetsSlice } from './HabbiconAssetsSlice';
import { createHabbiconControllerSlice, HabbiconControllerSlice } from './HabbiconControllerSlice';
import { createHabbiconHubSlice, HabbiconHubSlice } from './HabbiconHubSlice';

export type HabbiconsStore = HabbiconControllerSlice & HabbiconHubSlice & HabbiconAssetsSlice;

export const createHabbiconsStore = () => createStore<HabbiconsStore>()((set, get, store) => ({
    ...createHabbiconControllerSlice(set, get, store),
    ...createHabbiconHubSlice(set, get, store),
    ...createHabbiconAssetsSlice(set, get, store),
}));

export const habbiconsStore = createHabbiconsStore();
