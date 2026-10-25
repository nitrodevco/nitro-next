import { useUserStore } from '../useUserStore';

/** `SessionDataManager.isAmbassador`: whether the user is an ambassador. */
export const useOwnIsAmbassador = () => useUserStore(x => x.isAmbassador);
