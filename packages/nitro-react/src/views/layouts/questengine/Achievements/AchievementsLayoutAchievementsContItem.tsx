import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `achievements_cont` of AchievementsLayout - pass real rows through its `items…` slot. */
export interface AchievementsLayoutAchievementsContItemProps {
    achievementsCont?: ReactNode;
    layout?: BoxLayout;
}

export const AchievementsLayoutAchievementsContItem = ({ achievementsCont, layout }: AchievementsLayoutAchievementsContItemProps) => {
    return (
        <Region
            name="achievements_cont"
            layout={{ width: 367, height: 10, flexShrink: 0, ...layout }}
        >
            {achievementsCont}
        </Region>
    );
};
