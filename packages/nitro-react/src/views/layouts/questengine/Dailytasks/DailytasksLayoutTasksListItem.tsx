import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { DailytasksLayoutTaskTemplateItem } from './DailytasksLayoutTaskTemplateItem';

/** Row template `tasks_list` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutTasksListItemProps {
    itemsTasksList?: ReactNode;
    layout?: BoxLayout;
}

export const DailytasksLayoutTasksListItem = ({ itemsTasksList, layout }: DailytasksLayoutTasksListItemProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 426, height: 373, flexShrink: 0, minWidth: 426, maxWidth: 426, ...layout }}
        >
            <Region
                name="tasks_list"
                layout={{ flexDirection: 'column', gap: 8, width: '100%' }}
            >
                {itemsTasksList ?? (
                    <DailytasksLayoutTaskTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};
