import { useUserContext } from '../useUserContext';

export const useIsSystemShutdown = () => useUserContext(x => x.systemShutdown);
