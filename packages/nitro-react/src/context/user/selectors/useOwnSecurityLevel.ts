import { useUserStore } from '../useUserStore';

/** The user's own security level, as `UserRightsMessageEvent` last sent it. */
export const useOwnSecurityLevel = () => useUserStore(x => x.securityLevel);
