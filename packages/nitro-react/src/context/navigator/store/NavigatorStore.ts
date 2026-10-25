/**
 * The navigator store, its slices combined, and `navigatorStore`, the one for the whole client - the
 * port of `HabboNewNavigator` and its `NavigatorData`. It lives as long as the app does, so there is
 * nothing a provider would add: components read it through their hooks, and code outside React -
 * packet handlers, commands - reads and writes it through `getState()`, which is always current.
 */
import { ISearchResultList } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

import { createNavigatorCategoriesSlice, NavigatorCategoriesSlice, NavigatorCategoriesSliceInitialState } from './NavigatorCategoriesSlice';
import { createNavigatorCurrentRoomSlice, NavigatorCurrentRoomSlice, NavigatorCurrentRoomSliceInitialState } from './NavigatorCurrentRoomSlice';
import { createNavigatorRoomEntrySlice, NavigatorRoomEntrySlice, NavigatorRoomEntrySliceInitialState } from './NavigatorRoomEntrySlice';
import { createNavigatorRoomEventSlice, NavigatorRoomEventSlice, NavigatorRoomEventSliceInitialState } from './NavigatorRoomEventSlice';
import { createNavigatorRoomSettingsSlice, NavigatorRoomSettingsSlice, NavigatorRoomSettingsSliceInitialState } from './NavigatorRoomSettingsSlice';
import { createNavigatorRoomVisitSlice, NavigatorRoomVisitSlice, NavigatorRoomVisitSliceInitialState } from './NavigatorRoomVisitSlice';
import { createNavigatorSearchSlice, NavigatorSearchSlice, NavigatorSearchSliceInitialState } from './NavigatorSearchSlice';
import { createNavigatorWindowSlice, NavigatorWindowSlice, NavigatorWindowSliceInitialState } from './NavigatorWindowSlice';

type Actions = {
    resetNavigator: () => void;
};

export type NavigatorStore = NavigatorSearchSlice & NavigatorWindowSlice & NavigatorCategoriesSlice & NavigatorCurrentRoomSlice
    & NavigatorRoomVisitSlice & NavigatorRoomEntrySlice & NavigatorRoomEventSlice & NavigatorRoomSettingsSlice & Actions;

const initialState = {
    ...NavigatorSearchSliceInitialState,
    ...NavigatorWindowSliceInitialState,
    ...NavigatorCategoriesSliceInitialState,
    ...NavigatorCurrentRoomSliceInitialState,
    ...NavigatorRoomVisitSliceInitialState,
    ...NavigatorRoomEntrySliceInitialState,
    ...NavigatorRoomEventSliceInitialState,
    ...NavigatorRoomSettingsSliceInitialState,
};

export const createNavigatorStore = () => createStore<NavigatorStore>()((set, get, store) => ({
    ...createNavigatorSearchSlice(set, get, store),
    ...createNavigatorWindowSlice(set, get, store),
    ...createNavigatorCategoriesSlice(set, get, store),
    ...createNavigatorCurrentRoomSlice(set, get, store),
    ...createNavigatorRoomVisitSlice(set, get, store),
    ...createNavigatorRoomEntrySlice(set, get, store),
    ...createNavigatorRoomEventSlice(set, get, store),
    ...createNavigatorRoomSettingsSlice(set, get, store),
    resetNavigator: () => set({ ...initialState }),
}));

export const navigatorStore = createNavigatorStore();

export type { ISearchResultList };
