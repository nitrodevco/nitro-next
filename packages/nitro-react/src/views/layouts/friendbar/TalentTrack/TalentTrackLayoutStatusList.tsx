import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { TalentTrackLayoutLevelRewardItem } from './TalentTrackLayoutLevelRewardItem';
import { TalentTrackLayoutLevelTaskItem } from './TalentTrackLayoutLevelTaskItem';

/** Named region `status_list` of TalentTrackLayout - configured through the parent's `statusList` prop. */
export interface TalentTrackLayoutStatusListProps {
    itemsStatusList?: ReactNode;
    layout?: BoxLayout;
}

export const TalentTrackLayoutStatusList = ({ itemsStatusList, layout }: TalentTrackLayoutStatusListProps) => {
    return (
        <Region
            name="status_list"
            layout={{ position: 'absolute', left: 10, width: 1000, top: 100, height: 180, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsStatusList ?? (
                <>
                    <TalentTrackLayoutLevelRewardItem />
                    <TalentTrackLayoutLevelTaskItem />
                </>
            )}
        </Region>
    );
};
