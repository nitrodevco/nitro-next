import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { TalentTrackLayoutTaskListTop, TalentTrackLayoutTaskListTopProps } from './TalentTrackLayoutTaskListTop';

/** Row template `level_task` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutLevelTaskItemProps {
    itemsTaskListBottom?: ReactNode;
    layout?: BoxLayout;
    taskListTop?: TalentTrackLayoutTaskListTopProps;
    visibleTaskListBottom?: boolean;
    visibleTaskListTop?: boolean;
}

export const TalentTrackLayoutLevelTaskItem = ({ itemsTaskListBottom, layout, taskListTop, visibleTaskListBottom, visibleTaskListTop }: TalentTrackLayoutLevelTaskItemProps) => {
    return (
        <Region
            name="level_task"
            layout={{ width: 600, height: 180, flexShrink: 0, ...layout }}
        >
            {(visibleTaskListTop ?? true) && (
                <TalentTrackLayoutTaskListTop {...taskListTop} />
            )}
            {(visibleTaskListBottom ?? true) && (
                <Region
                    name="task_list_bottom"
                    layout={{ position: 'absolute', left: 0, top: 80, flexDirection: 'row', gap: 10 }}
                >
                    {itemsTaskListBottom}
                </Region>
            )}
        </Region>
    );
};
