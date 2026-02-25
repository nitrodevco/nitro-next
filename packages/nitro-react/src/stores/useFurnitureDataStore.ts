import { FurnitureDataStore } from '@nitrodevco/nitro-shared';
import { useStore as useZustandStore } from 'zustand';

type StoreState = ReturnType<typeof FurnitureDataStore.getState>;

export const useFurnitureDataStore = <T>(selector: (state: StoreState) => T): T =>
    useZustandStore(FurnitureDataStore, selector);
