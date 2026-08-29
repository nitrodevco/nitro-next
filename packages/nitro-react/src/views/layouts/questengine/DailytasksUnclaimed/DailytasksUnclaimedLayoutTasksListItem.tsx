import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

/** Row template `tasks_list` of DailytasksUnclaimedLayout - pass real rows through its `items…` slot. */
export interface DailytasksUnclaimedLayoutTasksListItemProps {
    itemsTasksList?: ReactNode;
    layout?: BoxLayout;
}

export const DailytasksUnclaimedLayoutTasksListItem = ({ itemsTasksList, layout }: DailytasksUnclaimedLayoutTasksListItemProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 426, height: 373, flexShrink: 0, minWidth: 426, maxWidth: 426, minHeight: 373, maxHeight: 500, ...layout }}
        >
            <Region
                name="tasks_list"
                layout={{ flexDirection: 'column', gap: 8, width: '100%' }}
            >
                {itemsTasksList}
            </Region>
        </ScrollArea>
    );
};
