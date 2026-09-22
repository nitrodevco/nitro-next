/**
 * The earnings (vault) store - Flash's `catalog/earnings/EarningsController`, a session-lifetime
 * component `HabboCatalog` attaches, and the `EarningsView` window it builds. An app-wide
 * singleton: the income reward packets arrive whether the window is up or not, and the purse
 * reads the indicator from here.
 */
import { createStore } from 'zustand';

import { createEarningsIndicatorSlice, EarningsIndicatorSlice } from './EarningsIndicatorSlice';
import { createEarningsViewSlice, EarningsViewSlice } from './EarningsViewSlice';

export type EarningsStore = EarningsIndicatorSlice & EarningsViewSlice;

export const createEarningsStore = () => createStore<EarningsStore>()((set, get, store) => ({
    ...createEarningsIndicatorSlice(set, get, store),
    ...createEarningsViewSlice(set, get, store),
}));

export const earningsStore = createEarningsStore();
