import { useShallow } from "zustand/shallow";

import { useUserContext } from "../useUserContext";

export const useWallet = () => useUserContext(useShallow(x => ({
    credits: x.credits,
    emeralds: x.emeralds,
    silver: x.silver,
    activityPoints: x.activityPoints
})));