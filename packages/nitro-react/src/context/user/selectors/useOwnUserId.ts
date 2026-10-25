import { useUserStore } from '../useUserStore';

/** The user's own id (`SessionDataManager.userId`), -1 until the user object arrives. */
export const useOwnUserId = () => useUserStore(x => x.userId);
