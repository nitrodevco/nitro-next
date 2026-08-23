import { useUserContext } from '../useUserContext';

export const useOwnSecurityLevel = () => useUserContext(x => x.securityLevel);
