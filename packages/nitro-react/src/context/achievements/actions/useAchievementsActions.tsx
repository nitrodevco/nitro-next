import { useShallow } from "zustand/shallow";

import { useAchievementsContext } from "../useAchievementsContext";

export const useAchievementsActions = () => useAchievementsContext(useShallow(x => ({
    setSelectedCategory: x.setSelectedCategory,
    processAchievementCategories: x.processAchievementCategories,
})));