import { useUserContext } from "#base/context";
import { selectOwnUserId } from "#base/stores";

export const useOwnUserId = () => useUserContext(selectOwnUserId);