import { useUserStore } from '../useUserStore';

/** The user's own figure string (`SessionDataManager.figure`). */
export const useOwnUserFigure = () => useUserStore(x => x.figure);
