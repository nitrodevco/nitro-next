import { useUserStore } from '../useUserStore';

export const useOwnClubLevel = () => useUserStore(x => x.clubLevel);
