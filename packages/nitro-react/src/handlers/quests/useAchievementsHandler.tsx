import { AchievementsEventMessage } from "@nitrodevco/nitro-packets"

import { useAchievementsActions } from "#base/context/achievements";
import { useMessageListener } from "#base/hooks"


export const useAchievementsHandler = () => {
    const { processAchievementCategories } = useAchievementsActions();
    
    useMessageListener(AchievementsEventMessage, data => {
        console.log(data)
        processAchievementCategories(data.achievements);
    });
}