import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { HabbiconHubLayoutSetRowTemplateItem } from './HabbiconHubLayoutSetRowTemplateItem';

/** Named region `set_rail_list` of HabbiconHubLayout - configured through the parent's `setRailList` prop. */
export interface HabbiconHubLayoutSetRailListProps {
    itemsSetRailList?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutSetRailList = ({ itemsSetRailList, layout }: HabbiconHubLayoutSetRailListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 4, width: 145, top: 4, bottom: 4, ...layout }}
        >
            <Region
                name="set_rail_list"
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            >
                {itemsSetRailList ?? (
                    <HabbiconHubLayoutSetRowTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};
