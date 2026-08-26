import { useShallow } from "zustand/shallow";

import { useAchievementsContext } from "../useAchievementsContext";

export const useAchievementsSelectors = () => useAchievementsContext(useShallow(x => ({
    selectedCategory: x.selectedCategory,
    achievementCategories: x.achievementCategories
})));