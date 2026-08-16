import { useUserContext } from "../useUserContext";

export const useOwnUserId = () => useUserContext(x => x.userId);