import { ReactNode } from 'react';

import { BoxLayout, Region, WidgetSlot } from '#base/theme';

import { TaskProgressDialogLayoutActionDescriptionItem } from './TaskProgressDialogLayoutActionDescriptionItem';
import { TaskProgressDialogLayoutActionSeparatorItem } from './TaskProgressDialogLayoutActionSeparatorItem';
import { TaskProgressDialogLayoutActionTitleItem } from './TaskProgressDialogLayoutActionTitleItem';
import { TaskProgressDialogLayoutEmailContainerItem } from './TaskProgressDialogLayoutEmailContainerItem';
import { TaskProgressDialogLayoutInstructionItem } from './TaskProgressDialogLayoutInstructionItem';
import { TaskProgressDialogLayoutTitleItem } from './TaskProgressDialogLayoutTitleItem';

/** Named region `top_list` of TaskProgressDialogLayout - configured through the parent's `topList` prop. */
export interface TaskProgressDialogLayoutTopListProps {
    badge?: ReactNode;
    itemsTopList?: ReactNode;
    layout?: BoxLayout;
}

export const TaskProgressDialogLayoutTopList = ({ badge, itemsTopList, layout }: TaskProgressDialogLayoutTopListProps) => {
    return (
        <Region
            name="top_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minHeight: 70, flexDirection: 'column', ...layout }}
        >
            {itemsTopList ?? (
                <>
                    <TaskProgressDialogLayoutInstructionItem />
                    <TaskProgressDialogLayoutTitleItem />
                    <TaskProgressDialogLayoutActionSeparatorItem />
                    <TaskProgressDialogLayoutActionTitleItem />
                    <TaskProgressDialogLayoutActionDescriptionItem />
                    <TaskProgressDialogLayoutEmailContainerItem />
                </>
            )}
            <Region layout={{ width: 345, height: 10, flexShrink: 0 }}>
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge"
                    options={{ 'badge_image:badge_id': 'ACH_EmailVerification1', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 1, height: 70 }}
                >
                    {badge}
                </WidgetSlot>
            </Region>
            <Region layout={{ width: 345, height: 10, flexShrink: 0 }} />
        </Region>
    );
};
