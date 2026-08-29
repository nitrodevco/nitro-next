import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PackagecardNewOpenedLayoutKeepInRoomButtonItem } from './PackagecardNewOpenedLayoutKeepInRoomButtonItem';
import { PackagecardNewOpenedLayoutPlaceInRoomButtonItem } from './PackagecardNewOpenedLayoutPlaceInRoomButtonItem';
import { PackagecardNewOpenedLayoutPutInInventoryButtonItem } from './PackagecardNewOpenedLayoutPutInInventoryButtonItem';
import { PackagecardNewOpenedLayoutSeparatorItem } from './PackagecardNewOpenedLayoutSeparatorItem';

/** Row template `button_list` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutButtonListItemProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardNewOpenedLayoutButtonListItem = ({ itemsButtonList, layout }: PackagecardNewOpenedLayoutButtonListItemProps) => {
    return (
        <Region
            name="button_list"
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsButtonList ?? (
                <>
                    <PackagecardNewOpenedLayoutKeepInRoomButtonItem />
                    <PackagecardNewOpenedLayoutPlaceInRoomButtonItem />
                    <PackagecardNewOpenedLayoutPutInInventoryButtonItem />
                    <PackagecardNewOpenedLayoutSeparatorItem />
                </>
            )}
        </Region>
    );
};
