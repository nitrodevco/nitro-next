import { userStore } from '../store';
import { ClientGate, passesClientGate } from './ClientGate';

/** `useClientGate` for code outside a component: the own user's rights as they are now. */
export const hasClientGate = (gate: ClientGate) => passesClientGate(userStore.getState(), gate);
