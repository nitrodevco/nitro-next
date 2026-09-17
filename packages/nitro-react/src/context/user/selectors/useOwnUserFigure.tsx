import { useUserStore } from '../useUserStore';

export const useOwnUserFigure = () => useUserStore(x => x.figure);
