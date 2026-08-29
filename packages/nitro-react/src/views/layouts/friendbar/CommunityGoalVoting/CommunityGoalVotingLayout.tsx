import { BoxLayout, Region } from '#base/theme';

import { CommunityGoalVotingLayoutCommunityGoal, CommunityGoalVotingLayoutCommunityGoalProps } from './CommunityGoalVotingLayoutCommunityGoal';

/** Generated from `88_community_goal_voting_xml` (layout "community_goal_voting", 516x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CommunityGoalVotingLayoutProps {
    communityGoal?: CommunityGoalVotingLayoutCommunityGoalProps;
    layout?: BoxLayout;
}

export const CommunityGoalVotingLayout = ({ communityGoal, layout }: CommunityGoalVotingLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 516, height: 200, ...layout }}>
            <CommunityGoalVotingLayoutCommunityGoal {...communityGoal} />
        </Region>
    );
};
