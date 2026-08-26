import { AchievementsContextProvider } from "#base/context/achievements";

import { AchievementComponent } from "./AchievementComponent";

export const AchievementsWrapper = () => {
    return (
        <AchievementsContextProvider>
            <AchievementComponent />
        </AchievementsContextProvider>
    );
}
