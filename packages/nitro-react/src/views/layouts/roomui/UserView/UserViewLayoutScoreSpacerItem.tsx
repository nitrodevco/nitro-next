import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `score_spacer` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutScoreSpacerItemProps {
    layout?: BoxLayout;
    scoreSpacer?: ReactNode;
    visibleScoreSpacer?: boolean;
}

export const UserViewLayoutScoreSpacerItem = ({ layout, scoreSpacer, visibleScoreSpacer }: UserViewLayoutScoreSpacerItemProps) => {
    return (
        (visibleScoreSpacer ?? false) && (
            <Region
                name="score_spacer"
                backgroundColor="#333333"
                layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
            >
                {scoreSpacer}
            </Region>
        )
    );
};
