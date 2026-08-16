import { useShallow } from "zustand/shallow";

import { useUserContext } from "../useUserContext";

export const useUserWalletActions = () => useUserContext(useShallow(x => ({
    setCredits: x.setCredits,
    setEmeralds: x.setEmeralds,
    setSilver: x.setSilver,
    setActivityPoints: x.setActivityPoints
})));