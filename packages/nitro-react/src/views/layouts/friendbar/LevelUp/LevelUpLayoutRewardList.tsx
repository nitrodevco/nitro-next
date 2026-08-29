import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { LevelUpLayoutPlusTemplateItem } from './LevelUpLayoutPlusTemplateItem';
import { LevelUpLayoutRewardPerkTemplateItem } from './LevelUpLayoutRewardPerkTemplateItem';
import { LevelUpLayoutRewardProductTemplateItem } from './LevelUpLayoutRewardProductTemplateItem';
import { LevelUpLayoutRewardVipTemplateItem } from './LevelUpLayoutRewardVipTemplateItem';

/** Named region `reward_list` of LevelUpLayout - configured through the parent's `rewardList` prop. */
export interface LevelUpLayoutRewardListProps {
    itemsRewardList?: ReactNode;
    layout?: BoxLayout;
}

export const LevelUpLayoutRewardList = ({ itemsRewardList, layout }: LevelUpLayoutRewardListProps) => {
    return (
        <Region
            name="reward_list"
            layout={{ position: 'absolute', left: 4, width: 370, top: 34, height: 35, flexDirection: 'row', ...layout }}
        >
            {itemsRewardList ?? (
                <>
                    <LevelUpLayoutRewardVipTemplateItem />
                    <LevelUpLayoutRewardProductTemplateItem />
                    <LevelUpLayoutRewardPerkTemplateItem />
                    <LevelUpLayoutPlusTemplateItem />
                </>
            )}
        </Region>
    );
};
