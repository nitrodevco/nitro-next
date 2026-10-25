import { ClientGate, passesClientGate } from '../gates';
import { useUserStore } from '../useUserStore';

/** Whether the own user passes a `ClientGates` entry, re-rendering when their rights change. */
export const useClientGate = (gate: ClientGate) => useUserStore(x => passesClientGate(x, gate));
