import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { TalentTrackLayoutTaskAchievedItem } from './TalentTrackLayoutTaskAchievedItem';
import { TalentTrackLayoutTaskLockedItem } from './TalentTrackLayoutTaskLockedItem';
import { TalentTrackLayoutTaskOngoingItem } from './TalentTrackLayoutTaskOngoingItem';

/** Named region `task_list_top` of TalentTrackLayout - configured through the parent's `taskListTop` prop. */
export interface TalentTrackLayoutTaskListTopProps {
    itemsTaskListTop?: ReactNode;
    layout?: BoxLayout;
}

export const TalentTrackLayoutTaskListTop = ({ itemsTaskListTop, layout }: TalentTrackLayoutTaskListTopProps) => {
    return (
        <Region
            name="task_list_top"
            layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsTaskListTop ?? (
                <>
                    <TalentTrackLayoutTaskAchievedItem />
                    <TalentTrackLayoutTaskOngoingItem />
                    <TalentTrackLayoutTaskLockedItem />
                </>
            )}
        </Region>
    );
};
