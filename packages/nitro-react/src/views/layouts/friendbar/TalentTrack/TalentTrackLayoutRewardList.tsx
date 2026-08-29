import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { TalentTrackLayoutRewardAchievedItem } from './TalentTrackLayoutRewardAchievedItem';
import { TalentTrackLayoutRewardLockedItem } from './TalentTrackLayoutRewardLockedItem';
import { TalentTrackLayoutRewardProductItem } from './TalentTrackLayoutRewardProductItem';
import { TalentTrackLayoutRewardVipItem } from './TalentTrackLayoutRewardVipItem';

/** Named region `reward_list` of TalentTrackLayout - configured through the parent's `rewardList` prop. */
export interface TalentTrackLayoutRewardListProps {
    itemsRewardList?: ReactNode;
    layout?: BoxLayout;
}

export const TalentTrackLayoutRewardList = ({ itemsRewardList, layout }: TalentTrackLayoutRewardListProps) => {
    return (
        <Region
            name="reward_list"
            layout={{ position: 'absolute', left: 10, top: 80, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsRewardList ?? (
                <>
                    <TalentTrackLayoutRewardProductItem />
                    <TalentTrackLayoutRewardVipItem />
                    <TalentTrackLayoutRewardAchievedItem />
                    <TalentTrackLayoutRewardLockedItem />
                </>
            )}
        </Region>
    );
};
