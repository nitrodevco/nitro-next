import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ScrollArea } from '#base/theme';

import { Main_100LayoutTaskTemplateItem } from './Main_100LayoutTaskTemplateItem';

/** Named region `tasks` of Main_100Layout - configured through the parent's `tasks` prop. */
export interface Main_100LayoutTasksProps {
    itemsTasks?: ReactNode;
    layout?: BoxLayout;
}

export const Main_100LayoutTasks = ({ itemsTasks, layout }: Main_100LayoutTasksProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 14, width: 422, top: 94, bottom: 65, ...layout }}
        >
            <Region
                name="tasks"
                layout={{ flexDirection: 'column', gap: 5, width: '100%' }}
            >
                {itemsTasks ?? (
                    <Main_100LayoutTaskTemplateItem />
                )}
                <Border
                    variant="15"
                    tintColor="#f0f0f0"
                    layout={{ width: 406, height: 61, flexShrink: 0 }}
                />
                <Border
                    variant="15"
                    tintColor="#f0f0f0"
                    layout={{ width: 406, height: 61, flexShrink: 0 }}
                />
                <Border
                    variant="15"
                    tintColor="#f0f0f0"
                    layout={{ width: 406, height: 61, flexShrink: 0 }}
                />
                <Border
                    variant="15"
                    tintColor="#f0f0f0"
                    layout={{ width: 406, height: 57, flexShrink: 0 }}
                />
            </Region>
        </ScrollArea>
    );
};
