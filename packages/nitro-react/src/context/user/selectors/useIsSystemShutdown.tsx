import { useUserStore } from '../useUserStore';

export const useIsSystemShutdown = () => useUserStore(x => x.systemShutdown);
