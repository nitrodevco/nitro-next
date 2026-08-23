import { useUserContext } from '../useUserContext';

export const useOwnIsAmbassador = () => useUserContext(x => x.isAmbassador);
