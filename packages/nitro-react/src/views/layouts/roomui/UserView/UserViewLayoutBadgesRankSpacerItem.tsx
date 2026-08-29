import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `badges_rank_spacer` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutBadgesRankSpacerItemProps {
    badgesRankSpacer?: ReactNode;
    layout?: BoxLayout;
    visibleBadgesRankSpacer?: boolean;
}

export const UserViewLayoutBadgesRankSpacerItem = ({ badgesRankSpacer, layout, visibleBadgesRankSpacer }: UserViewLayoutBadgesRankSpacerItemProps) => {
    return (
        (visibleBadgesRankSpacer ?? false) && (
            <Region
                name="badges_rank_spacer"
                backgroundColor="#333333"
                layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
            >
                {badgesRankSpacer}
            </Region>
        )
    );
};
