import { LocalizationStore } from '@nitrodevco/nitro-shared';
import { useStore as useZustandStore } from 'zustand';

type StoreState = ReturnType<typeof LocalizationStore.getState>;

export const useLocalizationStore = <T>(selector: (state: StoreState) => T): T =>
    useZustandStore(LocalizationStore, selector);
