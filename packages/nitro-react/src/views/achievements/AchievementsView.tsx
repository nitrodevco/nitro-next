import { useSystemActions, useTranslation } from "#base/context";
import { useAchievementsSelectors } from "#base/context/achievements";
import { Frame } from "#base/theme";

import { AchievementsCategoryView } from "./AchievementsCategoryView";
import { AchievementsListView } from "./AchievementsListView";

export const AchievementsView = () => {
    const { selectedCategory } = useAchievementsSelectors();
    const { toggleWindow } = useSystemActions();
    
    const t = useTranslation();

    return (
        <Frame id="achievements" variant="3" resizable={ false } className="w-97.25 h-fit min-h-74.25" caption={ t('inventory.achievements') } onClose={ () => toggleWindow('achievements') }>
            { selectedCategory ? <AchievementsCategoryView /> : <AchievementsListView /> }
        </Frame>
    );
}