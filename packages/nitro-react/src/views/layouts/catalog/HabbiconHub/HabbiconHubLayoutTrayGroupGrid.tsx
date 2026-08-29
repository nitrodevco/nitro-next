import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { HabbiconHubLayoutTrayTileTemplateItem } from './HabbiconHubLayoutTrayTileTemplateItem';

/** Named region `tray_group_grid` of HabbiconHubLayout - configured through the parent's `trayGroupGrid` prop. */
export interface HabbiconHubLayoutTrayGroupGridProps {
    itemsTrayGroupGrid?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutTrayGroupGrid = ({ itemsTrayGroupGrid, layout }: HabbiconHubLayoutTrayGroupGridProps) => {
    return (
        <Region
            name="tray_group_grid"
            layout={{ position: 'absolute', left: 10, right: 10, top: 30, height: 50, flexDirection: 'row', flexWrap: 'wrap', gap: 4, ...layout }}
        >
            {itemsTrayGroupGrid ?? (
                <HabbiconHubLayoutTrayTileTemplateItem />
            )}
        </Region>
    );
};
