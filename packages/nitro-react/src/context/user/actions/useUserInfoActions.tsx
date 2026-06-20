import { useShallow } from "zustand/shallow";

import { useUserContext } from "#base/context";
import { extractUserInfoActions } from "#base/stores";

export const useUserInfoActions = () => useUserContext(useShallow(extractUserInfoActions));