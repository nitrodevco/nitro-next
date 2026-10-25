import { useUserStore } from '../useUserStore';

/** The user's own club level (`SessionDataManager.clubLevel`). */
export const useOwnClubLevel = () => useUserStore(x => x.clubLevel);
