import { BoxLayout, Region } from '#base/theme';

import { CommunityGoalLayoutCommunityGoal, CommunityGoalLayoutCommunityGoalProps } from './CommunityGoalLayoutCommunityGoal';

/** Generated from `10_community_goal_xml` (layout "community_goal", 516x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CommunityGoalLayoutProps {
    communityGoal?: CommunityGoalLayoutCommunityGoalProps;
    layout?: BoxLayout;
}

export const CommunityGoalLayout = ({ communityGoal, layout }: CommunityGoalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 516, height: 200, ...layout }}>
            <CommunityGoalLayoutCommunityGoal {...communityGoal} />
        </Region>
    );
};
