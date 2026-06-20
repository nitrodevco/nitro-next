import { SessionStore } from '@nitrodevco/nitro-shared';
import { useStore as useZustandStore } from 'zustand';

type StoreState = ReturnType<typeof SessionStore.getState>;

export const useSessionStore = <T>(
    selector: (state: StoreState) => T
): T =>
    useZustandStore(SessionStore, selector);
