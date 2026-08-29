import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { LevelUpLayoutLevelDescriptionItem } from './LevelUpLayoutLevelDescriptionItem';
import { LevelUpLayoutLevelRewardsItem } from './LevelUpLayoutLevelRewardsItem';
import { LevelUpLayoutLevelTitleItem } from './LevelUpLayoutLevelTitleItem';

/** Named region `level_up_layout` of LevelUpLayout - configured through the parent's `levelUpLayout` prop. */
export interface LevelUpLayoutLevelUpLayoutProps {
    itemsLevelUpLayout?: ReactNode;
    layout?: BoxLayout;
}

export const LevelUpLayoutLevelUpLayout = ({ itemsLevelUpLayout, layout }: LevelUpLayoutLevelUpLayoutProps) => {
    return (
        <Region
            name="level_up_layout"
            layout={{ position: 'absolute', left: 14, top: 12, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsLevelUpLayout ?? (
                <>
                    <LevelUpLayoutLevelTitleItem />
                    <LevelUpLayoutLevelDescriptionItem />
                    <LevelUpLayoutLevelRewardsItem />
                </>
            )}
        </Region>
    );
};
