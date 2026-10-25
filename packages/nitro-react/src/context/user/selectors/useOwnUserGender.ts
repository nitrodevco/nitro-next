import { useUserStore } from '../useUserStore';

/** The user's own gender (`SessionDataManager.gender`). */
export const useOwnUserGender = () => useUserStore(x => x.sex);
