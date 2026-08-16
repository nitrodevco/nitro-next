import { useUserContext } from "../useUserContext";

export const useOwnUserFigure = () => useUserContext(x => x.figure);
