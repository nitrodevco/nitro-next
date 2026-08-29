import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

import { TaskProgressDialogLayoutActionLinkItem } from './TaskProgressDialogLayoutActionLinkItem';
import { TaskProgressDialogLayoutProgressMainContainerItem } from './TaskProgressDialogLayoutProgressMainContainerItem';
import { TaskProgressDialogLayoutTopList, TaskProgressDialogLayoutTopListProps } from './TaskProgressDialogLayoutTopList';

/** Named region `list` of TaskProgressDialogLayout - configured through the parent's `list` prop. */
export interface TaskProgressDialogLayoutListProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
    topList?: TaskProgressDialogLayoutTopListProps;
}

export const TaskProgressDialogLayoutList = ({ itemsList, layout, topList }: TaskProgressDialogLayoutListProps) => {
    return (
        <Region
            name="list"
            layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', ...layout }}
        >
            {itemsList ?? (
                <>
                    <TaskProgressDialogLayoutProgressMainContainerItem />
                    <TaskProgressDialogLayoutActionLinkItem />
                </>
            )}
            <Border
                variant="104"
                tintColor="#e2e2e2"
                layout={{ width: 345, height: 204, flexShrink: 0 }}
            >
                <TaskProgressDialogLayoutTopList {...topList} />
            </Border>
            <Region layout={{ width: 380, height: 15, flexShrink: 0 }} />
        </Region>
    );
};
