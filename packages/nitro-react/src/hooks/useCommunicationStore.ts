import { CommunicationStore } from '@nitrodevco/nitro-shared';
import { useStore as useZustandStore } from 'zustand';

type StoreState = ReturnType<typeof CommunicationStore.getState>;

export const useCommunicationStore = <T>(selector: (state: StoreState) => T): T =>
    useZustandStore(CommunicationStore, selector);
