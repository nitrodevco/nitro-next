import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { NavigatorFrame2LayoutNavigatorEntryTileItem } from './NavigatorFrame2LayoutNavigatorEntryTileItem';

/** Row template `navigator_entry_tile_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutNavigatorEntryTileContainerItemProps {
    itemsNavigatorEntryTileContainer?: ReactNode;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutNavigatorEntryTileContainerItem = ({ itemsNavigatorEntryTileContainer, layout }: NavigatorFrame2LayoutNavigatorEntryTileContainerItemProps) => {
    return (
        <Region
            name="navigator_entry_tile_container"
            layout={{ width: 392, height: 146, flexShrink: 0, flexDirection: 'row', gap: 7, ...layout }}
        >
            {itemsNavigatorEntryTileContainer ?? (
                <NavigatorFrame2LayoutNavigatorEntryTileItem />
            )}
        </Region>
    );
};
