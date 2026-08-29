import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { HabbiconHubLayoutTrayGroupTemplateItem } from './HabbiconHubLayoutTrayGroupTemplateItem';

/** Named region `tray_group_list` of HabbiconHubLayout - configured through the parent's `trayGroupList` prop. */
export interface HabbiconHubLayoutTrayGroupListProps {
    itemsTrayGroupList?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutTrayGroupList = ({ itemsTrayGroupList, layout }: HabbiconHubLayoutTrayGroupListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 10, width: 526, top: 59, bottom: 11, ...layout }}
        >
            <Region
                name="tray_group_list"
                layout={{ flexDirection: 'column', gap: 6, width: '100%' }}
            >
                {itemsTrayGroupList ?? (
                    <HabbiconHubLayoutTrayGroupTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};
