import { useUserContext } from "#base/context";
import { selectSecurityLevel } from "#base/stores";

export const useSecurityLevel = () => useUserContext(selectSecurityLevel);