import { useUserStore } from '../useUserStore';

export const useOwnUserId = () => useUserStore(x => x.userId);
