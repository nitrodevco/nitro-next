import { GetAchievementsComposer } from "@nitrodevco/nitro-packets";
import { useEffect } from "react";

import { useIsWindowVisible, useWebSocketContext } from "#base/context"
import { useAchievementsSelectors } from "#base/context/achievements";
import { useAchievementsHandler } from "#base/handlers";
import { AchievementsView } from "#base/views/achievements/AchievementsView";

export const AchievementComponent = () => {
    const isVisible = useIsWindowVisible('achievements');
    const { achievementCategories } = useAchievementsSelectors();
    
    const { send } = useWebSocketContext();

    useAchievementsHandler();

    useEffect(() => {
        if(achievementCategories.size) return;

        send(new GetAchievementsComposer({}));
    }, [achievementCategories]);

    if(!isVisible) return null;

    return <AchievementsView />
}