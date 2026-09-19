import { useUserStore } from '../useUserStore';

export const useOwnIsAmbassador = () => useUserStore(x => x.isAmbassador);
