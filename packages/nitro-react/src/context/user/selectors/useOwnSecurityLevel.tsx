import { useUserStore } from '../useUserStore';

export const useOwnSecurityLevel = () => useUserStore(x => x.securityLevel);
