import { useShallow } from "zustand/shallow";

import { useUserContext } from "../useUserContext";

export const useUserInfoActions = () => useUserContext(useShallow(x => ({
    setUserInfo: x.setUserInfo,
    setName: x.setName,
    setFigure: x.setFigure,
    setAccountSafetyLocked: x.setAccountSafetyLocked,
    setEmailVerified: x.setEmailVerified
})));