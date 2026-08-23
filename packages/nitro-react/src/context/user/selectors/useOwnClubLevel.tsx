import { useUserContext } from '../useUserContext';

export const useOwnClubLevel = () => useUserContext(x => x.clubLevel);
