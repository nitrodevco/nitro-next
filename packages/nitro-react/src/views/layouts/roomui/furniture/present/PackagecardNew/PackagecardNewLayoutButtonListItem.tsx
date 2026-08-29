import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PackagecardNewLayoutGiveGiftButtonItem } from './PackagecardNewLayoutGiveGiftButtonItem';
import { PackagecardNewLayoutOpenGiftButtonItem } from './PackagecardNewLayoutOpenGiftButtonItem';

/** Row template `button_list` of PackagecardNewLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewLayoutButtonListItemProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
}

export const PackagecardNewLayoutButtonListItem = ({ itemsButtonList, layout }: PackagecardNewLayoutButtonListItemProps) => {
    return (
        <Region
            name="button_list"
            layout={{ flexShrink: 0, minWidth: 330, maxWidth: 306, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsButtonList ?? (
                <>
                    <PackagecardNewLayoutOpenGiftButtonItem />
                    <PackagecardNewLayoutGiveGiftButtonItem />
                </>
            )}
        </Region>
    );
};
