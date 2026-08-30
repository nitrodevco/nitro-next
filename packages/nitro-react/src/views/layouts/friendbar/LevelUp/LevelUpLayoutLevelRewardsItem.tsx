import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { LevelUpLayoutRewardList, LevelUpLayoutRewardListProps } from './LevelUpLayoutRewardList';

/** Row template `level_rewards` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutLevelRewardsItemProps {
    layout?: BoxLayout;
    rewardList?: LevelUpLayoutRewardListProps;
    visibleRewardList?: boolean;
}

export const LevelUpLayoutLevelRewardsItem = ({ layout, rewardList, visibleRewardList }: LevelUpLayoutLevelRewardsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="level_rewards"
            layout={{ width: 378, height: 80, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('illumina_horizontal_separator.png')}
                layout={{ position: 'absolute', left: 0, width: 378, top: 0, height: 2 }}
            />
            <ThemeText
                text={t('talent.track.common.levelup.rewards')}
                textStyle="text-style-il-border"
                textOptions={{ fill: '#333333' }}
                layout={{ position: 'absolute', left: 4, width: 185, top: 12, height: 15 }}
            />
            {(visibleRewardList ?? true) && (
                <LevelUpLayoutRewardList {...rewardList} />
            )}
        </Region>
    );
};
