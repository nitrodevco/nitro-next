import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ScrollArea } from '#base/theme';

import { Main_100LayoutLevelTemplateItem } from './Main_100LayoutLevelTemplateItem';

/** Named region `levels` of Main_100Layout - configured through the parent's `levels` prop. */
export interface Main_100LayoutLevelsProps {
    itemsLevels?: ReactNode;
    layout?: BoxLayout;
}

export const Main_100LayoutLevels = ({ itemsLevels, layout }: Main_100LayoutLevelsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 22, width: 598, top: 35, height: 150, ...layout }}
        >
            <Region
                name="levels"
                layout={{ flexDirection: 'column', gap: 9, width: '100%' }}
            >
                {itemsLevels ?? (
                    <Main_100LayoutLevelTemplateItem />
                )}
                <Border
                    variant="15"
                    tintColor="#bdd6ef"
                    layout={{ width: 582, height: 44, flexShrink: 0 }}
                />
                <Border
                    variant="15"
                    tintColor="#e3e3e3"
                    layout={{ width: 582, height: 44, flexShrink: 0 }}
                />
                <Border
                    variant="15"
                    tintColor="#f0f0f0"
                    layout={{ width: 582, height: 46, flexShrink: 0 }}
                />
            </Region>
        </ScrollArea>
    );
};
