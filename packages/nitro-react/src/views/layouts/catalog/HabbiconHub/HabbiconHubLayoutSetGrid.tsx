import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { HabbiconHubLayoutEmptyTileTemplateItem } from './HabbiconHubLayoutEmptyTileTemplateItem';
import { HabbiconHubLayoutTileTemplateItem } from './HabbiconHubLayoutTileTemplateItem';

/** Named region `set_grid` of HabbiconHubLayout - configured through the parent's `setGrid` prop. */
export interface HabbiconHubLayoutSetGridProps {
    itemsSetGrid?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutSetGrid = ({ itemsSetGrid, layout }: HabbiconHubLayoutSetGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 8, right: 138, top: 106, bottom: 8, ...layout }}
        >
            <Region
                name="set_grid"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, width: '100%' }}
            >
                {itemsSetGrid ?? (
                    <>
                        <HabbiconHubLayoutTileTemplateItem />
                        <HabbiconHubLayoutEmptyTileTemplateItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
